import express, { type Request, Response } from "express";
import path from "path";
import fs from "fs";
import { createServer } from "http";
import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";
import { eq } from "drizzle-orm";
import { pgTable, text, serial, integer, boolean, decimal } from "drizzle-orm/pg-core";
import ical from "node-ical";

// Inline schema definitions - no external imports
const properties = pgTable("properties", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  pricePerNight: decimal("price_per_night", { precision: 10, scale: 2 }).notNull(),
  bedrooms: integer("bedrooms").notNull(),
  bathrooms: integer("bathrooms").notNull(),
  maxGuests: integer("max_guests").notNull(),
  location: text("location").notNull(),
  amenities: text("amenities").array().notNull(),
  images: text("images").array().notNull(),
  rating: decimal("rating", { precision: 2, scale: 1 }).notNull(),
  featured: boolean("featured").default(false),
  category: text("category").notNull(),
});

const inquiries = pgTable("inquiries", {
  id: serial("id").primaryKey(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull(),
  phone: text("phone").notNull(),
  checkInDate: text("check_in_date").notNull(),
  checkOutDate: text("check_out_date").notNull(),
  message: text("message").notNull(),
  propertyId: integer("property_id"),
  createdAt: text("created_at").notNull(),
});

// Database setup
const connectionString = process.env.DATABASE_URL!;
const sql = neon(connectionString);
// Initialize database with inline table definitions
const db = drizzle(sql);

// Production logging
function log(message: string, source = "express") {
  const time = new Date().toLocaleTimeString("en-US", {
    hour: "numeric", minute: "2-digit", second: "2-digit", hour12: true,
  });
  console.log(`${time} [${source}] ${message}`);
}

// Static file serving
function serveStatic(app: express.Express) {
  const distPath = path.resolve(process.cwd(), "dist", "public");
  if (!fs.existsSync(distPath)) {
    throw new Error(`Could not find build directory: ${distPath}`);
  }
  app.use(express.static(distPath));
  app.use("*", (_req, res) => {
    res.sendFile(path.resolve(distPath, "index.html"));
  });
}

// iCal parsing for availability
async function fetchAvailability(propertyId: number) {
  const HOSTEX_ICAL_URL = "https://api.hostex.com/calendar/ical/12282085";
  
  try {
    const response = await fetch(HOSTEX_ICAL_URL);
    if (!response.ok) {
      throw new Error(`iCal fetch failed: ${response.status}`);
    }
    
    const icalData = await response.text();
    const events = ical.parseICS(icalData);
    
    const bookedDates: string[] = [];
    const now = new Date();
    
    for (const event of Object.values(events)) {
      if (event.type === 'VEVENT' && event.start && event.end) {
        const startDate = new Date(event.start);
        const endDate = new Date(event.end);
        
        if (endDate >= now) {
          for (let d = new Date(startDate); d < endDate; d.setDate(d.getDate() + 1)) {
            bookedDates.push(d.toISOString().split('T')[0]);
          }
        }
      }
    }
    
    // Manual block for August 1, 2025 (temporary fix)
    if (propertyId === 13) {
      bookedDates.push('2025-08-01');
    }
    
    return {
      propertyId,
      bookedDates: [...new Set(bookedDates)].sort(),
      lastUpdated: new Date().toISOString(),
      bookingCount: bookedDates.length
    };
  } catch (error) {
    console.error('iCal fetch error:', error);
    // Fallback: manual block for August 1, 2025
    return {
      propertyId,
      bookedDates: propertyId === 13 ? ['2025-08-01'] : [],
      lastUpdated: new Date().toISOString(),
      bookingCount: 0
    };
  }
}

// Check if dates are available
function isDateRangeAvailable(bookedDates: string[], checkIn: string, checkOut: string): boolean {
  const checkInDate = new Date(checkIn);
  const checkOutDate = new Date(checkOut);
  
  for (let d = new Date(checkInDate); d < checkOutDate; d.setDate(d.getDate() + 1)) {
    const dateStr = d.toISOString().split('T')[0];
    if (bookedDates.includes(dateStr)) {
      return false;
    }
  }
  return true;
}

// Express app setup
const app = express();
app.use(express.json());

// API Routes
app.get('/api/properties', async (req: Request, res: Response) => {
  try {
    const { checkIn, checkOut } = req.query;
    let allProperties = await db.select().from(properties);
    
    if (checkIn && checkOut) {
      const availableProperties = [];
      
      for (const property of allProperties) {
        const availability = await fetchAvailability(property.id);
        const isAvailable = isDateRangeAvailable(
          availability.bookedDates,
          checkIn as string,
          checkOut as string
        );
        
        if (isAvailable) {
          availableProperties.push(property);
        }
      }
      
      allProperties = availableProperties;
    }
    
    log(`GET /api/properties ${res.statusCode} in ${Date.now()}ms :: ${JSON.stringify(allProperties).substring(0, 50)}…`);
    res.json(allProperties);
  } catch (error) {
    console.error('Properties error:', error);
    res.status(500).json({ error: 'Failed to fetch properties' });
  }
});

app.get('/api/properties/featured', async (_req: Request, res: Response) => {
  try {
    const featuredProperties = await db.select().from(properties).where(eq(properties.featured, true));
    log(`GET /api/properties/featured ${res.statusCode} in ${Date.now()}ms`);
    res.json(featuredProperties);
  } catch (error) {
    console.error('Featured properties error:', error);
    res.status(500).json({ error: 'Failed to fetch featured properties' });
  }
});

app.get('/api/properties/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const property = await db.select().from(properties).where(eq(properties.id, parseInt(id))).limit(1);
    
    if (property.length === 0) {
      return res.status(404).json({ error: 'Property not found' });
    }
    
    log(`GET /api/properties/${id} ${res.statusCode} in ${Date.now()}ms :: ${JSON.stringify(property[0]).substring(0, 50)}…`);
    res.json(property[0]);
  } catch (error) {
    console.error('Property detail error:', error);
    res.status(500).json({ error: 'Failed to fetch property' });
  }
});

app.get('/api/properties/:id/availability', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const availability = await fetchAvailability(parseInt(id));
    log(`GET /api/properties/${id}/availability ${res.statusCode} in ${Date.now()}ms :: ${JSON.stringify(availability).substring(0, 50)}…`);
    res.json(availability);
  } catch (error) {
    console.error('Availability error:', error);
    res.status(500).json({ error: 'Failed to fetch availability' });
  }
});

app.post('/api/inquiries', async (req: Request, res: Response) => {
  try {
    const inquiryData = {
      ...req.body,
      createdAt: new Date().toISOString(),
    };
    
    const result = await db.insert(inquiries).values(inquiryData).returning();
    log(`POST /api/inquiries ${res.statusCode} - New inquiry created`);
    res.json(result[0]);
  } catch (error) {
    console.error('Inquiry creation error:', error);
    res.status(500).json({ error: 'Failed to create inquiry' });
  }
});

// Serve static files
serveStatic(app);

const port = parseInt(process.env.PORT || "5000");
const server = createServer(app);

server.listen(port, "0.0.0.0", () => {
  log(`serving on port ${port}`);
});

export { app, server };