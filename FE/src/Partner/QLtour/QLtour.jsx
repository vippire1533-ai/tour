import classes from "./QLtour.module.css";
import { Fragment } from "react";
import Menutop from "../Menutop";
import Menuleft from "../Menuleft";
import React, { useEffect, useState } from "react";
import { Button, Card, List, message, Select } from "antd";

import { useNavigate } from "react-router-dom";
import axios from "axios";

const QLtour = () => {
  const [productList, setProductList] = useState([]);
  const [loaiTour, setLoaiTour] = useState([]);
  const navigate = useNavigate();
  // const{id} = useParams();
  // useEffect(()=>{
  //   if(id){
  //     onUpdate(id);
  //   }
  // },[id])
  // const onUpdate = async(id) =>{
  //   const respone = await axios.put(`/api/products/${id}`).then((res) =>{
  //     console.log(res.data)
  //     console.log("Update success")
  //   });
  // }
  // useEffect(() => {
  //   axios
  //     .get("https://622ac4ec14ccb950d224ca1b.mockapi.io/TOUR")
  //     .then((res) => {
  //       setProductList([...productList, ...res.data]);
  //     });
  // }, []);
  useEffect(() => {
    getAlldate();
  }, []);
  const getAlldate = async () => {
    const respone = await axios.get("/api/products").then((res) => {
      setProductList(res.data);
      console.log(res.data);
    });
  };
  console.log("data =>", productList);

  const onDelete = async (MATOUR) =>{
    if(window.confirm("Are you sure that wanted to delete this ")) {
      const respone =await axios.delete(`/api/products/${MATOUR}`).then((res) =>{
        console.log(res.data);
        console.log("Delete success");
        getAlldate();
      },[])
    }
  }
  return (
    <Fragment>
      <Menutop />
      <Menuleft />
      <div className={classes.dstour}>
      <div className={classes.btnthem}>
          <button onClick={() => navigate("/admin/tour/them")}>Tạo tour</button>
        </div>
        <table className={classes.table}>
          <tr>
            <th>Mã tour</th>
            <th>Loại</th>
            <th>Tên tour</th>
            <th>Giá tour</th>
            <th>Hình ảnh</th>
            <th>Ngày đi</th>
            <th>Điểm đi</th>
            <th>Điểm đến</th>
            <th></th>
          </tr>
        </table>
        <List
          grid={{ gutter: 4, column: 0 }}
          dataSource={productList}
          renderItem={(item) => (
            <List.Item>
              <div className={classes.items}>
                <div className={classes.element}>{item.MATOUR}</div>
                <div className={classes.element}>{item.TENLOAI}</div>
                <div className={classes.element}>{item.TENTOUR}</div>

                <div className={classes.element}>{item.GIATOUR} VND</div>

                <img
                  className={classes.hinhanh}
                  alt="example"
                  src={item.HINHANH}
                />
                <div className={classes.element}>{item.NGAYDI}</div>
                <div className={classes.element}>{item.DIEMDI}</div>
                <div className={classes.element}>{item.DIEMDEN}</div>
                <div className={classes.option}>
                  <div className={classes.xoa}>
                    <img src="https://cdn.iconscout.com/icon/premium/png-256-thumb/delete-1432400-1211078.png" onClick={()=> onDelete(item.MATOUR)}/>
                  </div>
                  <div
                    className={classes.sua}
                    onClick={() => navigate("/admin/tour/" + item.MATOUR)}
                  >
                    <img src="https://banner2.cleanpng.com/20180417/eeq/kisspng-computer-icons-editing-icon-design-random-icons-5ad5ac7df28c06.7497951515239527659935.jpg" />
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

export default QLtour;
