import { Mail } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import logoPath from "@assets/ChatGPT Image May 29, 2025, 05_54_20 PM.png";

const Footer = () => {
  return (
    <footer className="luxury-bg border-t border-luxury-gold/20 mt-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Company Info */}
          <div className="space-y-3">
            <div className="flex items-center">
              <img 
                src={logoPath} 
                alt="Arabian Coast Holiday Homes" 
                className="h-20 md:h-28 lg:h-32 w-auto object-contain transition-all duration-500 hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(60, 47, 31, 0.15))',
                  opacity: '0.98'
                }}
              />
            </div>
          </div>



          {/* Contact */}
          <div>
            <h3 className="text-lg luxury-subheading mb-3 text-black font-semibold">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-center space-x-3">
                <FaWhatsapp className="h-5 w-5 text-luxury-gold" />
                <span className="text-base text-black font-medium">+971 4 123 4567</span>
              </li>
              <li className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-luxury-gold" />
                <span className="text-base text-black font-medium">info@arabiancoastholidayhomes.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-luxury-beige/30 mt-6 pt-4 text-center">
          <p className="text-sm text-black font-medium">
            &copy; 2024 Arabian Coast Holiday Homes. All rights reserved. |{" "}
            <a href="#" className="hover:text-luxury-gold transition-colors text-black">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-luxury-gold transition-colors text-black">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
