import styles from './MainPage.module.scss';
import { Navigate } from 'react-router-dom';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { PATH } from '../../components/Routes/Navigates';
import LinearProgress from '@mui/material/LinearProgress';
import { SearchHotels } from './SearchHotels/SearchHotels';
import { Favorites } from './Favorites/Favorites';
import { Results } from './Results/Results';
import { Header } from '../../components/Header/Header';
import { fetchFilters } from '../../store/reducers/filters-reducer';
import { selectStatus, selectUser } from '../../store/selectors';
import { useAppSelector } from '../../store/store';
import { initializeApp } from '../../store/sagas/auth-sagas';
import { fetchHotels } from '../../store/reducers/hotel-reducer';

export const MainPage = () => {
  const dispatch = useDispatch();
  const user = useAppSelector(selectUser);
  const status = useAppSelector(selectStatus);

  useEffect(() => {
    dispatch(initializeApp());
    dispatch(fetchFilters());
    dispatch(fetchHotels());
  }, []);

  if (!user) {
    return <Navigate to={PATH.LOGIN} />;
  }

  return (
    <div className={styles.container}>
      <Header />
      {status === 'loading' && <LinearProgress color='inherit' />}
      <main className={styles.content}>
        <div className={styles.leftPanel}>
          <SearchHotels />
          <Favorites />
        </div>
        <Results />
      </main>
    </div>
  );
};
