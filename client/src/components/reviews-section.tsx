import { useQuery } from "@tanstack/react-query";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import type { Review } from "@shared/schema";

interface ReviewsSectionProps {
  propertyId?: number;
  featured?: boolean;
  className?: string;
  showTitle?: boolean;
  maxReviews?: number;
  propertyName?: string;
}

export function ReviewsSection({ 
  propertyId, 
  featured = false, 
  className = "",
  showTitle = true,
  maxReviews,
  propertyName
}: ReviewsSectionProps) {
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: propertyId ? ['/api/reviews', propertyId] : featured ? ['/api/reviews', 'featured'] : ['/api/reviews'],
    queryFn: async () => {
      const params = new URLSearchParams();
      if (propertyId) params.append('propertyId', propertyId.toString());
      if (featured) params.append('featured', 'true');
      
      const response = await fetch(`/api/reviews?${params}`);
      if (!response.ok) throw new Error('Failed to fetch reviews');
      return response.json();
    }
  });

  if (isLoading) {
    return (
      <div className={`space-y-4 ${className}`}>
        {showTitle && <h2 className="text-2xl font-bold text-amber-900">Guest Reviews</h2>}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader className="pb-3">
                <div className="h-4 bg-gray-200 rounded w-2/3"></div>
                <div className="h-3 bg-gray-200 rounded w-1/2"></div>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-3 bg-gray-200 rounded"></div>
                  <div className="h-3 bg-gray-200 rounded w-4/5"></div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  const displayReviews = maxReviews ? reviews.slice(0, maxReviews) : reviews;

  if (displayReviews.length === 0) {
    return (
      <div className={`text-center py-8 ${className}`}>
        {showTitle && <h2 className="text-2xl font-bold text-amber-900 mb-4">Guest Reviews</h2>}
        <p className="text-gray-600">No reviews yet. Be the first to share your experience!</p>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      {showTitle && (
        <div className="text-center">
          <h2 className="text-3xl font-bold text-black mb-2">What Our Guests Say</h2>
          <p className="text-gray-600">{propertyName || "Real experiences from verified guests"}</p>
        </div>
      )}
      
      <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
        {displayReviews.map((review, index) => (
          <Card key={review.id} className="h-full flex flex-col luxury-card luxury-shadow group hover:scale-105 transition-all duration-500 border-0 relative overflow-hidden">
            {/* Luxury border accent */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-luxury-gold to-luxury-dark-gold"></div>
            
            <CardHeader className="pb-4 relative">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < review.rating 
                          ? "fill-yellow-400 text-yellow-400 drop-shadow-md" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                {review.verified && (
                  <Badge className="bg-gradient-to-r from-emerald-500 to-teal-600 text-white border-0 text-xs font-medium shadow-md">
                    ✓ Verified Guest
                  </Badge>
                )}
              </div>
              
              {review.title && (
                <h3 className="font-bold text-xl text-luxury-brown leading-tight luxury-subheading mb-3">
                  {review.title}
                </h3>
              )}
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col">
                  <span className="font-bold text-luxury-brown luxury-serif text-lg">{review.guestName}</span>
                  {review.guestLocation && (
                    <span className="text-luxury-light-brown text-sm font-medium">{review.guestLocation}</span>
                  )}
                </div>
                {review.stayDate && (
                  <div className="text-right">
                    <p className="text-xs text-luxury-light-brown uppercase tracking-wider font-medium">
                      {format(new Date(review.stayDate), 'MMM yyyy')}
                    </p>
                  </div>
                )}
              </div>
            </CardHeader>
            
            <CardContent className="flex-grow relative">
              <p className="text-gray-700 leading-relaxed text-sm font-normal">
                {review.content}
              </p>
              
              {/* Decorative bottom accent */}
              <div className="absolute bottom-0 left-0 w-12 h-px bg-gradient-to-r from-luxury-gold to-transparent mt-4"></div>
            </CardContent>
          </Card>
        ))}
      </div>
      
      {maxReviews && reviews.length > maxReviews && (
        <div className="text-center">
          <p className="text-gray-600">
            Showing {maxReviews} of {reviews.length} reviews
          </p>
        </div>
      )}
    </div>
  );
}