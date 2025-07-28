import { useState } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { cn } from "@/lib/utils";
import { insertInquirySchema, type Property } from "@shared/schema";
import { format, parseISO } from "date-fns";
import { 
  Mail, 
  Clock,
  Send,
  CheckCircle,
  Home,
  Check,
  ChevronsUpDown
} from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const contactFormSchema = insertInquirySchema.extend({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Valid email is required"),
  countryCode: z.string().min(1, "Please select a country code"),
  phone: z.string().min(1, "Phone number is required"),
  propertyName: z.string().min(1, "Please select a property"),
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkOutDate: z.string().min(1, "Check-out date is required"),
  message: z.string().min(1, "Message is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

// Country codes with popular countries first
const countryCodes = [
  // Popular Middle East & GCC
  { code: "+971", country: "UAE", flag: "🇦🇪" },
  { code: "+966", country: "Saudi Arabia", flag: "🇸🇦" },
  { code: "+974", country: "Qatar", flag: "🇶🇦" },
  { code: "+965", country: "Kuwait", flag: "🇰🇼" },
  { code: "+973", country: "Bahrain", flag: "🇧🇭" },
  { code: "+968", country: "Oman", flag: "🇴🇲" },
  { code: "+962", country: "Jordan", flag: "🇯🇴" },
  { code: "+961", country: "Lebanon", flag: "🇱🇧" },
  { code: "+20", country: "Egypt", flag: "🇪🇬" },
  
  // Major Western Markets
  { code: "+1", country: "US/Canada", flag: "🇺🇸" },
  { code: "+44", country: "UK", flag: "🇬🇧" },
  { code: "+33", country: "France", flag: "🇫🇷" },
  { code: "+49", country: "Germany", flag: "🇩🇪" },
  { code: "+39", country: "Italy", flag: "🇮🇹" },
  { code: "+34", country: "Spain", flag: "🇪🇸" },
  { code: "+31", country: "Netherlands", flag: "🇳🇱" },
  { code: "+41", country: "Switzerland", flag: "🇨🇭" },
  { code: "+43", country: "Austria", flag: "🇦🇹" },
  { code: "+32", country: "Belgium", flag: "🇧🇪" },
  { code: "+45", country: "Denmark", flag: "🇩🇰" },
  { code: "+46", country: "Sweden", flag: "🇸🇪" },
  { code: "+47", country: "Norway", flag: "🇳🇴" },
  { code: "+358", country: "Finland", flag: "🇫🇮" },
  { code: "+353", country: "Ireland", flag: "🇮🇪" },
  { code: "+351", country: "Portugal", flag: "🇵🇹" },
  { code: "+30", country: "Greece", flag: "🇬🇷" },
  
  // Asia Pacific
  { code: "+86", country: "China", flag: "🇨🇳" },
  { code: "+91", country: "India", flag: "🇮🇳" },
  { code: "+81", country: "Japan", flag: "🇯🇵" },
  { code: "+82", country: "South Korea", flag: "🇰🇷" },
  { code: "+65", country: "Singapore", flag: "🇸🇬" },
  { code: "+852", country: "Hong Kong", flag: "🇭🇰" },
  { code: "+853", country: "Macau", flag: "🇲🇴" },
  { code: "+886", country: "Taiwan", flag: "🇹🇼" },
  { code: "+60", country: "Malaysia", flag: "🇲🇾" },
  { code: "+66", country: "Thailand", flag: "🇹🇭" },
  { code: "+84", country: "Vietnam", flag: "🇻🇳" },
  { code: "+62", country: "Indonesia", flag: "🇮🇩" },
  { code: "+63", country: "Philippines", flag: "🇵🇭" },
  { code: "+61", country: "Australia", flag: "🇦🇺" },
  { code: "+64", country: "New Zealand", flag: "🇳🇿" },
  { code: "+92", country: "Pakistan", flag: "🇵🇰" },
  { code: "+880", country: "Bangladesh", flag: "🇧🇩" },
  { code: "+94", country: "Sri Lanka", flag: "🇱🇰" },
  
  // Eastern Europe & Russia
  { code: "+7", country: "Russia", flag: "🇷🇺" },
  { code: "+380", country: "Ukraine", flag: "🇺🇦" },
  { code: "+48", country: "Poland", flag: "🇵🇱" },
  { code: "+420", country: "Czech Republic", flag: "🇨🇿" },
  { code: "+421", country: "Slovakia", flag: "🇸🇰" },
  { code: "+36", country: "Hungary", flag: "🇭🇺" },
  { code: "+40", country: "Romania", flag: "🇷🇴" },
  { code: "+359", country: "Bulgaria", flag: "🇧🇬" },
  { code: "+385", country: "Croatia", flag: "🇭🇷" },
  { code: "+381", country: "Serbia", flag: "🇷🇸" },
  
  // Americas
  { code: "+55", country: "Brazil", flag: "🇧🇷" },
  { code: "+54", country: "Argentina", flag: "🇦🇷" },
  { code: "+56", country: "Chile", flag: "🇨🇱" },
  { code: "+57", country: "Colombia", flag: "🇨🇴" },
  { code: "+51", country: "Peru", flag: "🇵🇪" },
  { code: "+52", country: "Mexico", flag: "🇲🇽" },
  { code: "+58", country: "Venezuela", flag: "🇻🇪" },
  
  // Africa
  { code: "+27", country: "South Africa", flag: "🇿🇦" },
  { code: "+234", country: "Nigeria", flag: "🇳🇬" },
  { code: "+254", country: "Kenya", flag: "🇰🇪" },
  { code: "+233", country: "Ghana", flag: "🇬🇭" },
  { code: "+212", country: "Morocco", flag: "🇲🇦" },
  { code: "+216", country: "Tunisia", flag: "🇹🇳" },
  { code: "+213", country: "Algeria", flag: "🇩🇿" },
  { code: "+251", country: "Ethiopia", flag: "🇪🇹" },
  { code: "+256", country: "Uganda", flag: "🇺🇬" },
  
  // Other Popular
  { code: "+90", country: "Turkey", flag: "🇹🇷" },
  { code: "+98", country: "Iran", flag: "🇮🇷" },
  { code: "+972", country: "Israel", flag: "🇮🇱" },
  { code: "+93", country: "Afghanistan", flag: "🇦🇫" },
  { code: "+354", country: "Iceland", flag: "🇮🇸" },
  { code: "+370", country: "Lithuania", flag: "🇱🇹" },
  { code: "+371", country: "Latvia", flag: "🇱🇻" },
  { code: "+372", country: "Estonia", flag: "🇪🇪" },
];

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [countryCodeOpen, setCountryCodeOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Fetch properties for the dropdown
  const { data: properties = [] } = useQuery<Property[]>({
    queryKey: ["/api/properties"],
  });

  // Get URL parameters for pre-filling form
  const urlParams = new URLSearchParams(window.location.search);
  const checkInParam = urlParams.get('checkIn') || '';
  const checkOutParam = urlParams.get('checkOut') || '';
  const propertyIdParam = urlParams.get('propertyId');
  const guestsParam = urlParams.get('guests');
  
  // Get property name from propertyId for pre-filling
  const selectedProperty = properties.find(p => p.id === parseInt(propertyIdParam || ''));
  const propertyNameParam = selectedProperty?.name || '';

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    mode: "onChange", // Enable real-time validation
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      countryCode: "+971", // Default to UAE
      phone: "",
      propertyName: propertyNameParam,
      checkInDate: checkInParam,
      checkOutDate: checkOutParam,
      message: guestsParam ? `I'm interested in booking for ${guestsParam} guest${parseInt(guestsParam) > 1 ? 's' : ''}.` : "",
      propertyId: propertyIdParam ? parseInt(propertyIdParam) : null,
    },
  });

  const submitInquiry = useMutation({
    mutationFn: async (data: ContactFormData) => {
      return apiRequest("POST", "/api/inquiries", data);
    },
    onSuccess: () => {
      toast({
        title: "Inquiry Sent Successfully!",
        description: "Your inquiry has been sent via WhatsApp. We typically respond within a few minutes.",
      });
      form.reset();
      queryClient.invalidateQueries({ queryKey: ["/api/inquiries"] });
    },
    onError: (error) => {
      toast({
        title: "Error Sending Inquiry",
        description: "Please try again or contact us directly.",
        variant: "destructive",
      });
      console.error("Inquiry submission error:", error);
    },
  });

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    try {
      // Format dates to be user-friendly
      const checkInFormatted = format(parseISO(data.checkInDate), 'EEEE, MMMM d, yyyy');
      const checkOutFormatted = format(parseISO(data.checkOutDate), 'EEEE, MMMM d, yyyy');
      
      // Combine country code with phone number
      const fullPhoneNumber = `${data.countryCode} ${data.phone}`;
      
      // Format the message for WhatsApp
      const whatsappMessage = `*New Inquiry from Website*\n\n` +
        `*Name:* ${data.firstName} ${data.lastName}\n` +
        `*Email:* ${data.email}\n` +
        `*Phone:* ${fullPhoneNumber}\n` +
        `*Property:* ${data.propertyName}\n` +
        `*Check-in Date:* ${checkInFormatted}\n` +
        `*Check-out Date:* ${checkOutFormatted}\n` +
        `*Message:* ${data.message}\n\n` +
        `_Sent from Arabian Coast Holiday Homes website_`;

      // Send to WhatsApp
      const whatsappUrl = `https://wa.me/971558166062?text=${encodeURIComponent(whatsappMessage)}`;
      
      // Open WhatsApp in same window
      window.location.href = whatsappUrl;

      // Also submit to our backend for record keeping (with combined phone number)
      const submissionData = {
        ...data,
        phone: fullPhoneNumber,
        propertyId: data.propertyId || null,
      };
      await submitInquiry.mutateAsync(submissionData);
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      title: "Email",
      details: ["info@arabiancoastholidayhomes.com"],
    },
    {
      icon: FaWhatsapp,
      title: "WhatsApp",
      details: ["+971 55 816 6062"],
    },
    {
      icon: Clock,
      title: "Hours",
      details: ["24/7"],
    },
  ];

  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Get In <span className="text-gold-500">Touch</span>
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Ready to book your dream vacation? Our team is here to help you find
              the perfect property and create an unforgettable experience.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Contact Form and Info */}
      <section className="py-12 sm:py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
            {/* Contact Information */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-8"
            >
              <div>
                <h2 className="text-3xl font-bold text-gray-900 mb-6">
                  Contact Information
                </h2>
                <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                  We're here to assist you 24/7 with any questions about our properties,
                  services, or to help you plan your perfect vacation experience.
                </p>
              </div>

              <div className="space-y-6">
                {contactInfo.map((info, index) => {
                  const IconComponent = info.icon;
                  return (
                    <motion.div
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.6, delay: index * 0.1 + 0.2 }}
                      className="flex items-start space-x-4"
                    >
                      <div className={`p-3 rounded-full ${
                        info.title === 'WhatsApp' 
                          ? 'bg-green-500 text-white' 
                          : info.title === 'Email'
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-600 text-white'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-black mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-black">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-gold-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-black mb-3">
                  Arabian Coast Holiday Homes
                </h3>
                <div className="space-y-2">
                  {[
                    "Personally inspected luxury properties",
                    "24/7 concierge and support services",
                    "Exclusive access to premium amenities",
                    "Tailored experiences and recommendations",
                  ].map((feature, index) => (
                    <div key={index} className="flex items-center">
                      <CheckCircle className="w-4 h-4 text-gold-500 mr-2" />
                      <span className="text-black text-sm">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
            >
              <Card className="shadow-lg border-0">
                <CardContent className="p-8">
                  <h2 className="text-2xl font-bold text-gray-900 mb-6">
                    Send Us an Inquiry
                  </h2>

                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                          placeholder="John"
                          className="mt-1 h-10"
                          required
                        />
                        {form.formState.errors.firstName && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.firstName.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                          Last Name *
                        </Label>
                        <Input
                          id="lastName"
                          {...form.register("lastName")}
                          placeholder="Doe"
                          className="mt-1 h-10"
                          required
                        />
                        {form.formState.errors.lastName && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.lastName.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email Address *
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        {...form.register("email")}
                        placeholder="john@example.com"
                        className="mt-1 h-10"
                        required
                      />
                      {form.formState.errors.email && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.email.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone Number *
                      </Label>
                      <div className="grid grid-cols-3 gap-2 mt-1">
                        <Popover open={countryCodeOpen} onOpenChange={setCountryCodeOpen}>
                          <PopoverTrigger asChild>
                            <Button
                              variant="outline"
                              role="combobox"
                              aria-expanded={countryCodeOpen}
                              className="h-10 justify-between"
                            >
                              {form.watch("countryCode") ? (
                                <div className="flex items-center gap-2">
                                  <span>{countryCodes.find((country) => country.code === form.watch("countryCode"))?.flag}</span>
                                  <span>{form.watch("countryCode")}</span>
                                </div>
                              ) : (
                                "Code"
                              )}
                              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                            </Button>
                          </PopoverTrigger>
                          <PopoverContent className="w-[300px] p-0">
                            <Command>
                              <CommandInput placeholder="Search country code..." />
                              <CommandList>
                                <CommandEmpty>No country found.</CommandEmpty>
                                <CommandGroup>
                                  {countryCodes.map((country) => (
                                    <CommandItem
                                      key={country.code}
                                      value={`${country.code} ${country.country}`}
                                      onSelect={() => {
                                        form.setValue("countryCode", country.code);
                                        setCountryCodeOpen(false);
                                      }}
                                    >
                                      <Check
                                        className={cn(
                                          "mr-2 h-4 w-4",
                                          form.watch("countryCode") === country.code ? "opacity-100" : "opacity-0"
                                        )}
                                      />
                                      <div className="flex items-center gap-2">
                                        <span>{country.flag}</span>
                                        <span className="font-medium">{country.code}</span>
                                        <span className="text-sm text-gray-500">{country.country}</span>
                                      </div>
                                    </CommandItem>
                                  ))}
                                </CommandGroup>
                              </CommandList>
                            </Command>
                          </PopoverContent>
                        </Popover>
                        <div className="col-span-2">
                          <Input
                            id="phone"
                            type="tel"
                            {...form.register("phone")}
                            placeholder="123456789"
                            className="h-10"
                            required
                          />
                        </div>
                      </div>
                      {(form.formState.errors.countryCode || form.formState.errors.phone) && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.countryCode?.message || form.formState.errors.phone?.message}
                        </p>
                      )}
                    </div>

                    <div>
                      <Label htmlFor="propertyName" className="text-sm font-medium text-gray-700">
                        Property of Interest *
                      </Label>
                      <Select
                        value={form.watch("propertyName")}
                        onValueChange={(value) => form.setValue("propertyName", value)}
                      >
                        <SelectTrigger className="mt-1 h-10 min-w-0">
                          <SelectValue placeholder="Select a property" />
                        </SelectTrigger>
                        <SelectContent 
                          className="max-h-60 overflow-auto z-50 min-w-[var(--radix-select-trigger-width)] max-w-[400px]"
                          position="popper"
                          sideOffset={4}
                        >
                          {properties.map((property) => (
                            <SelectItem key={property.id} value={property.name} className="cursor-pointer">
                              <div className="flex items-center py-1 w-full">
                                <Home className="w-4 h-4 mr-2 text-gray-500 flex-shrink-0" />
                                <span className="truncate text-left">{property.name}</span>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      {form.formState.errors.propertyName && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.propertyName.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
                      <div>
                        <Label htmlFor="checkInDate" className="text-sm font-medium text-gray-700">
                          Check-in Date *
                        </Label>
                        <Input
                          id="checkInDate"
                          type="date"
                          {...form.register("checkInDate")}
                          className="mt-1 h-10"
                          required
                        />
                        {form.formState.errors.checkInDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.checkInDate.message}
                          </p>
                        )}
                      </div>

                      <div>
                        <Label htmlFor="checkOutDate" className="text-sm font-medium text-gray-700">
                          Check-out Date *
                        </Label>
                        <Input
                          id="checkOutDate"
                          type="date"
                          {...form.register("checkOutDate")}
                          className="mt-1 h-10"
                          required
                        />
                        {form.formState.errors.checkOutDate && (
                          <p className="text-red-500 text-sm mt-1">
                            {form.formState.errors.checkOutDate.message}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                        Message *
                      </Label>
                      <Textarea
                        id="message"
                        {...form.register("message")}
                        placeholder="Tell us about your perfect vacation, special requirements, or any questions you have..."
                        rows={5}
                        className="mt-1"
                        required
                      />
                      {form.formState.errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || submitInquiry.isPending || Object.keys(form.formState.errors).length > 0 || !form.watch("firstName") || !form.watch("lastName") || !form.watch("email") || !form.watch("phone") || !form.watch("propertyName") || !form.watch("checkInDate") || !form.watch("checkOutDate") || !form.watch("message")}
                      className="w-full bg-green-500 text-white hover:bg-green-600 transition-colors duration-200 py-4 text-base sm:text-lg font-bold rounded-lg border-2 border-green-500 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed touch-manipulation"
                    >
                      {isSubmitting || submitInquiry.isPending ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Inquiry...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <FaWhatsapp className="w-5 h-5 mr-2" />
                          Send Inquiry
                        </div>
                      )}
                    </Button>

                    {Object.keys(form.formState.errors).length > 0 && (
                      <div className="text-sm text-red-500 text-center bg-red-50 p-3 rounded-lg">
                        Please fill all fields correctly. Check that your email address is valid.
                      </div>
                    )}
                    <p className="text-sm text-gray-600 text-center">
                      We typically respond within a few minutes.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>


    </div>
  );
};

export default Contact;
