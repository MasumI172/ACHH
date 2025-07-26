import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Users, Bed, Bath } from "lucide-react";
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
      <Card className="luxury-card overflow-hidden luxury-shadow transition-all duration-700 group">
        <div className="relative overflow-hidden">
          <img
            src={property.images[0]}
            alt={property.name}
            className="w-full h-72 object-cover transition-transform duration-700 group-hover:scale-110"
            loading="lazy"
            style={{
              filter: "contrast(1.08) saturate(1.15) brightness(1.03)"
            }}
          />
          <div className="absolute inset-0 bg-gradient-to-t from-luxury-brown/20 via-transparent to-transparent"></div>

        </div>

        <CardContent className="p-8">
          <div className="mb-4">
            <h3 className="text-xl luxury-subheading text-luxury-brown hover:text-luxury-gold transition-colors duration-300 leading-tight">
              {property.name}
            </h3>
            <p className="text-luxury-bronze text-sm mt-2 luxury-serif">{property.location}</p>
          </div>

          <p className="luxury-text mb-6 line-clamp-3 leading-relaxed">
            {property.description.split('.')[0]}.
          </p>

          <div className="flex items-center gap-6 text-sm luxury-text mb-6 py-4 border-t border-b border-luxury-gold/20">
            <div className="flex items-center">
              <Bed className="w-4 h-4 mr-2 text-luxury-gold" />
              <span className="font-medium">{property.bedrooms} Bedroom{property.bedrooms > 1 ? 's' : ''}</span>
            </div>
            <div className="flex items-center">
              <Bath className="w-4 h-4 mr-2 text-luxury-gold" />
              <span className="font-medium">{property.bathrooms} Bath</span>
            </div>
            <div className="flex items-center">
              <Users className="w-4 h-4 mr-2 text-luxury-gold" />
              <span className="font-medium">{property.maxGuests} Guests</span>
            </div>
          </div>

          <div className="flex items-center justify-end">
            <Link href={`/properties/${property.id}`}>
              <Button className="luxury-button group">
                <span className="group-hover:translate-x-1 transition-transform duration-300">View Details</span>
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};

export default PropertyCard;
