import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";
import { insertInquirySchema } from "@shared/schema";
import { 
  Mail, 
  Clock,
  Send,
  CheckCircle
} from "lucide-react";

const contactFormSchema = insertInquirySchema.extend({
  checkInDate: z.string().min(1, "Check-in date is required"),
  checkOutDate: z.string().min(1, "Check-out date is required"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const Contact = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  // Get URL parameters for pre-filling form
  const urlParams = new URLSearchParams(window.location.search);
  const checkInParam = urlParams.get('checkIn') || '';
  const checkOutParam = urlParams.get('checkOut') || '';
  const propertyIdParam = urlParams.get('propertyId');
  const guestsParam = urlParams.get('guests');

  const form = useForm<ContactFormData>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
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
        description: "Thank you for your interest. We'll contact you within 24 hours.",
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
      await submitInquiry.mutateAsync(data);
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
      icon: Clock,
      title: "Hours",
      details: ["24/7 Customer Support", "Office: 9:00 AM - 6:00 PM GST"],
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
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
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
                      <div className="bg-gold-500 text-white p-3 rounded-full">
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          {info.title}
                        </h3>
                        {info.details.map((detail, detailIndex) => (
                          <p key={detailIndex} className="text-gray-600">
                            {detail}
                          </p>
                        ))}
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="bg-gold-50 p-6 rounded-xl">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Why Choose Arabian Coast?
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
                      <span className="text-gray-700 text-sm">{feature}</span>
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

                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                          First Name *
                        </Label>
                        <Input
                          id="firstName"
                          {...form.register("firstName")}
                          placeholder="John"
                          className="mt-1"
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
                          className="mt-1"
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
                        className="mt-1"
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
                      <Input
                        id="phone"
                        type="tel"
                        {...form.register("phone")}
                        placeholder="+1 (555) 123-4567"
                        className="mt-1"
                      />
                      {form.formState.errors.phone && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.phone.message}
                        </p>
                      )}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <Label htmlFor="checkInDate" className="text-sm font-medium text-gray-700">
                          Check-in Date *
                        </Label>
                        <Input
                          id="checkInDate"
                          type="date"
                          {...form.register("checkInDate")}
                          className="mt-1"
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
                          className="mt-1"
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
                      />
                      {form.formState.errors.message && (
                        <p className="text-red-500 text-sm mt-1">
                          {form.formState.errors.message.message}
                        </p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting || submitInquiry.isPending}
                      className="w-full bg-gold-500 text-white hover:bg-gold-600 transition-colors duration-200 py-3 text-lg font-semibold rounded-lg"
                    >
                      {isSubmitting || submitInquiry.isPending ? (
                        <div className="flex items-center">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2"></div>
                          Sending Inquiry...
                        </div>
                      ) : (
                        <div className="flex items-center justify-center">
                          <Send className="w-4 h-4 mr-2" />
                          Send Inquiry
                        </div>
                      )}
                    </Button>

                    <p className="text-sm text-gray-600 text-center">
                      We typically respond within 24 hours.
                    </p>
                  </form>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Map Section (Placeholder) */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-8">
              Visit Our <span className="text-gold-500">Office</span>
            </h2>
            <div className="bg-gray-200 h-64 md:h-96 rounded-2xl flex items-center justify-center">
              <div className="text-center">
                <Mail className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                <p className="text-gray-600 text-lg">
                  Interactive map will be displayed here
                </p>
                <p className="text-gray-500 text-sm">
                  Marina District, Arabian Coast, UAE
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
};

export default Contact;
