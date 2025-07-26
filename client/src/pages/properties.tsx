import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import PropertyCard from "@/components/property-card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent } from "@/components/ui/card";
import { Search, Filter, MapPin } from "lucide-react";
import type { Property } from "@shared/schema";

const Properties = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [priceRange, setPriceRange] = useState<string>("all");

  const { data: properties, isLoading } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  const categories = [
    { value: "all", label: "All Properties" },
    { value: "apartment", label: "Apartment" },
  ];

  const priceRanges = [
    { value: "all", label: "All Prices" },
    { value: "0-1800", label: "Under AED 1,800" },
    { value: "1800-3600", label: "AED 1,800 - AED 3,600" },
    { value: "3600-5500", label: "AED 3,600 - AED 5,500" },
    { value: "5500+", label: "AED 5,500+" },
  ];

  const filteredProperties = properties?.filter((property) => {
    const matchesSearch = property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         property.location.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesCategory = selectedCategory === "all" || property.category === selectedCategory;
    
    const price = parseFloat(property.pricePerNight);
    let matchesPrice = true;
    
    if (priceRange !== "all") {
      switch (priceRange) {
        case "0-1800":
          matchesPrice = price < 1800;
          break;
        case "1800-3600":
          matchesPrice = price >= 1800 && price <= 3600;
          break;
        case "3600-5500":
          matchesPrice = price >= 3600 && price <= 5500;
          break;
        case "5500+":
          matchesPrice = price > 5500;
          break;
      }
    }
    
    return matchesSearch && matchesCategory && matchesPrice;
  });

  return (
    <div className="min-h-screen pt-20">
      {/* Header */}
      <section className="bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              Our <span className="text-gold-500">Properties</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Discover our complete collection of luxury holiday homes
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters */}
      <section className="py-6 bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col lg:flex-row gap-4 items-center"
          >
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search properties..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            
            <div className="flex gap-4 items-center">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Category" />
                </SelectTrigger>
                <SelectContent>
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={priceRange} onValueChange={setPriceRange}>
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Price Range" />
                </SelectTrigger>
                <SelectContent>
                  {priceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(9)].map((_, i) => (
                <div key={i} className="bg-white rounded-2xl shadow-lg h-96 animate-pulse">
                  <div className="bg-gray-300 h-64 rounded-t-2xl"></div>
                  <div className="p-6 space-y-3">
                    <div className="bg-gray-300 h-4 rounded"></div>
                    <div className="bg-gray-300 h-3 rounded w-3/4"></div>
                    <div className="bg-gray-300 h-4 rounded w-1/2"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : filteredProperties && filteredProperties.length > 0 ? (
            <>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="mb-4"
              >
                <p className="text-gray-600">
                  Showing {filteredProperties.length} of {properties?.length || 0} properties
                </p>
              </motion.div>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProperties.map((property, index) => (
                  <PropertyCard key={property.id} property={property} index={index} />
                ))}
              </div>
            </>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center py-16"
            >
              <Card className="max-w-md mx-auto p-8">
                <CardContent className="text-center">
                  <MapPin className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">
                    No Properties Found
                  </h3>
                  <p className="text-gray-600 mb-4">
                    Try adjusting your search criteria or browse all properties.
                  </p>
                  <Button
                    onClick={() => {
                      setSearchTerm("");
                      setSelectedCategory("all");
                      setPriceRange("all");
                    }}
                    className="bg-gold-500 text-white hover:bg-gold-600"
                  >
                    Clear Filters
                  </Button>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Properties;
