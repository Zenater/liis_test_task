import React, { useCallback, useMemo } from 'react';
import styles from './HotelCard.module.scss';
import { useDispatch } from 'react-redux';
import {
  formatDate,
  formatPrice,
  getDaysDifferent,
  getNounForm,
} from '../../utils/functions-utils';
import { ReactComponent as HouseIcon } from '../../assets/icons/house.svg';
import { ReactComponent as StarIcon } from '../../assets/icons/star.svg';
import { ReactComponent as HeartIcon } from '../../assets/icons/heart.svg';
import { HotelTypes } from '../../types/types';
import {
  addFavorite,
  removeFavorite,
} from '../../store/reducers/favorites-reducer';
import { useAppSelector } from '../../store/store';
import { selectFavorites } from '../../store/selectors';

type Props = {
  className?: string;
  hotel: HotelTypes;
  checkIn: string;
  checkOut: string;
  hasIcon?: boolean;
};

export const HotelCard = React.memo(
  ({ hotel, checkIn, checkOut, hasIcon }: Props) => {
    const favorites = useAppSelector(selectFavorites);
    const dispatch = useDispatch();
    const displayDate = formatDate(checkIn);
    const days = useMemo(
      () => getDaysDifferent(checkIn, checkOut),
      [checkIn, checkOut]
    );

    const favorite = favorites.find(
      (f) =>
        f.hotel === hotel && f.checkIn === checkIn && f.checkOut === checkOut
    );
    const { hotelName, stars, priceAvg } = hotel;
    const isChecked = useMemo(() => Boolean(favorite), [favorite]);

    const onChangeHandler = useCallback(() => {
      dispatch(
        favorite
          ? removeFavorite(favorite)
          : addFavorite({ hotel, checkIn, checkOut })
      );
    }, [checkIn, checkOut, dispatch, favorite, hotel]);

    return (
      <li className={styles.hotelCard}>
        {hasIcon && (
          <div className={styles.iconWrapper}>
            <HouseIcon />
          </div>
        )}
        <div className={styles.data}>
          <div className={styles.top}>
            <h2>{hotelName}</h2>
            <label className={styles.heart}>
              <input
                type='checkbox'
                checked={isChecked}
                onChange={onChangeHandler}
                aria-label={
                  favorite ? 'Убюрать из избранного' : 'Добавить в избранное'
                }
              />
              <HeartIcon />
            </label>
          </div>
          <div className={styles.period}>
            <time dateTime={checkIn}>{displayDate}</time>
            <span className={styles.separator}>--</span>
            <span>
              {days}{' '}
              {getNounForm(days, { one: 'день', two: 'дня', five: 'дней' })}
            </span>
          </div>
          <div className={styles.bottom}>
            <div className={styles.rating} title={`${stars} из 5 звезд`}>
              {Array.from({ length: 5 }, (_, index) => (
                <StarIcon
                  className={index + 1 <= stars ? styles.fill : ''}
                  key={index}
                />
              ))}
            </div>
            <p className={styles.price}>
              Цена: <span>{formatPrice(priceAvg)}</span>
            </p>
          </div>
        </div>
      </li>
    );
  }
);
