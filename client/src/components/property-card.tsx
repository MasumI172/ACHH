import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Users, Bed, Bath } from "lucide-react";
import { Link } from "wouter";
import type { Property } from "@shared/schema";

interface PropertyCardProps {
  property: Property;
  index?: number;
}

const PropertyCard = ({ property, index = 0 }: PropertyCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="property-card"
    >
      <Card className="luxury-card overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300">
        <div className="relative">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-64 object-cover"
          />
          <div className="absolute top-4 right-4">
            <Badge className="bg-luxury-gold text-luxury-brown hover:bg-luxury-brown hover:text-luxury-cream">
              <Star className="w-3 h-3 mr-1 fill-current" />
              {property.rating}
            </Badge>
          </div>
          {property.featured && (
            <div className="absolute top-4 left-4">
              <Badge className="bg-luxury-white/90 text-luxury-brown hover:bg-luxury-white">
                Featured
              </Badge>
            </div>
          )}
        </div>

        <CardContent className="p-6">
          <div className="flex items-start justify-between mb-2">
            <h3 className="text-xl luxury-subheading text-luxury-brown hover:text-luxury-gold transition-colors">
              {property.name}
            </h3>
          </div>

          <p className="luxury-text mb-4 line-clamp-2">
            {property.description}
          </p>

          <div className="flex items-center gap-4 text-sm luxury-text mb-4">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-1" />
              {property.bedrooms} bed
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-1" />
              {property.bathrooms} bath
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-1" />
              {property.maxGuests} guests
            </div>
          </div>

          <div className="flex items-center justify-between">
            <div className="text-2xl font-bold text-luxury-gold">
              ${property.pricePerNight}
              <span className="text-base luxury-text font-normal">/night</span>
            </div>
            <Link href={`/property/${property.id}`}>
              <Button className="luxury-button">
                View Details
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
