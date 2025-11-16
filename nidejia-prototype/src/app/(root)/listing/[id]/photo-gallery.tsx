import { Button } from "@/components/atomics/button";
import Image from "next/image";

function PhotoGallery({photos} : {photos: string[]}) {
  return (
    <div className="mt-[30px] grid grid-cols-3 xl:grid-cols-4 gap-x-5">
      <div className="col-span-2 xl:col-span-3 relative">
        <Image
          src={photos[0]?.startsWith('http') ? photos[0] : `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL || 'http://127.0.0.1:8000/storage'}/${photos[0]}`}
          alt="image-1"
          height={0}
          width={0}
          className="w-full h-[520px] rounded-[30px] object-cover"
          unoptimized
          onError={(e) => {
            console.log('Photo gallery image error:', photos[0]);
            e.currentTarget.style.display = 'none';
          }}
        />

        <div className="absolute bottom-[30px] right-[30px]">
          <Button className="flex" variant="third">
            <Image
              src="/icons/direct-right.svg"
              alt="direct-right"
              height={24}
              width={24}
              className="mr-2.5"
            />
            Start Virtual Tour
          </Button>
        </div>
      </div>
      {photos.length > 1 && (
        <div className="space-y-5">
        {photos?.[1] && (
          <Image
          src={photos[1]?.startsWith('http') ? photos[1] : `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL || 'http://127.0.0.1:8000/storage'}/${photos[1]}`}
          alt="image-2"
          height={0}
          width={0}
          className="w-full h-[160px] rounded-[20px] object-cover"
          unoptimized
          onError={(e) => {
            console.log('Photo gallery image 2 error:', photos[1]);
            e.currentTarget.style.display = 'none';
          }}
        />
        )}
        {photos?.[2] && (
          <Image
          src={photos[2]?.startsWith('http') ? photos[2] : `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL || 'http://127.0.0.1:8000/storage'}/${photos[2]}`}
          alt="image-3"
          height={0}
          width={0}
          className="w-full h-[160px] rounded-[20px] object-cover"
          unoptimized
          onError={(e) => {
            console.log('Photo gallery image 3 error:', photos[2]);
            e.currentTarget.style.display = 'none';
          }}
        />
        )}
        {photos?.[3] && (
          <Image
          src={photos[3]?.startsWith('http') ? photos[3] : `${process.env.NEXT_PUBLIC_STORAGE_BASE_URL || 'http://127.0.0.1:8000/storage'}/${photos[3]}`}
          alt="image-4"
          height={0}
          width={0}
          className="w-full h-[160px] rounded-[20px] object-cover"
          unoptimized
          onError={(e) => {
            console.log('Photo gallery image 4 error:', photos[3]);
            e.currentTarget.style.display = 'none';
          }}
        />
        )}
      </div>
      )}
    </div>
  );
}

export default PhotoGallery;
