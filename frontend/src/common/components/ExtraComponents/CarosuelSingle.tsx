import React, { useState } from 'react';

interface CarouselProps {
  images: string[];
}

const CarouselSingle: React.FC<CarouselProps> = ({ images }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const goToPrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? images.length - 1 : prevIndex - 1));
  };

  const goToNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex === images.length - 1 ? 0 : prevIndex + 1));
  };

  return (
    <div className="relative">
      <div className="flex overflow-x-auto">
        {images.map((imageUrl, index) => (
          <div key={index} className={`w-full ${index !== currentIndex ? 'hidden' : ''}`}>
            <img src={imageUrl}  alt={`Image ${index + 1}`} className="w-full min-h-96 rounded-lg" />
          </div>
        ))}
      </div>
      <button className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={goToPrevious}>
      <i className="fa-duotone fa-arrow-left" />

      </button>
      <button className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-300 hover:bg-gray-100 text-gray-800 font-bold py-2 px-4 rounded-full" onClick={goToNext}>
      <i className="fa-duotone fa-arrow-right" />

      </button>
    </div>
  );
};

export default CarouselSingle;
