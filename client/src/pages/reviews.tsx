import { ReviewsSection } from "@/components/reviews-section";
import { AdminReviewForm } from "@/components/admin-review-form";

export default function Reviews() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
            Guest Reviews & Testimonials
          </h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover what our valued guests have to say about their unforgettable experiences 
            at Arabian Coast Holiday Homes. Every review is from verified guests who have 
            stayed with us.
          </p>
        </div>
        
        <ReviewsSection showTitle={false} />
        
        {/* Admin Section for Adding Reviews */}
        <div className="mt-16">
          <AdminReviewForm />
        </div>
        
        <div className="mt-16 text-center">
          <div className="bg-white rounded-lg p-8 shadow-lg border-2 border-amber-100 max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-amber-900 mb-4">
              Ready to Create Your Own Memory?
            </h2>
            <p className="text-gray-600 mb-6">
              Join hundreds of satisfied guests who have experienced luxury and comfort 
              in the heart of Dubai.
            </p>
            <a
              href="/contact"
              className="inline-block bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-lg font-semibold hover:from-amber-700 hover:to-orange-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              Book Your Stay Today
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}