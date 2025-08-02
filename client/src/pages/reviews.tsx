import { ReviewsSection } from "@/components/reviews-section";
import { AdminReviewForm } from "@/components/admin-review-form";

export default function Reviews() {
  return (
    <div className="min-h-screen pt-40 pb-16 bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 mt-8">
          <h1 className="text-3xl md:text-4xl luxury-heading text-luxury-brown mb-4">
            What guests say about us
          </h1>
        </div>

        <ReviewsSection showTitle={false} />

        {/* Admin Section for Adding Reviews */}
        <div className="mt-16">
          <AdminReviewForm />
        </div>
      </div>
    </div>
  );
}
