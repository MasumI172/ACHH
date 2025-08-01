import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Filter, MapPin, CheckCircle, Lightbulb, Calendar } from "lucide-react";
import { format, addDays, differenceInDays, parseISO } from "date-fns";
import type { Property } from "@shared/schema";

const Properties = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [checkInDate, setCheckInDate] = useState<string>("");
  const [checkOutDate, setCheckOutDate] = useState<string>("");
  const [alternativeDates, setAlternativeDates] = useState<{checkIn: string, checkOut: string, properties: Property[]}[]>([]);
  const [showingAlternatives, setShowingAlternatives] = useState(false);
  const [isSearchingAlternatives, setIsSearchingAlternatives] = useState(false);

  // Check for URL parameters on component mount
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkIn = urlParams.get('checkIn');
    const checkOut = urlParams.get('checkOut');
    
    // Validate dates are not in the past and check-out is after check-in
    const today = new Date().toISOString().split('T')[0];
    
    if (checkIn && checkIn >= today) {
      setCheckInDate(checkIn);
    }
    if (checkOut && checkOut >= today && checkIn && checkOut > checkIn) {
      setCheckOutDate(checkOut);
    }
  }, []);

  // Build query with date filtering if dates are present
  const queryParams = new URLSearchParams();
  if (checkInDate) queryParams.append('checkIn', checkInDate);
  if (checkOutDate) queryParams.append('checkOut', checkOutDate);
  const queryString = queryParams.toString();

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties", queryString],
    queryFn: async () => {
      const url = `/api/properties${queryString ? `?${queryString}` : ''}`;
      const response = await fetch(url);
      if (!response.ok) throw new Error('Failed to fetch properties');
      return response.json();
    },
  });

  const categories = [
    { value: "all", label: "All Properties" },
    { value: "apartment", label: "Apartment" },
  ];



  const filteredProperties = properties?.filter((property) => {
    const matchesCategory = selectedCategory === "all" || property.category === selectedCategory;
    return matchesCategory;
  });

  // Function to find alternative available dates
  const findAlternativeDates = async (requestedCheckIn: string, requestedCheckOut: string) => {
    if (!requestedCheckIn || !requestedCheckOut) return [];
    
    const requestedNights = differenceInDays(new Date(requestedCheckOut), new Date(requestedCheckIn));
    const alternatives: {checkIn: string, checkOut: string, properties: Property[]}[] = [];
    const today = new Date();
    
    // Create array of potential dates to check (sample every 2-3 days for speed)
    const datesToCheck: string[][] = [];
    for (let i = 1; i < 60 && datesToCheck.length < 20; i += 2) { // Check every 2 days, limit to 20 checks
      const potentialCheckIn = addDays(today, i);
      const potentialCheckOut = addDays(potentialCheckIn, requestedNights);
      
      const checkInStr = potentialCheckIn.toISOString().split('T')[0];
      const checkOutStr = potentialCheckOut.toISOString().split('T')[0];
      
      // Skip if this is the same as the requested dates
      if (checkInStr === requestedCheckIn && checkOutStr === requestedCheckOut) {
        continue;
      }
      
      datesToCheck.push([checkInStr, checkOutStr]);
    }
    
    // Use Promise.all to check multiple dates simultaneously
    try {
      const promises = datesToCheck.map(async ([checkInStr, checkOutStr]) => {
        try {
          const url = `/api/properties?checkIn=${checkInStr}&checkOut=${checkOutStr}`;
          const response = await fetch(url);
          if (response.ok) {
            const availableProperties = await response.json();
            if (availableProperties && availableProperties.length > 0) {
              return {
                checkIn: checkInStr,
                checkOut: checkOutStr,
                properties: availableProperties
              };
            }
          }
          return null;
        } catch (error) {
          console.log('Error checking date:', checkInStr, error);
          return null;
        }
      });
      
      const results = await Promise.all(promises);
      
      // Filter out null results and take first 5
      const validAlternatives = results.filter(result => result !== null);
      return validAlternatives.slice(0, 5);
      
    } catch (error) {
      console.log('Error in parallel date checking:', error);
      return [];
    }
  };

  // Manual alternative search function
  const searchForAlternatives = async () => {
    if (isSearchingAlternatives || !checkInDate || !checkOutDate) return;
    
    setIsSearchingAlternatives(true);
    setShowingAlternatives(true);
    setAlternativeDates([]);
    
    console.log('Searching for alternatives...', checkInDate, checkOutDate);
    
    try {
      const alternatives = await findAlternativeDates(checkInDate, checkOutDate);
      console.log('Found alternatives:', alternatives);
      setAlternativeDates(alternatives);
      setShowingAlternatives(alternatives.length > 0);
    } catch (error) {
      console.log('Error finding alternatives:', error);
      setAlternativeDates([]);
      setShowingAlternatives(false);
    } finally {
      setIsSearchingAlternatives(false);
    }
  };

  const handleAlternativeDateSelect = (alternative: {checkIn: string, checkOut: string, properties: Property[]}) => {
    // Clear alternatives first to prevent re-triggering
    setAlternativeDates([]);
    setShowingAlternatives(false);
    
    // Update dates
    setCheckInDate(alternative.checkIn);
    setCheckOutDate(alternative.checkOut);
    
    // Update URL params
    const newUrl = new URL(window.location.href);
    newUrl.searchParams.set('checkIn', alternative.checkIn);
    newUrl.searchParams.set('checkOut', alternative.checkOut);
    window.history.replaceState({}, '', newUrl.toString());
  };

  return (
    <div className="min-h-screen pt-24">
      {/* Header */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our <span className="text-gold-500">Properties</span>
            </h1>
            {checkInDate && checkOutDate ? (
              <div className="space-y-4">
                {filteredProperties && filteredProperties.length > 0 ? (
                  <>
                    <div className="inline-flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      Available {new Date(checkInDate).toLocaleDateString('en-GB')} - {new Date(checkOutDate).toLocaleDateString('en-GB')}
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                      Showing properties available for your selected dates
                    </p>
                  </>
                ) : !isLoading ? (
                  <>
                    <div className="inline-flex items-center gap-2 bg-red-100 text-red-700 px-4 py-2 rounded-full text-sm font-medium">
                      <CheckCircle className="w-4 h-4" />
                      No availability {new Date(checkInDate).toLocaleDateString('en-GB')} - {new Date(checkOutDate).toLocaleDateString('en-GB')}
                    </div>
                    <p className="text-lg text-gray-600 max-w-2xl mx-auto mb-4">
                      No properties available for your selected dates
                    </p>
                  </>
                ) : null}
                
                {/* Date Selection for changing dates */}
                <div className="bg-white rounded-xl shadow-lg p-4 max-w-2xl mx-auto">
                  <p className="text-sm font-medium text-gray-700 mb-3 text-center">Change your dates</p>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3 items-end">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input 
                        type="date" 
                        value={checkInDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const newCheckIn = e.target.value;
                          setCheckInDate(newCheckIn);
                          
                          // If check-out is before or equal to new check-in, clear it
                          if (checkOutDate && checkOutDate <= newCheckIn) {
                            setCheckOutDate("");
                          }
                          
                          // Update URL params
                          const newUrl = new URL(window.location.href);
                          newUrl.searchParams.set('checkIn', newCheckIn);
                          if (checkOutDate && checkOutDate > newCheckIn) {
                            newUrl.searchParams.set('checkOut', checkOutDate);
                          } else {
                            newUrl.searchParams.delete('checkOut');
                          }
                          window.history.replaceState({}, '', newUrl.toString());
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input 
                        type="date" 
                        value={checkOutDate}
                        min={checkInDate ? new Date(new Date(checkInDate).getTime() + 24*60*60*1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          setCheckOutDate(e.target.value);
                          // Update URL params
                          const newUrl = new URL(window.location.href);
                          if (checkInDate) newUrl.searchParams.set('checkIn', checkInDate);
                          newUrl.searchParams.set('checkOut', e.target.value);
                          window.history.replaceState({}, '', newUrl.toString());
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                    <Button 
                      onClick={() => {
                        // Clear dates and remove from URL
                        setCheckInDate("");
                        setCheckOutDate("");
                        const newUrl = new URL(window.location.href);
                        newUrl.searchParams.delete('checkIn');
                        newUrl.searchParams.delete('checkOut');
                        window.history.replaceState({}, '', newUrl.toString());
                      }}
                      variant="outline"
                      className="text-sm"
                    >
                      Clear Dates
                    </Button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                  Discover our complete collection of luxury holiday homes
                </p>
                
                {/* Date Selection for initial search */}
                <div className="bg-white rounded-xl shadow-lg p-4 max-w-2xl mx-auto">
                  <p className="text-sm font-medium text-gray-700 mb-3 text-center">Select dates to check availability</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-in</label>
                      <input 
                        type="date" 
                        value={checkInDate}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          const newCheckIn = e.target.value;
                          setCheckInDate(newCheckIn);
                          
                          // If check-out is before or equal to new check-in, clear it
                          if (checkOutDate && checkOutDate <= newCheckIn) {
                            setCheckOutDate("");
                          }
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Check-out</label>
                      <input 
                        type="date" 
                        value={checkOutDate}
                        min={checkInDate ? new Date(new Date(checkInDate).getTime() + 24*60*60*1000).toISOString().split('T')[0] : new Date().toISOString().split('T')[0]}
                        onChange={(e) => {
                          setCheckOutDate(e.target.value);
                          
                          // Auto-trigger availability search when both dates are selected
                          if (checkInDate && e.target.value) {
                            const newUrl = new URL(window.location.href);
                            newUrl.searchParams.set('checkIn', checkInDate);
                            newUrl.searchParams.set('checkOut', e.target.value);
                            window.history.replaceState({}, '', newUrl.toString());
                          }
                        }}
                        className="w-full px-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gold-500"
                      />
                    </div>

                  </div>
                </div>
              </div>
            )}
          </motion.div>
        </div>
      </section>

      {/* Alternative Dates Section */}
      {showingAlternatives && (
        <section className="py-6 bg-gradient-to-br from-amber-50 to-orange-50">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-xl shadow-lg p-6 border-2 border-amber-200"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-amber-500 rounded-full flex items-center justify-center mr-4">
                  <Lightbulb className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-800">Alternative Available Dates</h3>
                  <p className="text-amber-700">
                    {alternativeDates.length === 0 && isSearchingAlternatives
                      ? "Searching for available alternatives..." 
                      : alternativeDates.length === 0
                      ? "Click 'Find Alternative Dates' to search for available options"
                      : "Your selected dates aren't available. Here are some great alternatives:"
                    }
                  </p>
                </div>
              </div>
              
              {alternativeDates.length === 0 && isSearchingAlternatives ? (
                /* Loading State - only show when actively searching */
                <div className="text-center py-8">
                  <div className="inline-flex items-center gap-3 text-amber-700">
                    <div className="w-6 h-6 border-2 border-amber-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="text-lg font-medium">Finding the best available dates...</span>
                  </div>
                  <p className="text-amber-600 text-sm mt-2">This will take just a moment</p>
                </div>
              ) : alternativeDates.length === 0 ? (
                /* No results yet - show message to click button */
                <div className="text-center py-8">
                  <p className="text-amber-700 text-lg">Click "Find Alternative Dates" to search for available options</p>
                </div>
              ) : (
                /* Results */
                <>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {alternativeDates.map((alternative, index) => (
                  <div 
                    key={index}
                    onClick={() => handleAlternativeDateSelect(alternative)}
                    className="cursor-pointer p-6 bg-white border-2 border-amber-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 shadow-sm group"
                  >
                    <div className="mb-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-sm text-amber-700 font-medium">Option {index + 1}</div>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200 text-xs">
                          {alternative.properties.length} {alternative.properties.length === 1 ? 'Property' : 'Properties'} available
                        </Badge>
                      </div>
                      <div className="space-y-2 mb-4">
                        <div className="text-luxury-brown font-semibold">
                          📅 Check-in: {format(new Date(alternative.checkIn), 'EEE, MMM d, yyyy')}
                        </div>
                        <div className="text-luxury-brown font-semibold">
                          📅 Check-out: {format(new Date(alternative.checkOut), 'EEE, MMM d, yyyy')}
                        </div>
                        <div className="text-amber-700 text-sm">
                          {differenceInDays(new Date(alternative.checkOut), new Date(alternative.checkIn))} night{differenceInDays(new Date(alternative.checkOut), new Date(alternative.checkIn)) !== 1 ? 's' : ''}
                        </div>
                      </div>
                      
                      {/* Available Properties */}
                      <div className="mb-4">
                        <h4 className="text-sm font-medium text-gray-700 mb-2">Available Properties:</h4>
                        <div className="space-y-2">
                          {alternative.properties.slice(0, 2).map((property) => (
                            <div 
                              key={property.id} 
                              className="flex items-center gap-3 p-2 bg-gray-50 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
                              onClick={(e) => {
                                e.stopPropagation();
                                window.location.href = `/property/${property.id}?checkIn=${alternative.checkIn}&checkOut=${alternative.checkOut}`;
                              }}
                            >
                              <div className="w-12 h-12 bg-luxury-gold/10 rounded-lg flex items-center justify-center">
                                <span className="text-luxury-gold text-xs font-bold">
                                  {property.name.split(' ').map(w => w[0]).join('').slice(0, 2)}
                                </span>
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="text-sm font-medium text-gray-900 truncate">
                                  {property.name}
                                </div>
                                <div className="text-xs text-gray-500">
                                  {property.category} • {property.maxGuests} guests
                                </div>
                              </div>
                            </div>
                          ))}
                          {alternative.properties.length > 2 && (
                            <div className="text-xs text-gray-500 text-center">
                              +{alternative.properties.length - 2} more properties
                            </div>
                          )}
                        </div>
                      </div>
                      
                      <Button 
                        size="sm" 
                        className="bg-amber-500 hover:bg-amber-600 text-white border-0 w-full group-hover:scale-105 transition-transform duration-300"
                        onClick={(e) => {
                          e.stopPropagation();
                          // Navigate to the first property with the alternative dates
                          const propertyId = alternative.properties[0]?.id;
                          if (propertyId) {
                            window.location.href = `/property/${propertyId}?checkIn=${alternative.checkIn}&checkOut=${alternative.checkOut}`;
                          }
                        }}
                      >
                        View {alternative.properties.length} {alternative.properties.length === 1 ? 'Property' : 'Properties'}
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="p-4 bg-amber-100 rounded-lg border border-amber-300">
                <p className="text-amber-800 text-sm text-center">
                  💡 <strong>Tip:</strong> Click on any alternative date option to automatically update your search and see available properties.
                </p>
              </div>
              </>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* Filters */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 items-center"
          >
            <div className="flex gap-4 items-center justify-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>


            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
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
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-4"
              >
                <p className="text-gray-600">
                  Showing {filteredProperties.length} of {properties?.length || 0} properties
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property, index) => (
                  <PropertyCard 
                    key={property.id} 
                    property={property} 
                    index={index}
                    showAvailability={checkInDate && checkOutDate ? true : false}
                    isAvailable={true} // For now, assume available if dates are selected - can be enhanced with real availability data
                    checkInDate={checkInDate}
                    checkOutDate={checkOutDate}
                  />
                ))}
              </div>
            </>
          ) : !showingAlternatives ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto p-8">
                <CardContent className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or browse all properties.
                  </p>
                  {checkInDate && checkOutDate && (
                    <div className="mt-4">
                      <Button 
                        onClick={searchForAlternatives}
                        disabled={isSearchingAlternatives}
                        className="bg-amber-500 hover:bg-amber-600 text-white mr-2"
                      >
                        {isSearchingAlternatives ? 'Searching...' : 'Find Alternative Dates'}
                      </Button>
                    </div>
                  )}

                  <Button
                    onClick={() => {
                      setSelectedCategory("all");
                    }}
                    className="bg-gold-500 text-white hover:bg-gold-600"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          ) : null}
        </div>
      </section>
    </div>
  );
};

export default Properties;
