import { motion } from "framer-motion";

const RefundPolicy = () => {
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
            Cancellation and Refund Policy
          </h1>
          
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-luxury-brown space-y-4 sm:space-y-6 break-words overflow-wrap-anywhere">
            <p>
              This Cancellation and Refund Policy applies to all bookings made with Arabian Coast Holiday Homes L.L.C. ("we", "us", "our") via:
            </p>
            
            <ul className="list-disc list-inside space-y-2 mt-4">
              <li>Our official website (www.arabiancoastholidayhomes.com)</li>
              <li>WhatsApp, phone, or email</li>
              <li>In-person</li>
              <li>Third-party platforms (e.g. Airbnb, Booking.com)</li>
            </ul>
            
            <p className="mt-4">
              By confirming a reservation, the Guest agrees to the terms outlined below.
            </p>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">1. How to Cancel a Booking</h2>
              
              <div className="mt-4">
                <h3 className="text-lg font-semibold text-luxury-brown mb-2">A. For Direct Bookings (Website, Email, WhatsApp, Phone):</h3>
                <p>Send a written cancellation request to info@arabiancoastholidayhomes.com, including:</p>
                <ul className="list-disc list-inside space-y-2 mt-2 ml-4">
                  <li>Full name</li>
                  <li>Booking reference</li>
                  <li>The email or phone number used at time of booking</li>
                  <li>A clear request to cancel</li>
                </ul>
                <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded mt-4">
                  <p className="font-semibold">Cancellation is considered received only after written confirmation from Arabian Coast Holiday Homes.</p>
                </div>
              </div>

              <div className="mt-6">
                <h3 className="text-lg font-semibold text-luxury-brown mb-2">B. For Third-Party Bookings:</h3>
                <p>If booked via Airbnb, Booking.com, or another platform, you must cancel directly through the platform, and their cancellation policies will apply.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">2. Standard Cancellation Terms (Direct Bookings)</h2>
              <p>Unless otherwise agreed in writing at the time of booking:</p>
              
              <div className="mt-4 space-y-4">
                <div className="bg-green-50 border-l-4 border-green-500 p-4 rounded">
                  <h3 className="text-lg font-semibold text-green-700 mb-2">✅ Free Cancellation</h3>
                  <ul className="list-disc list-inside space-y-1">
                    <li>Full refund if cancelled at least 5 full days before check-in</li>
                    <li>Transaction, processing, or bank charges (if any) are non-refundable</li>
                  </ul>
                </div>
                
                <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                  <h3 className="text-lg font-semibold text-yellow-700 mb-2">❌ Late Cancellation</h3>
                  <p>If cancelled less than 5 days before check-in, a partial or full charge may apply based on the property type, demand period, and booking terms</p>
                </div>
                
                <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                  <h3 className="text-lg font-semibold text-red-700 mb-2">🚫 No-Show</h3>
                  <p>Bookings are non-refundable for Guests who do not show up and fail to cancel in advance</p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">3. Refund Processing</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Approved refunds are processed within 7–14 business days to the original payment method</li>
                <li>Transaction fees, currency conversion costs, and administrative fees are non-refundable, unless otherwise required by UAE law</li>
                <li>Refund timelines may vary based on the bank or payment processor</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">4. Security Deposit Policy</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>A refundable 2000 AED security deposit is required for all stays (cash or digital)</strong></li>
                <li>Returned within 5 business days after check-out, subject to:
                  <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                    <li>No property damage</li>
                    <li>No missing items</li>
                    <li>No violation of House Rules or Terms</li>
                  </ul>
                </li>
                <li>If deductions are required, we will provide a written breakdown with supporting evidence (e.g. photos, incident report)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">5. Operator Rights</h2>
              <p>Arabian Coast Holiday Homes L.L.C. reserves the right to retain part or all of the booking amount or security deposit in cases including, but not limited to:</p>
              <ul className="list-disc list-inside space-y-2 mt-4">
                <li>Late cancellation or no-show</li>
                <li>Damage to the apartment, furniture, or appliances</li>
                <li>Missing or stolen items</li>
                <li>Violation of House Rules, such as:
                  <ul className="list-disc list-inside space-y-1 mt-2 ml-4">
                    <li>Unauthorized parties or gatherings</li>
                    <li>Smoking inside the apartment</li>
                    <li>Bringing unapproved pets</li>
                    <li>Excessive mess or cleaning required</li>
                    <li>Misuse of facilities or unauthorized visitors</li>
                  </ul>
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">6. Guest Agreement</h2>
              <div className="bg-luxury-gold/10 border border-luxury-gold p-6 rounded-lg">
                <p className="font-semibold mb-4">By completing a booking, you confirm acceptance of:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Our Reservation Terms & Conditions</li>
                  <li>This Cancellation and Refund Policy</li>
                  <li>Our House Rules (provided before or at check-in)</li>
                  <li>Our Terms & Conditions and Privacy Policy</li>
                </ul>
                <p className="mt-4 font-semibold">These documents together form the binding Guest Agreement.</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">7. Governing Law & Jurisdiction</h2>
              <p>
                This policy is governed by the laws of the United Arab Emirates. Any dispute arising from this policy shall be subject to the exclusive jurisdiction of the courts of Dubai.
              </p>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RefundPolicy;