import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { 
  Award, 
  Users, 
  Home, 
  Star, 
  Shield, 
  Heart,
  CheckCircle,
  Target,
  Eye
} from "lucide-react";

const About = () => {
  const stats = [
    { icon: Home, value: "500+", label: "Premium Properties" },
    { icon: Users, value: "50K+", label: "Happy Guests" },
    { icon: Star, value: "4.9", label: "Average Rating" },
    { icon: Award, value: "10+", label: "Years Experience" },
  ];

  const values = [
    {
      icon: Shield,
      title: "Trust & Security",
      description: "We ensure the highest standards of safety and security for all our properties and guests."
    },
    {
      icon: Heart,
      title: "Exceptional Service",
      description: "Our dedicated team goes above and beyond to create unforgettable experiences for every guest."
    },
    {
      icon: Star,
      title: "Quality Excellence",
      description: "Every property in our collection is carefully curated to meet our stringent quality standards."
    },
    {
      icon: Users,
      title: "Guest-Centric",
      description: "Your satisfaction is our priority. We listen to your needs and exceed your expectations."
    }
  ];

  const team = [
    {
      name: "Sarah Al-Rashid",
      position: "CEO & Founder",
      image: "https://images.unsplash.com/photo-1494790108755-2616b612b786?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "With over 15 years in luxury hospitality, Sarah founded Arabian Coast to redefine vacation rentals."
    },
    {
      name: "Michael Chen",
      position: "Head of Operations",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Michael ensures seamless operations and maintains our high standards across all properties."
    },
    {
      name: "Fatima Hassan",
      position: "Guest Experience Director",
      image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=400&h=400",
      description: "Fatima leads our guest services team, ensuring every stay exceeds expectations."
    }
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="luxury-bg py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center max-w-5xl mx-auto"
          >
            <div className="mb-8">
              <div className="inline-block px-6 py-2 luxury-glass rounded-full border border-luxury-gold/30 mb-6">
                <p className="text-xs uppercase tracking-[0.3em] text-luxury-bronze font-medium luxury-serif">
                  O U R &nbsp; S T O R Y
                </p>
              </div>
            </div>
            <p className="text-xl md:text-2xl luxury-text leading-relaxed luxury-serif font-light max-w-4xl mx-auto">
              We're your gateway to a perfect Dubai escape, blending luxury and comfort. Whether you're here for the skyline, the beaches, or the desert adventures, we've got you covered with stunning stays that feel just like home—but better.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => {
              const IconComponent = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className="text-center"
                >
                  <div className="flex justify-center mb-4">
                    <IconComponent className="w-8 h-8 text-gold-500" />
                  </div>
                  <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-gray-600">{stat.label}</div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
              <p className="text-lg text-gray-600 leading-relaxed">
                Founded in 2014, Arabian Coast Holiday Homes began with a simple vision:
                to provide access to the most exceptional luxury properties along the
                stunning Arabian coastline. What started as a boutique collection of
                handpicked villas has grown into the region's premier luxury vacation
                rental platform.
              </p>
              <p className="text-lg text-gray-600 leading-relaxed">
                Our founder, Sarah Al-Rashid, recognized the need for a service that
                combined the intimacy of private homes with the service standards of
                luxury hotels. Today, we curate over 500 premium properties, each
                personally inspected and maintained to our exacting standards.
              </p>
              <div className="grid grid-cols-2 gap-6 pt-4">
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-gold-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">Quality Assured</h4>
                    <p className="text-sm text-gray-600">Every property personally inspected</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle className="w-5 h-5 text-gold-500 mt-1" />
                  <div>
                    <h4 className="font-semibold text-gray-900">24/7 Support</h4>
                    <p className="text-sm text-gray-600">Round-the-clock guest assistance</p>
                  </div>
                </div>
              </div>
            </motion.div>
            
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <img
                src="https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&h=600"
                alt="Arabian Coast luxury property"
                className="rounded-2xl shadow-lg w-full"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <Card className="p-8 h-full border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Target className="w-8 h-8 text-gold-500 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Our Mission</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To provide discerning travelers with access to the world's most
                    exceptional luxury properties, accompanied by unparalleled service
                    that creates lasting memories and exceeds every expectation.
                  </p>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="p-8 h-full border-0 shadow-lg">
                <CardContent className="p-0">
                  <div className="flex items-center mb-6">
                    <Eye className="w-8 h-8 text-gold-500 mr-3" />
                    <h3 className="text-2xl font-bold text-gray-900">Our Vision</h3>
                  </div>
                  <p className="text-lg text-gray-600 leading-relaxed">
                    To become the global leader in luxury vacation rentals, setting
                    the standard for quality, service, and innovation while fostering
                    meaningful connections between guests and extraordinary destinations.
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Our <span className="text-gold-500">Values</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and shape the experiences we create
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {values.map((value, index) => {
              const IconComponent = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                >
                  <Card className="p-6 h-full border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-0">
                      <div className="flex items-start space-x-4">
                        <div className="bg-gold-100 p-3 rounded-lg">
                          <IconComponent className="w-6 h-6 text-gold-500" />
                        </div>
                        <div>
                          <h3 className="text-xl font-semibold text-gray-900 mb-2">
                            {value.title}
                          </h3>
                          <p className="text-gray-600 leading-relaxed">
                            {value.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Meet Our <span className="text-gold-500">Team</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The passionate professionals dedicated to making your vacation extraordinary
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
              >
                <Card className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                  <CardContent className="p-6">
                    <img
                      src={member.image}
                      alt={member.name}
                      className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                    />
                    <h3 className="text-xl font-semibold text-gray-900 mb-1">
                      {member.name}
                    </h3>
                    <p className="text-gold-500 font-medium mb-3">{member.position}</p>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {member.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
