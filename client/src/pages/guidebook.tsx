import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  MapPin, 
  Camera, 
  ShoppingBag, 
  Car, 
  Train, 
  Smartphone,
  Clock,
  Star,
  Eye,
  Waves,
  Fish,
  Snowflake,
  Navigation
} from "lucide-react";

const Guidebook = () => {
  const sightseeingAttractions = [
    {
      name: "Burj Khalifa",
      description: "The Burj Khalifa is the tallest building in the world, offering stunning views from its observation deck. At night, it lights up with vibrant displays, often showcasing special themes or events. Visitors can enjoy panoramic views of Dubai's skyline and desert. It's a must-see landmark that beautifully illuminates the city.",
      icon: <Eye className="w-6 h-6" />,
      category: "Iconic Landmark",
      highlights: ["World's tallest building", "Observation deck", "Night light shows", "Panoramic views"],
      image: "/guidebook-burj-khalifa.png",
      location: "1 Sheikh Mohammed bin Rashid Blvd, Downtown Dubai",
      directions: "8-minute walk from property via Sheikh Mohammed bin Rashid Boulevard. Take the Dubai Mall Metro Station (Red Line) or use taxi services like Careem, Uber, or Bolt."
    },
    {
      name: "Dubai Fountain Lake",
      description: "The Dubai Fountain is a breathtaking water and light show set against the Burj Khalifa. It's free to watch and features synchronized dances with music. Located near the Dubai Mall, it's a perfect spot for shopping and sightseeing. The fountain runs multiple times in the evening, creating a magical experience.",
      icon: <Waves className="w-6 h-6" />,
      category: "Entertainment",
      highlights: ["Free water & light show", "Synchronized music", "Multiple evening shows", "Near Dubai Mall"],
      image: "/guidebook-dubai-fountain.png",
      location: "Burj Khalifa Lake, Downtown Dubai",
      directions: "5-minute walk from property to the lake promenade. Best viewing spots are from the Dubai Mall waterfront boardwalk or At the Top Sky Lounge."
    },
    {
      name: "Dubai Mall Aquarium",
      description: "The Dubai Mall Aquarium is one of the largest indoor aquariums in the world, featuring a stunning display of marine life. Visitors can walk through a glass tunnel for a 360-degree view of the tank, home to thousands of aquatic species. It's a mesmerizing experience for both adults and kids. The aquarium also offers unique activities like diving with sharks.",
      icon: <Fish className="w-6 h-6" />,
      category: "Family Attraction",
      highlights: ["World's largest indoor aquarium", "Glass tunnel experience", "Thousands of species", "Diving with sharks activity"],
      image: "/guidebook-aquarium-new.png",
      location: "Ground Floor, The Dubai Mall, Downtown Dubai",
      directions: "8-minute walk to Dubai Mall main entrance, then follow signs to Ground Floor aquarium. Located near the main atrium and easily accessible via mall directory."
    }
  ];

  const shoppingDestinations = [
    {
      name: "The Dubai Mall",
      description: "The Dubai Mall is one of the largest shopping malls in the world, offering an endless variety of stores, restaurants, and entertainment. It's home to attractions like an ice rink, an aquarium, and a virtual reality park. Visitors can enjoy shopping, dining, and family-friendly activities all in one place. It's the ultimate destination for both leisure and luxury.",
      icon: <ShoppingBag className="w-6 h-6" />,
      category: "Shopping & Entertainment",
      highlights: ["World's largest mall", "Ice rink & aquarium", "VR park", "Endless dining options"],
      image: "/guidebook-dubai-mall.png",
      location: "Financial Centre Road, Downtown Dubai",
      directions: "8-minute walk via Sheikh Mohammed bin Rashid Boulevard. Multiple entrances available - use Fashion Avenue entrance for luxury shopping or Grand Atrium entrance for main attractions."
    },
    {
      name: "Dubai Ice Rink",
      description: "The Dubai Mall Ice Rink is a popular indoor skating destination, offering a fun experience for skaters of all levels. The rink hosts public sessions, ice hockey games, and figure skating events. It's a cool escape from the desert heat and perfect for families looking for unique activities.",
      icon: <Snowflake className="w-6 h-6" />,
      category: "Recreation",
      highlights: ["Indoor skating", "Public sessions", "Ice hockey games", "Cool escape from heat"],
      image: "/guidebook-ice-rink-new.png",
      location: "Level 2, The Dubai Mall, Downtown Dubai",
      directions: "Walk to Dubai Mall (8 minutes), take escalator to Level 2. Follow signs for 'Dubai Ice Rink' or ask at the information desk near the main atrium."
    }
  ];

  const cityAdvice = [
    {
      title: "Getting Around - Taxi Services",
      description: "Careem, Bolt, and Uber apps: These taxi services provide fast, door-to-door rides for a smooth experience.",
      icon: <Smartphone className="w-6 h-6" />,
      type: "Transportation"
    },
    {
      title: "Metro Access",
      description: "Metro: The Burj Khalifa/Dubai Mall Metro Station is just an 8-minute walk, giving you easy access to the city's metro system.",
      icon: <Train className="w-6 h-6" />,
      type: "Public Transport"
    }
  ];

  return (
    <div className="min-h-screen pt-24">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-luxury-cream to-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-luxury-brown mb-4">
              Guest <span className="text-luxury-gold">Guidebook</span>
            </h1>
            <p className="text-xl text-luxury-bronze max-w-3xl mx-auto leading-relaxed">
              Discover the best of Dubai with our curated guide to sightseeing, shopping, and city navigation. 
              Everything you need for an unforgettable stay.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Sightseeing Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <Camera className="w-8 h-8 text-luxury-gold" />
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-brown">Sightseeing</h2>
            </div>
            <p className="text-lg text-luxury-bronze max-w-2xl mx-auto">
              Explore Dubai's most iconic landmarks and attractions
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {sightseeingAttractions.map((attraction, index) => (
              <motion.div
                key={attraction.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="luxury-card h-full luxury-shadow group hover:scale-105 transition-all duration-500 overflow-hidden">
                  <div className="relative h-52 overflow-hidden">
                    <img 
                      src={attraction.image} 
                      alt={attraction.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      style={{ objectPosition: 'center 30%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-3 left-3 bg-white/90 text-luxury-brown backdrop-blur-sm"
                    >
                      {attraction.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-6">
                    <div className="flex items-start gap-3 mb-4">
                      <div className="p-3 bg-luxury-gold/10 rounded-xl text-luxury-gold">
                        {attraction.icon}
                      </div>
                      <h3 className="text-lg font-bold text-luxury-brown flex-1">
                        {attraction.name}
                      </h3>
                    </div>
                    
                    <p className="text-luxury-bronze mb-4 leading-relaxed text-sm">
                      {attraction.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-luxury-brown">Location</p>
                          <p className="text-xs text-luxury-bronze">{attraction.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Navigation className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-luxury-brown">Directions</p>
                          <p className="text-xs text-luxury-bronze leading-relaxed">{attraction.directions}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-luxury-brown text-sm">Highlights:</h4>
                      <div className="flex flex-wrap gap-2">
                        {attraction.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-luxury-gold/30 text-luxury-bronze">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Shopping Section */}
      <section className="py-16 bg-luxury-cream/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <ShoppingBag className="w-8 h-8 text-luxury-gold" />
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-brown">Shopping</h2>
            </div>
            <p className="text-lg text-luxury-bronze max-w-2xl mx-auto">
              Experience world-class shopping and entertainment destinations
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            {shoppingDestinations.map((destination, index) => (
              <motion.div
                key={destination.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.2 }}
              >
                <Card className="luxury-card h-full luxury-shadow group hover:scale-105 transition-all duration-500 overflow-hidden">
                  <div className="relative h-56 overflow-hidden">
                    <img 
                      src={destination.image} 
                      alt={destination.name}
                      className="w-full h-full object-cover object-center group-hover:scale-110 transition-transform duration-500"
                      style={{ objectPosition: 'center 25%' }}
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
                    <Badge 
                      variant="secondary" 
                      className="absolute top-4 left-4 bg-white/90 text-luxury-brown backdrop-blur-sm"
                    >
                      {destination.category}
                    </Badge>
                  </div>
                  
                  <CardContent className="p-8">
                    <div className="flex items-start gap-4 mb-4">
                      <div className="p-3 bg-luxury-gold/10 rounded-xl text-luxury-gold">
                        {destination.icon}
                      </div>
                      <h3 className="text-xl font-bold text-luxury-brown flex-1">
                        {destination.name}
                      </h3>
                    </div>
                    
                    <p className="text-luxury-bronze mb-4 leading-relaxed text-sm">
                      {destination.description}
                    </p>
                    
                    <div className="space-y-3 mb-4">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-luxury-brown">Location</p>
                          <p className="text-xs text-luxury-bronze">{destination.location}</p>
                        </div>
                      </div>
                      
                      <div className="flex items-start gap-2">
                        <Navigation className="w-4 h-4 text-luxury-gold mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-xs font-semibold text-luxury-brown">Directions</p>
                          <p className="text-xs text-luxury-bronze leading-relaxed">{destination.directions}</p>
                        </div>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="font-semibold text-luxury-brown text-sm">Key Features:</h4>
                      <div className="flex flex-wrap gap-2">
                        {destination.highlights.map((highlight, idx) => (
                          <Badge key={idx} variant="outline" className="text-xs border-luxury-gold/30 text-luxury-bronze">
                            {highlight}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* City Advice Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="flex items-center justify-center gap-3 mb-4">
              <MapPin className="w-8 h-8 text-luxury-gold" />
              <h2 className="text-3xl md:text-4xl font-bold text-luxury-brown">City Advice</h2>
            </div>
            <p className="text-lg text-luxury-bronze max-w-2xl mx-auto">
              Essential tips for getting around Dubai with ease
            </p>
          </motion.div>

          <div className="max-w-4xl mx-auto">
            <Card className="luxury-card luxury-shadow">
              <CardContent className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Car className="w-6 h-6 text-luxury-gold" />
                  <h3 className="text-2xl font-bold text-luxury-brown">The Fastest Ways of Getting Around</h3>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {cityAdvice.map((advice, index) => (
                    <motion.div
                      key={advice.title}
                      initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.6, delay: index * 0.2 }}
                      className="flex gap-4 p-4 rounded-xl bg-luxury-cream/50 hover:bg-luxury-cream/70 transition-colors duration-300"
                    >
                      <div className="p-2 bg-luxury-gold/10 rounded-lg text-luxury-gold flex-shrink-0">
                        {advice.icon}
                      </div>
                      <div>
                        <Badge variant="outline" className="mb-2 text-xs border-luxury-gold/30 text-luxury-bronze">
                          {advice.type}
                        </Badge>
                        <h4 className="font-semibold text-luxury-brown mb-2">{advice.title}</h4>
                        <p className="text-luxury-bronze text-sm leading-relaxed">{advice.description}</p>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 bg-gradient-to-r from-luxury-gold/10 to-luxury-cream/20">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h3 className="text-2xl md:text-3xl font-bold text-luxury-brown mb-4">
              Ready to Explore Dubai?
            </h3>
            <p className="text-lg text-luxury-bronze mb-6 max-w-2xl mx-auto">
              Book your stay with Arabian Coast Holiday Homes and discover the best of Dubai with our insider guide.
            </p>
            <motion.a
              href="/contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex items-center gap-2 bg-luxury-gold text-white px-8 py-3 rounded-xl font-semibold hover:bg-luxury-gold/90 transition-all duration-300 luxury-shadow"
            >
              <MapPin className="w-5 h-5" />
              Book Your Dubai Experience
            </motion.a>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Guidebook;