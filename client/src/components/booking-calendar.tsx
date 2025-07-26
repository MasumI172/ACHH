import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Calendar as CalendarIcon, Users } from "lucide-react";

// Add TypeScript declarations for Calendly
declare global {
  interface Window {
    Calendly: {
      initPopupWidget: (options: {
        url: string;
        text: string;
        color: string;
        textColor: string;
        branding: boolean;
      }) => void;
    };
  }
}

interface BookingCalendarProps {
  propertyId: number;
  maxGuests: number;
  calendlyUrl?: string; // Optional Calendly URL, can be set per property
}

const BookingCalendar = ({ propertyId, maxGuests, calendlyUrl }: BookingCalendarProps) => {
  const [guests, setGuests] = useState(1);
  const [isCalendlyLoaded, setIsCalendlyLoaded] = useState(false);

  // Default Calendly URL - replace with your actual Calendly link
  const defaultCalendlyUrl = calendlyUrl || "https://calendly.com/your-username/property-booking";

  useEffect(() => {
    // Load Calendly widget script if not already loaded
    const existingScript = document.querySelector('script[src="https://assets.calendly.com/assets/external/widget.js"]');
    
    if (!existingScript) {
      const script = document.createElement('script');
      script.src = 'https://assets.calendly.com/assets/external/widget.js';
      script.async = true;
      script.onload = () => {
        setIsCalendlyLoaded(true);
        // Initialize the inline widget after script loads
        if ((window as any).Calendly) {
          (window as any).Calendly.initInlineWidget({
            url: `${defaultCalendlyUrl}?embed_domain=${window.location.hostname}&embed_type=Inline&hide_gdpr_banner=1&primary_color=D4AF37`,
            parentElement: document.querySelector('.calendly-inline-widget'),
            prefill: {},
            utm: {}
          });
        }
      };
      document.head.appendChild(script);
    } else {
      setIsCalendlyLoaded(true);
      // If script already exists, initialize the widget
      setTimeout(() => {
        if ((window as any).Calendly) {
          (window as any).Calendly.initInlineWidget({
            url: `${defaultCalendlyUrl}?embed_domain=${window.location.hostname}&embed_type=Inline&hide_gdpr_banner=1&primary_color=D4AF37`,
            parentElement: document.querySelector('.calendly-inline-widget'),
            prefill: {},
            utm: {}
          });
        }
      }, 100);
    }
  }, [defaultCalendlyUrl]);

  const openCalendlyPopup = () => {
    if ((window as any).Calendly && isCalendlyLoaded) {
      (window as any).Calendly.initPopupWidget({
        url: `${defaultCalendlyUrl}?guests=${guests}&property=${propertyId}`,
        text: 'Book Your Stay',
        color: '#D4AF37', // luxury-gold color
        textColor: '#FFFFFF',
        branding: true
      });
    } else {
      // Fallback: open in new tab
      window.open(`${defaultCalendlyUrl}?guests=${guests}&property=${propertyId}`, '_blank');
    }
  };

  return (
    <Card className="sticky top-24 shadow-lg border-0 luxury-card">
      <CardContent className="p-6">
        <div className="text-center mb-6">
          <div className="text-2xl font-bold text-luxury-gold mb-1">
            Book Your Stay
          </div>
          <div className="text-luxury-light-brown">Real-time availability via Hostex</div>
        </div>

        {/* Embedded Calendly Calendar */}
        <div className="mb-6 bg-white rounded-xl border border-luxury-gold/30 p-2">
          <div 
            className="calendly-inline-widget" 
            data-url={`${defaultCalendlyUrl}?embed_domain=${window.location.hostname}&embed_type=Inline&hide_gdpr_banner=1&primary_color=D4AF37`}
            style={{ 
              minWidth: '100%', 
              height: '500px',
              borderRadius: '8px',
              overflow: 'hidden'
            }}
          />
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

        {/* Alternative Booking Button */}
        <Button 
          onClick={openCalendlyPopup}
          className="w-full luxury-button text-lg py-6 mb-4"
        >
          <CalendarIcon className="w-5 h-5 mr-2" />
          Open Booking Calendar
        </Button>

        <div className="text-center mb-4">
          <p className="text-sm text-luxury-light-brown">
            Synced with Hostex • Real-time availability
          </p>
        </div>

        <div className="border-t border-luxury-gold/20 pt-4">
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