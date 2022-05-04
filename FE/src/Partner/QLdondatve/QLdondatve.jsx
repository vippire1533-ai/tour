import classes from "./QLdondatve.module.css";
import { Fragment } from "react";
import Menutop from "../Menutop";
import Menuleft from "../Menuleft";
import React, { useEffect, useState } from "react";
import { Button, Card, List, message, Select } from "antd";

import { useNavigate } from "react-router-dom";
import axios from "axios";
 

const QLdondatve = () => {
  const [donList, setDonList] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    getDonDatVe();
  }, []);
  const getDonDatVe = async () => {
    const respone = await axios.get("/api/dondatve").then((res) => {
      setDonList(res.data);
      console.log(res.data);
    });
  };
  const onDelete = async (MADATVE) =>{
    if(window.confirm("Are you sure that wanted to delete this ")) {
      const respone =await axios.delete(`/api/dondatve/${MADATVE}`).then((res) =>{
        console.log(res.data);
        console.log("Delete success");
        getDonDatVe();
      },[])
    }
  }
  // useEffect(() => {
  //   axios
  //     .get("https://622ac4ec14ccb950d224ca1b.mockapi.io/DatTour")
  //     .then((res) => {
  //       setDonList([...donList, ...res.data]);
  //     });
  // }, []);
  return (
    <Fragment>
      <Menutop />
      <Menuleft />
      <div className={classes.dsloai}>
      <div className={classes.btnthem}>
          <button onClick={() => navigate("/admin/loaitour/them")}>Thêm loại tour</button>
          
        </div>
        <table className={classes.table}>
          <tr>
            <th>Mã đơn</th>
            <th>Tên tour</th>
            <th>Người đặt</th>
            <th>Số lượng vé</th>
            <th>Tổng tiền</th>
            <th>Tình trạng</th>
            <th> </th>
            
          </tr>
        </table>
        <List
          grid={{ gutter: 4, column: 0 }}
          dataSource={donList}
          renderItem={(item) => (
            <List.Item>
              <div className={classes.items}>
                <div className={classes.element}>{item.MaDonDat}</div>
                <div className={classes.element}>{item.TenTour}</div>
                <div className={classes.element}>{item.TenNguoiDat}</div>
                <div className={classes.element}>{item.SoLuongVe}</div>
                <div className={classes.element}>{item.TongTien}</div>
                <div className={classes.element}>{item.TinhTrangThanhToan}</div>
                <div className={classes.element}>
                  <div className={classes.xoa}>
                    <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-1432400-1211078.png" onClick={()=> onDelete(item.MADATVE)}/>
                  </div>
                  </div>
                </div>
            </List.Item>
          )}
        />
          </div>
    </Fragment>
  );
};

export default QLdondatve;
