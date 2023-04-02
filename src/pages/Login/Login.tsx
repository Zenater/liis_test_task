import { SubmitHandler, useForm } from 'react-hook-form';
import { Navigate } from 'react-router-dom';
import styles from './Login.module.scss';
import { useDispatch } from 'react-redux';
import { TextField } from '../../components/TextField/TextField';
import { Button } from '../../components/Button/Button';
import { PATH } from '../../components/Routes/Navigates';
import { Box } from '../../components/Box/Box';
import { useAppSelector } from '../../store/store';
import { selectUser } from '../../store/selectors';
import { login } from '../../store/sagas/auth-sagas';

export type LoginFormInputsType = {
  email: string;
  password: string;
};

export const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputsType>({ mode: 'onBlur' });
  const dispatch = useDispatch();
  const onSubmit: SubmitHandler<LoginFormInputsType> = (user) => {
    dispatch(login(user));
  };
  const user = useAppSelector(selectUser);

  if (user) {
    return <Navigate to={PATH.MAIN_PAGE} />;
  }

  return (
    <div className={styles.loginPage}>
      <Box className={styles.box}>
        <h1>Simple Hotel Check</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.inputs}>
            <div className={styles.inputEmail}>
              <TextField
                className={styles.input}
                label='Логин'
                type='email'
                {...register('email', {
                  required: 'Обязательное поле',
                  pattern: {
                    value:
                      /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/,
                    message: 'Некорретный адрес электронной почты',
                  },
                })}
                error={errors.email?.message}
              />
            </div>
            <TextField
              className={styles.input}
              label='Пароль'
              type='password'
              {...register('password', {
                required: 'Обязательное поле',
                pattern: {
                  value: /[a-zA-Z0-9]+/,
                  message:
                    'Пароль не должен содержать кирилицу или одни символы',
                },
                minLength: {
                  value: 8,
                  message: 'Минимум 8 символов',
                },
              })}
              error={errors.password?.message}
            />
          </div>
          <Button type='submit' disabled={!isValid}>
            Войти
          </Button>
        </form>
      </Box>
    </div>
  );
};
