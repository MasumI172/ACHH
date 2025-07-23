import { Home, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";
import logoPath from "@assets/ChatGPT Image May 29, 2025, 05_54_20 PM.png";

const Footer = () => {
  return (
    <footer className="bg-luxury-brown text-luxury-cream py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center">
              <div className="text-2xl luxury-heading text-luxury-cream">
                Arabian<span className="font-light"> Coast</span>
              </div>
            </div>
            <p className="text-luxury-beige leading-relaxed">
              Luxury holiday homes along the stunning Arabian coastline, offering
              unforgettable vacation experiences with premium amenities and
              exceptional service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-luxury-beige hover:text-luxury-gold transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-luxury-beige hover:text-luxury-gold transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-luxury-beige hover:text-luxury-gold transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-luxury-beige hover:text-luxury-gold transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h3 className="text-lg luxury-subheading mb-4 text-luxury-cream">Properties</h3>
            <ul className="space-y-2 text-luxury-beige">
              <li>
                <Link href="/properties">
                  <span className="hover:text-luxury-gold transition-colors duration-200 cursor-pointer">
                    Beachfront Villas
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <span className="hover:text-luxury-gold transition-colors duration-200 cursor-pointer">
                    Coastal Mansions
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <span className="hover:text-luxury-gold transition-colors duration-200 cursor-pointer">
                    Penthouse Suites
                  </span>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <span className="hover:text-luxury-gold transition-colors duration-200 cursor-pointer">
                    Desert Retreats
                  </span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg luxury-subheading mb-4 text-luxury-cream">Contact</h3>
            <ul className="space-y-3 text-luxury-beige">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-luxury-gold" />
                <span className="text-sm">
                  Marina District, Arabian Coast<br />
                  PO Box 12345, UAE
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-luxury-gold" />
                <span className="text-sm">+971 4 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-luxury-gold" />
                <span className="text-sm">info@arabiancoasthomes.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-luxury-gold" />
                <span className="text-sm">24/7 Support Available</span>
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
