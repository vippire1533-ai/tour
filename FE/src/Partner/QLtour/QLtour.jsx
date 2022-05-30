import { EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Grid } from '@mui/material';
import { Avatar, Button, Card } from 'antd';
import React, { Fragment, useEffect, useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import Menuleft from '../Menuleft';
import Menutop from '../Menutop';
import * as quanLyDanhSachTourActions from './../../Redux/Action/quanLyDanhSachTourActions';
import { default as axios } from './../../utils/axios';
import classes from './QLtour.module.css';
import cx from 'classnames';
import moment from 'moment';

const QLtour = () => {
  const [loaiTour, setLoaiTour] = useState([]);

  const dispatch = useDispatch();
  const { danhSachTour } = useSelector((state) => state.quanLyDanhSachTourState);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(quanLyDanhSachTourActions.layTatCaDanhSachTour());
  }, []);

  const onDelete = async (MATOUR) => {
    if (window.confirm('Are you sure that wanted to delete this ')) {
      const respone = await axios.delete(`/api/products/${MATOUR}`).then((res) => {
        console.log(res.data);
        console.log('Delete success');
        // getAlldate();
      }, []);
    }
  };
  return (
    <Fragment>
      <Menutop />
      <Menuleft />
      <div className={classes.wrapper}>
        <div className={cx(classes.clearfix, classes['center-box'])}>
          <Button
            className={cx(classes.btn, classes['align-right'])}
            type='primary'
            icon={<FaPlus />}
            onClick={() => navigate('/admin/tour/theme')}
          >
            Tạo tour
          </Button>
          <Grid container spacing={2}>
            {danhSachTour.map((tour) => (
              <>
                <Grid item key={tour.MATOUR} xs={12} md={3}>
                  <Card
                    cover={
                      <img className={classes['tour-image']} alt={tour.TENTOUR} src={tour.DANH_SACH_LINK_ANH[0]} />
                    }
                    actions={[
                      <SettingOutlined key='setting' />,
                      <EditOutlined key='edit' />,
                      <EllipsisOutlined key='ellipsis' />,
                    ]}
                  >
                    <Card.Meta
                      avatar={
                        <Avatar src='https://us.123rf.com/450wm/dzein/dzein1509/dzein150900013/44952464-3d-realistic-travel-and-tour-poster-design-around-the-world-with-summer-elements-vector-illustration.jpg?ver=6' />
                      }
                      title={tour.TENTOUR}
                      description={moment(tour.NGAYDI).format('DD/MM/YYYY')}
                    />
                  </Card>
                </Grid>
              </>
            ))}
          </Grid>
        </div>
      </div>
    </Fragment>
  );
};

export default QLtour;
