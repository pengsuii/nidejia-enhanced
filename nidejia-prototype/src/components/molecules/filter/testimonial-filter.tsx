"use client";
import { useState } from 'react';
import { Button } from '@/components/atomics/button';

interface TestimonialFilterProps {
  onFilterChange: (filters: FilterState) => void;
}

interface FilterState {
  rating: number | null;
  verified: boolean | null;
  featured: boolean | null;
}

export default function TestimonialFilter({ onFilterChange }: TestimonialFilterProps) {
  const [filters, setFilters] = useState<FilterState>({
    rating: null,
    verified: null,
    featured: null
  });

  const handleFilterChange = (key: keyof FilterState, value: any) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFilterChange(newFilters);
  };

  return (
    <div className="flex flex-wrap gap-4 mb-8 justify-center">
      {/* Rating Filter */}
      <div className="flex gap-2 items-center">
        <span className="text-sm font-medium text-secondary">Rating:</span>
        {[5, 4, 3, 2, 1].map((rating) => (
          <Button
            key={rating}
            variant={filters.rating === rating ? "default" : "third"}
            size="button"
            className={filters.rating === rating ? "shadow-button" : ""}
            onClick={() => handleFilterChange('rating', filters.rating === rating ? null : rating)}
          >
            {rating}+ Stars
          </Button>
        ))}
      </div>

      {/* Verified Filter */}
      <Button
        variant={filters.verified ? "default" : "third"}
        size="button"
        className={filters.verified ? "shadow-button" : ""}
        onClick={() => handleFilterChange('verified', !filters.verified)}
      >
        Verified Only
      </Button>

      {/* Featured Filter */}
      <Button
        variant={filters.featured ? "default" : "third"}
        size="button"
        className={filters.featured ? "shadow-button" : ""}
        onClick={() => handleFilterChange('featured', !filters.featured)}
      >
        Featured Only
      </Button>

      {/* Clear Filters */}
      <Button
        variant="third"
        size="button"
        onClick={() => {
          setFilters({ rating: null, verified: null, featured: null });
          onFilterChange({ rating: null, verified: null, featured: null });
        }}
      >
        Clear All
      </Button>
    </div>
  );
}
