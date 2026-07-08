import React, { useState, useRef, useEffect } from 'react';
import theme from '../../theme';

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
  placeholderColor?: string;
}

const LazyImage: React.FC<LazyImageProps> = ({
  src,
  alt,
  className = '',
  style = {},
  placeholderColor = theme.colors.inputBg,
}) => {
  const [loaded, setLoaded] = useState(false);
  const [inView, setInView] = useState(false);
  const imgRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { rootMargin: '200px' }
    );
    if (imgRef.current) observer.observe(imgRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="lazy-img-wrapper"
      style={{ background: placeholderColor, ...style }}
    >
      {!loaded && <div className="skeleton-overlay" />}
      <img
        ref={imgRef}
        src={inView ? src : undefined}
        alt={alt}
        className={className}
        onLoad={() => setLoaded(true)}
        style={{ opacity: loaded ? 1 : 0, width: '100%', height: '100%', objectFit: 'cover' }}
      />
    </div>
  );
};

export default LazyImage;
