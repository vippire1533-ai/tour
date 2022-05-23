import classes from './Menuleft.module.css';
import { useState } from 'react'
const Menuleft = () => {
  const [open, setOpen] = useState(false)
  return (
    <div className={classes.menuleft}>
      <div className={classes.logo}>
        <a>
          <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/86afd0785f5505dd6d584971576dea27.svg' />
        </a>
      </div>
      <div className={classes.menu}>
        <ul>
          <li>
            <a href='/admin/thongke'>Thống kê</a>
          </li>
          <li>
            <a href='/admin/tour'>Tour</a>
          </li>
          <li onClick={()=>setOpen(!open)} style={{display:'flex',justifyContent:'space-between',cursor:'pointer'}}>
            <a>Loại</a>
            {open ? <img style={{transitionDuration: "200ms"}} src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8537ce8fe832f4d73d28a686595accec.svg" /> : <img style={{ transform: "rotate(-180deg)", transitionDuration: "200ms", transitionProperty: "-webkit-transform, transform" }} src="https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8537ce8fe832f4d73d28a686595accec.svg" />}
          </li>
          {open && <>
            <li style={{backgroundColor:'#e5e5e5',paddingLeft:'30px'}}>
              <a href='/admin/loaitour'>Tour</a>
            </li>
            <li style={{backgroundColor:'#e5e5e5',paddingLeft:'30px'}}>
              <a href='/admin/quan-ly-loai-ve'>Vé</a>
            </li>
          </>}

          <li>
            <a href='/admin/quan-ly-ve'>Quản Lý Vé</a>
          </li>

          <li>
            <a href='/admin/dondattour'>Đơn đặt vé</a>
          </li>
          <li>
            <a>Tin tức</a>
          </li>
          <li>
            <a>Bình luận</a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Menuleft;
