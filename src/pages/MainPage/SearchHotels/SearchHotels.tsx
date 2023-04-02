import styles from './SearchHotels.module.scss';
import { useDispatch } from 'react-redux';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField } from '../../../components/TextField/TextField';
import { Button } from '../../../components/Button/Button';
import { addDays, getDaysDifferent } from '../../../utils/functions-utils';
import { Box } from '../../../components/Box/Box';
import { selectFilters } from '../../../store/selectors';
import { setFilters } from '../../../store/reducers/filters-reducer';
import { useAppSelector } from '../../../store/store';
import { fetchHotels } from '../../../store/reducers/hotel-reducer';

type InputsType = {
  location: string;
  checkIn: string;
  days: number;
};

export const SearchHotels = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { location, checkIn, checkOut } = useAppSelector(selectFilters);
  const [, setSearchParams] = useState(new URLSearchParams());

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
    reset,
  } = useForm<InputsType>();

  useEffect(() => {
    reset({
      location,
      checkIn,
      days: getDaysDifferent(checkIn, checkOut),
    });
  }, [location, checkIn, checkOut]);

  const onSubmit = handleSubmit((values) => {
    const newFilters = {
      location: values.location,
      checkIn: values.checkIn,
      checkOut: addDays(values.checkIn, values.days),
    };
    const newSearchParams = new URLSearchParams(newFilters);
    navigate(`/?${newSearchParams}`);
    setSearchParams(newSearchParams);
    dispatch(setFilters(newFilters));
    dispatch(fetchHotels());
  });

  return (
    <Box className={styles.searchOptions}>
      <form onSubmit={onSubmit}>
        <div className={styles.inputs}>
          <TextField
            label='Локация'
            boldLabel
            {...register('location', {
              required: 'Обязательное поле',
            })}
            error={errors.location?.message}
          />
          <TextField
            label='Дата заселения'
            boldLabel
            type='date'
            {...register('checkIn', {
              required: 'Обязательное поле',
            })}
            error={errors.checkIn?.message}
          />
          <TextField
            label='Количество дней'
            boldLabel
            type='number'
            {...register('days', {
              required: 'Обязательное поле',
            })}
            error={errors.days?.message}
          />
        </div>
        <Button type='submit' disabled={!isValid}>
          Найти
        </Button>
      </form>
    </Box>
  );
};
