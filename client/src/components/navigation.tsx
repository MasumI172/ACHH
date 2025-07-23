import { useState, useEffect } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu } from "lucide-react";
import { motion } from "framer-motion";
import logoPath from "@assets/ChatGPT Image May 29, 2025, 05_54_20 PM.png";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navItems = [
    { href: "/", label: "Home" },
    { href: "/properties", label: "Properties" },
    { href: "/about", label: "About" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "luxury-nav shadow-lg py-3" : "bg-transparent py-6"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Left Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.slice(0, 2).map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm font-medium transition-all duration-300 hover:text-luxury-gold cursor-pointer uppercase tracking-wider luxury-serif relative ${
                    location === item.href
                      ? "text-luxury-gold after:w-full"
                      : isScrolled
                      ? "text-luxury-brown"
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
                  src={logoPath} 
                  alt="Arabian Coast Holiday Homes" 
                  className="h-16 md:h-20 lg:h-24 w-auto object-contain transition-all duration-500 hover:scale-105"
                style={{
                  filter: 'drop-shadow(0 2px 8px rgba(60, 47, 31, 0.15))',
                  opacity: '0.98'
                }}
                />
              </div>
            </Link>
          </div>

          {/* Right Navigation */}
          <div className="hidden md:flex items-center space-x-12">
            {navItems.slice(2).map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm font-medium transition-all duration-300 hover:text-luxury-gold cursor-pointer uppercase tracking-wider luxury-serif relative ${
                    location === item.href
                      ? "text-luxury-gold after:w-full"
                      : isScrolled
                      ? "text-luxury-brown"
                      : "text-luxury-brown"
                  } after:content-[''] after:absolute after:bottom-[-4px] after:left-0 after:h-[1px] after:bg-luxury-gold after:transition-all after:duration-300 ${
                    location === item.href ? "after:w-full" : "after:w-0 hover:after:w-full"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button className="luxury-button">
                Private Inquiry
              </Button>
            </Link>
          </div>

          {/* Mobile Menu */}
          <div className="md:hidden">
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className={`${
                    isScrolled ? "text-luxury-brown" : "text-white"
                  } hover:text-luxury-gold`}
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
    </motion.nav>
  );
};

export default Navigation;
