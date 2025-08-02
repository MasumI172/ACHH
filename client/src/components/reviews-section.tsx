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
}

export function ReviewsSection({ 
  propertyId, 
  featured = false, 
  className = "",
  showTitle = true,
  maxReviews
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
          <h2 className="text-3xl font-bold text-amber-900 mb-2">What Our Guests Say</h2>
          <p className="text-gray-600">Real experiences from verified guests</p>
        </div>
      )}
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {displayReviews.map((review) => (
          <Card key={review.id} className="h-full flex flex-col bg-white border-2 border-amber-100 hover:border-amber-200 transition-colors shadow-lg">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < review.rating 
                          ? "fill-amber-400 text-amber-400" 
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm font-medium text-amber-900">
                    {review.rating}/5
                  </span>
                </div>
                {review.verified && (
                  <Badge variant="secondary" className="bg-green-100 text-green-800 text-xs">
                    Verified
                  </Badge>
                )}
              </div>
              
              {review.title && (
                <h3 className="font-semibold text-lg text-gray-900 leading-tight">
                  {review.title}
                </h3>
              )}
              
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="font-medium">{review.guestName}</span>
                {review.guestLocation && (
                  <span className="text-gray-500">{review.guestLocation}</span>
                )}
              </div>
              
              {review.stayDate && (
                <p className="text-xs text-gray-500">
                  Stayed {format(new Date(review.stayDate), 'MMMM yyyy')}
                </p>
              )}
            </CardHeader>
            
            <CardContent className="flex-grow">
              <p className="text-gray-700 leading-relaxed text-sm">
                {review.content}
              </p>
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