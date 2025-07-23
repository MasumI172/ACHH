import { 
  users, 
  properties, 
  inquiries,
  type User, 
  type InsertUser,
  type Property,
  type InsertProperty,
  type Inquiry,
  type InsertInquiry
} from "@shared/schema";
import { db } from "./db";
import { eq } from "drizzle-orm";

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  getAllProperties(): Promise<Property[]>;
  getProperty(id: number): Promise<Property | undefined>;
  getFeaturedProperties(): Promise<Property[]>;
  getPropertiesByCategory(category: string): Promise<Property[]>;
  createProperty(property: InsertProperty): Promise<Property>;
  
  createInquiry(inquiry: InsertInquiry): Promise<Inquiry>;
  getAllInquiries(): Promise<Inquiry[]>;
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id));
    return user || undefined;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.username, username));
    return user || undefined;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db
      .insert(users)
      .values(insertUser)
      .returning();
    return user;
  }

  async getAllProperties(): Promise<Property[]> {
    return await db.select().from(properties);
  }

  async getProperty(id: number): Promise<Property | undefined> {
    const [property] = await db.select().from(properties).where(eq(properties.id, id));
    return property || undefined;
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.featured, true));
  }

  async getPropertiesByCategory(category: string): Promise<Property[]> {
    return await db.select().from(properties).where(eq(properties.category, category));
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const [property] = await db
      .insert(properties)
      .values(insertProperty)
      .returning();
    return property;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const inquiryData = {
      ...insertInquiry,
      propertyId: insertInquiry.propertyId ?? null,
      createdAt: new Date().toISOString()
    };
    
    const [inquiry] = await db
      .insert(inquiries)
      .values(inquiryData)
      .returning();
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return await db.select().from(inquiries);
  }
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private properties: Map<number, Property>;
  private inquiries: Map<number, Inquiry>;
  private currentUserId: number;
  private currentPropertyId: number;
  private currentInquiryId: number;

  constructor() {
    this.users = new Map();
    this.properties = new Map();
    this.inquiries = new Map();
    this.currentUserId = 1;
    this.currentPropertyId = 1;
    this.currentInquiryId = 1;
    
    // Initialize with sample properties
    this.initializeProperties();
  }

  private initializeProperties() {
    const sampleProperties: InsertProperty[] = [
      {
        name: "Beautiful 1BR | Burj View from Infinity Pool",
        description: "Sophisticated urban retreat featuring contemporary design with warm wood finishes and modern amenities. This stunning residence offers an open-concept living space with a gourmet kitchen, elegant dining area, and breathtaking city skyline views from the private terrace.",
        pricePerNight: "1200.00",
        bedrooms: 1,
        bathrooms: 2,
        maxGuests: 4,
        location: "Downtown Dubai Marina District",
        amenities: ["Burj Khalifa Views", "Infinity Pool Access", "Private Terrace", "Gourmet Kitchen", "Modern Finishes", "WiFi", "Air Conditioning", "Premium Location", "Concierge Service"],
        images: [
          "/attached_assets/WhatsApp Image 2025-07-23 at 10.21.20_51cd866c_1753288433584.jpg",
          "/attached_assets/WhatsApp Image 2025-07-23 at 10.21.19_9b8a1867_1753288413659.jpg",
          "/attached_assets/WhatsApp Image 2025-07-23 at 10.21.19_609dd4ba_1753288427064.jpg"
        ],
        rating: "5.0",
        featured: true,
        category: "penthouse"
      }
    ];

    sampleProperties.forEach(property => {
      this.createProperty(property);
    });
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async getAllProperties(): Promise<Property[]> {
    return Array.from(this.properties.values());
  }

  async getProperty(id: number): Promise<Property | undefined> {
    return this.properties.get(id);
  }

  async getFeaturedProperties(): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(property => property.featured);
  }

  async getPropertiesByCategory(category: string): Promise<Property[]> {
    return Array.from(this.properties.values()).filter(property => property.category === category);
  }

  async createProperty(insertProperty: InsertProperty): Promise<Property> {
    const id = this.currentPropertyId++;
    const property: Property = { 
      ...insertProperty, 
      id,
      featured: insertProperty.featured ?? false
    };
    this.properties.set(id, property);
    return property;
  }

  async createInquiry(insertInquiry: InsertInquiry): Promise<Inquiry> {
    const id = this.currentInquiryId++;
    const createdAt = new Date().toISOString();
    const inquiry: Inquiry = { 
      ...insertInquiry, 
      id, 
      createdAt,
      propertyId: insertInquiry.propertyId ?? null
    };
    this.inquiries.set(id, inquiry);
    return inquiry;
  }

  async getAllInquiries(): Promise<Inquiry[]> {
    return Array.from(this.inquiries.values());
  }
}

export const storage = new MemStorage();
