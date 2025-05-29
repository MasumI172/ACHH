import { Home, Facebook, Instagram, Twitter, Linkedin, Mail, Phone, MapPin, Clock } from "lucide-react";
import { Link } from "wouter";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <img 
                src="/logo.png" 
                alt="Arabian Coast Holiday Homes" 
                className="h-16 w-auto"
              />
            </div>
            <p className="text-gray-400 leading-relaxed">
              Luxury holiday homes along the stunning Arabian coastline, offering
              unforgettable vacation experiences with premium amenities and
              exceptional service.
            </p>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-gray-400 hover:text-gold-500 transition-colors duration-200"
              >
                <Facebook className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold-500 transition-colors duration-200"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold-500 transition-colors duration-200"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-gold-500 transition-colors duration-200"
              >
                <Linkedin className="h-5 w-5" />
              </a>
            </div>
          </div>

          {/* Properties */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Properties</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/properties">
                  <a className="hover:text-gold-500 transition-colors duration-200">
                    Beachfront Villas
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <a className="hover:text-gold-500 transition-colors duration-200">
                    Coastal Mansions
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <a className="hover:text-gold-500 transition-colors duration-200">
                    Penthouse Suites
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/properties">
                  <a className="hover:text-gold-500 transition-colors duration-200">
                    Desert Retreats
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Services */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Services</h3>
            <ul className="space-y-2 text-gray-400">
              <li>
                <Link href="/services">
                  <a className="hover:text-gold-500 transition-colors duration-200">
                    Concierge Service
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-gold-500 transition-colors duration-200">
                    Luxury Transport
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-gold-500 transition-colors duration-200">
                    Private Chef
                  </a>
                </Link>
              </li>
              <li>
                <Link href="/services">
                  <a className="hover:text-gold-500 transition-colors duration-200">
                    Yacht Charters
                  </a>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-white">Contact</h3>
            <ul className="space-y-3 text-gray-400">
              <li className="flex items-start space-x-2">
                <MapPin className="h-4 w-4 mt-1 text-gold-500" />
                <span className="text-sm">
                  Marina District, Arabian Coast<br />
                  PO Box 12345, UAE
                </span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone className="h-4 w-4 text-gold-500" />
                <span className="text-sm">+971 4 123 4567</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail className="h-4 w-4 text-gold-500" />
                <span className="text-sm">info@arabiancoasthomes.com</span>
              </li>
              <li className="flex items-center space-x-2">
                <Clock className="h-4 w-4 text-gold-500" />
                <span className="text-sm">24/7 Support Available</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
          <p>
            &copy; 2024 Arabian Coast Holiday Homes. All rights reserved. |{" "}
            <a href="#" className="hover:text-gold-500 transition-colors">
              Privacy Policy
            </a>{" "}
            |{" "}
            <a href="#" className="hover:text-gold-500 transition-colors">
              Terms of Service
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
