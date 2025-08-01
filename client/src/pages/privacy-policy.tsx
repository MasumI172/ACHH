import { motion } from "framer-motion";

const PrivacyPolicy = () => {
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
            Privacy Policy
          </h1>
          
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-luxury-brown space-y-4 sm:space-y-6 break-words overflow-wrap-anywhere">
            <p>
              At Arabian Coast Holiday Homes L.L.C. ("we", "us", "our"), your privacy is important to us. This Privacy Policy explains how we collect, use, store, and protect your personal data when you interact with us through our website: www.arabiancoastholidayhomes.com or any direct booking channels.
            </p>
            
            <p>
              By using our website or providing your personal information, you agree to the terms of this Privacy Policy.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">1. Scope of This Policy</h2>
              <p>This policy applies to personal data collected directly by us through:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Our website contact or booking forms</li>
                <li>Direct booking channels (e.g. email, WhatsApp, phone)</li>
                <li>General enquiries or feedback submissions</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                <p className="font-semibold">Note: If you book via third-party platforms (e.g. Airbnb, Booking.com), their own privacy policies also apply.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">2. What Information We Collect</h2>
              <p>We collect only the data necessary to provide and manage your booking and comply with legal requirements. This may include:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Full name, email, phone number</li>
                <li>Nationality and passport/Emirates ID (for regulatory check-in)</li>
                <li>Booking details, preferences, and communication history</li>
                <li>Files or documents you provide (e.g. ID copies for registration)</li>
                <li>IP address, browser type, device info, and usage analytics</li>
                <li>Cookie data for improving website performance</li>
              </ul>
              <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded mt-4">
                <p className="font-semibold">We do not collect or store payment card details via our website. All payments are processed securely by third-party payment providers.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">3. How We Use Your Information</h2>
              <p>We use your personal data to:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Respond to enquiries and manage bookings</li>
                <li>Communicate check-in details, confirmations, and reminders</li>
                <li>Verify guest identity and fulfill regulatory reporting obligations (e.g. to DET)</li>
                <li>Enhance website functionality and improve user experience</li>
                <li>Maintain security and detect misuse or fraud</li>
                <li>Fulfill legal, accounting, and audit requirements</li>
              </ul>
              <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                <p className="font-semibold">We do not sell, rent, or share your personal data with third parties for marketing purposes.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">4. Legal Basis for Processing</h2>
              <p>In accordance with Federal Decree-Law No. 45 of 2021 (UAE), our legal bases for processing include:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Your explicit consent</li>
                <li>Contractual necessity (e.g. fulfilling your booking)</li>
                <li>Legal compliance (e.g. reporting to the Department of Economy and Tourism)</li>
                <li>Our legitimate interest in ensuring service quality and website functionality</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">5. Cookies & Analytics</h2>
              <p>We use essential and analytics cookies to:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Improve loading speed and user experience</li>
                <li>Monitor traffic and site performance</li>
                <li>Remember preferences (e.g. language)</li>
              </ul>
              <p className="mt-4">
                You can disable non-essential cookies via your browser settings. Disabling may affect website functionality.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">6. Log & Technical Data</h2>
              <p>When you visit our site, we may automatically log anonymized data such as:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>IP address and browser type</li>
                <li>Device and OS version</li>
                <li>Time spent on pages and click paths</li>
                <li>Referrer URLs</li>
              </ul>
              <p className="mt-4">This data is used only for internal performance monitoring and is never linked to your identity.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">7. Your Rights (Data Access & Control)</h2>
              <p>You have the right to:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Request access to your personal data</li>
                <li>Ask for correction of inaccurate information</li>
                <li>Request deletion (subject to legal retention limits)</li>
                <li>Object to or restrict certain data uses</li>
                <li>Request data portability in a structured format</li>
              </ul>
              <div className="bg-luxury-cream/30 p-4 rounded-lg mt-4">
                <p>
                  To exercise your rights, email info@arabiancoastholidayhomes.com. We will respond within 30 calendar days, in line with UAE law.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">8. Data Retention</h2>
              <p>We retain your personal data:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>For the duration of your stay and booking history</li>
                <li>As required by UAE regulations, including DET and tax authorities</li>
                <li>For up to 12 months after your last interaction, unless required longer by law</li>
              </ul>
              <p className="mt-4">After this, data is securely deleted or archived in compliance with applicable regulations.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">9. Children's Privacy</h2>
              <p>
                Our services are not intended for children under 13 years old. We do not knowingly collect personal data from minors. If we become aware that such data was submitted, we will delete it immediately.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">10. Third-Party Links</h2>
              <p>
                Our website may link to external sites (e.g. payment providers or property platforms). We are not responsible for their content or privacy practices. Please review their respective policies before using them.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">11. Contact Us</h2>
              <div className="bg-luxury-gold/10 border border-luxury-gold p-6 rounded-lg">
                <p className="font-semibold mb-4">If you have any questions or concerns about this Privacy Policy or how your personal data is handled, contact:</p>
                <div className="space-y-2">
                  <p><strong>Arabian Coast Holiday Homes L.L.C.</strong></p>
                  <p>📍 Dubai, United Arab Emirates</p>
                  <p>📧 info@arabiancoastholidayhomes.com</p>
                  <p>🌐 www.arabiancoastholidayhomes.com</p>
                  <p>🧾 Trade License No: 1453578</p>
                </div>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;