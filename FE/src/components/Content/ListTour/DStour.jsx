import React, { Fragment } from 'react';
import { useParams } from 'react-router-dom';
import Footer from '../../Footer';
import Header from '../../Header';
import classes from './DStour.module.css';
import Left from './Left';
import Right from './Right';

function DStour(props) {
  const params = useParams();

  return (
    <Fragment>
      <Header />
      <div className={classes.container}>
        <div className={classes.link}>
          <a href=''>Xperience</a>
          <a>/</a>
          <a href='' className={classes.danhmuc}>
            Tp.HCM
          </a>
        </div>
        <h1>Tất cả kết quả</h1>
        <Left />
        <Right />
      </div>
      <Footer />
    </Fragment>
  );
}

export default DStour;
