import { ReviewsSection } from "@/components/reviews-section";
import { motion } from "framer-motion";

export default function Reviews() {
  return (
    <div className="min-h-screen pt-40 pb-16 luxury-bg">
      {/* Elegant background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="h-full w-full" style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23D4AF37' fill-opacity='0.3'%3E%3Cpath d='M30 30c11.046 0 20-8.954 20-20S41.046-10 30-10 10 1.046 10 20s8.954 10 20 10zM10 30c11.046 0 20-8.954 20-20S21.046-10 10-10-10 1.046-10 20s8.954 10 20 10z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
        }} />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Luxury Header Section */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-20 mt-8"
        >
          {/* Decorative element */}
          <div className="flex justify-center mb-6">
            <div className="w-24 h-px bg-gradient-to-r from-transparent via-luxury-gold to-transparent"></div>
            <div className="mx-4 w-2 h-2 bg-luxury-gold rounded-full"></div>
            <div className="w-24 h-px bg-gradient-to-r from-luxury-gold via-transparent to-transparent"></div>
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl luxury-heading text-luxury-brown mb-6 leading-tight px-4">
            What guests say about <span className="luxury-accent italic luxury-serif">us</span>
          </h1>
          
          <p className="text-xl luxury-text max-w-3xl mx-auto leading-relaxed luxury-serif">
            Discover why our guests choose Arabian Coast Holiday Homes for their luxury Dubai experience
          </p>

          {/* Decorative bottom element */}
          <div className="flex justify-center mt-8">
            <div className="w-16 h-px bg-gradient-to-r from-transparent via-luxury-dark-gold to-transparent"></div>
          </div>
        </motion.div>

        {/* Enhanced Reviews Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <ReviewsSection showTitle={false} />
        </motion.div>

        {/* Luxury Bottom Accent */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="text-center mt-20 pt-16 border-t border-luxury-gold/20"
        >
          <div className="flex justify-center items-center space-x-4">
            <div className="w-8 h-px bg-luxury-gold"></div>
            <div className="w-3 h-3 bg-luxury-gold rounded-full animate-pulse"></div>
            <div className="w-8 h-px bg-luxury-gold"></div>
          </div>
          <p className="mt-6 text-luxury-light-brown luxury-serif italic text-lg">
            Experience luxury beyond expectations
          </p>
        </motion.div>
      </div>
    </div>
  );
}
