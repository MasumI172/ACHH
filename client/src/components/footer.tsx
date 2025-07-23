import { Home, Instagram, Mail } from "lucide-react";
import { SiTiktok } from "react-icons/si";
import { FaWhatsapp } from "react-icons/fa";
import { Link } from "wouter";
import logoPath from "@assets/image_1753291044756.png";

const Footer = () => {
  return (
    <footer className="luxury-bg border-t border-luxury-gold/20 mt-20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16">
          {/* Company Info */}
          <div className="space-y-8">
            <div className="flex items-center">
              <img 
                src={logoPath} 
                alt="Arabian Coast Holiday Homes" 
                className="h-14 w-auto object-contain"
                style={{
                  filter: 'sepia(100%) saturate(80%) hue-rotate(15deg) brightness(0.4) contrast(1.2) drop-shadow(0 2px 8px rgba(60, 47, 31, 0.15))',
                  opacity: '0.98'
                }}
              />
            </div>
            <p className="luxury-text leading-relaxed max-w-md luxury-serif text-lg">
              Curating extraordinary experiences through our exclusive collection of luxury holiday homes 
              along the pristine Arabian coastline. Where unparalleled sophistication meets absolute tranquility.
            </p>
            <div className="flex space-x-6 pt-4">
              <a href="#" className="text-luxury-bronze hover:text-luxury-gold transition-all duration-300 hover:scale-110">
                <Instagram className="h-6 w-6" />
              </a>
              <a href="#" className="text-luxury-bronze hover:text-luxury-gold transition-all duration-300 hover:scale-110">
                <SiTiktok className="h-6 w-6" />
              </a>
            </div>
          </div>



          {/* Contact */}
          <div>
            <h3 className="text-lg luxury-subheading mb-4 text-luxury-cream">Contact</h3>
            <ul className="space-y-3 text-luxury-beige">
              <li className="flex items-center space-x-2">
                <FaWhatsapp className="h-4 w-4 text-luxury-gold" />
                <span className="text-sm">+971 4 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-luxury-gold" />
                <span className="text-sm">info@arabiancoasthomes.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-luxury-beige/30 mt-12 pt-8 text-center text-luxury-beige">
          <p>
            &copy; 2024 Arabian Coast Holiday Homes. All rights reserved. |{" "}
            <a href="#" className="hover:text-luxury-gold transition-colors">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-luxury-gold transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
