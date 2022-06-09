import { Input, Modal, Table, Typography } from 'antd';
import cx from 'classnames';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { FaPen, FaTimes } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import NumberFormat from 'react-number-format';
import { useDispatch, useSelector } from 'react-redux';
import * as Yup from 'yup';
import AlertPopup from './../../components/AlertPopup';
import LoadingSpinner from './../../components/LoadingSpinner';
import * as quanLyLoaiVeActions from './../../Redux/Action/quanLyLoaiVeActions';
import { default as axios } from './../../utils/axios';
import Menuleft from './../Menuleft';
import Menutop from './../Menutop';
import ButtonAction from './../QuanLyVe/ButtonAction';
import classes from './styles.module.css';
import Swal from 'sweetalert2';

const QuanLyLoaiVe = () => {
  const [isShowTicketModal, setIsShowTicketModal] = useState(false);
  const [okText, setOkText] = useState('OK');
  const [cancelText, setCancelText] = useState('Hủy');
  const [modalTitle, setModalTitle] = useState('Modal');
  const [isUpdateTicket, setIsUpdateTicket] = useState(false);

  const formik = useFormik({
    initialValues: {
      TENLOAI: '',
      SO_TIEN_GIAM: '',
    },
    validationSchema: Yup.object({
      TENLOAI: Yup.string()
        .required('Tên loại vé không được để trống')
        .max(20, 'Tên loại vé không dài hơn quá 20 ký tự')
        .trim(),
      SO_TIEN_GIAM: Yup.number()
        .required('Vui lòng nhập số tiền giảm!')
        .typeError('Số tiền giảm không hợp lệ')
        .moreThan(-1, 'Số tiền giảm phải là 1 số nguyên dương'),
    }),
  });

  const dispatch = useDispatch();
  const { ticketTypes } = useSelector((state) => state.quanLyLoaiVeState);
  const { isLoading, isShowModal } = useSelector((state) => state.appState);

  const setModalInfo = (title, okText, cancelText) => {
    setModalTitle(title);
    setOkText(okText);
    setCancelText(cancelText);
  };

  const handleNewTicketType = () => {
    setModalInfo('Tạo Loại Vé', 'Tạo Loại Vé', 'Hủy');
    setIsShowTicketModal(true);
  };

  const handleOk = async () => {
    const error = await formik.validateForm();
    if (Object.keys(error).length) {
      formik.setTouched(error);
    } else {
      isUpdateTicket
        ? dispatch(quanLyLoaiVeActions.updateTicketType(formik.values))
        : dispatch(quanLyLoaiVeActions.createTicketType(formik.values));
      formik.resetForm();
      setIsShowTicketModal(false);
    }
  };

  const handleCancel = () => {
    setIsShowTicketModal(false);
    setIsUpdateTicket(false);
    formik.resetForm();
  };

  const columnConfigurations = [
    {
      title: 'Mã Loại Vé',
      dataIndex: 'MALOAI',
      key: 'MALOAI',
      sorter: (item1, item2) => item1['MALOAI'] - item2['MALOAI'],
    },
    {
      title: 'Tên Loại',
      dataIndex: 'TENLOAI',
      key: 'TENLOAI',
      sorter: (item1, item2) => item1['TENLOAI'].localeCompare(item2['TENLOAI']),
    },
    {
      title: 'Số tiền giảm',
      dataIndex: 'SO_TIEN_GIAM',
      key: 'SO_TIEN_GIAM',
      sorter: (item1, item2) => +item1['SO_TIEN_GIAM'] - +item2['SO_TIEN_GIAM'],
      render: (value) => (
        <NumberFormat thousandSeparator={true} displayType={'text'} thousandsGroupStyle='thousand' value={value} />
      ),
    },
    {
      title: 'Thao Tác',
      key: 'THAOTAC',
      render: (_, record) => {
        const handleDeleteTicketType = () => {
          Modal.confirm({
            title: 'Xác nhận',
            content: (
              <span>
                Bạn có chắc muốn xóa loại vé <b>{record.TENLOAI}</b>?
              </span>
            ),
            centered: true,
            okText: 'Xóa',
            cancelText: 'Hủy',
            onOk: () => {
              dispatch(quanLyLoaiVeActions.deleteTicketType(record.MALOAI));
            },
          });
        };

        const handleUpdateTicketType = () => {
          formik.setValues(record);
          setModalInfo('Cập Nhật Loại Vé', 'Cập Nhật', 'Hủy');
          setIsShowTicketModal(true);
          setIsUpdateTicket(true);
        };
        return (
          <>
            <div className={classes.actions}>
              <ButtonAction
                buttonType='primary'
                icon={<FaPen />}
                placement='bottom'
                tooltipTitle='Cập nhật loại vé'
                handleClick={handleUpdateTicketType}
              />
              <ButtonAction
                buttonType='danger'
                icon={<FaTimes />}
                placement='bottom'
                tooltipTitle='Xóa'
                handleClick={handleDeleteTicketType}
              />
            </div>
          </>
        );
      },
    },
  ];

  const handleTenLoaiBlur = async () => {
    try {
      const { data } = await axios.get('/api/ticketTypes');
      const ticketType = data.find((item) => item.TENLOAI.toLowerCase() === formik.values.TENLOAI.toLowerCase());
      ticketType && formik.setFieldError('TENLOAI', 'Tên loại vé đã tồn tại');
    } catch (error) {
      Swal.fire({
        title: `Có lỗi trong quá trình kiểm tra tên của loại vé. Lỗi ${error.message}`,
        icon: 'error',
      });
    }
  };

  useEffect(() => {
    dispatch(quanLyLoaiVeActions.getAllTicketTypes());
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isShowModal && <AlertPopup title='Thành Công' message='Thao tác thành công' type='success' />}
      <Menutop />
      <Menuleft />
      <div className={classes.wrapper}>
        <div className={cx(classes.clearfix, classes.content)}>
          <h2 className={classes.content__header}>Quản Lý Loại Vé</h2>
          <div className={classes.content__new}>
            <ButtonAction
              icon={<FiPlus />}
              placement='bottom'
              tooltipTitle='Tạo Loại Vé'
              buttonType='success'
              buttonShape='round'
              buttonSize='large'
              handleClick={handleNewTicketType}
            >
              <span className={classes.content__new__content}>Tạo Loại Vé</span>
            </ButtonAction>
          </div>
          <Table
            columns={columnConfigurations}
            dataSource={ticketTypes}
            pagination={{ position: ['bottomLeft'], pageSize: 10 }}
          />
        </div>
        <Modal
          visible={isShowTicketModal}
          onOk={handleOk}
          onCancel={handleCancel}
          centered
          okText={okText}
          cancelText={cancelText}
          title={modalTitle}
        >
          <form>
            <div className={classes['form-group']}>
              <label htmlFor='TENLOAI' className={classes['form-label']}>
                Tên Loại Vé
              </label>
              <Input
                id='TENLOAI'
                addonBefore='Tên Loại Vé'
                placeholder='Nhập Tên Loại Vé'
                className={classes['form-control']}
                value={formik.values.TENLOAI}
                onChange={formik.handleChange}
                onBlur={(e) => {
                  formik.handleBlur(e);
                  handleTenLoaiBlur();
                }}
                disabled={isUpdateTicket}
              />
              {formik.touched.TENLOAI && formik.errors.TENLOAI ? (
                <Typography.Text type='danger' className={classes['error-message']}>
                  {formik.errors.TENLOAI}
                </Typography.Text>
              ) : null}
            </div>
            <div className={classes['form-group']}>
              <label htmlFor='SO_TIEN_GIAM' className={classes['form-label']}>
                Sô tiền giảm
              </label>
              <Input
                id='SO_TIEN_GIAM'
                addonBefore='Số tiền giảm'
                placeholder='Nhập Số tiền giảm'
                className={classes['form-control']}
                {...formik.getFieldProps('SO_TIEN_GIAM')}
              />
              {formik.touched.SO_TIEN_GIAM && formik.errors.SO_TIEN_GIAM ? (
                <Typography.Text type='danger' className={classes['error-message']}>
                  {formik.errors.SO_TIEN_GIAM}
                </Typography.Text>
              ) : null}
            </div>
          </form>
        </Modal>
      </div>
    </>
  );
};

export default QuanLyLoaiVe;
