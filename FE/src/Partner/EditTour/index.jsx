import { Grid } from '@mui/material';
import { Button, Input, Typography } from 'antd';
import { useFormik } from 'formik';
import { useEffect } from 'react';
import { GrUpdate } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import LoadingSpinner from './../../components/LoadingSpinner';
import * as appActions from './../../Redux/Action/appActions';
import { default as axios } from './../../utils/axios';
import Menuleft from './../Menuleft';
import Menutop from './../Menutop';
import classes from './styles.module.css';

const EditTour = () => {
  //#region Initialize lib hook
  const dispatch = useDispatch();
  const isLoading = useSelector((state) => state.appState.isLoading);
  const tours = useSelector((state) => state.quanLyDanhSachTourState.danhSachTour);
  const params = useParams();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      tourId: '',
      tourName: '',
      tourType: '',
      location: '',
      startLocation: '',
      endLocation: '',
      tourPrice: '',
      tourDesc: '',
      tourContent: '',
    },
    validationSchema: Yup.object({
      tourDesc: Yup.string().required('Giới thiệu tour không được để trống!').max(500, 'Không được vượt quá 500 ký tự'),
      tourContent: Yup.string()
        .required('Nội dung tour không được để trống!')
        .max(300, 'Không được vượt quá 300 ký tự'),
    }),
  });
  //#endregion

  //#region Handle Event
  const handleUpdateTour = () => {
    dispatch(appActions.showLoading());
    axios
      .put(`/api/products/${formik.values.tourId}`, {
        tourDesc: formik.values.tourDesc,
        tourContent: formik.values.tourContent,
      })
      .then(() => {
        dispatch(appActions.hideLoading());
        Swal.fire({
          title: 'Cập nhật thành công',
          icon: 'success',
        });
        navigate('/admin/tour');
      })
      .catch((err) => {
        dispatch(appActions.hideLoading());
        Swal.fire({
          title: 'Lỗi',
          icon: 'error',
          text: err.message,
        });
      });
  };
  //#endregion

  //#region Call Effect
  useEffect(() => {
    if (!tours || !params.tourId) {
      navigate('/admin/tour');
    } else {
      const selectedTour = tours.find((tour) => tour.MATOUR === +params.tourId);
      if (!selectedTour) {
        navigate('/admin/tour');
      } else {
        formik.setValues({
          tourId: params.tourId,
          tourName: selectedTour.TENTOUR,
          tourType: selectedTour.TENLOAI,
          location: selectedTour.TINH,
          startLocation: selectedTour.DIEMDI,
          endLocation: selectedTour.DIEMDEN,
          tourPrice: selectedTour.GIATOUR,
          tourDesc: selectedTour.GTTOUR,
          tourContent: selectedTour.NOIDUNGTOUR,
        });
      }
    }
  }, []);
  //#endregion
  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Menuleft />
      <Menutop />
      <div className={classes.wrapper}>
        <div className={classes.clearfix}>
          <div className={classes.content}>
            <h3 className={classes.title}>Edit Tour</h3>
            <div className={classes.form}>
              <Grid container>
                <Grid item xs={12} md={12}>
                  <div className={classes['form-group']}>
                    <label htmlFor='tourName' className={classes['form-label']}>
                      Tên tour
                    </label>
                    <Input
                      id='tourName'
                      className={classes['form-control']}
                      {...formik.getFieldProps('tourName')}
                      disabled
                    />
                  </div>
                  <div className={classes['form-group']}>
                    <label htmlFor='tourType' className={classes['form-label']}>
                      Loại Tour
                    </label>
                    <Input
                      id='tourType'
                      className={classes['form-control']}
                      {...formik.getFieldProps('tourType')}
                      disabled
                    />
                  </div>
                  <div className={classes['form-group']}>
                    <label htmlFor='tourLocation' className={classes['form-label']}>
                      Tỉnh/Thành Phố
                    </label>
                    <Input
                      id='tourLocation'
                      className={classes['form-control']}
                      {...formik.getFieldProps('location')}
                      disabled
                    />
                  </div>
                  <div className={classes['form-group']}>
                    <label htmlFor='startLocation' className={classes['form-label']}>
                      Điểm Xuất Phát
                    </label>
                    <Input
                      id='startLocation'
                      className={classes['form-control']}
                      {...formik.getFieldProps('startLocation')}
                      disabled
                    />
                  </div>
                  <div className={classes['form-group']}>
                    <label htmlFor='endLocation' className={classes['form-label']}>
                      Điểm Đến
                    </label>
                    <Input
                      id='endLocation'
                      className={classes['form-control']}
                      {...formik.getFieldProps('endLocation')}
                      disabled
                    />
                  </div>
                  <div className={classes['form-group']}>
                    <label htmlFor='tourPrice' className={classes['form-label']}>
                      Giá Tour
                    </label>
                    <Input
                      id='tourPrice'
                      className={classes['form-control']}
                      {...formik.getFieldProps('tourPrice')}
                      disabled
                    />
                  </div>
                  <div className={classes['form-group']}>
                    <label htmlFor='tourDesc' className={classes['form-label']}>
                      Giới thiệu tour
                    </label>
                    <Input.TextArea
                      className={classes['form-control']}
                      id='tourDesc'
                      rows={5}
                      {...formik.getFieldProps('tourDesc')}
                    />
                    {formik.touched.tourDesc && formik.errors.tourDesc ? (
                      <Typography.Text type='danger' className={classes['error-message']}>
                        {formik.errors.tourDesc}
                      </Typography.Text>
                    ) : null}
                  </div>
                  <div className={classes['form-group']}>
                    <label htmlFor='tourContent' className={classes['form-label']}>
                      Nội dung tour
                    </label>
                    <Input.TextArea
                      className={classes['form-control']}
                      id='tourContent'
                      rows={5}
                      {...formik.getFieldProps('tourContent')}
                    />
                    {formik.touched.tourContent && formik.errors.tourContent ? (
                      <Typography.Text type='danger' className={classes['error-message']}>
                        {formik.errors.tourContent}
                      </Typography.Text>
                    ) : null}
                  </div>
                  <div className={classes['form-group']}>
                    <Button
                      icon={<GrUpdate />}
                      size='large'
                      type='primary'
                      className={`${classes['form-control']} ${classes['btn']}`}
                      disabled={!(formik.isValid && formik.dirty)}
                      onClick={handleUpdateTour}
                    >
                      Cập Nhật
                    </Button>
                  </div>
                </Grid>
              </Grid>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default EditTour;
