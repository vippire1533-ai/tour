import { useState } from 'react';
import { useSelector } from 'react-redux';
import classes from './Menuleft.module.css';
import { Link } from 'react-router-dom';

const Menuleft = () => {
  const { thongTinTaiKhoan } = useSelector((state) => state.taiKhoanState);
  const [isAdmin, setIsAdmin] = useState(() => thongTinTaiKhoan && thongTinTaiKhoan.IS_ADMIN);

  const [open, setOpen] = useState(false);
  return (
    <div className={classes.menuleft}>
      <div className={classes.logo}>
        <Link to='/'>
          <img src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/86afd0785f5505dd6d584971576dea27.svg' />
        </Link>
      </div>
      <div className={classes.menu}>
        <ul>
          <li>
            <Link to='/admin/thongke'>Thống kê</Link>
          </li>
          {isAdmin && (
            <li>
              <Link to='/admin/tour'>Tour</Link>
            </li>
          )}
          {isAdmin && (
            <li
              onClick={() => setOpen(!open)}
              style={{ display: 'flex', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <a>Loại</a>
              {open ? (
                <img
                  style={{ transitionDuration: '200ms' }}
                  src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8537ce8fe832f4d73d28a686595accec.svg'
                />
              ) : (
                <img
                  style={{
                    transform: 'rotate(-180deg)',
                    transitionDuration: '200ms',
                    transitionProperty: '-webkit-transform, transform',
                  }}
                  src='https://d1785e74lyxkqq.cloudfront.net/_next/static/v2/8/8537ce8fe832f4d73d28a686595accec.svg'
                />
              )}
            </li>
          )}
          {open && (
            <>
              <li style={{ backgroundColor: '#e5e5e5', paddingLeft: '30px' }}>
                <Link to='/admin/loaitour'>Tour</Link>
              </li>
              <li style={{ backgroundColor: '#e5e5e5', paddingLeft: '30px' }}>
                <Link to='/admin/quan-ly-loai-ve'>Vé</Link>
              </li>
            </>
          )}

          <li>
            <Link to='/admin/quan-ly-ve'>Quản Lý Vé</Link>
          </li>

          <li>
            <Link to='/admin/dondattour'>Đơn đặt vé</Link>
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
