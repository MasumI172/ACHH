import { motion } from "framer-motion";

const HouseRules = () => {
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
            House Rules
          </h1>
          
          <div className="prose prose-sm sm:prose-base lg:prose-lg max-w-none text-luxury-brown space-y-4 sm:space-y-6 break-words overflow-wrap-anywhere">
            <p>
              By booking with Arabian Coast Holiday Homes L.L.C. ("we", "us", "our"), all Guests and Visitors agree to abide by these House Rules. These are in place to ensure safety, protect community standards, and comply with Dubai building and tourism regulations.
            </p>
            
            <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded mt-4">
              <p className="font-semibold">
                Violation of these rules may result in eviction without refund, forfeiture of the security deposit, and/or fines as applicable under UAE law.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">1. Residential Conduct</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All our properties are located in family-oriented residential communities.</li>
                <li>Guests and Visitors must behave respectfully and avoid any disruptive, unlawful, or inappropriate conduct.</li>
                <li>Commercial, business, or illegal activities are strictly prohibited on the premises.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">2. Guest & Visitor Registration</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All Guests and Visitors must be pre-registered with valid ID (passport or Emirates ID) at least 24 hours prior to arrival.</li>
                <li>This is required for access and to comply with Dubai DET regulations.</li>
                <li>Guests are fully responsible for the conduct of their Visitors.</li>
                <li>Unregistered visitors may be denied access by building management.</li>
                <li>Overnight stays by Visitors are not permitted without prior written approval.</li>
                <li>Access to shared facilities (e.g., pool, gym) may be restricted by building rules.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">3. Check-In / Check-Out</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Check-in:</strong> From 3:00 PM</li>
                <li><strong>Check-out:</strong> Strictly by 11:00 AM</li>
                <li>Late check-out without prior written approval will incur a full-night charge.</li>
                <li>Guests must inspect the apartment upon arrival and report any issues within 24 hours.</li>
                <li>The property must be left in a clean and tidy condition at check-out to avoid deductions from the security deposit.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">4. Noise & Neighbor Relations</h2>
              <ul className="list-disc list-inside space-y-2">
                <li><strong>Quiet hours:</strong> 10:00 PM – 7:00 AM</li>
                <li>No loud music, shouting, or disruptive noise — even with windows and doors closed.</li>
                <li>Guests must not enter or interfere with neighboring units or shared areas not designated for use.</li>
                <li>Any disputes with neighbors must be reported immediately to us for handling.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">5. Parties & Gatherings</h2>
              <div className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <ul className="list-disc list-inside space-y-2">
                  <li><strong>Strictly prohibited:</strong> Parties, events, or gatherings of any kind.</li>
                  <li>Violation will result in immediate eviction and forfeiture of the full security deposit.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">6. Community Facilities</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Shared amenities (e.g., pool, gym) are subject to building-specific rules and hours.</li>
                <li>No glassware allowed in pool areas.</li>
                <li>Use facilities at your own risk; children must be supervised at all times.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">7. Child Safety</h2>
              <p>Children must be supervised by an adult at all times, including:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Inside the apartment</li>
                <li>On balconies</li>
                <li>In common/shared areas</li>
              </ul>
              <p className="mt-4">We are not liable for injuries resulting from lack of supervision.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">8. Smoking Policy</h2>
              <div className="bg-yellow-50 border-l-4 border-yellow-500 p-4 rounded">
                <ul className="list-disc list-inside space-y-2">
                  <li>Smoking is strictly prohibited indoors, including all rooms, bathrooms, and hallways.</li>
                  <li>Smoking is permitted on balconies only, provided windows and doors remain closed to avoid indoor smoke transfer.</li>
                  <li>Any evidence of indoor smoking will result in deep cleaning fees and potential security deposit deductions.</li>
                </ul>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">9. BBQ Use</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>No BBQs allowed indoors or on balconies.</li>
                <li>BBQs may only be used in designated building areas with prior written approval.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">10. Pet Policy</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>No pets allowed unless approved in writing prior to check-in.</li>
                <li>Pet-friendly apartments are limited and subject to additional fees and signed terms.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">11. Property Condition</h2>
              <p>Guests must:</p>
              <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Keep the property in a clean, damage-free condition</li>
                <li>Report any issues within 24 hours of check-in</li>
              </ul>
              <p className="mt-4">Damage not reported within this timeframe may result in deductions from the security deposit.</p>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">12. Waste Disposal</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>All rubbish must be disposed of in designated building bins.</li>
                <li>Do not leave trash in hallways, stairwells, or balconies.</li>
                <li>Follow community recycling and waste separation guidelines.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">13. Parking</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Parking is only allowed in assigned or pre-approved spaces.</li>
                <li>Unauthorized parking may result in fines or towing at the Guest's expense.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">14. Property Modifications</h2>
              <ul className="list-disc list-inside space-y-2">
                <li>Guests may not install, mount, or modify any furniture, fixtures, or fittings.</li>
                <li>Any damage from unauthorized modifications will be charged to the Guest.</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">15. Emergencies</h2>
              <div className="bg-luxury-cream/30 p-4 rounded-lg">
                <p>For urgent issues during your stay, please contact us on:</p>
                <p className="text-xl font-semibold text-luxury-brown mt-2">📞 +971 55 816 6062</p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">16. Definitions</h2>
              <ul className="list-none space-y-2">
                <li><strong>Guest:</strong> The person who made the reservation and is legally responsible for the booking.</li>
                <li><strong>Visitor:</strong> Any person not included in the reservation but present at the property.</li>
                <li><strong>Operator:</strong> Arabian Coast Holiday Homes L.L.C.</li>
                <li><strong>DTCM / DET:</strong> Dubai's Department of Economy and Tourism</li>
                <li><strong>TDF:</strong> Tourism Dirham Fee</li>
                <li><strong>PSC:</strong> Property Service Charge</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-semibold text-luxury-gold mb-4">17. Agreement Acknowledgement</h2>
              <div className="bg-luxury-gold/10 border border-luxury-gold p-6 rounded-lg">
                <p className="font-semibold mb-4">By staying at a property managed by Arabian Coast Holiday Homes, you confirm that you have read, understood, and agreed to:</p>
                <ul className="list-disc list-inside space-y-2">
                  <li>Our Terms & Conditions</li>
                  <li>Our Privacy Policy</li>
                  <li>This House Rules document</li>
                  <li>Our Reservation Terms & Conditions and Cancellation Policy (provided during booking)</li>
                </ul>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default HouseRules;