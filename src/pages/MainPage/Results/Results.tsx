import styles from './Results.module.scss';
import { HotelCard } from '../../../components/HotelCard/HotelCard';
import { Carousel } from '../../../components/Carousel/Carousel';
import { Title } from '../../../components/Title/Title';
import { formatDate, getNounForm } from '../../../utils/functions-utils';
import { Box } from '../../../components/Box/Box';
import {
  selectFavorites,
  selectFilters,
  selectHotels,
} from '../../../store/selectors';
import { useAppSelector } from '../../../store/store';

export const Results = () => {
  const hotels = useAppSelector(selectHotels);
  const favorites = useAppSelector(selectFavorites);
  const { location, checkIn, checkOut } = useAppSelector(selectFilters);
  const displayDate = formatDate(checkIn);

  return (
    <Box className={styles.results}>
      <div className={styles.top}>
        <Title items={['Отели', location]} />
        <time dateTime={checkIn}>{displayDate}</time>
      </div>
      <Carousel />
      <p className={styles.favoritesCount}>
        Добавленно в Избранное: <span>{favorites.length}</span>{' '}
        {getNounForm(favorites.length, {
          one: 'отель',
          two: 'отеля',
          five: 'отелей',
        })}
      </p>
      <ul className={styles.hotels}>
        {hotels && hotels.length ? (
          hotels.map((hotel) => (
            <HotelCard
              className={styles.hotelCard}
              key={hotel.hotelId}
              hotel={hotel}
              checkIn={checkIn}
              checkOut={checkOut}
              hasIcon
            />
          ))
        ) : (
          <p className={styles.nothingFound}>Ничего не найдено</p>
        )}
      </ul>
    </Box>
  );
};
