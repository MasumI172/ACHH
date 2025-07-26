import { db } from "./db";
import { properties, type InsertProperty } from "@shared/schema";

const sampleProperties: InsertProperty[] = [
  {
    name: "Beautiful 1BR | Burj View from Infinity Pool",
    description: "This stunning 1-bedroom apartment offers comfort and cosy vibes, perfect for couples, families or solo travellers. Enjoy high-speed Wi-Fi (800 Mbps), a fully equipped kitchen, 2 smart TV's with FREE NETFLIX , furnished balcony, queen-sized bed, and a full bathroom. The building features an infinity pool with Burj Khalifa views, a modern gym, a workspace area and a kids' play area, making it an ideal retreat for all in the heart of Downtown, Dubai.\n\nThe space\nLiving Room & Balcony:\nThe spacious, open-plan living area is filled with natural light and features a comfortable sofa bed, a Smart TV with Netflix for entertainment, and a balcony that offers charming views of Dubai's cityscape—perfect for enjoying your morning coffee or unwinding in the evening.\n\nBedroom & Bathroom\nRelax in the cozy bedroom, featuring a queen-size bed, premium linens, and a Smart TV, ideal for enjoying Netflix nights.\n\nFully Equipped Kitchen:\nThe sleek, modern kitchen is fully stocked with stainless steel appliances, including a toaster, tea and coffee station, oven, refrigerator, and washing machine, along with cleaning essentials. Enjoy meals at the dining table for four.",
    pricePerNight: "0.00",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    location: "Downtown Dubai",
    amenities: ["Burj Khalifa Views", "Infinity Pool Access", "High-Speed WiFi (800 Mbps)", "2 Smart TVs with Netflix", "Fully Equipped Kitchen", "Modern Gym", "Kids Play Area", "Workspace Area", "Queen-Sized Bed", "Furnished Balcony"],
    images: [
      "/attached_assets/WhatsApp Image 2025-07-23 at 10.21.20_51cd866c_1753288433584.jpg",
      "/attached_assets/WhatsApp Image 2025-07-23 at 10.21.19_9b8a1867_1753288413659.jpg",
      "/attached_assets/WhatsApp Image 2025-07-23 at 10.21.19_609dd4ba_1753288427064.jpg"
    ],
    rating: "5.0",
    featured: true,
    category: "apartment"
  },
  {
    name: "Stunning 1BR | Burj View from Infinity Pool",
    description: "This stunning 1-bedroom apartment offers comfort and cosy vibes, perfect for couples, families or solo travellers. Enjoy high-speed Wi-Fi (800 Mbps), a fully equipped kitchen, 2 smart TV's with FREE NETFLIX , furnished balcony, queen-sized bed, and a full bathroom. The building features an infinity pool with Burj Khalifa views, a modern gym, a workspace area and a kids' play area, making it an ideal retreat for all in the heart of Downtown, Dubai.\n\nThe space\nLiving Room & Balcony:\nThe spacious, open-plan living area is filled with natural light and features a comfortable sofa bed, a Smart TV with Netflix for entertainment, and a balcony that offers charming views of Dubai's cityscape—perfect for enjoying your morning coffee or unwinding in the evening.\n\nBedroom & Bathroom\nRelax in the cozy bedroom, featuring a queen-size bed, premium linens, and a Smart TV, ideal for enjoying Netflix nights.\n\nFully Equipped Kitchen:\nThe sleek, modern kitchen is fully stocked with stainless steel appliances, including a toaster, tea and coffee station, oven, refrigerator, and washing machine, along with cleaning essentials. Enjoy meals at the dining table for four.",
    pricePerNight: "0.00",
    bedrooms: 1,
    bathrooms: 1,
    maxGuests: 4,
    location: "Downtown Dubai",
    amenities: ["Burj Khalifa Views", "Infinity Pool Access", "High-Speed WiFi (800 Mbps)", "2 Smart TVs with Netflix", "Fully Equipped Kitchen", "Modern Gym", "Kids Play Area", "Workspace Area", "Queen-Sized Bed", "Furnished Balcony"],
    images: [
      "/attached_assets/image_1753290137804.png",
      "/attached_assets/image_1753290144736.png",
      "/attached_assets/image_1753290150408.png",
      "/attached_assets/image_1753290161945.png",
      "/attached_assets/image_1753290176499.png"
    ],
    rating: "4.9",
    featured: false,
    category: "apartment"
  }
];

export async function seedDatabase() {
  try {
    // Check if properties already exist
    const existingProperties = await db.select().from(properties);
    
    if (existingProperties.length === 0) {
      console.log("Seeding database with sample properties...");
      await db.insert(properties).values(sampleProperties);
      console.log("Database seeded successfully!");
    } else {
      console.log("Database already contains properties, skipping seed.");
    }
  } catch (error) {
    console.log("Database seeding skipped - using in-memory storage fallback");
    // Fallback gracefully without breaking the app
  }
}