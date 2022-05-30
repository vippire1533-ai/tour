import { default as axios } from './../../utils/axios';
import React, { Fragment, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Footer from '../../Footer';
import Header from '../../Header';
import classes from './DetailTour.module.css';
import './style.css';
import Ve from './VeTour/Ve';
import Swal from 'sweetalert2';
import NumberFormat from 'react-number-format';

const DetailTour = ({ match }) => {
  const navigate = useNavigate();
  const [imageDetailLink, setImageDetailLink] = useState('');
  const { id } = useParams();

  const [singleproducttour, setSingleproducttour] = useState([]);

  useEffect(() => {
    getData(id);
    // setSingleproducttour([
    //   { MATOUR: "1", TENTOUR: "e", GIATOUR: "1000", DIEMDEN: "anc", HINHANH: "https://deviet.vn/wp-content/uploads/2019/04/ban-do-vuong-quoc-anh.jpg" },
    // ])
  }, [id]);
  const getData = async (id) => {
    const respone = await axios
      .get(`/api/products/${id}`)
      .then((res) => {
        const tours = res.data.map((tour) => ({
          ...tour,
          DANH_SACH_LINK_ANH: tour.DANH_SACH_ANH.map(
            (idAnh) => `${process.env.BACKEND_URL || 'https://localhost:8000'}/api/tour/images/${idAnh}`,
          ),
        }));
        setImageDetailLink(tours[0].DANH_SACH_LINK_ANH[0]);
        setSingleproducttour(tours);
      })
      .catch((err) => {
        Swal.fire({
          title: 'Không tìm thấy tour',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <Fragment>
      <Header />
      <div className={classes.container}>
        {singleproducttour.map(({ MATOUR, TENTOUR, DANH_SACH_LINK_ANH, GIATOUR, DIEMDEN }) => (
          <div className={classes.hinhanh}>
            <h1 className={classes.title}>{TENTOUR}</h1>
            <div className={classes.diemden}>
              <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/0/0629a9ae0d41e994ff5043f52cbb1b2e.svg' />
              {DIEMDEN}
            </div>
            <hr />
            <div className={classes.content}>
              <div className={classes.anh}>
                <img src={imageDetailLink} alt='Image Detail' />
              </div>
              <div className={classes.anhnho}>
                {DANH_SACH_LINK_ANH.slice(0, 5).map((link, index) => (
                  <img key={index} src={link} alt='Image tour' onClick={() => setImageDetailLink(link)} />
                ))}
              </div>
            </div>
            <div className={classes.content}>
              <div className={classes.danhgia}>
                <h2>Traveloka</h2>
                <div className={classes.danhgias}>
                  <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/9/986bcf0f5b0c898a34fd75a917ceefad.svg' />
                  8.6 Tốt
                </div>
                <p>Từ 33 đánh giá</p>
              </div>
              <div className={classes.timtour}>
                <div className={classes.content}>
                  <p>Giá từ</p>
                  <div className={classes.luu}>
                    <img
                      alt='null'
                      src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/4/42e4a7e6ed00f63a69daf8b5a980d0d6.svg'
                    />
                  </div>
                </div>
                <NumberFormat
                  thousandSeparator={true}
                  displayType={'text'}
                  thousandsGroupStyle='thousand'
                  value={GIATOUR}
                  className={classes.giaTour}
                />
                <button onClick={() => navigate('/detail-tour/' + MATOUR)}>Tìm tour</button>
              </div>
            </div>
            <hr />
            <div className={classes.footer}>
              <p>Khoảnh khắc đáng nhớ</p>
              <div className={classes.content}>
                {DANH_SACH_LINK_ANH.map((link, index) => (
                  <img key={index} src={link} alt='Image tour' onClick={() => setImageDetailLink(link)} />
                ))}
              </div>
            </div>
          </div>
        ))}
        <h3>Khả dụng vào ngày khác</h3>
        <Ve />
      </div>
      <Footer />
    </Fragment>
  );
};
export default DetailTour;
