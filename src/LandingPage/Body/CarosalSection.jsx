import React, { useEffect, useRef, useState } from 'react';
import carosalimage1 from '../../assets/landingPage/section1/carosalimage1.jpeg';
import carosalimage2 from '../../assets/carosal7.jpg';
import carosalimage3 from '../../assets/carosal9.jpg';
import carosalimage4 from '../../assets/carosal8.jpg';
import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io';

const CarouselSection = () => {
  const images = [carosalimage1, carosalimage2, carosalimage3, carosalimage4];
  const [curr, setCurr] = useState(0);
  const timeoutRef = useRef(null);

  const resetTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };

  const next = () => {
    setCurr((prev) => (prev === images.length - 1 ? 0 : prev + 1));
    resetTimeout();
  };

  const prev = () => {
    setCurr((prev) => (prev === 0 ? images.length - 1 : prev - 1));
    resetTimeout();
  };

  useEffect(() => {
    timeoutRef.current = setTimeout(() => {
      next();
    }, 3000);
    return () => {
      resetTimeout();
    };
  }, [curr]);

  return (
    <div className="carosal">
      {/* Images */}
      <div
        className="carosalimages-wrapper"
        style={{
          display: 'flex',
          transform: `translateX(-${curr * 100}%)`,
          transition: 'transform 0.5s ease-in-out',
        }}
      >
        {images.map((image, index) => (
          <div key={index} className="carosalimage_div">
            <img src={image} alt={`carousel-${index}`} />
          </div>
        ))}
      </div>

      {/* Buttons */}
      <div className="carosalbtn_div">
        <button onClick={prev}>
          <IoIosArrowBack />
        </button>
        <button onClick={next}>
          <IoIosArrowForward />
        </button>
      </div>

      {/* Dots */}
      <div className="carosaldot_div">
        {images.map((_, index) => (
          <div
            key={index}
            className={curr === index ? 'carosalindexdot' : 'carosalnotindexdot'}
            onClick={() => setCurr(index)}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default CarouselSection;
