export interface TestimonialProps {
  id: number;
  rating: number;
  review: string;
  avatar: string;
  username: string;
  jobdesk: string;
  isVerified?: boolean;
  listingTitle?: string;
  date?: string;
  isFeatured?: boolean;
}

export interface TestimonialStatistics {
  averageRating: number;
  totalReviews: number;
  satisfactionRate: number;
  verifiedReviews: number;
}

export interface TestimonialFilters {
  rating?: number | null;
  verified?: boolean | null;
  featured?: boolean | null;
  search?: string;
}

export interface TestimonialResponse {
  data: TestimonialProps[];
  statistics: TestimonialStatistics;
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
}
