
import React from 'react';
import { AspectRatio } from '../ui/aspect-ratio';
import { Card, CardContent } from '../ui/card';
import { cn } from '../../lib/utils';

interface CarImageGalleryProps {
  images: string[];
  brand: string;
  model: string;
  activeImageIndex: number;
  setActiveImageIndex: (index: number) => void;
}

export const CarImageGallery = ({ 
  images, 
  brand, 
  model, 
  activeImageIndex, 
  setActiveImageIndex 
}: CarImageGalleryProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-md hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-0">
        <div className="mb-4">
          <AspectRatio ratio={4/3}>
            <img
              src={images[activeImageIndex]}
              alt={`${brand} ${model}`}
              className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
            />
          </AspectRatio>
        </div>
        
        <div className="grid grid-cols-3 gap-2 p-4">
          {images.map((image: string, index: number) => (
            <div
              key={index}
              className={cn(
                "cursor-pointer rounded-md overflow-hidden transition-all duration-300 hover:opacity-100",
                index === activeImageIndex 
                  ? "ring-2 ring-automotive-600 scale-[0.98]" 
                  : "opacity-70 hover:scale-95"
              )}
              onClick={() => setActiveImageIndex(index)}
            >
              <AspectRatio ratio={4/3}>
                <img
                  src={image}
                  alt={`${brand} ${model} - Vista ${index + 1}`}
                  className="w-full h-full object-cover"
                />
              </AspectRatio>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};
