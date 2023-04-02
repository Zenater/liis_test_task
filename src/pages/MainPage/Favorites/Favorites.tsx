import { useCallback, useMemo, useState } from 'react';
import styles from './Favorites.module.scss';
import { HotelCard } from '../../../components/HotelCard/HotelCard';
import { SortToggle } from '../../../components/SortToggle/SortToggle';
import { Box } from '../../../components/Box/Box';
import { SortOrderType, SortPropertyType } from '../../../types/types';
import { useAppSelector } from '../../../store/store';
import { selectFavorites } from '../../../store/selectors';

export const Favorites = () => {
  const favorites = useAppSelector(selectFavorites);

  const [sort, setSort] = useState<{
    order: SortOrderType;
    property: SortPropertyType;
  }>({
    order: 'up',
    property: '',
  });

  const handleToggle = useCallback((property: SortPropertyType) => {
    setSort((prevSort) => ({
      order:
        prevSort.property === property && prevSort.order === 'up'
          ? 'down'
          : 'up',
      property: property === prevSort.property ? prevSort.property : property,
    }));
  }, []);

  const sortedFavorites = useMemo(() => {
    if (sort.property) {
      return [...favorites].sort((a, b) => {
        const priceDiff = a.hotel.priceAvg - b.hotel.priceAvg;
        const ratingDiff = a.hotel.stars - b.hotel.stars;
        const diff = sort.property === 'price' ? priceDiff : ratingDiff;
        return sort.order === 'up' ? diff : -diff;
      });
    }
    return favorites;
  }, [favorites, sort]);

  return (
    <Box className={styles.favorites}>
      <h1>Избранное</h1>
      <div className={styles.sort}>
        <SortToggle
          label='Рейтинг'
          order={sort.order}
          selected={sort.property === 'rating'}
          onChange={() => handleToggle('rating')}
        />
        <SortToggle
          label='Цена'
          order={sort.order}
          selected={sort.property === 'price'}
          onChange={() => handleToggle('price')}
        />
      </div>
      <ul className={styles.list}>
        {sortedFavorites.length ? (
          sortedFavorites.map((favorite) => (
            <HotelCard
              hotel={favorite.hotel}
              checkIn={favorite.checkIn}
              checkOut={favorite.checkOut}
              key={favorite.hotel.hotelId}
            />
          ))
        ) : (
          <p className={styles.noFavorites}>Нет избранных</p>
        )}
      </ul>
    </Box>
  );
};
