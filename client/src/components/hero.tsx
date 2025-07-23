import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Link } from "wouter";
import { ChevronDown, Play } from "lucide-react";
import logoPath from "@assets/image_1753289190698.png";

const Hero = () => {
  const scrollToProperties = () => {
    const element = document.getElementById("featured-properties");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen luxury-bg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-screen flex items-center justify-center">
        <div className="text-center space-y-8 max-w-4xl">
          {/* Luxury Content */}
          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1.2 }}
            className="space-y-8"
          >
            <div className="space-y-6">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.2 }}
                className="flex justify-center mb-8"
              >
                <img 
                  src={logoPath} 
                  alt="Arabian Coast Holiday Homes" 
                  className="h-32 md:h-40 lg:h-48 w-auto object-contain filter drop-shadow-2xl"
                  style={{ 
                    filter: 'drop-shadow(0 10px 20px rgba(60, 47, 31, 0.3))' 
                  }}
                />
              </motion.div>
              
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="text-sm uppercase tracking-[0.2em] text-luxury-light-brown font-medium"
              >
                O U R &nbsp; W O R K
              </motion.p>
              
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1.0, delay: 0.5 }}
                className="text-6xl md:text-7xl lg:text-8xl luxury-heading text-luxury-brown leading-tight"
              >
                Our <span className="luxury-accent">Portfolio</span>
              </motion.h1>
            </div>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.7 }}
              className="text-lg md:text-xl luxury-text max-w-3xl mx-auto leading-relaxed"
            >
              Discover our latest projects showcasing luxury holiday homes and sophisticated property
              experiences across the Arabian coastline
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.9 }}
              className="flex flex-col sm:flex-row gap-6 justify-center items-center mt-12"
            >
              <Link href="/properties">
                <Button className="luxury-button text-lg px-12 py-4">
                  View Our Portfolio
                </Button>
              </Link>
              
              <Link href="/about">
                <Button
                  variant="outline"
                  className="border-2 border-luxury-gold text-luxury-brown hover:bg-luxury-gold hover:text-luxury-brown transition-all duration-300 rounded-full px-12 py-4 text-lg"
                >
                  Learn More
                </Button>
              </Link>
            </motion.div>
          </motion.div>

        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-luxury-brown cursor-pointer"
        onClick={scrollToProperties}
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="flex flex-col items-center"
        >
          <span className="text-sm mb-2 opacity-75">Scroll to explore</span>
          <ChevronDown className="w-6 h-6" />
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Hero;
