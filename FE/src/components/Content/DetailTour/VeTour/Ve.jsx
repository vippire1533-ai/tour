import { Card } from "@mui/material";
import classes from "./Ve.module.css";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

const Ve = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [singleproducttour, setSingleproducttour] = useState([]);

  useEffect(() => {
    getData(id);
  }, [id]);
  const getData = async (id) => {
    const respone = await axios.get(`/api/products/${id}`).then((res) => {
      console.log();
      setSingleproducttour(res.data);
      console.log(res.data);
    });
    console.log("data =>", singleproducttour);
  };
  return (
    <div className={classes.container}>
      {singleproducttour.map(({ MATOUR,GIATOUR }) => (
        <div>
          <h1>Tour ghép</h1>
          <div className={classes.noidung}>
            <div className={classes.thongbao}>
              <div>
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2021/02/04/1612455491487-083f2aa1250ed2145b0b41c4e1dba240.png" />
                có hiệu lực từ hôm nay cho đến
              </div>
              <div>
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2021/02/04/1612455486715-9f445c68bf929b8ace8e744c568484f9.png" />
                không cần đặt chỗ
              </div>
              <div>
                <img src="https://ik.imagekit.io/tvlk/image/imageResource/2021/02/04/1612455479726-cb00253dc0267a8fc369760e81dc577c.png" />
                Easy Refund
              </div>
            </div>
            <div className={classes.gia}>
              <p>{GIATOUR} VND</p>
            </div>
          </div>
          <button
            className={classes.btnchon}
            onClick={() => navigate("/order/" + MATOUR)}
          >
            chọn
          </button>
        </div>
      ))}
    </div>
  );
};
export default Ve;
