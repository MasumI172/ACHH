import { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, Instagram } from "lucide-react";

const Navigation = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About" },
    { href: "/guidebook", label: "Guidebook" },
    { href: "/reviews", label: "Reviews" },
    { href: "/contact", label: "Contact" }
  ];

  return (
    <nav className="fixed w-full top-0 bg-white shadow-md border-b border-gray-100 py-4 lg:py-6 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between min-h-[80px]">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navItems.slice(0, 3).map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm font-medium transition-all duration-300 hover:text-luxury-gold cursor-pointer uppercase tracking-wider luxury-serif relative whitespace-nowrap ${
                    location === item.href
                      ? "text-luxury-gold after:w-full"
                      : "text-luxury-brown"
                  } after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-luxury-gold after:transition-all after:duration-300 ${
                    location === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
          </div>

          {/* Centered Logo */}
          <div className="absolute left-1/2 transform -translate-x-1/2">
            <Link href="/">
              <div className="flex items-center cursor-pointer group">
                <img 
                  src="/arabian-coast-black-logo.png"
                  alt="Arabian Coast Holiday Homes"
                  className="h-24 md:h-32 lg:h-36 w-auto transition-all duration-500 hover:scale-105"
                  style={{
                    filter: 'drop-shadow(0 2px 8px rgba(60, 47, 31, 0.15))',
                    maxWidth: '280px',
                    objectFit: 'contain'
                  }}
                />
              </div>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-8 lg:space-x-12">
            {navItems.slice(3).map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm font-medium transition-all duration-300 hover:text-luxury-gold cursor-pointer uppercase tracking-wider luxury-serif relative whitespace-nowrap ${
                    location === item.href
                      ? "text-luxury-gold after:w-full"
                      : "text-luxury-brown"
                  } after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-luxury-gold after:transition-all after:duration-300 ${
                    location === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <a href="https://www.instagram.com/arabiancoastholidayhomes/profilecard/?igsh=dDdpYXk1Nzhnc254" target="_blank" rel="noopener noreferrer" className="text-luxury-bronze hover:text-luxury-gold transition-all duration-300 hover:scale-110 ml-4">
              <Instagram className="h-5 w-5" />
            </a>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-luxury-brown hover:text-luxury-gold"
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <span
                        className={`text-lg font-medium transition-colors duration-200 hover:text-luxury-gold cursor-pointer ${
                          location === item.href ? "text-luxury-gold" : "text-luxury-brown"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </span>
                    </Link>
                  ))}
                  <a href="https://www.instagram.com/arabiancoastholidayhomes/profilecard/?igsh=dDdpYXk1Nzhnc254" target="_blank" rel="noopener noreferrer" className="text-luxury-bronze hover:text-luxury-gold transition-all duration-300 hover:scale-110 mb-4">
                    <Instagram className="h-6 w-6" />
                  </a>
                  <Link href="/contact">
                    <Button
                      className="luxury-button"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Get in Touch
                    </Button>
                  </Link>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;