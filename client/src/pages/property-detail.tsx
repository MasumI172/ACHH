import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { 
  Star, 
  Users, 
  Bed, 
  Bath, 
  MapPin, 
  Wifi, 
  Car, 
  Utensils,
  ArrowLeft,
  Calendar,
  CheckCircle
} from "lucide-react";
import type { Property } from "@shared/schema";

const PropertyDetail = () => {
  const { id } = useParams();
  const propertyId = parseInt(id || "0");

  const { data: property, isLoading, error } = useQuery<Property>({
    queryKey: [`/api/properties/${propertyId}`],
    enabled: !!propertyId,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="animate-pulse">
            <div className="bg-gray-300 h-96 rounded-2xl mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="bg-gray-300 h-8 rounded w-1/2"></div>
                <div className="bg-gray-300 h-4 rounded"></div>
                <div className="bg-gray-300 h-4 rounded w-3/4"></div>
              </div>
              <div className="bg-gray-300 h-64 rounded-xl"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !property) {
    return (
      <div className="min-h-screen pt-20 flex items-center justify-center">
        <Card className="max-w-md mx-4">
          <CardContent className="pt-6 text-center">
            <h1 className="text-2xl font-bold text-gray-900 mb-4">Property Not Found</h1>
            <p className="text-gray-600 mb-6">
              The property you're looking for doesn't exist or may have been removed.
            </p>
            <Link href="/properties">
              <Button className="bg-gold-500 text-white hover:bg-gold-600">
                Browse Properties
              </Button>
            </Link>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen pt-20">
      {/* Back Button */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <Link href="/properties">
          <Button variant="ghost" className="mb-4 hover:text-gold-500">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Properties
          </Button>
        </Link>
      </div>

      {/* Image Gallery */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="mb-8"
        >
          <Carousel className="w-full">
            <CarouselContent>
              {property.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative h-96 md:h-[500px] rounded-2xl overflow-hidden">
                    <img
                      src={image}
                      alt={`${property.name} - Image ${index + 1}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious className="left-4" />
            <CarouselNext className="right-4" />
          </Carousel>
        </motion.div>
      </section>

      {/* Property Details */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <div className="flex items-start justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {property.name}
                </h1>
                <div className="flex items-center text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-1" />
                  {property.location}
                </div>
              </div>
              <div className="flex items-center">
                <Badge className="bg-gold-500 text-white hover:bg-gold-600">
                  <Star className="w-3 h-3 mr-1 fill-current" />
                  {property.rating}
                </Badge>
              </div>
            </div>

            <div className="flex items-center gap-6 text-gray-600 mb-6">
              <div className="flex items-center">
                <Bed className="w-5 h-5 mr-2" />
                {property.bedrooms} Bedrooms
              </div>
              <div className="flex items-center">
                <Bath className="w-5 h-5 mr-2" />
                {property.bathrooms} Bathrooms
              </div>
              <div className="flex items-center">
                <Users className="w-5 h-5 mr-2" />
                Up to {property.maxGuests} Guests
              </div>
            </div>

            <div className="prose max-w-none mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Description</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                {property.description}
              </p>
            </div>

            <div className="mb-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Amenities</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                {property.amenities.map((amenity, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="w-5 h-5 text-gold-500 mr-3" />
                    <span className="text-gray-700">{amenity}</span>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Booking Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="lg:col-span-1"
          >
            <Card className="sticky top-24 shadow-lg border-0">
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <div className="text-2xl font-bold text-luxury-gold mb-1">
                    Contact for Pricing
                  </div>
                  <div className="text-luxury-light-brown">Exclusive rates available</div>
                </div>

                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-3">
                    <div className="border rounded-lg p-3">
                      <label className="text-sm text-gray-600">Check-in</label>
                      <div className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">Select date</span>
                      </div>
                    </div>
                    <div className="border rounded-lg p-3">
                      <label className="text-sm text-gray-600">Check-out</label>
                      <div className="flex items-center mt-1">
                        <Calendar className="w-4 h-4 text-gray-400 mr-2" />
                        <span className="text-sm">Select date</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="border rounded-lg p-3">
                    <label className="text-sm text-gray-600">Guests</label>
                    <div className="flex items-center mt-1">
                      <Users className="w-4 h-4 text-gray-400 mr-2" />
                      <span className="text-sm">1 guest</span>
                    </div>
                  </div>
                </div>

                <Link href="/contact">
                  <Button className="w-full bg-gold-500 text-white hover:bg-gold-600 transition-colors duration-200 text-lg py-6">
                    Book Now
                  </Button>
                </Link>

                <div className="text-center mt-4">
                  <p className="text-sm text-gray-600">
                    Free cancellation • No booking fees
                  </p>
                </div>

                <div className="border-t pt-4 mt-6">
                  <div className="text-center">
                    <p className="text-luxury-light-brown text-sm">
                      Premium rates • Flexible booking • No hidden fees
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default PropertyDetail;
