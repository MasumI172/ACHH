import { db } from "./db";
import { reviews, type InsertReview } from "@shared/schema";

const sampleReviews: InsertReview[] = [
  {
    guestName: "Lina",
    propertyId: 16, // Stunning 1BR property
    rating: 5,
    content: "Super friendly and attentive hosts, facilitated a last minute early check in and were flexible with reservation dates! The apartment was super cosy and they even left a cute pastry for me upon checking in. One of my best airbnb experiences so far, definitely recommend!",
    stayDate: new Date('2025-06-05'),
    featured: true,
    verified: true
  },
  {
    guestName: "Shalika",
    propertyId: 16,
    rating: 5,
    content: "Thank you for having me. I felt at home and the apartment was very nice and aesthetic. I would stay again. Had everything I needed and more.",
    stayDate: new Date('2025-03-06'),
    featured: true,
    verified: true
  },
  {
    guestName: "Florian",
    propertyId: 16,
    rating: 5,
    content: "Great home, even with construction zones nearby. Gym + pool was amazing",
    stayDate: new Date('2025-06-16'),
    featured: true,
    verified: true
  },
  {
    guestName: "Fatima",
    propertyId: 16,
    rating: 5,
    content: "Very very nice and nice and clean I love vt and I will go next time tanks very much",
    stayDate: new Date('2025-05-10'),
    featured: false,
    verified: true
  },
  {
    guestName: "Muhammad",
    propertyId: 16,
    rating: 5,
    content: "Had an absolutely amazing stay at this gorgeous brand new apartment that is ideally located close to Dubai Mall and Burj Khalifa. We would definitely stay here again!",
    stayDate: new Date('2025-02-12'),
    featured: false,
    verified: true
  },
  {
    guestName: "Olga",
    propertyId: 16,
    rating: 5,
    content: "Simply the best!!!! I stayed in many Airbnbs  in Dubai, this is my all time favourite!!!",
    stayDate: new Date('2025-02-04'),
    featured: false,
    verified: true
  },
  {
    guestName: "Renata",
    propertyId: 16,
    rating: 5,
    content: "❤️",
    stayDate: new Date('2025-04-19'),
    featured: false,
    verified: true
  },
  {
    guestName: "Taghreed",
    propertyId: 16,
    rating: 5,
    content: "Best service and place",
    stayDate: new Date('2025-02-10'),
    featured: false,
    verified: true
  },
  {
    guestName: "Jaqueline",
    propertyId: 16,
    rating: 5,
    content: "Super comfortable apartment, I loved it 😻",
    stayDate: new Date('2025-07-08'),
    featured: false,
    verified: true
  },
  {
    guestName: "Mansour",
    propertyId: 16,
    rating: 5,
    content: "One of the most beautiful apartments in Dubai and reminds me of the apartment I lived in in Greece",
    stayDate: new Date('2025-04-08'),
    featured: false,
    verified: true
  },
  {
    guestName: "Ile",
    propertyId: 16,
    rating: 5,
    content: "Very nice stay, thank you",
    stayDate: new Date('2025-04-24'),
    featured: false,
    verified: true
  }
];

export async function seedReviews() {
  try {
    // Check if reviews already exist
    const existingReviews = await db.select().from(reviews);

    if (existingReviews.length === 0) {
      console.log("Seeding database with sample reviews...");
      await db.insert(reviews).values(sampleReviews);
      console.log("Reviews seeded successfully!");
    } else {
      console.log("Database already contains reviews, skipping seed.");
    }
  } catch (error) {
    console.log("Review seeding skipped - database not available");
  }
}