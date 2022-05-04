import classes from "./Manage.module.css";
import Menuleft from "./Menuleft";
import Menutop from "./Menutop";
import { Fragment } from "react";
import ChartExample from "./Chart";

const Manage = () => {
  return (
    <Fragment>
      <Menutop />
      <Menuleft />
      <div className={classes.content}>
        <h1>Tháng</h1>
        <div className={classes.months}>
          <label>Chọn tháng</label>
        <select className={classes.month}>
              <option>1</option>
              <option>2</option>
              <option>3</option>
              <option>4</option>
              <option>5</option>
              <option>6</option>
              <option>7</option>
              <option>8</option>
              <option>9</option>
              <option>10</option>
              <option>11</option>
              <option>12</option>
            </select>
        </div>
        <h1>Thống kê</h1>
        <div className={classes.thongke}>
          <div className={classes.total}>
            <div className={classes.totalve}>
              số lượng vé bán ra
              <hr />
            </div>

            <p>0</p>
          </div>
          <div className={classes.total}>
            <div className={classes.totalvehuy}>
              số lượng vé bị hủy
              <hr />
            </div>
            <p>0</p>
          </div>
          <div className={classes.total}>
            <div className={classes.totalkhach}>
              số lượng khách đặt vé
              <hr />
            </div>
            <p>0</p>
          </div>
          <div className={classes.total}>
            <div className={classes.totaltour}>
              số lượng tour đang có
              <hr />
            </div>
            <p>8</p>
          </div>
        </div>
        <h1>Doanh thu</h1>
        <div className={classes.doanhthuthang}>
          <div className={classes.thanhloc}>
            <label>Tổng danh thu </label>
            
          </div>
          <p>0 VNĐ</p>
        </div>
        <h1>Biểu đồ doanh thu</h1>
        <div className={classes.bieudo}>
          <ChartExample/>
        </div>
      </div>
    </Fragment>
  );
};

export default Manage;
