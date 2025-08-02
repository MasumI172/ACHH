import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { relations } from "drizzle-orm";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const properties = pgTable("properties", {
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
  category: text("category").notNull(), // "beachfront", "villa", "penthouse", "mansion", "retreat"
});

export const inquiries = pgTable("inquiries", {
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

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertPropertySchema = createInsertSchema(properties).omit({
  id: true,
});

export const insertInquirySchema = createInsertSchema(inquiries).omit({
  id: true,
  createdAt: true,
});

// Reviews table for guest testimonials
export const reviews = pgTable("reviews", {
  id: serial("id").primaryKey(),
  guestName: text("guest_name").notNull(),
  guestLocation: text("guest_location"),
  propertyId: integer("property_id").references(() => properties.id),
  rating: integer("rating").notNull(), // 1-5 stars
  title: text("title"),
  content: text("content").notNull(),
  stayDate: timestamp("stay_date"),
  featured: boolean("featured").default(false),
  verified: boolean("verified").default(true),
  createdAt: timestamp("created_at").defaultNow(),
});

// Relations
export const reviewsRelations = relations(reviews, ({ one }) => ({
  property: one(properties, {
    fields: [reviews.propertyId],
    references: [properties.id],
  }),
}));

export const propertiesRelations = relations(properties, ({ many }) => ({
  reviews: many(reviews),
}));

// Insert schemas
export const insertReviewSchema = createInsertSchema(reviews).omit({
  id: true,
  createdAt: true,
});

// Types
export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type Property = typeof properties.$inferSelect;
export type InsertProperty = z.infer<typeof insertPropertySchema>;
export type Inquiry = typeof inquiries.$inferSelect;
export type InsertInquiry = z.infer<typeof insertInquirySchema>;
export type Review = typeof reviews.$inferSelect;
export type InsertReview = z.infer<typeof insertReviewSchema>;
