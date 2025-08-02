import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { apiRequest } from "@/lib/queryClient";

const reviewFormSchema = z.object({
  guestName: z.string().min(2, "Guest name must be at least 2 characters"),
  guestLocation: z.string().optional(),
  propertyId: z.number().min(1, "Please select a property"),
  rating: z.number().min(1).max(5, "Rating must be between 1 and 5"),
  title: z.string().optional(),
  content: z.string().min(10, "Review content must be at least 10 characters"),
  stayDate: z.string().optional(),
  featured: z.boolean().default(false),
  verified: z.boolean().default(true),
});

type ReviewFormData = z.infer<typeof reviewFormSchema>;

interface AdminReviewFormProps {
  onSuccess?: () => void;
}

export function AdminReviewForm({ onSuccess }: AdminReviewFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const form = useForm<ReviewFormData>({
    resolver: zodResolver(reviewFormSchema),
    defaultValues: {
      guestName: "",
      guestLocation: "",
      propertyId: 15, // Default to the main property
      rating: 5,
      title: "",
      content: "",
      stayDate: "",
      featured: false,
      verified: true,
    },
  });

  const createReviewMutation = useMutation({
    mutationFn: async (data: ReviewFormData) => {
      const reviewData = {
        ...data,
        stayDate: data.stayDate ? new Date(data.stayDate).toISOString() : null,
      };
      return apiRequest("/api/reviews", {
        method: "POST",
        body: JSON.stringify(reviewData),
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/reviews"] });
      toast({
        title: "Success",
        description: "Review added successfully!",
      });
      form.reset();
      setIsOpen(false);
      onSuccess?.();
    },
    onError: (error: Error) => {
      toast({
        title: "Error",
        description: error.message || "Failed to add review",
        variant: "destructive",
      });
    },
  });

  const onSubmit = (data: ReviewFormData) => {
    createReviewMutation.mutate(data);
  };

  return (
    <div className="mb-8">
      {!isOpen ? (
        <Button 
          onClick={() => setIsOpen(true)}
          className="bg-amber-600 hover:bg-amber-700 text-white"
        >
          Add New Review
        </Button>
      ) : (
        <Card className="max-w-2xl mx-auto">
          <CardHeader>
            <CardTitle className="text-amber-900">Add New Guest Review</CardTitle>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="guestName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Name</FormLabel>
                        <FormControl>
                          <Input placeholder="John Smith" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="guestLocation"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Guest Location</FormLabel>
                        <FormControl>
                          <Input placeholder="London, UK" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <FormField
                    control={form.control}
                    name="rating"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Rating</FormLabel>
                        <Select onValueChange={(value) => field.onChange(parseInt(value))}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select rating" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            <SelectItem value="5">5 Stars</SelectItem>
                            <SelectItem value="4">4 Stars</SelectItem>
                            <SelectItem value="3">3 Stars</SelectItem>
                            <SelectItem value="2">2 Stars</SelectItem>
                            <SelectItem value="1">1 Star</SelectItem>
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="stayDate"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Stay Date</FormLabel>
                        <FormControl>
                          <Input type="date" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review Title (Optional)</FormLabel>
                      <FormControl>
                        <Input placeholder="Amazing stay in Dubai!" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="content"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Review Content</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder="Tell us about your experience..."
                          rows={4}
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <div className="flex items-center space-x-6">
                  <FormField
                    control={form.control}
                    name="featured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                        <div className="space-y-0.5">
                          <FormLabel className="text-base">Featured Review</FormLabel>
                          <div className="text-sm text-muted-foreground">
                            Display this review prominently on the homepage
                          </div>
                        </div>
                        <FormControl>
                          <Switch
                            checked={field.value}
                            onCheckedChange={field.onChange}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>

                <div className="flex space-x-4">
                  <Button 
                    type="submit" 
                    disabled={createReviewMutation.isPending}
                    className="bg-amber-600 hover:bg-amber-700"
                  >
                    {createReviewMutation.isPending ? "Adding..." : "Add Review"}
                  </Button>
                  <Button 
                    type="button" 
                    variant="outline" 
                    onClick={() => setIsOpen(false)}
                  >
                    Cancel
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      )}
    </div>
  );
}