import { db } from "./db";
import { reviews, type InsertReview } from "@shared/schema";

const sampleReviews: InsertReview[] = [
  {
    guestName: "Sarah Johnson",
    guestLocation: "London, UK",
    propertyId: 15, // Beautiful 1BR property
    rating: 5,
    title: "Absolutely Perfect Stay in Dubai!",
    content: "The apartment exceeded all expectations! The Burj Khalifa view from the infinity pool was breathtaking. The host was incredibly responsive and helpful throughout our stay. The location is perfect - walking distance to Dubai Mall and all major attractions. The apartment is exactly as described with all modern amenities. We'll definitely be back!",
    stayDate: new Date('2024-12-15'),
    featured: true,
    verified: true
  },
  {
    guestName: "Michael Chen",
    guestLocation: "Singapore",
    propertyId: 15,
    rating: 5,
    title: "Luxury at its finest",
    content: "This place is a gem in the heart of Downtown Dubai. The infinity pool with Burj views is incredible, especially at sunset. The apartment is spotless, well-equipped, and the Netflix setup was perfect for relaxing evenings. Arabian Coast Holiday Homes provides exceptional service. Highly recommend!",
    stayDate: new Date('2024-11-28'),
    featured: true,
    verified: true
  },
  {
    guestName: "Emily Rodriguez",
    guestLocation: "Madrid, Spain",
    propertyId: 15,
    rating: 5,
    title: "Dream vacation in Dubai",
    content: "Everything was perfect from check-in to check-out. The apartment is beautiful with stunning views, and the building amenities are world-class. The location couldn't be better - right in the heart of everything. The host went above and beyond to ensure we had everything we needed. Thank you for an unforgettable stay!",
    stayDate: new Date('2024-10-22'),
    featured: true,
    verified: true
  },
  {
    guestName: "James Wilson",
    guestLocation: "Toronto, Canada",
    propertyId: 15,
    rating: 5,
    title: "Outstanding Dubai experience",
    content: "The apartment is exactly as advertised - luxurious, clean, and perfectly located. The infinity pool with Burj Khalifa views is absolutely stunning. Great communication from the host and seamless check-in process. We loved every minute of our stay and can't wait to return!",
    stayDate: new Date('2024-09-18'),
    featured: false,
    verified: true
  },
  {
    guestName: "Lisa Thompson",
    guestLocation: "Sydney, Australia",
    propertyId: 15,
    rating: 5,
    title: "Perfect location and amenities",
    content: "The apartment is beautifully appointed with everything you need for a comfortable stay. The building facilities are excellent - the gym is well-equipped and the pool area is fantastic. Walking distance to Dubai Mall and all the major attractions. Exceptional value for money in such a prime location.",
    stayDate: new Date('2024-08-10'),
    featured: false,
    verified: true
  },
  {
    guestName: "Ahmed Al-Rashid",
    guestLocation: "Riyadh, Saudi Arabia",
    propertyId: 15,
    rating: 5,
    title: "Exceptional hospitality",
    content: "من أفضل التجارب في دبي! الشقة رائعة والخدمة ممتازة. The apartment is stunning with all modern amenities. The host was very welcoming and provided excellent recommendations for dining and attractions. The Burj view from the pool is unforgettable. Highly recommended for anyone visiting Dubai!",
    stayDate: new Date('2024-07-05'),
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