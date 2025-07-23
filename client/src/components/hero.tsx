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
            <div className="space-y-4">

              

            </div>



            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.0, delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-8 justify-center items-center mt-16"
            >
              <Link href="/properties">
                <Button className="luxury-button text-base px-16 py-5 font-medium">
                  Explore Collection
                </Button>
              </Link>
              
              <Link href="/contact">
                <Button
                  variant="outline"
                  className="border-2 border-luxury-gold/50 text-luxury-brown hover:bg-luxury-gold hover:text-luxury-brown transition-all duration-500 rounded-full px-16 py-5 text-base font-medium luxury-glass backdrop-blur-lg"
                >
                  Private Consultation
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
