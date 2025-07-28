import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import Hero from "@/components/hero";
import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { 
  Star,
  CheckCircle
} from "lucide-react";
import type { Property } from "@shared/schema";

const Home = () => {
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  
  // Always fetch all properties for the "Our Properties" section (no date filtering)
  const { data: allProperties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
    queryFn: async () => {
      const response = await fetch('/api/properties');
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  // Use all properties for the "Our Properties" section
  const featuredProperties = allProperties;
  
  // Function to handle search with date filtering
  const handleSearch = () => {
    if (checkInDate && checkOutDate) {
      // Navigate to properties page with date parameters
      const searchParams = new URLSearchParams({
        checkIn: checkInDate,
        checkOut: checkOutDate
      });
      window.location.href = `/properties?${searchParams.toString()}`;
    } else {
      // Navigate to properties page without filters
      window.location.href = '/properties';
    }
  };

  const testimonials = [
    {
      initials: "JS",
      name: "James Smith",
      location: "London, UK",
      content: "Absolutely stunning property with impeccable service. The oceanview villa exceeded all our expectations. We'll definitely be returning!"
    },
    {
      initials: "MJ",
      name: "Maria Johnson",
      location: "New York, USA",
      content: "The perfect blend of luxury and comfort. Every detail was thoughtfully considered. The concierge service was exceptional!"
    },
    {
      initials: "AR",
      name: "Ahmed Rahman",
      location: "Dubai, UAE",
      content: "Our family vacation was magical. The kids loved the beach access and we enjoyed the privacy and luxury. Highly recommended!"
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <Hero 
        checkInDate={checkInDate}
        checkOutDate={checkOutDate}
        onCheckInChange={setCheckInDate}
        onCheckOutChange={setCheckOutDate}
        onSearch={handleSearch}
      />



      {/* Properties Section */}
      <section className="luxury-section luxury-bg py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl luxury-heading text-luxury-brown mb-4">
              Our <span className="luxury-accent italic luxury-serif">Properties</span>
            </h2>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg h-96 animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-t-2xl"></div>
                  <div className="p-6 space-y-3">
                    <div className="bg-gray-300 h-4 rounded"></div>
                    <div className="bg-gray-300 h-3 rounded w-3/4"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredProperties?.map((property, index) => (
                <PropertyCard 
                  key={property.id} 
                  property={property} 
                  index={index}
                  showAvailability={false} // No availability badges on home page
                />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="text-center mt-8"
          >
            <Link href="/properties">
              <Button className="luxury-button text-base px-12 py-4">
                View All Properties
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Home;
