import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const Auth = (props) => {
  const { thongTinTaiKhoan } = useSelector((state) => state.taiKhoanState);
  const navigate = useNavigate();

  useEffect(() => {
    if (!thongTinTaiKhoan || !props.roles.includes(thongTinTaiKhoan.role)) {
      navigate('/admin');
    }
  }, []);

  return <>{props.children}</>;
};

export default Auth;
