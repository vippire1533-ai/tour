import classes from "./QLloaitour.module.css";
import { Fragment } from "react";
import Menutop from "../Menutop";
import Menuleft from "../Menuleft";
import React, { useEffect, useState } from "react";
import { Button, Card, List, message, Select } from "antd";

import { useNavigate } from "react-router-dom";
import axios from "axios";
import ThemLoaiTour from "./ThemLoaiTour";

const QLloaitour = () => {
  const [typetList, setTypeList] = useState([]);
  const navigate = useNavigate();
  const [loaiTour, setLoaiTour] = useState([]);
  useEffect(() => {
    getLoaiTour();
  }, []);
  const getLoaiTour = async () => {
    const respone = await axios.get("/api/loaitour").then((res) => {
      setTypeList(res.data);
      console.log(res.data);
    });
  };

  // useEffect(() => {
  //   axios
  //     .get("https://622ac4ec14ccb950d224ca1b.mockapi.io/Loaitour")
  //     .then((res) => {
  //       setTypeList([...typetList, ...res.data]);
  //     });
  // }, []);
  const onDelete = async (MALOAI) =>{
    if(window.confirm("Are you sure that wanted to delete this ")) {
      const respone =await axios.delete(`/api/loaitour/${MALOAI}`).then((res) =>{
        console.log(res.data);
        console.log("Delete success");
        getLoaiTour();
      },[])
    }
  }
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
            <th>Mã loại tour</th>
            <th>Tên loại</th>
            <th> </th>
            
          </tr>
        </table>
        <List
          grid={{ gutter: 4, column: 0 }}
          dataSource={typetList}
          renderItem={(item) => (
            <List.Item>
              <div className={classes.items}>
                <div className={classes.element}>{item.MALOAI}</div>
                <div className={classes.element}>{item.TENLOAI}</div>
                <div className={classes.element}>
                  <div className={classes.xoa}>
                    <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-1432400-1211078.png"  onClick={()=> onDelete(item.MALOAI)}/>
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

export default QLloaitour;
