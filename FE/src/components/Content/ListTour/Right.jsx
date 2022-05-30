import { Select } from 'antd';
import { default as axios } from './../../../utils/axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import classes from './Right.module.css';
import dotenv from 'dotenv';

dotenv.config();

const host =
  process.env.NODE_ENV === 'production'
    ? process.env.REACT_APP_PROD_BACKEND_URL
    : process.env.REACT_APP_DEV_BACKEND_URL;

const Right = () => {
  const navigate = useNavigate();
  const { Option } = Select;
  const [producttour, setProducttour] = useState([]);
  const { maTinh } = useParams();

  useEffect(() => {
    getDatas();
  }, []);
  const getDatas = async () => {
    await axios.get('/api/products').then((res) => {
      const tours = res.data.map((tour) => ({
        ...tour,
        DANH_SACH_LINK_ANH: tour.DANH_SACH_ANH.map((idAnh) => `${host}/api/tour/images/${idAnh}`),
      }));
      setProducttour(tours);
    });
  };

  const [checked, setChecked] = useState();
  const handleSubmit = () => {
    console.log({ id: checked });
  };

  const dataprice = [
    {
      price: '0 - 1.000.000',
    },
    {
      price: '1.000.000 - 4.000.000',
    },
    {
      price: '4.000.000+',
    },
  ];
  return (
    <div className={classes.container}>
      <div className={classes.right}>
        <select className={classes.locgia} id='price'>
          {dataprice.map((val) => (
            <option value='volvo'>VND {val.price}</option>
          ))}
        </select>

        <div className={classes.xeptheos}>
          <p>Xếp theo: </p>
          <button className={classes.xeptheo}>
            Phổ biến nhất
            <img
              src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8537ce8fe832f4d73d28a686595accec.svg'
              alt='null'
            />
          </button>
        </div>
      </div>
      <div className={classes.danhsach}>
        {producttour.map(({ MATOUR, TENTOUR, GIATOUR, DIEMDEN, TINH, DANH_SACH_LINK_ANH }) => {
          if (TINH == maTinh) {
            return (
              <div key={producttour.id} onClick={() => navigate('/detail-tour/' + MATOUR)} className={classes.items}>
                <span className={classes.tag}>Trãi nghiệm mới</span>
                <img alt='example' src={DANH_SACH_LINK_ANH[0]} />

                <div className={classes.noidung}>
                  <h2>{TENTOUR}</h2>
                  <div className={classes.diemden}>
                    <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0629a9ae0d41e994ff5043f52cbb1b2e.svg' />
                    {DIEMDEN}
                  </div>
                  <h1>{GIATOUR} VND</h1>
                </div>
                <div className={classes.luu}>
                  <img
                    alt='null'
                    src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/42e4a7e6ed00f63a69daf8b5a980d0d6.svg'
                  />
                </div>
              </div>
            );
          }
        })}
      </div>
    </div>
  );
};

export default Right;
