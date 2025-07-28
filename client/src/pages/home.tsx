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
  CheckCircle,
  CalendarIcon,
  Users
} from "lucide-react";
import { DayPicker } from "react-day-picker";
import { format } from "date-fns";
import type { Property } from "@shared/schema";

const Home = () => {
  const [checkInDate, setCheckInDate] = useState<Date | undefined>();
  const [checkOutDate, setCheckOutDate] = useState<Date | undefined>();
  const [showCalendar, setShowCalendar] = useState<'checkin' | 'checkout' | null>(null);
  const [guests, setGuests] = useState<number>(2);
  
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
        checkIn: format(checkInDate, 'yyyy-MM-dd'),
        checkOut: format(checkOutDate, 'yyyy-MM-dd')
      });
      window.location.href = `/properties?${searchParams.toString()}`;
    } else {
      // Navigate to properties page without filters
      window.location.href = '/properties';
    }
  };

  // Handle date selection logic
  const handleDateSelect = (date: Date | undefined) => {
    if (showCalendar === 'checkin') {
      setCheckInDate(date);
      if (date && checkOutDate && date >= checkOutDate) {
        setCheckOutDate(undefined);
      }
      setShowCalendar(null);
    } else if (showCalendar === 'checkout') {
      setCheckOutDate(date);
      setShowCalendar(null);
    }
  };

  const disabledDays = [
    { before: new Date() }, // Disable past dates
  ];

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
      <Hero />

      {/* Date Selection Section */}
      <section className="luxury-section luxury-bg py-6">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-center mb-6"
          >
            <h2 className="text-3xl md:text-4xl luxury-heading text-luxury-brown mb-4">
              Your home away from <span className="luxury-accent italic luxury-serif">home</span>
            </h2>
            <p className="text-lg luxury-text max-w-2xl mx-auto leading-relaxed luxury-serif">
              Select your dates to discover available luxury properties
            </p>
          </motion.div>
          
          {/* Premium Date Selection Card */}
          <Card className="luxury-shadow border-0 luxury-card overflow-hidden max-w-5xl mx-auto">
            <div className="bg-gradient-to-br from-luxury-gold/5 to-luxury-cream/20 p-1">
              <div className="bg-white rounded-lg">
                <CardContent className="p-6 lg:p-8">
                  
                  {/* Date Selection Grid */}
                  <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
                    
                    {/* Check-in Date */}
                    <div className="relative">
                      <button
                        onClick={() => setShowCalendar(showCalendar === 'checkin' ? null : 'checkin')}
                        className="group relative w-full border-2 border-luxury-cream rounded-xl p-5 text-left hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all duration-300 luxury-shadow-sm"
                      >
                        <label className="text-sm text-luxury-bronze font-medium uppercase tracking-wide">Check-in Date</label>
                        <div className="flex items-center mt-3">
                          <div className="w-12 h-12 bg-luxury-gold/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-300">
                            <CalendarIcon className="w-6 h-6 text-luxury-gold group-hover:text-white" />
                          </div>
                          <span className="text-luxury-brown font-semibold text-lg">
                            {checkInDate ? format(checkInDate, 'EEEE, MMMM d, yyyy') : 'Select your arrival date'}
                          </span>
                        </div>
                      </button>

                      {/* Check-in Calendar */}
                      {showCalendar === 'checkin' && (
                        <div className="absolute top-full left-0 right-0 mt-3 border-2 border-luxury-gold/20 rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-luxury-cream/20 to-white luxury-shadow-lg z-50">
                          <div className="mb-4 flex items-center">
                            <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center mr-3">
                              <CalendarIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-luxury-brown text-lg luxury-serif">Select Check-in Date</h3>
                            </div>
                          </div>
                          
                          <div className="calendar-wrapper overflow-hidden">
                            <DayPicker
                              mode="single"
                              selected={checkInDate}
                              onSelect={handleDateSelect}
                              disabled={disabledDays}
                              className="luxury-calendar w-full"
                              weekStartsOn={0}
                              fixedWeeks={true}
                              showOutsideDays={true}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Check-out Date */}
                    <div className="relative">
                      <button
                        onClick={() => setShowCalendar(showCalendar === 'checkout' ? null : 'checkout')}
                        className="group relative w-full border-2 border-luxury-cream rounded-xl p-5 text-left hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all duration-300 luxury-shadow-sm disabled:opacity-50 disabled:hover:border-luxury-cream disabled:hover:bg-transparent"
                        disabled={!checkInDate}
                      >
                        <label className="text-sm text-luxury-bronze font-medium uppercase tracking-wide">Check-out Date</label>
                        <div className="flex items-center mt-3">
                          <div className="w-12 h-12 bg-luxury-gold/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-300">
                            <CalendarIcon className="w-6 h-6 text-luxury-gold group-hover:text-white" />
                          </div>
                          <span className="text-luxury-brown font-semibold text-lg">
                            {checkOutDate ? format(checkOutDate, 'EEEE, MMMM d, yyyy') : 'Select your departure date'}
                          </span>
                        </div>
                      </button>

                      {/* Check-out Calendar */}
                      {showCalendar === 'checkout' && checkInDate && (
                        <div className="absolute top-full left-0 right-0 mt-3 border-2 border-luxury-gold/20 rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-luxury-cream/20 to-white luxury-shadow-lg z-50">
                          <div className="mb-4 flex items-center">
                            <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center mr-3">
                              <CalendarIcon className="w-4 h-4 text-white" />
                            </div>
                            <div>
                              <h3 className="font-semibold text-luxury-brown text-lg luxury-serif">Select Check-out Date</h3>
                            </div>
                          </div>
                          
                          <div className="calendar-wrapper overflow-hidden">
                            <DayPicker
                              mode="single"
                              selected={checkOutDate}
                              onSelect={handleDateSelect}
                              disabled={[
                                { before: new Date() },
                                { before: checkInDate }
                              ]}
                              className="luxury-calendar w-full"
                              weekStartsOn={0}
                              fixedWeeks={true}
                              showOutsideDays={true}
                              defaultMonth={checkInDate}
                              fromMonth={checkInDate}
                            />
                          </div>
                        </div>
                      )}
                    </div>

                    {/* Guests Selection */}
                    <div className="border-2 border-luxury-cream rounded-xl p-5 luxury-shadow-sm">
                      <label className="text-sm text-luxury-bronze font-medium uppercase tracking-wide">Guests</label>
                      <div className="flex items-center mt-3">
                        <div className="w-12 h-12 bg-luxury-gold/10 rounded-lg flex items-center justify-center mr-4">
                          <Users className="w-6 h-6 text-luxury-gold" />
                        </div>
                        <div className="flex items-center justify-between flex-1">
                          <span className="text-luxury-brown font-semibold text-lg">
                            {guests} guest{guests > 1 ? 's' : ''}
                          </span>
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setGuests(Math.max(1, guests - 1))}
                              disabled={guests <= 1}
                              className="h-10 w-10 p-0 border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white font-bold text-lg transition-all duration-300 rounded-xl"
                            >
                              −
                            </Button>
                            <Button
                              variant="outline"
                              size="sm"
                              onClick={() => setGuests(Math.min(10, guests + 1))}
                              disabled={guests >= 10}
                              className="h-10 w-10 p-0 border-2 border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white font-bold text-lg transition-all duration-300 rounded-xl"
                            >
                              +
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Search Button */}
                  <div className="pt-4 border-t-2 border-luxury-gold/10">
                    <Button 
                      onClick={handleSearch}
                      className="w-full luxury-button text-lg py-4 px-8 bg-gradient-to-r from-luxury-gold to-luxury-gold/80 hover:from-luxury-gold/80 hover:to-luxury-gold transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold uppercase tracking-wide"
                    >
                      Search Properties
                    </Button>
                  </div>
                  
                </CardContent>
              </div>
            </div>
          </Card>
        </div>
      </section>

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
