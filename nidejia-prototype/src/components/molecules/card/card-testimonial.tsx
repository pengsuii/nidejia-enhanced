import Image from 'next/image';
import CardStar from '@/components/molecules/card/card-star';
import Title from '@/components/atomics/title';
import PixelCard from '@/components/atomics/pixel-card';

interface CardTestimonialProps {
  rating: number;
  review: string;
  avatar: string;
  username: string;
  jobdesk: string;
  isVerified?: boolean;
  listingTitle?: string;
  date?: string;
  isFeatured?: boolean;
  variant?: 'default' | 'featured' | 'compact';
}

function CardTestimonial({
  rating,
  review,
  avatar,
  username,
  jobdesk,
  isVerified = false,
  listingTitle,
  date,
  isFeatured = false,
  variant = 'default'
}: CardTestimonialProps) {
  return (
    <div className="relative">
      <PixelCard variant='yellow' className='bg-gray-light rounded-[20px] px-5 py-4'>
        <figure className='relative space-y-5'>
          <div className="flex items-center justify-between">
            <CardStar rating={rating} variant='review'/>
            {isVerified && (
              <div className="flex items-center text-green-600">
                <span className="text-xs mr-1">✓</span>
                <span className="text-xs font-medium">Verified</span>
              </div>
            )}
          </div>
          
          <span className='block text-secondary text-lg leading-8'>
            {review}
          </span>
          
          <div className='flex items-center space-x-3'>
            <Image
              src={avatar}
              alt='avatar'
              height={0}
              width={0}
              className='h-[50px] w-[50px] rounded-full'
            />
            <div className="flex-1">
              <Title
                title={username}
                subtitle={jobdesk}
                section='header'
              />
              {listingTitle && (
                <p className="text-xs text-subtitle mt-1">
                  Property: {listingTitle}
                </p>
              )}
              {date && (
                <p className="text-xs text-subtitle">
                  {new Date(date).toLocaleDateString('id-ID', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </p>
              )}
            </div>
          </div>
        </figure>
      </PixelCard>
    </div>
  );
}

export default CardTestimonial;
