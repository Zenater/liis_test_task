import { useEffect, useRef } from 'react';
import styles from './Carousel.module.scss';
import { useAppSelector } from '../../store/store';
import { selectPictures } from '../../store/selectors';

export const Carousel = () => {
  const containerRef = useRef<HTMLUListElement>(null);
  const pictures = useAppSelector(selectPictures);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const onWheelHandler = (e: WheelEvent) => {
      const { deltaY } = e;
      const scrollLeft = container.scrollLeft + deltaY;
      container.scrollTo({ left: scrollLeft });

      requestAnimationFrame(() => {
        if (containerRef.current === container) {
          container.scrollTo({ left: scrollLeft });
        }
      });
    };

    container.addEventListener('wheel', onWheelHandler, { passive: false });

    return () => {
      container.removeEventListener('wheel', onWheelHandler);
    };
  }, []);

  return (
    <ul ref={containerRef} className={styles.carousel}>
      {pictures.map((image, index) => (
        <li key={index}>
          <img src={image.src} alt={image.alt} />
        </li>
      ))}
    </ul>
  );
};
