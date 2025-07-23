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
  const { data: featuredProperties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties/featured"],
  });

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
    <div className="min-h-screen">
      {/* Hero Section */}
      <Hero />

      {/* Featured Properties */}
      <section id="featured-properties" className="luxury-section luxury-bg">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl luxury-heading text-luxury-brown mb-6">
              Featured <span className="luxury-accent">Properties</span>
            </h2>
            <p className="text-xl luxury-text max-w-3xl mx-auto leading-relaxed">
              Discover our handpicked collection of premium holiday homes designed for the discerning traveler
            </p>
          </motion.div>

          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
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
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {featuredProperties?.map((property, index) => (
                <PropertyCard key={property.id} property={property} index={index} />
              ))}
            </div>
          )}

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-center mt-12"
          >
            <Link href="/properties">
              <Button className="luxury-button text-lg px-12 py-4">
                View All Properties
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* About Section */}
      <section className="luxury-section bg-luxury-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <h2 className="text-4xl md:text-5xl luxury-heading text-luxury-brown">
                Exceptional <span className="luxury-accent">Service</span>, Premium Locations
              </h2>
              <p className="text-lg luxury-text leading-relaxed">
                At Arabian Coast, we understand that finding the perfect holiday home is about more than just a place to stay. 
                It's about creating memories that last a lifetime. Our carefully curated collection of premium properties 
                ensures that every guest experiences the highest level of comfort and luxury.
              </p>
              <p className="text-lg luxury-text leading-relaxed">
                From the moment you book with us, our dedicated team works tirelessly to exceed your expectations. 
                We handle every detail so you can focus on what matters most - enjoying your perfect getaway.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold mb-2">500+</div>
                  <div className="luxury-text">Premium Properties</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-luxury-gold mb-2">50K+</div>
                  <div className="luxury-text">Happy Guests</div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4"
            >
              <img
                src="https://images.unsplash.com/photo-1586023492125-27b2c045efd7?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Luxury interior design"
                className="rounded-2xl shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="luxury-section bg-luxury-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl luxury-heading text-luxury-brown mb-4">
              What Our <span className="luxury-accent">Guests Say</span>
            </h2>
            <p className="text-xl luxury-text max-w-3xl mx-auto">
              Hear from our satisfied guests about their extraordinary experiences
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={testimonial.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="luxury-card p-8 h-full">
                  <CardContent className="p-0">
                    <div className="flex items-center text-luxury-gold mb-4">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-current" />
                      ))}
                    </div>
                    <p className="luxury-text mb-6 italic leading-relaxed">
                      "{testimonial.content}"
                    </p>
                    <div className="flex items-center">
                      <div className="w-12 h-12 bg-luxury-gold rounded-full flex items-center justify-center text-luxury-brown font-semibold mr-4">
                        {testimonial.initials}
                      </div>
                      <div>
                        <h4 className="font-semibold text-luxury-brown">{testimonial.name}</h4>
                        <p className="text-sm luxury-text">{testimonial.location}</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
