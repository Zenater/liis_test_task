import { ReactComponent as LogOutIcon } from '../../assets/icons/log-out.svg';
import styles from './Header.module.scss';
import { useDispatch } from 'react-redux';
import { logOut } from '../../store/sagas/auth-sagas';

export const Header = () => {
  const dispatch = useDispatch();

  const handleLogOut = () => {
    dispatch(logOut());
  };

  return (
    <header className={styles.header}>
      <h1>Simple Hotel Check</h1>
      <button onClick={handleLogOut}>
        Выйти <LogOutIcon />
      </button>
    </header>
  );
};
