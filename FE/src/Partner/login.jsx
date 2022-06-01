import { Grid } from '@mui/material';
import { Button, Input } from 'antd';
import { useFormik } from 'formik';
import { BiLogInCircle } from 'react-icons/bi';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import LoadingSpinner from './../components/LoadingSpinner';
import classes from './login.module.css';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { isLoading } = useSelector((state) => state.appState);
  const formik = useFormik({
    initialValues: {
      username: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string().required('Vui lòng nhập tên đăng nhập !').trim(),
      password: Yup.string().required('Vui lòng nhập mật khẩu !').trim(),
    }),
  });

  const handleSubmit = () => {
    console.log(formik.values);
    formik.resetForm();
  };

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Grid item xs={12} md={12}>
        <div className={classes['form-container']}>
          <div className={classes.overlay}>
            <div className={classes.box}>
              <h3 className={classes.title}>Đăng nhập quản lý</h3>
              <form className={classes.form} onSubmit={formik.handleSubmit}>
                <div className={classes['form-group']}>
                  <label htmlFor='username' className={classes['form-label']}>
                    Tên đăng nhập
                  </label>
                  <Input
                    type='text'
                    placeholder='Tên đăng nhập'
                    id='username'
                    {...formik.getFieldProps('username')}
                    className={classes['form-control']}
                  />
                </div>
                <div className={classes['form-group']}>
                  <label htmlFor='password' className={classes['form-label']}>
                    Mật khẩu
                  </label>
                  <Input
                    type='password'
                    placeholder='Mật khẩu'
                    id='password'
                    {...formik.getFieldProps('password')}
                    className={classes['form-control']}
                  />
                </div>
                <div className={classes['form-group']}>
                  <Button
                    icon={<BiLogInCircle />}
                    type='primary'
                    className={classes.btn}
                    size='large'
                    disabled={!(formik.isValid && formik.dirty)}
                    onClick={handleSubmit}
                  >
                    Đăng Nhập
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Grid>
    </>
  );
};

export default Login;
