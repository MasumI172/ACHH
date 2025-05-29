import { db } from "./db";
import { properties, type InsertProperty } from "@shared/schema";

const sampleProperties: InsertProperty[] = [
  {
    name: "Oceanview Villa",
    description: "Luxury 4-bedroom villa with private beach access and infinity pool overlooking the pristine Arabian waters. Features modern amenities and breathtaking sunset views.",
    pricePerNight: "850.00",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    location: "Arabian Coast Beachfront",
    amenities: ["Private Beach", "Infinity Pool", "Ocean View", "WiFi", "Air Conditioning", "Private Chef Available"],
    images: [
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    rating: "4.9",
    featured: true,
    category: "beachfront"
  },
  {
    name: "Coastal Mansion",
    description: "Spectacular 6-bedroom mansion with panoramic sea views and Mediterranean architecture. Perfect for large groups seeking luxury and privacy.",
    pricePerNight: "1200.00",
    bedrooms: 6,
    bathrooms: 5,
    maxGuests: 12,
    location: "Arabian Coast Heights",
    amenities: ["Panoramic Views", "Private Pool", "Garden", "WiFi", "Full Kitchen", "Concierge Service"],
    images: [
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    rating: "4.8",
    featured: true,
    category: "mansion"
  },
  {
    name: "Beach House Retreat",
    description: "Charming 3-bedroom retreat perfect for intimate getaways. Features modern design with traditional coastal elements and direct beach access.",
    pricePerNight: "650.00",
    bedrooms: 3,
    bathrooms: 2,
    maxGuests: 6,
    location: "Arabian Coast Bay",
    amenities: ["Beach Access", "WiFi", "Air Conditioning", "Kitchen", "Terrace", "Parking"],
    images: [
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    rating: "4.7",
    featured: true,
    category: "retreat"
  },
  {
    name: "Marina Penthouse",
    description: "Ultra-modern penthouse with rooftop terrace and yacht access. Features floor-to-ceiling windows and contemporary luxury finishes throughout.",
    pricePerNight: "1500.00",
    bedrooms: 3,
    bathrooms: 3,
    maxGuests: 6,
    location: "Arabian Coast Marina",
    amenities: ["Rooftop Terrace", "Yacht Access", "City Views", "WiFi", "Luxury Finishes", "Valet Parking"],
    images: [
      "https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    rating: "5.0",
    featured: true,
    category: "penthouse"
  },
  {
    name: "Desert Oasis Villa",
    description: "Traditional Arabian architecture with modern luxury amenities. Set in landscaped gardens with palm trees and private courtyards.",
    pricePerNight: "950.00",
    bedrooms: 5,
    bathrooms: 4,
    maxGuests: 10,
    location: "Arabian Coast Desert",
    amenities: ["Private Courtyard", "Garden", "Traditional Design", "WiFi", "Pool", "Spa Services"],
    images: [
      "https://images.unsplash.com/photo-1600566753376-12c8ab7fb75b?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    rating: "4.9",
    featured: true,
    category: "villa"
  },
  {
    name: "Clifftop Sanctuary",
    description: "Dramatic clifftop location with breathtaking sunset views. Modern minimalist design with infinity pool and panoramic ocean vistas.",
    pricePerNight: "1100.00",
    bedrooms: 4,
    bathrooms: 3,
    maxGuests: 8,
    location: "Arabian Coast Cliffs",
    amenities: ["Clifftop Location", "Infinity Pool", "Ocean Views", "WiFi", "Modern Design", "Privacy"],
    images: [
      "https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1613490493576-7fde63acd811?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600",
      "https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
    ],
    rating: "4.8",
    featured: true,
    category: "villa"
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
    console.error("Error seeding database:", error);
  }
}