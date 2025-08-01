import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DayPicker } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Users, ExternalLink, Lightbulb } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { format, parseISO, isWithinInterval, startOfDay, endOfDay, addDays, differenceInDays } from "date-fns";

interface Booking {
  id: string;
  summary: string;
  start: string;
  end: string;
  status: string;
}

interface AvailabilityData {
  propertyId: number;
  lastUpdated: string;
  bookings: Booking[];
}

interface BookingCalendarProps {
  propertyId: number;
  maxGuests: number;
  propertyName: string;
}

const BookingCalendar = ({ propertyId, maxGuests, propertyName }: BookingCalendarProps) => {
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [showCalendar, setShowCalendar] = useState<'checkin' | 'checkout' | null>(null);
  const [alternativeDates, setAlternativeDates] = useState<{checkIn: Date, checkOut: Date}[]>([]);

  // Check for URL parameters on component mount to pre-fill dates
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const checkInParam = urlParams.get('checkIn');
    const checkOutParam = urlParams.get('checkOut');
    
    if (checkInParam && checkOutParam) {
      try {
        const checkInDate = new Date(checkInParam);
        const checkOutDate = new Date(checkOutParam);
        
        // Validate dates are not in the past and check-out is after check-in
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (checkInDate >= today && checkOutDate > checkInDate) {
          setCheckIn(checkInDate);
          setCheckOut(checkOutDate);
        }
      } catch (error) {
        console.log('Error parsing URL dates:', error);
      }
    }
  }, []);

  // Fetch availability data from Hostex iCal
  const { data: availabilityData, isLoading: isLoadingAvailability, refetch } = useQuery<AvailabilityData>({
    queryKey: [`/api/properties/${propertyId}/availability`],
    refetchInterval: 2 * 60 * 1000, // Refetch every 2 minutes (more frequent)
    staleTime: 30 * 1000, // Consider data stale after 30 seconds
  });

  // Create function to check if a date is booked
  const isDateBooked = (date: Date) => {
    if (!availabilityData?.bookings) return false;
    
    const dayStart = startOfDay(date);
    const dayEnd = endOfDay(date);
    
    return availabilityData.bookings.some(booking => {
      const bookingStart = parseISO(booking.start);
      const bookingEnd = parseISO(booking.end);
      
      return isWithinInterval(dayStart, { start: bookingStart, end: bookingEnd }) ||
             isWithinInterval(dayEnd, { start: bookingStart, end: bookingEnd }) ||
             isWithinInterval(bookingStart, { start: dayStart, end: dayEnd });
    });
  };

  const handleDateSelect = (date: Date | undefined) => {
    if (!date || isDateBooked(date)) return;

    if (showCalendar === 'checkin') {
      setCheckIn(date);
      setCheckOut(undefined); // Reset checkout when checkin changes
      setShowCalendar('checkout');
    } else if (showCalendar === 'checkout') {
      if (checkIn && date > checkIn) {
        // Check if any dates between checkin and checkout are booked
        const daysBetween = [];
        let currentDate = new Date(checkIn);
        while (currentDate <= date) {
          if (isDateBooked(currentDate)) {
            // Can't book this range as there's a booking in between
            return;
          }
          daysBetween.push(new Date(currentDate));
          currentDate.setDate(currentDate.getDate() + 1);
        }
        setCheckOut(date);
        setShowCalendar(null);
      }
    }
  };

  // Create function to check if a checkout date is valid
  const isValidCheckoutDate = (date: Date) => {
    if (!checkIn || date <= checkIn) return false;
    if (isDateBooked(date)) return false;
    
    // Check if any dates between checkin and this potential checkout are booked
    let currentDate = new Date(checkIn);
    currentDate.setDate(currentDate.getDate() + 1); // Start day after checkin
    
    while (currentDate < date) {
      if (isDateBooked(currentDate)) {
        return false; // There's a booking in between
      }
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return true;
  };

  const disabledDays = [
    { before: new Date() }, // Disable past dates
    // Disable booked dates
    ...(availabilityData?.bookings?.map(booking => ({
      from: parseISO(booking.start),
      to: parseISO(booking.end)
    })) || [])
  ];

  // Create smarter disabled days for checkout calendar  
  const checkoutDisabledDays = checkIn ? [
    { before: new Date() }, // Disable past dates
    { before: checkIn }, // Disable dates before checkin
    // For checkout, disable any date that would create an invalid booking range
    (date: Date) => !isValidCheckoutDate(date)
  ] : disabledDays;

  // Function to find alternative available dates
  const findAlternativeDates = (requestedCheckIn: Date, requestedCheckOut: Date) => {
    if (!availabilityData?.bookings) return [];
    
    const requestedNights = differenceInDays(requestedCheckOut, requestedCheckIn);
    const alternatives: {checkIn: Date, checkOut: Date}[] = [];
    const today = new Date();
    
    // Search for alternative dates within the next 3 months
    for (let i = 0; i < 90 && alternatives.length < 5; i++) {
      const potentialCheckIn = addDays(today, i);
      const potentialCheckOut = addDays(potentialCheckIn, requestedNights);
      
      // Check if this date range is available
      let isRangeAvailable = true;
      let currentDate = new Date(potentialCheckIn);
      
      while (currentDate <= potentialCheckOut && isRangeAvailable) {
        if (isDateBooked(currentDate)) {
          isRangeAvailable = false;
        }
        currentDate = addDays(currentDate, 1);
      }
      
      if (isRangeAvailable) {
        alternatives.push({
          checkIn: potentialCheckIn,
          checkOut: potentialCheckOut
        });
      }
    }
    
    return alternatives;
  };

  // Check for conflicts when both dates are selected
  useEffect(() => {
    if (checkIn && checkOut) {
      // Check if the selected range has any conflicts
      let hasConflict = false;
      let currentDate = new Date(checkIn);
      
      while (currentDate <= checkOut) {
        if (isDateBooked(currentDate)) {
          hasConflict = true;
          break;
        }
        currentDate = addDays(currentDate, 1);
      }
      
      if (hasConflict) {
        // Find alternative dates
        const alternatives = findAlternativeDates(checkIn, checkOut);
        setAlternativeDates(alternatives);
      } else {
        setAlternativeDates([]);
      }
    }
  }, [checkIn, checkOut, availabilityData]);

  const handleAlternativeDateSelect = (alternative: {checkIn: Date, checkOut: Date}) => {
    setCheckIn(alternative.checkIn);
    setCheckOut(alternative.checkOut);
    setAlternativeDates([]);
    setShowCalendar(null);
  };

  const handleBookingInquiry = () => {
    if (!checkIn || !checkOut) return;
    
    // Create WhatsApp message with booking details
    const checkInDate = format(checkIn, 'EEEE, MMMM d, yyyy');
    const checkOutDate = format(checkOut, 'EEEE, MMMM d, yyyy');
    
    const message = `Hello! I would like to book ${propertyName} for the following dates:

📅 Check-in: ${checkInDate}
📅 Check-out: ${checkOutDate}
👥 Guests: ${guests}

Thanks!`;
    
    // WhatsApp API URL
    const whatsappNumber = "971558166062"; // +971 55 816 6062 without + and spaces
    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${whatsappNumber}?text=${encodedMessage}`;
    
    // Open WhatsApp in same window
    window.location.href = whatsappUrl;
  };

  if (isLoadingAvailability) {
    return (
      <Card className="sticky top-24 shadow-lg border-0 luxury-card">
        <CardContent className="p-6">
          <div className="text-center">
            <div className="text-2xl font-bold text-luxury-gold mb-1">
              Loading Availability...
            </div>
            <div className="text-luxury-light-brown">Fetching real-time data from Hostex</div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="sticky top-24 luxury-shadow border-0 luxury-card overflow-hidden">
      <div className="bg-gradient-to-br from-luxury-gold/5 to-luxury-cream/20 p-1">
        <div className="bg-white rounded-lg">
          <CardContent className="p-4 sm:p-6 lg:p-8">


            {/* Date Selection */}
            <div className="space-y-4 mb-8">
              {/* Check-in Date */}
              <div>
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
                      {checkIn ? format(checkIn, 'EEEE, MMMM d, yyyy') : 'Select your arrival date'}
                    </span>
                  </div>
                </button>

                {/* Check-in Calendar - appears directly below */}
                {showCalendar === 'checkin' && (
                  <div className="mt-3 border-2 border-luxury-gold/20 rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-luxury-cream/20 to-white luxury-shadow-sm">
                    <div className="mb-4 flex items-center">
                      <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center mr-3">
                        <CalendarIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-luxury-brown text-lg luxury-serif">Select Check-in Date</h3>
                      </div>
                    </div>
                    
                    <div className="calendar-wrapper mb-4 overflow-hidden">
                      <DayPicker
                        mode="single"
                        selected={checkIn}
                        onSelect={handleDateSelect}
                        disabled={disabledDays}
                        className="luxury-calendar w-full"
                        modifiers={{
                          booked: (date) => isDateBooked(date)
                        }}
                        modifiersClassNames={{
                          booked: 'rdp-day_booked'
                        }}
                        weekStartsOn={0}
                        fixedWeeks={true}
                        showOutsideDays={true}
                      />
                    </div>
                    
                    <div className="p-4 bg-white rounded-xl border border-luxury-gold/10">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center text-luxury-brown">
                          <span className="inline-block w-4 h-4 bg-green-500 rounded mr-3"></span>
                          <span className="font-medium">Available for booking</span>
                        </div>
                        <div className="flex items-center text-luxury-brown">
                          <span className="inline-block w-4 h-4 bg-red-500 rounded mr-3"></span>
                          <span className="font-medium">Already booked (unavailable)</span>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
              
              {/* Check-out Date */}
              <div>
                <button
                  onClick={() => setShowCalendar(showCalendar === 'checkout' ? null : 'checkout')}
                  className="group relative w-full border-2 border-luxury-cream rounded-xl p-5 text-left hover:border-luxury-gold hover:bg-luxury-gold/5 transition-all duration-300 luxury-shadow-sm disabled:opacity-50 disabled:hover:border-luxury-cream disabled:hover:bg-transparent"
                  disabled={!checkIn}
                >
                  <label className="text-sm text-luxury-bronze font-medium uppercase tracking-wide">Check-out Date</label>
                  <div className="flex items-center mt-3">
                    <div className="w-12 h-12 bg-luxury-gold/10 rounded-lg flex items-center justify-center mr-4 group-hover:bg-luxury-gold group-hover:text-white transition-all duration-300">
                      <CalendarIcon className="w-6 h-6 text-luxury-gold group-hover:text-white" />
                    </div>
                    <span className="text-luxury-brown font-semibold text-lg">
                      {checkOut ? format(checkOut, 'EEEE, MMMM d, yyyy') : 'Select your departure date'}
                    </span>
                  </div>
                </button>

                {/* Check-out Calendar - appears directly below */}
                {showCalendar === 'checkout' && (
                  <div className="mt-3 border-2 border-luxury-gold/20 rounded-2xl p-4 sm:p-6 bg-gradient-to-br from-luxury-cream/20 to-white luxury-shadow-sm">
                    <div className="mb-4 flex items-center">
                      <div className="w-8 h-8 bg-luxury-gold rounded-full flex items-center justify-center mr-3">
                        <CalendarIcon className="w-4 h-4 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-luxury-brown text-lg luxury-serif">Select Check-out Date</h3>
                      </div>
                    </div>
                    
                    <div className="calendar-wrapper mb-4 overflow-hidden">
                      <DayPicker
                        mode="single"
                        selected={checkOut}
                        onSelect={handleDateSelect}
                        disabled={checkoutDisabledDays}
                        className="luxury-calendar w-full"
                        modifiers={{
                          booked: (date) => isDateBooked(date)
                        }}
                        modifiersClassNames={{
                          booked: 'rdp-day_booked'
                        }}
                        weekStartsOn={0}
                        fixedWeeks={true}
                        showOutsideDays={true}
                        defaultMonth={checkIn || new Date()}
                        fromMonth={checkIn || new Date()}
                      />
                    </div>
                    
                    <div className="p-4 bg-white rounded-xl border border-luxury-gold/10">
                      <div className="grid grid-cols-1 gap-2 text-sm">
                        <div className="flex items-center text-luxury-brown">
                          <span className="inline-block w-4 h-4 bg-green-500 rounded mr-3"></span>
                          <span className="font-medium">Available for booking</span>
                        </div>
                        <div className="flex items-center text-luxury-brown">
                          <span className="inline-block w-4 h-4 bg-red-500 rounded mr-3"></span>
                          <span className="font-medium">Already booked (unavailable)</span>
                        </div>

                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Alternative Dates Section */}
            {alternativeDates.length > 0 && (
              <div className="mb-8 p-6 bg-gradient-to-br from-amber-50 to-orange-50 border-2 border-amber-200 rounded-xl">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 bg-amber-500 rounded-full flex items-center justify-center mr-3">
                    <Lightbulb className="w-5 h-5 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-amber-800 text-lg">Alternative Available Dates</h3>
                    <p className="text-amber-700 text-sm">Your selected dates have conflicts. Here are some available alternatives:</p>
                  </div>
                </div>
                
                <div className="space-y-3">
                  {alternativeDates.map((alternative, index) => (
                    <div 
                      key={index}
                      onClick={() => handleAlternativeDateSelect(alternative)}
                      className="cursor-pointer p-4 bg-white border-2 border-amber-200 rounded-xl hover:border-amber-400 hover:bg-amber-50 transition-all duration-300 luxury-shadow-sm group"
                    >
                      <div className="flex items-center justify-between">
                        <div>
                          <div className="flex items-center gap-4 mb-2">
                            <div className="text-sm text-amber-700 font-medium">Option {index + 1}</div>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 border-green-200">
                              Available
                            </Badge>
                          </div>
                          <div className="space-y-1">
                            <div className="text-luxury-brown font-semibold">
                              📅 Check-in: {format(alternative.checkIn, 'EEEE, MMMM d, yyyy')}
                            </div>
                            <div className="text-luxury-brown font-semibold">
                              📅 Check-out: {format(alternative.checkOut, 'EEEE, MMMM d, yyyy')}
                            </div>
                            <div className="text-amber-700 text-sm">
                              {differenceInDays(alternative.checkOut, alternative.checkIn)} night{differenceInDays(alternative.checkOut, alternative.checkIn) !== 1 ? 's' : ''}
                            </div>
                          </div>
                        </div>
                        <div className="group-hover:scale-110 transition-transform duration-300">
                          <Button 
                            size="sm" 
                            className="bg-amber-500 hover:bg-amber-600 text-white border-0"
                          >
                            Select
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                
                <div className="mt-4 p-3 bg-amber-100 rounded-lg border border-amber-300">
                  <p className="text-amber-800 text-sm">
                    💡 <strong>Tip:</strong> Click on any alternative date to automatically select it for your booking.
                  </p>
                </div>
              </div>
            )}

            {/* Guests Selection */}
            <div className={`border-2 rounded-xl p-6 mb-8 luxury-shadow-sm transition-all duration-300 ${
              !checkIn || !checkOut 
                ? 'border-gray-200 bg-gray-50 opacity-60' 
                : 'border-luxury-cream bg-gradient-to-r from-luxury-cream/20 to-luxury-gold/5'
            }`}>
              <div className="flex items-center mb-4">
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center mr-3 transition-all duration-300 ${
                  !checkIn || !checkOut 
                    ? 'bg-gray-200' 
                    : 'bg-luxury-gold/10'
                }`}>
                  <Users className={`w-5 h-5 transition-all duration-300 ${
                    !checkIn || !checkOut 
                      ? 'text-gray-400' 
                      : 'text-luxury-gold'
                  }`} />
                </div>
                <div>
                  <label className={`text-sm font-medium uppercase tracking-wide block transition-all duration-300 ${
                    !checkIn || !checkOut 
                      ? 'text-gray-400' 
                      : 'text-luxury-bronze'
                  }`}>Number of Guests</label>
                  <p className={`text-xs transition-all duration-300 ${
                    !checkIn || !checkOut 
                      ? 'text-gray-400' 
                      : 'text-luxury-light-brown'
                  }`}>
                    {!checkIn || !checkOut 
                      ? 'Please select dates first' 
                      : `Maximum ${maxGuests} guests allowed`
                    }
                  </p>
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <span className={`text-2xl font-bold mr-2 transition-all duration-300 ${
                    !checkIn || !checkOut 
                      ? 'text-gray-400' 
                      : 'text-luxury-brown'
                  }`}>
                    {guests}
                  </span>
                  <span className={`font-medium transition-all duration-300 ${
                    !checkIn || !checkOut 
                      ? 'text-gray-400' 
                      : 'text-luxury-bronze'
                  }`}>
                    guest{guests > 1 ? 's' : ''}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuests(Math.max(1, guests - 1))}
                    disabled={!checkIn || !checkOut || guests <= 1}
                    className={`h-10 w-10 p-0 border-2 font-bold text-lg transition-all duration-300 rounded-xl ${
                      !checkIn || !checkOut 
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed hover:bg-transparent hover:text-gray-400' 
                        : 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white'
                    }`}
                  >
                    −
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                    disabled={!checkIn || !checkOut || guests >= maxGuests}
                    className={`h-10 w-10 p-0 border-2 font-bold text-lg transition-all duration-300 rounded-xl ${
                      !checkIn || !checkOut 
                        ? 'border-gray-300 text-gray-400 cursor-not-allowed hover:bg-transparent hover:text-gray-400' 
                        : 'border-luxury-gold text-luxury-gold hover:bg-luxury-gold hover:text-white'
                    }`}
                  >
                    +
                  </Button>
                </div>
              </div>
            </div>

            {/* Clear Dates Button */}
            {(checkIn || checkOut) && (
              <div className="mb-4">
                <Button
                  onClick={() => {
                    setCheckIn(undefined);
                    setCheckOut(undefined);
                    setShowCalendar(null);
                  }}
                  variant="outline"
                  className="w-full border-2 border-luxury-bronze/30 text-luxury-bronze hover:bg-luxury-bronze hover:text-white transition-all duration-300 rounded-xl py-3"
                >
                  Clear Dates
                </Button>
              </div>
            )}

            {/* Booking Button */}
            <div className="pt-4 border-t-2 border-luxury-gold/10">
              <Button 
                onClick={handleBookingInquiry}
                disabled={!checkIn || !checkOut}
                className="w-full luxury-button text-base py-4 px-4 disabled:opacity-50 bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 transition-all duration-500 shadow-xl hover:shadow-2xl transform hover:-translate-y-1 font-semibold"
              >
                <FaWhatsapp className="w-4 h-4 mr-2 flex-shrink-0" />
                <span className="truncate">
                  {checkIn && checkOut ? 'Send booking inquiry' : 'SELECT DATES'}
                </span>
              </Button>
              
              {/* Response Time Message */}
              {checkIn && checkOut && (
                <div className="mt-3 text-center">
                  <p className="text-sm text-luxury-bronze font-medium">
                    We typically respond within a few minutes.
                  </p>
                </div>
              )}
            </div>
            
          </CardContent>
        </div>
      </div>
    </Card>
  );
};

export default BookingCalendar;