import { PlusCircleFilled, UploadOutlined } from '@ant-design/icons';
import { Button, DatePicker, Input, message, Select, Typography, Upload } from 'antd';
import cx from 'classnames';
import { useFormik } from 'formik';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import LoadingSpinner from '../../components/LoadingSpinner';
import { getAllTourTypes } from '../../Redux/Action/quanLyLoaiTourActions';
import Menuleft from '../Menuleft';
import Menutop from '../Menutop';
import * as appActions from './../../Redux/Action/appActions';
import { default as axios } from './../../utils/axios';
import classes from './AddTour.module.css';

const MAX_FILE_LENGTH = 10;

const handleBeforeUpload = (file) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png' || file.type === 'image/gif';
  if (!isJpgOrPng) {
    message.error('You can only upload JPG/PNG file!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Không thể tải hình ảnh có kích thước lớn hơn 2MB!. Vui lòng chọn ảnh khác');
  }
  return isJpgOrPng && isLt2M;
};

const AddTour = () => {
  const [fileList, setFileList] = useState([]);
  const dispatch = useDispatch();
  const { tourTypes } = useSelector((state) => state.quanLyLoaiTourState);
  const { isLoading } = useSelector((state) => state.appState);
  const formik = useFormik({
    initialValues: {
      tenTour: '',
      loaiTour: '',
      tinh: '',
      diemDi: '',
      diemDen: '',
      giaTour: '',
      ngayDi: '',
      gioiThieuTour: '',
      noiDungTour: '',
    },
    validationSchema: Yup.object({
      tenTour: Yup.string()
        .required('Vui lòng nhập tên tour !!')
        .max(50, 'Tên tour không được dài quá 50 ký tự')
        .trim(),
      loaiTour: Yup.number().required('Vui lòng chọn loại tour !!'),
      tinh: Yup.string().required('Vui lòng chọn tỉnh/thành phố !!'),
      diemDi: Yup.string()
        .required('Vui lòng nhập điểm xuất phát !!')
        .max(50, 'Điểm xuất phát không được vượt quá 50 kí tự !')
        .trim(),
      diemDen: Yup.string()
        .required('Vui lòng nhập điểm đến !!')
        .max(50, 'Điểm đến không được vượt quá 50 kí tự !')
        .trim(),
      giaTour: Yup.number()
        .required('Vui lòng nhập giá tour')
        .typeError('Giá tour không hợp lệ. Vui lòng nhập lại giá tour!!')
        .moreThan(-1, 'Giá tour phải là một số dương'),
      ngayDi: Yup.date()
        .required('Vui lòng chọn ngày khởi hành !')
        .typeError('Vui lòng chọn ngày khởi hành')
        .min(new Date(), `Vui lòng chọn ngày có hiệu lực từ ngày ${new Date().getDate() + 1} trở đi!`),
      gioiThieuTour: Yup.string()
        .required('Vui lòng nhập giới thiệu sơ lược của tour')
        .max(500, 'Nội dung không được vượt quá 500 ký tự')
        .trim(),
      noiDungTour: Yup.string()
        .required('Vui lòng nhập giới nội dung chi tiết tua của tour')
        .max(300, 'Nội dung không được vượt quá 300 ký tự')
        .trim(),
    }),
    onSubmit: async (values, { resetForm }) => {
      const payload = new FormData();
      fileList.forEach((file) => {
        payload.append('images', file.originFileObj);
      });
      payload.append('tourInfo', JSON.stringify({ ...values, ngayDi: values.ngayDi._d }));
      try {
        dispatch(appActions.showLoading());
        const res = await axios.post('/api/products', payload, {
          headers: { 'content-type': 'multipart/form-data' },
        });
        Swal.fire({
          title: 'Tạo Tour Thành Công',
          icon: 'success',
          confirmButtonText: 'Đóng',
        });
        resetForm();
        setFileList([]);
        dispatch(appActions.hideLoading());
      } catch (error) {
        Swal.fire({
          title: 'Tạo Tour Thất Bại',
          icon: 'error',
          confirmButtonText: 'Đóng',
        });
        dispatch(appActions.hideLoading());
      }
    },
  });

  // Upload File
  const handleUploadFileChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

  const handleTourNameBlur = () => {
    axios
      .get('/api/products')
      .then((res) => {
        const tour = res.data.find((item) => item.TENTOUR.toLowerCase() === formik.values.tenTour.trim().toLowerCase());
        if (tour) {
          formik.setFieldError('tenTour', 'Tên tour đã tồn tại!!');
        }
      })
      .catch((error) => {
        Swal.fire({
          title: 'Lỗi',
          text: error.message,
          icon: 'error',
        });
      });
  };

  useEffect(() => {
    dispatch(getAllTourTypes());
  }, []);

  return (
    <div>
      {isLoading && <LoadingSpinner />}
      <Menutop />
      <Menuleft />
      <div className={classes.wrapper}>
        <div className={cx(classes.clearfix, classes.content)}>
          <h3 className={classes.title}>Tạo Tour</h3>
          <form className={classes.form}>
            <div className={classes['form-side-left']}>
              <div className={classes['form-group']}>
                <label htmlFor='tenTour' className={classes['form-label']}>
                  Tên Tour
                </label>
                <Input
                  placeholder='Nhập tên tour'
                  name='tenTour'
                  id='tenTour'
                  value={formik.values.tenTour}
                  onChange={formik.handleChange}
                  onBlur={(e) => {
                    handleTourNameBlur();
                    formik.handleBlur(e);
                  }}
                />
                {formik.touched.tenTour && formik.errors.tenTour ? (
                  <Typography.Text type='danger' className={classes['error-message']}>
                    {formik.errors.tenTour}
                  </Typography.Text>
                ) : null}
              </div>
              <div className={classes['form-group']}>
                <div className={classes['align-two-side']}>
                  <div className={classes.side}>
                    <label htmlFor='loaiTour' className={classes['form-label']}>
                      Loại Tour
                    </label>
                    <Select
                      className={classes['form-control']}
                      placeholder='Chọn loại tour'
                      name='loaiTour'
                      id='loaiTour'
                      value={formik.values.loaiTour || undefined}
                      onChange={(value) => formik.setFieldValue('loaiTour', value)}
                    >
                      {tourTypes.map((ticket, index) => (
                        <Select.Option key={index} value={ticket.MALOAI}>
                          {ticket.TENLOAI}
                        </Select.Option>
                      ))}
                    </Select>
                    {formik.touched.loaiTour && formik.errors.loaiTour ? (
                      <Typography.Text type='danger' className={classes['error-message']}>
                        {formik.errors.loaiTour}
                      </Typography.Text>
                    ) : null}
                  </div>
                  <div className={classes.side}>
                    <label htmlFor='tinh' className={classes['form-label']}>
                      Tỉnh/Thành phố
                    </label>
                    <Select
                      className={classes['form-control']}
                      placeholder='Chọn tỉnh/thành phố'
                      name='tinh'
                      id='tinh'
                      value={formik.values.tinh || undefined}
                      onChange={(value) => formik.setFieldValue('tinh', value)}
                    >
                      <Select.Option value='SaiGon'>Sài Gòn</Select.Option>
                      <Select.Option value='NhaTrang'>Nha Trang</Select.Option>
                      <Select.Option value='PhuQuoc'>Phú Quốc</Select.Option>
                      <Select.Option value='LaoCai'>Lào Cai</Select.Option>
                      <Select.Option value='DaNang'>Đà Nẵng</Select.Option>
                      <Select.Option value='HaNoi'>Hà Nội</Select.Option>
                    </Select>
                    {formik.touched.tinh && formik.errors.tinh ? (
                      <Typography.Text type='danger' className={classes['error-message']}>
                        {formik.errors.tinh}
                      </Typography.Text>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={classes['form-group']}>
                <label htmlFor='diemDi' className={classes['form-label']}>
                  Điểm Xuất Phát
                </label>
                <Input
                  placeholder='Nhập chi tiết điểm xuất phát'
                  name='diemDi'
                  id='diemDi'
                  {...formik.getFieldProps('diemDi')}
                />
                {formik.touched.diemDi && formik.errors.diemDi ? (
                  <Typography.Text type='danger' className={classes['error-message']}>
                    {formik.errors.diemDi}
                  </Typography.Text>
                ) : null}
              </div>
              <div className={classes['form-group']}>
                <label htmlFor='diemDen' className={classes['form-label']}>
                  Điểm Đến
                </label>
                <Input
                  placeholder='Nhập chi tiết điểm đến'
                  name='diemDen'
                  id='diemDen'
                  {...formik.getFieldProps('diemDen')}
                />
                {formik.touched.diemDen && formik.errors.diemDen ? (
                  <Typography.Text type='danger' className={classes['error-message']}>
                    {formik.errors.diemDen}
                  </Typography.Text>
                ) : null}
              </div>
              <div className={classes['form-group']}>
                <div className={classes['align-two-side']}>
                  <div className={classes.side}>
                    <label htmlFor='giaTour' className={classes['form-label']}>
                      Giá Tour
                    </label>
                    <Input
                      placeholder='Nhập giá tour'
                      name='giaTour'
                      id='giaTour'
                      {...formik.getFieldProps('giaTour')}
                    />
                    {formik.touched.giaTour && formik.errors.giaTour ? (
                      <Typography.Text type='danger' className={classes['error-message']}>
                        {formik.errors.giaTour}
                      </Typography.Text>
                    ) : null}
                  </div>
                  <div className={classes.side}>
                    <label htmlFor='ngayDi' className={classes['form-label']}>
                      Ngày Khởi Hành
                    </label>
                    <DatePicker
                      className={classes['form-control']}
                      placeholder='Chọn ngày khởi hành'
                      format='DD/MM/YYYY'
                      value={formik.values.ngayDi}
                      onChange={(value) => formik.setFieldValue('ngayDi', value)}
                      name='ngayDi'
                      id='ngayDi'
                      onBlur={formik.handleBlur}
                    />
                    {formik.touched.ngayDi && formik.errors.ngayDi ? (
                      <Typography.Text type='danger' className={classes['error-message']}>
                        {formik.errors.ngayDi}
                      </Typography.Text>
                    ) : null}
                  </div>
                </div>
              </div>
              <div className={classes['form-group']}>
                <label htmlFor='gioiThieu' className={classes['form-label']}>
                  Giới Thiệu Tour
                </label>
                <Input.TextArea
                  placeholder='Nhập giới thiệu sơ lược về tour'
                  name='gioiThieuTour'
                  id='gioiThieuTour'
                  rows={5}
                  {...formik.getFieldProps('gioiThieuTour')}
                />
                {formik.touched.gioiThieuTour && formik.errors.gioiThieuTour ? (
                  <Typography.Text type='danger' className={classes['error-message']}>
                    {formik.errors.gioiThieuTour}
                  </Typography.Text>
                ) : null}
              </div>
              <div className={classes['form-group']}>
                <label htmlFor='noiDungTour' className={classes['form-label']}>
                  Nội Dung Chi Tiết Tour
                </label>
                <Input.TextArea
                  placeholder='Nhập mô tả chi tiết các hoạt động của tour'
                  name='noiDungTour'
                  id='noiDungTour'
                  rows={8}
                  {...formik.getFieldProps('noiDungTour')}
                />
                {formik.touched.noiDungTour && formik.errors.noiDungTour ? (
                  <Typography.Text type='danger' className={classes['error-message']}>
                    {formik.errors.noiDungTour}
                  </Typography.Text>
                ) : null}
              </div>
            </div>
            <div className={classes['form-side-right']}>
              <div className='form-group'>
                <label htmlFor='' className={classes['form-label']}>
                  Hình Ảnh:
                </label>
                <p>
                  <em>Upload tối đa 10 ảnh của tour dang: *.jpg, *.png, *.gif</em>
                </p>
                <p>
                  <em>Kích thước mỗi hình không quá 2MB</em>
                </p>
                <Upload
                  listType='picture'
                  fileList={fileList}
                  accept='image/png, image/gif, image/jpeg'
                  multiple
                  beforeUpload={() => {
                    handleBeforeUpload();
                    return true;
                  }}
                  onChange={handleUploadFileChange}
                  maxCount={MAX_FILE_LENGTH}
                >
                  {fileList.length >= MAX_FILE_LENGTH ? null : (
                    <Button icon={<UploadOutlined />}>Upload ảnh tour</Button>
                  )}
                </Upload>
              </div>
              <div className={classes['form-actions']}>
                <Button
                  style={{
                    width: '100%',
                  }}
                  icon={<PlusCircleFilled />}
                  type='primary'
                  size='large'
                  disabled={!(formik.isValid && formik.dirty)}
                  onClick={formik.handleSubmit}
                >
                  Tạo tour
                </Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTour;
