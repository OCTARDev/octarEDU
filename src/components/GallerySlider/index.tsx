import Image from 'next/image';
import { useState, useEffect, useCallback } from 'react';
import { FaChevronLeft, FaChevronRight, FaPause, FaPlay } from 'react-icons/fa';
interface GalleryImage {
  id: number;
  src: string;
  alt: string;
  title: string;
}

interface GallerySliderProps {
  images?: GalleryImage[];
  autoPlayInterval?: number;
  showThumbnails?: boolean;
  showCounter?: boolean;
  showAutoPlayToggle?: boolean;
}


const GallerySlider: React.FC<GallerySliderProps> = ({
  images: propImages,
  autoPlayInterval = 4000,
  showThumbnails = true,
  showCounter = true,
  showAutoPlayToggle = true
}) => {


  const images = propImages || [] ;

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(true);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);

  // Memoize nextSlide to avoid recreating it on every render
  const nextSlide = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  }, [isTransitioning, images.length]);

  // Auto-play functionality
  useEffect(() => {
    if (!isAutoPlay) return;
    const interval = setInterval(() => {       
      nextSlide();
    }, 4000);
    return () => clearInterval(interval);
  }, [isAutoPlay, nextSlide]);

  const prevSlide = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const goToSlide = (index:any) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 300);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlay(!isAutoPlay);
  };

  return (
    <div className=" mx-auto bg-white shadow-2xl overflow-hidden">
      {/* Main slider container */}
      <div className="relative h-96 md:h-[500px] overflow-hidden bg-gray-900">
        {/* Images */}
        <div 
          className="flex transition-transform duration-300 ease-in-out h-full"
          style={{ transform: `translateX(-${currentIndex * 100}%)` }}
        >
          {images.map((image, index) => (
            <div key={image.id} className="w-full h-full flex-shrink-0 relative">
              <Image
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-fill"
                loading={index === 0 ? 'eager' : 'lazy'}
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <h3 className="text-xl md:text-2xl font-bold mb-1">{image.title}</h3>
                {/* <p className="text-sm md:text-base opacity-90">{image.alt}</p> */}
              </div>
            </div>
          ))}
        </div>

        {/* Navigation arrows */}
        {
          images?.length > 1 &&
          <>
          <button
          onClick={prevSlide}
          disabled={isTransitioning}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-3 text-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
        </button>
        
        <button
          onClick={nextSlide}
          disabled={isTransitioning}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 md:p-3 text-white transition-all duration-200 hover:scale-110 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <FaChevronRight className="w-5 h-5 md:w-6 md:h-6" />
        </button>

          </>
        }
        
        {/* Auto-play toggle */}
        {
          images?.length > 1 && 
        <button
          onClick={toggleAutoPlay}
          className="absolute  top-4 right-4 bg-black/50 hover:bg-white/30 backdrop-blur-sm rounded-full p-2 text-white hover:text-black transition-all duration-200 hover:scale-110"
        >
          {isAutoPlay ? (
            <FaPause className="w-4 h-4" />
          ) : (
            <FaPlay className="w-4 h-4" />
          )}
        </button>
        }
        

        {/* Slide counter */}
        {
          images?.length > 1 &&
        <div className="absolute top-4 left-4 bg-black/30 backdrop-blur-sm rounded-full px-3 py-1 text-white text-sm">
          {currentIndex + 1} / {images.length}
        </div>
        }
        
      </div>

      {/* Thumbnail indicators */}
      {
        images?.length > 1 && 
      <div className="flex justify-center items-center gap-3 p-4 bg-gray-50">
        {images.map((image, index) => (
          <button
            key={image.id}
            onClick={() => goToSlide(index)}
            disabled={isTransitioning}
            className={`relative w-16 h-12 md:w-20 md:h-14 rounded-lg overflow-hidden transition-all duration-200 hover:scale-105 disabled:cursor-not-allowed ${
              index === currentIndex 
                ? 'ring-2 ring-blue-500 ring-offset-2' 
                : 'opacity-60 hover:opacity-80'
            }`}
          >
            <Image
              src={image.src}
              alt={image.alt}
              className="w-full h-full object-cover"
              fill
            />
            {index === currentIndex && (
              <div className="absolute inset-0 bg-blue-500/20" />
            )}
          </button>
        ))}
      </div>
      }
      

      {/* Progress bar */}
{/*       <div className="h-1 bg-gray-200">
        <div 
          className="h-full bg-blue-500 transition-all duration-300 ease-out"
          style={{ width: `${((currentIndex + 1) / images.length) * 100}%` }}
        />
      </div> */}
    </div>
  );
};

export default GallerySlider;