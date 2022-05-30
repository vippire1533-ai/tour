import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Menuleft from '../Menuleft';
import Menutop from '../Menutop';
import { default as axios } from './../../utils/axios';
import classes from './QLtour.module.css';

const QLtour = () => {
  const [productList, setProductList] = useState([]);
  const [loaiTour, setLoaiTour] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    getAlldate();
  }, []);

  const getAlldate = async () => {
    const respone = await axios.get('/api/products').then((res) => {
      setProductList(res.data);
      console.log(res.data);
    });
  };
  const onDelete = async (MATOUR) => {
    if (window.confirm('Are you sure that wanted to delete this ')) {
      const respone = await axios.delete(`/api/products/${MATOUR}`).then((res) => {
        console.log(res.data);
        console.log('Delete success');
        getAlldate();
      }, []);
    }
  };
  return (
    <Fragment>
      <Menutop />
      <Menuleft />
      <div className={classes.dstour}>
        <div className={classes.btnthem}>
          <button onClick={() => navigate('/admin/tour/them')}>Tạo tour</button>
        </div>
      </div>
    </Fragment>
  );
};

export default QLtour;
