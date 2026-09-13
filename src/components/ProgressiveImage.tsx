import React, { useState, useEffect } from 'react';

interface ProgressiveImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  src: string;
  placeholderSrc?: string;
  blur?: boolean;
}

export const ProgressiveImage: React.FC<ProgressiveImageProps> = ({ 
  src, 
  placeholderSrc, 
  blur = true,
  className = '', 
  alt = '',
  ...props 
}) => {
  // A tiny 1x1 transparent base64 image as default placeholder if none provided
  const defaultPlaceholder = 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkYAAAAAYAAjCB0C8AAAAASUVORK5CYII=';
  const [imgSrc, setImgSrc] = useState(placeholderSrc || defaultPlaceholder);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // Reset state if src changes
    setIsLoaded(false);
    setImgSrc(placeholderSrc || defaultPlaceholder);

    const img = new Image();
    img.src = src;
    
    img.onload = () => {
      setImgSrc(src);
      setIsLoaded(true);
    };
    
    img.onerror = () => {
      console.warn(`Failed to progressively load image: ${src}`);
      // Fallback to original src so browser handles broken image icon
      setImgSrc(src); 
    };
  }, [src, placeholderSrc]);

  return (
    <img
      {...props}
      src={imgSrc}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={`${className} transition-all duration-700 ease-in-out ${
        !isLoaded && blur ? 'blur-sm opacity-50' : 'blur-0 opacity-100'
      }`}
    />
  );
};
