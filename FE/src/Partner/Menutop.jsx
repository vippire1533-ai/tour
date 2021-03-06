import { Button } from 'antd';
import { FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import classes from './Menutop.module.css';
import { useSelector } from 'react-redux';

const Menutop = () => {
  const navigate = useNavigate();
  const { thongTinTaiKhoan } = useSelector((state) => state.taiKhoanState);
  const handleClick = () => {
    navigate('/');
  };

  return (
    <div className={classes.menu}>
      <div className={classes.search}>
        {thongTinTaiKhoan && <span className={classes.username}>Xin chào {thongTinTaiKhoan.USERNAME}!</span>}
      </div>
      <div className={classes.notification}>
        <div className={classes.frofile}>
          <img src='https://demo.dashboardpack.com/user-management-html/img/client_img.png' />
        </div>
        <Button type='link' className={classes.btn} icon={<FiLogOut />} onClick={handleClick}>
          Đăng Xuất
        </Button>
      </div>
    </div>
  );
};

export default Menutop;
