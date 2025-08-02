import { ReviewsSection } from "@/components/reviews-section";
import { AdminReviewForm } from "@/components/admin-review-form";

export default function Reviews() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 to-orange-50">
      <div className="container mx-auto px-4 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-amber-900 mb-4">
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
