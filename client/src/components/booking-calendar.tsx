import { useState } from "react";
import { DayPicker } from "react-day-picker";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Calendar as CalendarIcon, Users, ExternalLink } from "lucide-react";

interface BookingCalendarProps {
  propertyId: number;
  maxGuests: number;
}

const BookingCalendar = ({ propertyId, maxGuests }: BookingCalendarProps) => {
  const [checkIn, setCheckIn] = useState<Date>();
  const [checkOut, setCheckOut] = useState<Date>();
  const [guests, setGuests] = useState(1);
  const [showCalendar, setShowCalendar] = useState<'checkin' | 'checkout' | null>(null);

  // Hostex integration - you'll need to replace with actual Hostex property ID
  const hostexPropertyId = `hostex_${propertyId}`;
  const hostexBookingUrl = `https://app.hostex.com/booking/${hostexPropertyId}`;

  const handleDateSelect = (date: Date | undefined) => {
    if (!date) return;

    if (showCalendar === 'checkin') {
      setCheckIn(date);
      setCheckOut(undefined); // Reset checkout when checkin changes
      setShowCalendar('checkout');
    } else if (showCalendar === 'checkout') {
      if (checkIn && date > checkIn) {
        setCheckOut(date);
        setShowCalendar(null);
      }
    }
  };

  const handleHostexBooking = () => {
    // Redirect to Hostex booking page with selected dates if available
    let url = hostexBookingUrl;
    
    if (checkIn) {
      url += `?checkin=${format(checkIn, 'yyyy-MM-dd')}`;
      if (checkOut) {
        url += `&checkout=${format(checkOut, 'yyyy-MM-dd')}`;
      }
      if (guests > 1) {
        url += `&guests=${guests}`;
      }
    }
    
    window.open(url, '_blank');
  };

  const disabledDays = {
    before: new Date(), // Disable past dates
  };

  return (
    <Card className="sticky top-24 shadow-lg border-0 luxury-card">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-luxury-gold mb-1">
            Check Availability
          </div>
          <div className="text-luxury-light-brown">Real-time availability via Hostex</div>
        </div>

        <div className="space-y-4 mb-6">
          {/* Date Selection */}
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
              <div className="mb-3">
                <Badge variant="outline" className="text-luxury-bronze">
                  {showCalendar === 'checkin' ? 'Select Check-in Date' : 'Select Check-out Date'}
                </Badge>
              </div>
              <DayPicker
                mode="single"
                selected={showCalendar === 'checkin' ? checkIn : checkOut}
                onSelect={handleDateSelect}
                disabled={disabledDays}
                className="rounded-md border-0"
              />
            </div>
          )}
          
          {/* Guests Selection */}
          <div className="border rounded-lg p-3">
            <label className="text-sm text-gray-600">Guests</label>
            <div className="flex items-center justify-between mt-1">
              <div className="flex items-center">
                <Users className="w-4 h-4 text-gray-400 mr-2" />
                <span className="text-sm">{guests} guest{guests > 1 ? 's' : ''}</span>
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGuests(Math.max(1, guests - 1))}
                  disabled={guests <= 1}
                  className="h-8 w-8 p-0"
                >
                  -
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setGuests(Math.min(maxGuests, guests + 1))}
                  disabled={guests >= maxGuests}
                  className="h-8 w-8 p-0"
                >
                  +
                </Button>
              </div>
            </div>
          </div>
        </div>

        {/* Booking Button */}
        <Button 
          onClick={handleHostexBooking}
          className="w-full luxury-button text-lg py-6 mb-4"
        >
          <ExternalLink className="w-4 h-4 mr-2" />
          Check Availability & Book
        </Button>

        <div className="text-center mb-4">
          <p className="text-sm text-gray-600">
            Powered by Hostex • Real-time availability
          </p>
        </div>

        <div className="border-t pt-4">
          <div className="text-center">
            <p className="text-luxury-light-brown text-sm">
              Instant booking • Secure payment • Free cancellation
            </p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default BookingCalendar;