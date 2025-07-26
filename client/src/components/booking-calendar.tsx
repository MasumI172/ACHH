import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { DayPicker } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar as CalendarIcon, Users, ExternalLink } from "lucide-react";
import { format, parseISO, isWithinInterval, startOfDay, endOfDay } from "date-fns";

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
}

const BookingCalendar = ({ propertyId, maxGuests }: BookingCalendarProps) => {
  const [guests, setGuests] = useState(1);
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [showCalendar, setShowCalendar] = useState<'checkin' | 'checkout' | null>(null);

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

  const disabledDays = [
    { before: new Date() }, // Disable past dates
    // Disable booked dates
    ...(availabilityData?.bookings?.map(booking => ({
      from: parseISO(booking.start),
      to: parseISO(booking.end)
    })) || [])
  ];

  const handleBookingInquiry = () => {
    const checkInStr = checkIn ? format(checkIn, 'yyyy-MM-dd') : '';
    const checkOutStr = checkOut ? format(checkOut, 'yyyy-MM-dd') : '';
    
    // Redirect to contact page with booking details
    const params = new URLSearchParams({
      propertyId: propertyId.toString(),
      guests: guests.toString(),
      ...(checkInStr && { checkIn: checkInStr }),
      ...(checkOutStr && { checkOut: checkOutStr })
    });
    
    window.location.href = `/contact?${params.toString()}`;
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
    <Card className="sticky top-24 shadow-lg border-0 luxury-card">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-luxury-gold mb-1">
            Check Availability
          </div>
          <div className="text-luxury-light-brown">Real-time sync with Hostex calendar</div>
          {availabilityData && (
            <div className="text-xs text-luxury-light-brown mt-1 space-y-1">
              <div className="flex items-center justify-between">
                <span>Last updated: {format(parseISO(availabilityData.lastUpdated), 'MMM d, h:mm a')}</span>
                <button 
                  onClick={() => refetch()}
                  className="text-luxury-gold hover:text-luxury-bronze text-xs underline"
                >
                  Refresh
                </button>
              </div>
              <div>Current bookings: {availabilityData.bookings?.length || 0}</div>
              {(availabilityData as any).debug && (
                <div className="text-xs text-orange-600">
                  Note: If dates show incorrectly, the iCal feed may need time to update from Hostex changes
                </div>
              )}
            </div>
          )}
        </div>

        {/* Date Selection */}
        <div className="space-y-4 mb-6">
          <div className="grid grid-cols-2 gap-3">
            <button
              onClick={() => setShowCalendar(showCalendar === 'checkin' ? null : 'checkin')}
              className="border rounded-lg p-3 text-left hover:border-luxury-gold transition-colors"
            >
              <label className="text-sm text-gray-600">Check-in</label>
              <div className="flex items-center mt-1">
                <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm">
                  {checkIn ? format(checkIn, 'MMM d, yyyy') : 'Select date'}
                </span>
              </div>
            </button>
            
            <button
              onClick={() => setShowCalendar(showCalendar === 'checkout' ? null : 'checkout')}
              className="border rounded-lg p-3 text-left hover:border-luxury-gold transition-colors"
              disabled={!checkIn}
            >
              <label className="text-sm text-gray-600">Check-out</label>
              <div className="flex items-center mt-1">
                <CalendarIcon className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm">
                  {checkOut ? format(checkOut, 'MMM d, yyyy') : 'Select date'}
                </span>
              </div>
            </button>
          </div>

          {/* Calendar */}
          {showCalendar && (
            <div className="border rounded-lg p-4 bg-luxury-cream/30">
              <div className="mb-3 flex items-center justify-between">
                <Badge variant="outline" className="text-luxury-bronze">
                  {showCalendar === 'checkin' ? 'Select Check-in Date' : 'Select Check-out Date'}
                </Badge>
                <div className="text-xs text-luxury-light-brown">
                  {availabilityData?.bookings?.length || 0} booking(s) found
                </div>
              </div>
              <DayPicker
                mode="single"
                selected={showCalendar === 'checkin' ? checkIn : checkOut}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                className="rounded-md border-0"
                modifiers={{
                  booked: (date) => isDateBooked(date)
                }}
                modifiersClassNames={{
                  booked: 'rdp-day_booked'
                }}
              />
              <div className="mt-3 space-y-1 text-xs">
                <div className="flex items-center text-luxury-light-brown">
                  <span className="inline-block w-3 h-3 bg-green-500 rounded mr-2"></span>
                  Green = Available for booking
                </div>
                <div className="flex items-center text-luxury-light-brown">
                  <span className="inline-block w-3 h-3 bg-red-500 rounded mr-2"></span>
                  Red = Already booked (unavailable)
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Guests Selection */}
        <div className="border rounded-lg p-4 mb-6 bg-luxury-cream/20">
          <label className="text-sm text-luxury-bronze font-medium mb-3 block">Number of Guests</label>
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Users className="w-5 h-5 text-luxury-gold mr-3" />
              <span className="text-lg font-medium text-luxury-brown">
                {guests} guest{guests > 1 ? 's' : ''}
              </span>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGuests(Math.max(1, guests - 1))}
                disabled={guests <= 1}
                className="h-9 w-9 p-0 border-luxury-gold text-luxury-bronze hover:bg-luxury-gold hover:text-white"
              >
                -
              </Button>
              <Button
                variant="outline"
                size="sm"
                onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                disabled={guests >= maxGuests}
                className="h-9 w-9 p-0 border-luxury-gold text-luxury-bronze hover:bg-luxury-gold hover:text-white"
              >
                +
              </Button>
            </div>
          </div>
          <div className="text-xs text-luxury-light-brown mt-2">
            Maximum {maxGuests} guests allowed
          </div>
        </div>

        {/* Booking Button */}
        <Button 
          onClick={handleBookingInquiry}
          disabled={!checkIn || !checkOut}
          className="w-full luxury-button text-lg py-6 mb-4 disabled:opacity-50"
        >
          <ExternalLink className="w-5 h-5 mr-2" />
          {checkIn && checkOut ? 'Send Booking Inquiry' : 'Select Dates to Continue'}
        </Button>

        <div className="text-center mb-4">
          <p className="text-sm text-luxury-light-brown">
            Synced with Hostex • Real-time availability
          </p>
        </div>

        <div className="border-t border-luxury-gold/20 pt-4">
          <div className="text-center">
            <p className="text-luxury-light-brown text-sm">
              Contact us for pricing • Flexible booking • Free cancellation
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;