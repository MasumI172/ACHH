import { motion } from "framer-motion";

const Terms = () => {
  return (
    <div className="min-h-screen pt-24 pb-12">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-lg shadow-lg p-4 sm:p-6 md:p-8 lg:p-12 overflow-hidden"
        >
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-luxury-brown mb-6 sm:mb-8 leading-tight break-words">
            Terms and Conditions
          </h1>
          
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-luxury-brown space-y-4 sm:space-y-6 break-words overflow-wrap-anywhere">
            <p>
              Welcome to Arabian Coast Holiday Homes L.L.C. ("we", "us", "our"). These Terms and Conditions govern all direct bookings and use of our website [www.arabiancoastholidayhomes.com], as well as bookings made via phone, email, WhatsApp, or social media.
            </p>
            
            <p>
              By making a booking or accessing our website, you agree to comply with these Terms. If you do not agree, please do not use our website or services.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">1. Company Information</h2>
              <ul className="list-none space-y-2">
                <li><strong>Company Name:</strong> Arabian Coast Holiday Homes L.L.C.</li>
                <li><strong>Trade License Number:</strong> 1453578</li>
                <li><strong>Regulated by:</strong> Department of Economy and Tourism – Dubai</li>
                <li><strong>Email:</strong> info@arabiancoastholidayhomes.com</li>
                <li><strong>Website:</strong> www.arabiancoastholidayhomes.com</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">2. Scope of Terms</h2>
              <p>These Terms apply to all direct bookings made through:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Our website</li>
                <li>Phone</li>
                <li>WhatsApp</li>
                <li>Email</li>
                <li>Social media platforms</li>
              </ul>
              <p>They also apply to all guests, regardless of the booking platform.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">3. Use of the Website</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>You must be at least 18 years old to use our services.</li>
                <li>You agree to use the website only for lawful purposes.</li>
                <li>You may not attempt to access any unauthorized areas or systems.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">4. Intellectual Property</h2>
              <p>
                All website content, including text, logos, images, and designs, is the intellectual property of Arabian Coast Holiday Homes L.L.C.
              </p>
              <p><strong>You may not:</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>Copy, reproduce, or redistribute our content.</li>
                <li>Use our branding or materials without written permission.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">5. Booking Terms</h2>
              <p>By confirming a booking, you agree to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Our Reservation Terms and House Rules (provided during booking confirmation or check-in).</li>
                <li>Provide accurate guest and contact information.</li>
                <li>Ensure all guests and visitors are pre-registered at least 24 hours before arrival.</li>
                <li>Present a valid passport or Emirates ID to the building concierge on arrival for DET compliance.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">6. Payments & Security Deposit</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Full payment is required prior to check-in, unless agreed otherwise in writing.</li>
                <li>A 2000 AED refundable security deposit is required per booking.</li>
                <li>The deposit will be returned within 5 business days of checkout, subject to a satisfactory inspection.</li>
                <li>Payments are processed securely; we do not store or share card details.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">7. Cancellations & Refunds</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Our cancellation and refund policy is included in the Reservation Terms provided at booking.</li>
                <li>Refunds are processed in accordance with UAE Consumer Protection Law.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">8. Guest Conduct</h2>
              <p><strong>All guests must:</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>Follow the House Rules provided at or before check-in.</li>
                <li>Avoid excessive noise between 10:00 PM and 7:00 AM.</li>
                <li>Not host parties or engage in illegal activity on the premises.</li>
                <li>Not exceed the registered guest/visitor limit without approval.</li>
              </ul>
              <p className="mt-4">
                We reserve the right to evict guests without refund for breaches of these terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">9. Damage & Liability</h2>
              <p>Guests are liable for any damage or loss caused to the property or contents.</p>
              <p>If the cost of repair/replacement exceeds the security deposit, the guest must pay the balance within 7 days.</p>
              <p><strong>Arabian Coast Holiday Homes is not responsible for:</strong></p>
              <ul className="list-disc list-inside space-y-2">
                <li>Theft, loss, or damage to personal belongings.</li>
                <li>External disturbances such as construction, utility outages, or events beyond our control.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">10. Force Majeure</h2>
              <p>We are not liable for delays, disruptions, or cancellations due to events beyond our control, including:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Natural disasters</li>
                <li>Acts of God</li>
                <li>Pandemics</li>
                <li>Government restrictions</li>
                <li>Civil unrest or similar events</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">11. Privacy & Data Use</h2>
              <p>
                Your personal data is handled in accordance with Federal Decree-Law No. 45 of 2021 on the Protection of Personal Data.
              </p>
              <p>
                Guest ID details may be shared securely with DET or other regulatory bodies as required by law.
              </p>
              <p>
                Please review our [Privacy Policy] for full details.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">12. Third-Party Links</h2>
              <p>
                Our website may link to external websites for convenience. We are not responsible for their content, practices, or data handling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">13. Changes to Terms</h2>
              <p>
                We may update these Terms and Conditions at any time. Updates will be published on our website. Continued use of our services indicates your acceptance of the changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">14. Governing Law & Jurisdiction</h2>
              <p>
                These Terms are governed by the laws of the United Arab Emirates. Any disputes will be resolved in the courts of Dubai.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Terms;