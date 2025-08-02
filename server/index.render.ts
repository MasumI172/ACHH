
import express, { type Request, Response, NextFunction } from "express";
import path from "path";
import fs from "fs";
import { createServer, type Server } from "http";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import * as schema from "../shared/schema";
import ical from "node-ical";
import { z } from "zod";

// Database setup
const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);
const db = drizzle(sql, { schema });

// Simple logging function - no external dependencies
function log(message: string, source = "express") {
  const formattedTime = new Date().toLocaleTimeString("en-US", {
    hour: "numeric",
    minute: "2-digit", 
    second: "2-digit",
    hour12: true,
  });
  console.log(`${formattedTime} [${source}] ${message}`);
}

// Production static file serving
function serveStatic(app: express.Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");

  if (!fs.existsSync(distPath)) {
    throw new Error(`Could not find the build directory: ${distPath}`);
  }

  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req, res, next) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json;
  res.json = function (bodyJson, ...args) {
    capturedJsonResponse = bodyJson;
    return originalResJson.apply(res, [bodyJson, ...args]);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }
      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }
      log(logLine);
    }
  });

  next();
});

// API Routes - inline to avoid external imports
app.get("/api/properties", async (req, res) => {
  try {
    const { checkIn, checkOut } = req.query;
    let properties = await db.select().from(schema.properties);
    
    if (checkIn && checkOut) {
      const availableProperties = [];
      
      for (const property of properties) {
        try {
          const timestamp = Date.now();
          let icalUrl: string;
          
          if (property.name === "Stunning 1BR | Burj View from Infinity Pool") {
            icalUrl = `https://hostex.io/web/ical/12104133.ics?t=0a9256ff71d4977ae9d3de94263d4173&ts=${timestamp}`;
          } else {
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
          
          const requestedStart = new Date(checkIn as string);
          const requestedEnd = new Date(checkOut as string);
          let isAvailable = true;
          
          if (property.id === 13) {
            const aug1Start = new Date(2025, 7, 1);
            const aug1End = new Date(2025, 7, 2);
            
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

app.get("/api/properties/featured", async (req, res) => {
  try {
    const properties = await db.select().from(schema.properties).where(eq(schema.properties.featured, true));
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch featured properties" });
  }
});

app.get("/api/properties/:id", async (req, res) => {
  try {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }
    
    const property = await db.select().from(schema.properties).where(eq(schema.properties.id, id)).limit(1);
    if (!property.length) {
      return res.status(404).json({ message: "Property not found" });
    }
    
    res.json(property[0]);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch property" });
  }
});

app.get("/api/properties/category/:category", async (req, res) => {
  try {
    const { category } = req.params;
    const properties = await db.select().from(schema.properties).where(eq(schema.properties.category, category));
    res.json(properties);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch properties" });
  }
});

app.post("/api/inquiries", async (req, res) => {
  try {
    const insertSchema = schema.insertInquirySchema;
    const inquiry = insertSchema.parse(req.body);
    
    const result = await db.insert(schema.inquiries).values(inquiry).returning();
    res.status(201).json(result[0]);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return res.status(400).json({ message: "Invalid inquiry data", errors: error.errors });
    }
    res.status(500).json({ message: "Failed to submit inquiry" });
  }
});

app.get("/api/properties/:id/availability", async (req, res) => {
  try {
    const propertyId = parseInt(req.params.id);
    if (isNaN(propertyId)) {
      return res.status(400).json({ message: "Invalid property ID" });
    }

    const timestamp = Date.now();
    let icalUrl: string;
    
    if (propertyId === 12) {
      icalUrl = `https://hostex.io/web/ical/12104133.ics?t=0a9256ff71d4977ae9d3de94263d4173&ts=${timestamp}`;
    } else {
      icalUrl = `https://hostex.io/web/ical/12282085.ics?t=b3ae9a3ed6a7f783df91cbff5f17d611&ts=${timestamp}`;
    }
    
    const response = await fetch(icalUrl, {
      headers: {
        'Cache-Control': 'no-cache',
        'Pragma': 'no-cache'
      }
    });

    if (!response.ok) {
      throw new Error(`Failed to fetch iCal data: ${response.statusText}`);
    }

    const icalData = await response.text();
    const events = ical.parseICS(icalData);
    
    const bookings = [];
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    for (let k in events) {
      const event = events[k];
      
      if (event.type === 'VEVENT') {
        let startDate, endDate;
        
        if (typeof event.start === 'string') {
          if (event.start.length === 8) {
            const year = parseInt(event.start.substring(0, 4));
            const month = parseInt(event.start.substring(4, 6)) - 1;
            const day = parseInt(event.start.substring(6, 8));
            startDate = new Date(year, month, day);
          } else {
            startDate = new Date(event.start);
          }
        } else {
          startDate = new Date(event.start);
        }
        
        if (typeof event.end === 'string') {
          if (event.end.length === 8) {
            const year = parseInt(event.end.substring(0, 4));
            const month = parseInt(event.end.substring(4, 6)) - 1;
            const day = parseInt(event.end.substring(6, 8));
            endDate = new Date(year, month, day);
            endDate.setDate(endDate.getDate() - 1);
          } else {
            endDate = new Date(event.end);
            endDate.setDate(endDate.getDate() - 1);
          }
        } else {
          endDate = new Date(event.end);
          endDate.setDate(endDate.getDate() - 1);
        }
        
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

    if (propertyId === 13) {
      const aug1Block = {
        id: 'manual-block-aug-1-2025',
        summary: 'Hostex (Not available) - Manual Block',
        start: new Date(2025, 7, 1).toISOString(),
        end: new Date(2025, 7, 1).toISOString(),
        status: 'CONFIRMED'
      };
      
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

// Serve static assets
const publicPath = path.resolve(process.cwd(), "public");
app.use(express.static(publicPath));

const assetsPath = path.resolve(process.cwd(), "attached_assets");
app.use("/attached_assets", express.static(assetsPath));

// Error handler
app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
  const status = err.status || err.statusCode || 500;
  const message = err.message || "Internal Server Error";
  res.status(status).json({ message });
  throw err;
});

// Serve static files
serveStatic(app);

// Start server
const port = parseInt(process.env.PORT || "5000", 10);
const server = createServer(app);

server.listen({
  port,
  host: "0.0.0.0",
  reusePort: true,
}, () => {
  log(`serving on port ${port}`);
});
