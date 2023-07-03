import React, { useEffect, useRef } from 'react';

function LazyImage({ src, alt }) {
  const imageRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            loadImage();
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1 }
    );

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current);
      }
    };
  }, []);

  const loadImage = () => {
    fetch(src)
      .then((response) => response.blob())
      .then((blob) => {
        const objectURL = URL.createObjectURL(blob);
        imageRef.current.src = objectURL;
      })
      .catch((error) => {
        console.log('Error loading image:', error);
      });
  };

  return <img ref={imageRef} alt={alt} />;
}

export default LazyImage;
