import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronDown, Play } from "lucide-react";


const Hero = () => {
  const scrollToProperties = () => {
    const element = document.getElementById("featured-properties");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative h-32 luxury-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-32 flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl">
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




          </motion.div>

        </div>
      </div>


    </section>
  );
};

export default Hero;
