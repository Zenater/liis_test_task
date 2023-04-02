import React from 'react';
import error404 from '../../assets/images/error404.svg';
import oops from '../../assets/images/oops.png';
import s from './PageNotFound.module.scss';
import { NavLink } from 'react-router-dom';
import { PATH } from '../../components/Routes/Navigates';

export const PageNotFound = () => {
  return (
    <div className={s.container}>
      <div style={{ padding: 20 }}>
        <img src={oops} alt={'page not found'} className={s.oops} />
        <div>
          <NavLink to={PATH.MAIN_PAGE}>
            <button className={s.backHome}>Back to home page</button>
          </NavLink>
        </div>
      </div>
      <img src={error404} alt={'page not found'} className={s.error404} />
    </div>
  );
};
