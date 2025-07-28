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
    <section className="relative py-20 luxury-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center space-y-8 max-w-4xl mx-auto">
          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="space-y-4"
          >
            <h1 className="text-4xl md:text-5xl font-serif text-gray-900">
              Your home away from <span className="text-gold-600 italic">home</span>
            </h1>
            <p className="text-gray-600 text-lg">
              Select your dates to discover available luxury properties
            </p>
          </motion.div>

          {/* Search Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="bg-white rounded-xl p-6 shadow-lg max-w-2xl mx-auto"
          >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="checkIn" className="text-sm font-medium text-gray-700">
                  Check-in
                </Label>
                <Input
                  id="checkIn"
                  type="date"
                  value={checkInDate}
                  onChange={(e) => onCheckInChange(e.target.value)}
                  className="h-12"
                  min={new Date().toISOString().split('T')[0]}
                  placeholder="dd/mm/yyyy"
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="checkOut" className="text-sm font-medium text-gray-700">
                  Check-out
                </Label>
                <Input
                  id="checkOut"
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => onCheckOutChange(e.target.value)}
                  className="h-12"
                  min={checkInDate || new Date().toISOString().split('T')[0]}
                  placeholder="dd/mm/yyyy"
                />
              </div>
              
              <div className="flex items-end">
                <Button 
                  onClick={onSearch}
                  className="w-full h-12 bg-gold-600 hover:bg-gold-700 text-white font-medium rounded-lg"
                >
                  SEARCH PROPERTIES
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
