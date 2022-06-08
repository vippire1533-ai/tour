import { Button, Input, Modal, Select, Table, Tabs, Typography } from 'antd';
import cx from 'classnames';
import { useFormik } from 'formik';
import React, { useEffect, useMemo, useState } from 'react';
import { AiFillDelete, AiOutlineTeam } from 'react-icons/ai';
import { BsFillPencilFill } from 'react-icons/bs';
import { FaPlus } from 'react-icons/fa';
import { GrUserAdmin } from 'react-icons/gr';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import LoadingSpinner from '../../components/LoadingSpinner';
import Menuleft from '../Menuleft';
import Menutop from '../Menutop';
import * as appActions from './../../Redux/Action/appActions';
import { default as axios } from './../../utils/axios';
import classes from './styles.module.css';
import UpdateMemberPopup from './UpdateMemberPopup';

const MemberMangement = () => {
  //#region Initialize state
  const [adminUsers, setAdminUsers] = useState([]);
  const [partnerUsers, setPartnerUsers] = useState([]);
  const [isShowModal, setIsShowModal] = useState(false);
  const [memberInfo, setMemberInfo] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  //#endregion

  //#region Initialize hook
  const { isLoading } = useSelector((state) => state.appState);
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      userRole: '',
      username: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema: Yup.object({
      userRole: Yup.string().required('Vui lòng chọn loại thành viên'),
      username: Yup.string()
        .required('Vui lòng nhập tên đăng nhập')
        .max(30, 'Tên đăng nhập không được vượt quá 30 ký tự'),
      password: Yup.string()
        .required('Vui lòng nhập mật khẩu')
        .min(6, 'Mật khẩu phải có 6 ký tự trở lên')
        .max(50, 'Mật khẩu không được vượt quá 50 ký tự'),
      confirmPassword: Yup.string()
        .required('Vui lòng xác thực lại mật khẩu')
        .test('checkPassword', 'Mật khẩu không khớp', (value, context) => {
          return value === context.parent.password;
        }),
    }),
  });
  const columnConfigs = [
    {
      title: 'Mã Thành Viên',
      dataIndex: 'MA_USER',
      key: 'MA_USER',
      align: 'center',
    },
    {
      title: 'Tên Tài Khoản',
      dataIndex: 'USERNAME',
      key: 'USERNAME',
      align: 'center',
    },
    {
      title: 'Thao Tác',
      render: (_, record) => {
        const handleDeleteMember = () => {
          Swal.fire({
            title: 'Bạn có chắc muốn xóa thành viên này?',
            icon: 'question',
            showCancelButton: true,
            cancelButtonText: 'Hủy',
          }).then((res) => {
            if (res.isConfirmed) {
              dispatch(appActions.showLoading());
              const deleleteAdminMember = `/api/delete-member/admin/${record.MA_USER}`;
              const deleletePartnerMember = `/api/delete-member/partner/${record.MA_USER}`;
              axios
                .delete(record.IS_ADMIN ? deleleteAdminMember : deleletePartnerMember)
                .then(() => loadMembers())
                .then(() => {
                  dispatch(appActions.hideLoading());
                  Swal.fire({
                    title: 'Xóa thành viên thành công',
                    icon: 'success',
                  });
                })
                .catch((err) => {
                  dispatch(appActions.hideLoading());
                  Swal.fire({
                    title: 'Lỗi',
                    icon: 'error',
                    text: `Có lỗi trong quá trình xóa thành viên. Vui lòng liên hệ quản trị viên. Lỗi: ${err.message}`,
                  });
                });
            }
          });
        };
        return (
          <div className={classes.actions}>
            <Button
              type='danger'
              icon={<AiFillDelete />}
              className={classes['btn-action']}
              onClick={handleDeleteMember}
            ></Button>
            <Button
              type='primary'
              icon={<BsFillPencilFill />}
              className={classes['btn-action']}
              onClick={() => {
                setMemberInfo(record);
                setIsVisible(true);
              }}
            ></Button>
          </div>
        );
      },
    },
  ];
  //#endregion

  //#region handle Event
  const loadMembers = () => {
    axios
      .get('/api/get-all-members')
      .then((res) => {
        const { adminUsers, partnerUsers } = res.data;
        setAdminUsers(adminUsers);
        setPartnerUsers(partnerUsers);
      })
      .catch((err) => {
        Swal.fire({
          title: 'Lỗi',
          text: `Có lỗi trong quá trình lấy tất cả các thành viên. Lỗi: ${err.message}`,
        });
      });
  };

  const handleAddNewMember = () => {
    setIsShowModal(true);
  };

  const handleCancelAddNewMember = () => {
    setIsShowModal(false);
    formik.resetForm();
  };

  const handleOnOk = async () => {
    const error = await formik.validateForm();
    if (Object.keys(error).length) {
      formik.setTouched(error);
    } else {
      dispatch(appActions.showLoading());
      axios
        .post('/api/create-member', formik.values)
        .then(() => {
          dispatch(appActions.hideLoading());
          Swal.fire({
            title: 'Thông báo',
            text: 'Tạo thành viên thành công',
            icon: 'success',
          }).finally(() => {
            handleCancelAddNewMember();
            loadMembers();
          });
        })
        .catch((err) => {
          dispatch(appActions.hideLoading());
          Swal.fire({
            title: 'Lỗi',
            text: `Có lỗi khi tạo thành viên. Lỗi: ${err.message}`,
            icon: 'error',
          });
        });
    }
  };
  //#endregion

  //#region Get All Members
  useEffect(() => {
    loadMembers();
  }, []);
  //#endregion

  return (
    <>
      {isLoading && <LoadingSpinner />}
      <Menutop />
      <Menuleft />
      <div className={classes.wrapper}>
        <div className={cx(classes.clearfix, classes.content)}>
          <h3 className={classes.title}>Quản Lý Thành Viên</h3>
        </div>
        <div className={cx(classes.clearfix, classes['tabs-container'])}>
          <Button icon={<FaPlus />} className={classes.btn} size='large' type='primary' onClick={handleAddNewMember}>
            Thêm Thành Viên
          </Button>
          <Tabs defaultActiveKey='1' centered size='large'>
            <Tabs.TabPane
              tab={
                <div className={classes['tab-item']}>
                  <GrUserAdmin />
                  Quản Trị Viên
                </div>
              }
              key='1'
            >
              <div className={classes['tabs-item-content']}>
                <Table
                  dataSource={adminUsers}
                  bordered
                  columns={columnConfigs}
                  pagination={{
                    pageSize: 7,
                  }}
                />
              </div>
            </Tabs.TabPane>
            <Tabs.TabPane
              tab={
                <div className={classes['tab-item']}>
                  <AiOutlineTeam color='black' size={20} />
                  Partner
                </div>
              }
              key='2'
            >
              <div className={classes['tabs-item-content']}>
                <Table
                  dataSource={partnerUsers}
                  bordered
                  columns={columnConfigs}
                  pagination={{
                    pageSize: 7,
                  }}
                />
              </div>
            </Tabs.TabPane>
          </Tabs>
        </div>
      </div>
      <Modal
        visible={isShowModal}
        centered
        onCancel={handleCancelAddNewMember}
        title='Thêm Thành Viên'
        okText='Tạo'
        cancelText='Hủy'
        onOk={handleOnOk}
      >
        <form>
          <div className={classes['form-group']}>
            <label htmlFor='userRole' className={classes['form-label']}>
              Loại thành viên
            </label>
            <Select
              className={classes['form-control']}
              placeholder='Loại thành viên'
              value={formik.values.userRole || undefined}
              onChange={(value) => formik.setFieldValue('userRole', value)}
            >
              <Select.Option value='1'>Quản trị viên</Select.Option>
              <Select.Option value='0'>Partner</Select.Option>
            </Select>
            {formik.touched.userRole && formik.errors.userRole ? (
              <Typography.Text type='danger' className={classes['error-message']}>
                {formik.errors.userRole}
              </Typography.Text>
            ) : null}
          </div>
          <div className={classes['form-group']}>
            <label htmlFor='username' className={classes['form-label']}>
              Tên đăng nhập
            </label>
            <Input
              placeholder='Nhập tên đăng nhập'
              className={classes['form-control']}
              {...formik.getFieldProps('username')}
              id='username'
            />
            {formik.touched.username && formik.errors.username ? (
              <Typography.Text type='danger' className={classes['error-message']}>
                {formik.errors.username}
              </Typography.Text>
            ) : null}
          </div>
          <div className={classes['form-group']}>
            <label htmlFor='password' className={classes['form-label']}>
              Mật khẩu
            </label>
            <Input
              placeholder='Nhập mật khẩu'
              className={classes['form-control']}
              {...formik.getFieldProps('password')}
              id='password'
              type='password'
            />
            {formik.touched.password && formik.errors.password ? (
              <Typography.Text type='danger' className={classes['error-message']}>
                {formik.errors.password}
              </Typography.Text>
            ) : null}
          </div>
          <div className={classes['form-group']}>
            <label htmlFor='confirmPassword' className={classes['form-label']}>
              Nhập lại mật khẩu
            </label>
            <Input
              placeholder='Nhập lại mật khẩu'
              className={classes['form-control']}
              {...formik.getFieldProps('confirmPassword')}
              id='confirmPassword'
              type='password'
            />
            {formik.touched.confirmPassword && formik.errors.confirmPassword ? (
              <Typography.Text type='danger' className={classes['error-message']}>
                {formik.errors.confirmPassword}
              </Typography.Text>
            ) : null}
          </div>
        </form>
      </Modal>
      {isVisible && <UpdateMemberPopup onHideModal={setIsVisible} memberInfo={memberInfo} />}
    </>
  );
};

export default MemberMangement;
