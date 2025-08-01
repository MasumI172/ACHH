import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertInquirySchema, insertReviewSchema } from "@shared/schema";
import { z } from "zod";
import ical from "node-ical";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all properties with optional date filtering
  app.get("/api/properties", async (req, res) => {
    try {
      const { checkIn, checkOut } = req.query;
      let properties = await storage.getAllProperties();
      
      // If date filters are provided, check availability for each property
      if (checkIn && checkOut) {
        const availableProperties = [];
        
        for (const property of properties) {
          try {
            // Get property availability from Hostex iCal
            const timestamp = Date.now();
            let icalUrl: string;
            
            if (property.name === "Stunning 1BR | Burj View from Infinity Pool") {
              // Stunning 1BR | Burj View from Infinity Pool
              icalUrl = `https://hostex.io/web/ical/12104133.ics?t=0a9256ff71d4977ae9d3de94263d4173&ts=${timestamp}`;
            } else {
              // Beautiful 1BR | Burj View from Infinity Pool (default)
              icalUrl = `https://hostex.io/web/ical/12282085.ics?t=b3ae9a3ed6a7f783df91cbff5f17d611&ts=${timestamp}`;
            }
            
            const response = await fetch(icalUrl, {
              headers: {
                'Cache-Control': 'no-cache',
                'Pragma': 'no-cache'
              }
            });
            
            if (!response.ok) continue;
            
            const icalData = await response.text();
            const events = ical.parseICS(icalData);
            
            // Check if the requested dates conflict with existing bookings
            const requestedStart = new Date(checkIn as string);
            const requestedEnd = new Date(checkOut as string);
            let isAvailable = true;
            
            // Temporary fix: Manual block for August 1st for property ID 13
            if (property.id === 13) {
              const aug1Start = new Date(2025, 7, 1); // August 1st, 2025
              const aug1End = new Date(2025, 7, 2);   // August 2nd, 2025 (end exclusive)
              
              if (requestedStart < aug1End && requestedEnd > aug1Start) {
                isAvailable = false;
              }
            }
            
            if (isAvailable) {
              for (let k in events) {
                const event = events[k];
                
                if (event.type === 'VEVENT') {
                  let bookingStart, bookingEnd;
                  
                  if (typeof event.start === 'string') {
                    if (event.start.length === 8) {
                      const year = parseInt(event.start.substring(0, 4));
                      const month = parseInt(event.start.substring(4, 6)) - 1;
                      const day = parseInt(event.start.substring(6, 8));
                      bookingStart = new Date(year, month, day);
                    } else {
                      bookingStart = new Date(event.start);
                    }
                  } else {
                    bookingStart = new Date(event.start);
                  }
                  
                  if (typeof event.end === 'string') {
                    if (event.end.length === 8) {
                      const year = parseInt(event.end.substring(0, 4));
                      const month = parseInt(event.end.substring(4, 6)) - 1;
                      const day = parseInt(event.end.substring(6, 8));
                      bookingEnd = new Date(year, month, day);
                    } else {
                      bookingEnd = new Date(event.end);
                    }
                  } else {
                    bookingEnd = new Date(event.end);
                  }
                  
                  // Check for date overlap
                  if (requestedStart < bookingEnd && requestedEnd > bookingStart) {
                    isAvailable = false;
                    break;
                  }
                }
              }
            }
            
            if (isAvailable) {
              availableProperties.push(property);
            }
          } catch (error) {
            // If availability check fails, include the property anyway
            availableProperties.push(property);
          }
        }
        
        properties = availableProperties;
      }
      
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties" });
    }
  });

  // Get featured properties
  app.get("/api/properties/featured", async (req, res) => {
    try {
      const properties = await storage.getFeaturedProperties();
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch featured properties" });
    }
  });

  // Get property by ID
  app.get("/api/properties/:id", async (req, res) => {
    try {
      const id = parseInt(req.params.id);
      if (isNaN(id)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }
      
      const property = await storage.getProperty(id);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      res.json(property);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch property" });
    }
  });

  // Get properties by category
  app.get("/api/properties/category/:category", async (req, res) => {
    try {
      const category = req.params.category;
      const properties = await storage.getPropertiesByCategory(category);
      res.json(properties);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch properties by category" });
    }
  });

  // Create inquiry
  app.post("/api/inquiries", async (req, res) => {
    try {
      const validatedData = insertInquirySchema.parse(req.body);
      const inquiry = await storage.createInquiry(validatedData);
      res.status(201).json(inquiry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
      }
      res.status(500).json({ message: "Failed to create inquiry" });
    }
  });

  // Get all inquiries (admin endpoint)
  app.get("/api/inquiries", async (req, res) => {
    try {
      const inquiries = await storage.getAllInquiries();
      res.json(inquiries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch inquiries" });
    }
  });

  // Get property availability from Hostex iCal
  app.get("/api/properties/:id/availability", async (req, res) => {
    try {
      const propertyId = parseInt(req.params.id);
      if (isNaN(propertyId)) {
        return res.status(400).json({ message: "Invalid property ID" });
      }

      // Hostex iCal URLs for different properties
      const timestamp = Date.now();
      let icalUrl: string;
      
      // Get property name to determine correct iCal URL
      const property = await storage.getProperty(propertyId);
      if (!property) {
        return res.status(404).json({ message: "Property not found" });
      }
      
      if (property.name === "Stunning 1BR | Burj View from Infinity Pool") {
        // Stunning 1BR | Burj View from Infinity Pool
        icalUrl = `https://hostex.io/web/ical/12104133.ics?t=0a9256ff71d4977ae9d3de94263d4173&ts=${timestamp}`;
      } else {
        // Beautiful 1BR | Burj View from Infinity Pool (default)
        icalUrl = `https://hostex.io/web/ical/12282085.ics?t=b3ae9a3ed6a7f783df91cbff5f17d611&ts=${timestamp}`;
      }
      
      // Fetch iCal data with no cache headers
      const response = await fetch(icalUrl, {
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      if (!response.ok) {
        throw new Error(`Failed to fetch iCal: ${response.statusText}`);
      }
      
      const icalData = await response.text();
      const events = ical.parseICS(icalData);
      
      // Process events to extract booking information
      const bookings = [];
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      for (let k in events) {
        const event = events[k];
        
        if (event.type === 'VEVENT') {
          // Handle different date formats from iCal
          let startDate, endDate;
          
          if (typeof event.start === 'string') {
            // Handle DATE format (YYYYMMDD)
            if (event.start.length === 8) {
              const year = parseInt(event.start.substring(0, 4));
              const month = parseInt(event.start.substring(4, 6)) - 1; // Month is 0-indexed
              const day = parseInt(event.start.substring(6, 8));
              startDate = new Date(year, month, day);
            } else {
              startDate = new Date(event.start);
            }
          } else {
            startDate = new Date(event.start);
          }
          
          if (typeof event.end === 'string') {
            // Handle DATE format (YYYYMMDD)
            if (event.end.length === 8) {
              const year = parseInt(event.end.substring(0, 4));
              const month = parseInt(event.end.substring(4, 6)) - 1; // Month is 0-indexed
              const day = parseInt(event.end.substring(6, 8));
              endDate = new Date(year, month, day);
              // Subtract one day because checkout date should be available for new bookings
              endDate.setDate(endDate.getDate() - 1);
            } else {
              endDate = new Date(event.end);
              // For other formats, also subtract one day for checkout logic
              endDate.setDate(endDate.getDate() - 1);
            }
          } else {
            endDate = new Date(event.end);
            // Subtract one day for checkout logic
            endDate.setDate(endDate.getDate() - 1);
          }
          

          
          // Only include future bookings
          if (endDate >= today) {
            bookings.push({
              id: event.uid,
              summary: event.summary || 'Booking',
              start: startDate.toISOString(),
              end: endDate.toISOString(),
              status: event.status || 'CONFIRMED'
            });
          }
        }
      }

      
      // Temporary fix: Manually add August 1st as blocked for property 13 until Hostex sync resolves
      if (propertyId === 13) {
        const aug1Block = {
          id: 'manual-block-aug-1-2025',
          summary: 'Hostex (Not available) - Manual Block',
          start: new Date(2025, 7, 1).toISOString(), // August 1st, 2025
          end: new Date(2025, 7, 1).toISOString(),   // Same day
          status: 'CONFIRMED'
        };
        
        // Check if August 1st is already blocked (avoid duplicates)
        const aug1Already = bookings.some(booking => {
          const bookingStart = new Date(booking.start);
          return bookingStart.getFullYear() === 2025 && 
                 bookingStart.getMonth() === 7 && 
                 bookingStart.getDate() === 1;
        });
        
        if (!aug1Already) {
          bookings.push(aug1Block);
        }
      }
      
      // Sort bookings by start date
      bookings.sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime());
      
      res.json({
        propertyId,
        lastUpdated: new Date().toISOString(),
        bookings
      });
    } catch (error) {
      console.error('Error fetching availability:', error);
      res.status(500).json({ message: "Failed to fetch availability data" });
    }
  });

  // Reviews routes
  app.get("/api/reviews", async (req, res) => {
    try {
      const { propertyId, featured } = req.query;
      let reviews = await storage.getAllReviews();
      
      if (propertyId) {
        reviews = reviews.filter(r => r.propertyId === parseInt(propertyId as string));
      }
      
      if (featured === 'true') {
        reviews = reviews.filter(r => r.featured);
      }
      
      res.json(reviews);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      res.status(500).json({ message: "Failed to fetch reviews" });
    }
  });

  app.post("/api/reviews", async (req, res) => {
    try {
      const reviewData = insertReviewSchema.parse(req.body);
      const review = await storage.createReview(reviewData);
      res.json(review);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res.status(400).json({ message: "Invalid review data", errors: error.errors });
      }
      console.error("Error creating review:", error);
      res.status(500).json({ message: "Failed to create review" });
    }
  });

  app.get("/api/reviews/:id", async (req, res) => {
    try {
      const review = await storage.getReview(parseInt(req.params.id));
      if (!review) {
        return res.status(404).json({ message: "Review not found" });
      }
      res.json(review);
    } catch (error) {
      console.error("Error fetching review:", error);
      res.status(500).json({ message: "Failed to fetch review" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
