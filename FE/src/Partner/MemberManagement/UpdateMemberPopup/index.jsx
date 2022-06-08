import { Input, Modal, Typography } from 'antd';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import * as appActions from './../../../Redux/Action/appActions';
import { default as axios } from './../../../utils/axios';
import classes from './styles.module.css';

const UpdateMemberPopup = ({ memberInfo, onHideModal }) => {
  const [showModal, setShowModal] = useState(true);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      password: Yup.string()
        .required('Mật khẩu không được để trống')
        .min(6, 'Mật khẩu phải có ít nhất 6 ký tự')
        .max(50, 'Mật khẩu không được vượt quá 60 ký tự'),
      confirmPassword: Yup.string()
        .required('Vui lòng xác thực lại mật khẩu')
        .test('checkMatchingPassword', 'Mật khẩu không khớp', (value, context) => value === context.parent.password),
    }),
  });

  const handleCancel = () => {
    formik.resetForm();
    setShowModal(false);
    onHideModal(false);
  };

  const handleOnOk = () => {
    const updateAdminUser = `/api/update-member/admin/${memberInfo.MA_USER}`;
    const updatePartnerUser = `/api/update-member/partner/${memberInfo.MA_USER}`;
    const url = memberInfo.IS_ADMIN ? updateAdminUser : updatePartnerUser;
    dispatch(appActions.showLoading());
    axios
      .put(url, { password: formik.values.password })
      .then(() => {
        dispatch(appActions.hideLoading());
        Swal.fire({
          title: 'Cập nhật thành công',
          icon: 'success',
        });
        onHideModal(false);
      })
      .catch((err) => {
        dispatch(appActions.hideLoading());
        Swal.fire({
          title: ` Có lỗi trong quá trình cập nhật thông tin thành viên. Vui lòng liên hệ quản trị viên. Lỗi: ${err.message}`,
        });
      });
  };

  return (
    <>
      <Modal
        visible={showModal}
        cancelText='Hủy'
        okText='Tạo'
        title='Cập nhật mật khẩu'
        onCancel={handleCancel}
        onOk={handleOnOk}
      >
        <div className={classes['form-group']}>
          <label htmlFor='' className={classes['form-label']}>
            Mật khẩu
          </label>
          <Input
            type='password'
            className={classes['form-control']}
            placeholder='Nhập mật khẩu mới'
            {...formik.getFieldProps('password')}
          />
          {formik.touched.password && formik.errors.password ? (
            <Typography.Text type='danger' className={classes['error-message']}>
              {formik.errors.password}
            </Typography.Text>
          ) : null}
        </div>
        <div className={classes['form-group']}>
          <label htmlFor='' className={classes['form-label']}>
            Xác nhận mật khẩu
          </label>
          <Input
            type='password'
            className={classes['form-control']}
            placeholder='Nhập mật khẩu mới'
            {...formik.getFieldProps('confirmPassword')}
          />
          {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
            <Typography.Text type='danger' className={classes['error-message']}>
              {formik.errors.confirmPassword}
            </Typography.Text>
          ) : null}
        </div>
      </Modal>
    </>
  );
};

export default UpdateMemberPopup;
