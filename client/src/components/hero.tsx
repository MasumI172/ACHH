import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Link } from "wouter";
import { ChevronDown, Play, Search } from "lucide-react";


interface HeroProps {
  checkInDate: string;
  checkOutDate: string;
  onCheckInChange: (date: string) => void;
  onCheckOutChange: (date: string) => void;
  onSearch: () => void;
}

const Hero = ({ checkInDate, checkOutDate, onCheckInChange, onCheckOutChange, onSearch }: HeroProps) => {
  const scrollToProperties = () => {
    const element = document.getElementById("featured-properties");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-[60vh] luxury-bg flex items-center">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Luxury Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 tracking-tight">
                Arabian Coast
                <span className="block text-gold-600">Holiday Homes</span>
              </h1>
              
              <p className="text-xl md:text-2xl text-gray-700 font-light max-w-3xl mx-auto">
                Your home away from home
              </p>
            </div>

            {/* Search Form */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="bg-white/90 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-xl max-w-4xl mx-auto"
            >
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
                <div className="space-y-2">
                  <Label htmlFor="checkIn" className="text-sm font-medium text-gray-700">
                    Check-in Date
                  </Label>
                  <Input
                    id="checkIn"
                    type="date"
                    value={checkInDate}
                    onChange={(e) => onCheckInChange(e.target.value)}
                    className="h-12 text-base"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="checkOut" className="text-sm font-medium text-gray-700">
                    Check-out Date
                  </Label>
                  <Input
                    id="checkOut"
                    type="date"
                    value={checkOutDate}
                    onChange={(e) => onCheckOutChange(e.target.value)}
                    className="h-12 text-base"
                    min={checkInDate || new Date().toISOString().split('T')[0]}
                  />
                </div>
                
                <div className="flex items-end">
                  <Button 
                    onClick={onSearch}
                    className="w-full h-12 luxury-button text-base font-medium"
                  >
                    <Search className="w-5 h-5 mr-2" />
                    Search Properties
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
