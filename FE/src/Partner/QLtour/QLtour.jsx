import { DeleteFilled, EditOutlined, ReloadOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';
import { Avatar, Badge, Button, Card, Empty } from 'antd';
import cx from 'classnames';
import moment from 'moment';
import { Fragment, useEffect } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import LoadingSpinner from '../../components/LoadingSpinner';
import Menuleft from '../Menuleft';
import Menutop from '../Menutop';
import * as appActions from './../../Redux/Action/appActions';
import * as quanLyDanhSachTourActions from './../../Redux/Action/quanLyDanhSachTourActions';
import classes from './QLtour.module.css';

const QLtour = () => {
  const dispatch = useDispatch();
  const { danhSachTour } = useSelector((state) => state.quanLyDanhSachTourState);
  const { isLoading } = useSelector((state) => state.appState);
  const navigate = useNavigate();

  const handleUpdateApplication = () => {
    dispatch(appActions.updateApplicaton());
    dispatch(quanLyDanhSachTourActions.layTatCaDanhSachTour());
  };

  useEffect(() => {
    dispatch(quanLyDanhSachTourActions.layTatCaDanhSachTour());
  }, []);
  const onDelete = async (TENTOUR, MATOUR) => {
    Swal.fire({
      title: 'Xác Nhận',
      text: `Bạn có chắc muốn xóa tour: ${TENTOUR}`,
      icon: 'question',
      cancelButtonText: 'Hủy',
      showCancelButton: true,
      confirmButtonText: 'Xóa',
      confirmButtonColor: 'red',
    })
      .then((value) => {
        if (value.isConfirmed) {
          dispatch(quanLyDanhSachTourActions.deleteTourById(MATOUR));
        }
      })
      .catch((reason) => {
        Swal.fire({
          title: 'Lỗi',
          text: reason.message,
        });
      });
  };
  return (
    <Fragment>
      {isLoading && <LoadingSpinner />}
      <Menutop />
      <Menuleft />
      <div className={classes.wrapper}>
        <div className={cx(classes.clearfix, classes['center-box'], classes['align-row'])}>
          <Button
            className={cx(classes.btn, classes['align-right'])}
            type='danger'
            icon={<ReloadOutlined />}
            onClick={handleUpdateApplication}
          >
            Làm mới danh sách
          </Button>
          <Button
            className={cx(classes.btn, classes['align-right'])}
            type='primary'
            icon={<FaPlus />}
            onClick={() => navigate('/admin/tour/them')}
          >
            Tạo tour
          </Button>
        </div>
        <div className={cx(classes.clearfix, classes['center-box'])}>
          <Grid container spacing={2}>
            {danhSachTour.length ? (
              danhSachTour.map((tour) => (
                <>
                  <Grid item key={tour.MATOUR} xs={12} md={3}>
                    <Badge.Ribbon
                      text={tour.TINH_TRANG_TOUR}
                      color={tour.TINH_TRANG_TOUR === 'Còn hiệu lực' ? 'green' : 'volcano'}
                    >
                      <Card
                        cover={
                          <img
                            className={classes['tour-image']}
                            alt={tour.TENTOUR}
                            src={tour.DANH_SACH_LINK_ANH[0]}
                            width='200'
                            height='200'
                          />
                        }
                        actions={[
                          tour.TINH_TRANG_TOUR === 'Còn hiệu lực' && (
                            <EditOutlined
                              key='editting'
                              onClick={() => {
                                navigate(`/admin/tour/${tour.MATOUR}`);
                              }}
                            />
                          ),
                          <DeleteFilled key='setting' onClick={() => onDelete(tour.TENTOUR, tour.MATOUR)} />,
                        ].filter(Boolean)}
                      >
                        <Card.Meta
                          avatar={
                            <Avatar src='https://us.123rf.com/450wm/dzein/dzein1509/dzein150900013/44952464-3d-realistic-travel-and-tour-poster-design-around-the-world-with-summer-elements-vector-illustration.jpg?ver=6' />
                          }
                          title={tour.TENTOUR}
                          description={moment(tour.NGAYDI).format('DD/MM/YYYY')}
                        />
                        <span className={classes.desc}>{tour.GTTOUR}</span>
                      </Card>
                    </Badge.Ribbon>
                  </Grid>
                </>
              ))
            ) : (
              <div className={classes['center-box']}>
                <Empty description='Không có dữ liệu' />
              </div>
            )}
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default QLtour;
