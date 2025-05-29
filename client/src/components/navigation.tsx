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
        isScrolled ? "nav-backdrop shadow-lg py-2" : "bg-transparent py-4"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          {/* Logo */}
          <Link href="/">
            <div className="flex flex-col items-start cursor-pointer group">
              <div className="text-2xl font-thin italic text-gold-500 mb-1 transition-opacity group-hover:opacity-80">
                a~c
              </div>
              <div className={`text-xl font-bold tracking-wider ${
                isScrolled ? "text-gray-700" : "text-white"
              }`}>
                ARABIAN COAST
              </div>
              <div className={`text-sm font-medium tracking-widest -mt-1 ${
                isScrolled ? "text-gray-500" : "text-gray-300"
              }`}>
                HOLIDAY HOMES
              </div>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              <Link key={item.href} href={item.href}>
                <a
                  className={`text-sm font-medium transition-colors duration-200 hover:text-gold-500 ${
                    location === item.href
                      ? "text-gold-500"
                      : isScrolled
                      ? "text-gray-700"
                      : "text-white"
                  }`}
                >
                  {item.label}
                </a>
              </Link>
            ))}
            <Link href="/contact">
              <Button className="bg-gold-500 text-white hover:bg-gold-600 transition-colors duration-200 rounded-full px-6">
                Contact
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
                    isScrolled ? "text-gray-700" : "text-white"
                  } hover:text-gold-500`}
                >
                  <Menu className="h-6 w-6" />
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col space-y-6 mt-6">
                  {navItems.map((item) => (
                    <Link key={item.href} href={item.href}>
                      <a
                        className={`text-lg font-medium transition-colors duration-200 hover:text-gold-500 ${
                          location === item.href ? "text-gold-500" : "text-gray-700"
                        }`}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        {item.label}
                      </a>
                    </Link>
                  ))}
                  <Link href="/contact">
                    <Button
                      className="bg-gold-500 text-white hover:bg-gold-600 transition-colors duration-200 rounded-full"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      Contact
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
