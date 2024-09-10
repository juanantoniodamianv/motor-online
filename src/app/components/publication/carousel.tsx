import Image from "next/image";
import { Carousel as FlowbiteCarousel } from "flowbite-react";

type CarouselProps = {
  fileUrls: string[];
};

export default function Carousel({ fileUrls }: CarouselProps) {
  return (
    <div className="relative w-full">
      <FlowbiteCarousel
        className="relative h-56 overflow-hidden rounded-lg md:h-96"
        slide={false}
      >
        {fileUrls.map((fileUrl, index) => (
          <Image
            src={fileUrl}
            loading="lazy"
            width={415}
            height={224}
            key={index}
            alt="Publication image"
            className="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          />
        ))}
      </FlowbiteCarousel>
    </div>
  );
}
