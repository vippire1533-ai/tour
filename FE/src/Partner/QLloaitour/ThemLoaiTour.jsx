import classes from "./ThemLoaiTour.module.css";
import { Fragment } from "react";
import Menutop from "../Menutop";
import Menuleft from "../Menuleft";
import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

const ThemLoaiTour = () => {
  const [MALOAI, setMaLoai] = useState();
  const [TENLOAI, setTenLoai] = useState();
  const navigar = useNavigate();
  const addloaitour = async ()=>{
    
    axios.post("/api/loaitour",{
      MALOAI:MALOAI,
      TENLOAI:TENLOAI,
    }
    ).then(()=>{
      console.log("success")
    })
  };
  
  return (
    <Fragment>
      <Menutop />
      <Menuleft />
      <div className={classes.themloaitourpage}>
        <div className={classes.form}>
          <div className={classes.loaitour}>
            <label>Loại tour</label>
            <input type="text" onChange={(event)=>{
                setMaLoai(event.target.value)}}></input>
          </div>
          <div className={classes.tenloai}>
            <label>Tên Loại tour</label>
            <input type="text" onChange={(event)=>{
                setTenLoai(event.target.value)}}></input>
          </div>
          <button type="submit" value="Add" onClick={addloaitour}>
            Tạo
          </button>
          <button onClick={() => navigar("/admin/loaitour")}>Trở về</button>
        </div>
      </div>
    </Fragment>
  );
};

export default ThemLoaiTour;
