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
    { href: "/services", label: "Services" },
  ];

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      className={`fixed w-full top-0 z-50 transition-all duration-300 ${
        isScrolled ? "luxury-nav shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex items-center cursor-pointer group">
              <div className={`text-2xl luxury-heading transition-colors ${
                isScrolled ? "text-luxury-brown" : "text-white"
              }`}>
                Arabian<span className="font-light"> Coast</span>
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <span
                  className={`text-sm font-medium transition-colors duration-200 hover:text-luxury-gold cursor-pointer ${
                    location === item.href
                      ? "text-luxury-gold"
                      : isScrolled
                      ? "text-luxury-brown"
                      : "text-white"
                  }`}
                >
                  {item.label}
                </span>
              </Link>
            ))}
            <Link href="/contact">
              <Button className="luxury-button">
                Get in Touch
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
