import React, { useEffect, useState } from 'react'
import Menuleft from '../Menuleft'
import Menutop from '../Menutop'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import css from './AddTour.module.css';
import { Upload, message, DatePicker } from 'antd';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { useDispatch, useSelector } from 'react-redux';
import { getAllTicketTypes } from '../../Redux/Action/quanLyLoaiVeActions';
function getBase64(img, callback) {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
}

function beforeUpload(file) {
    const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
    if (!isJpgOrPng) {
        message.error('You can only upload JPG/PNG file!');
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
        message.error('Image must smaller than 2MB!');
    }
    return isJpgOrPng && isLt2M;
}
function AddTour() {
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [date, setDate] = useState();
    const [errDate, setErrDate] = useState('');

    const dispatch = useDispatch();
    const { ticketTypes } = useSelector((state) => state.quanLyLoaiVeState);
    useEffect(() => {
        dispatch(getAllTicketTypes());
    }, []);
    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div style={{ marginTop: 8 }}>Upload</div>
        </div>
    );
    function onChange(date, dateString) {
        setDate(date)
        const dateNow = new Date()
        if (dateNow > date) {
            setErrDate('Vui lòng chọn ngày sau ngày hiện tại')
        } else {
            setErrDate('')
        }
    }
    const handleChange = info => {
        if (info.file.status === 'uploading') {
            setLoading(true)
            return;
        }
        if (info.file.status === 'done') {
            // Get this url from response in real world.
            getBase64(info.file.originFileObj, imageUrl => {
                setImageUrl(imageUrl)
                setLoading(false)
            }

            );
        }
    };
    return (
        <div>
            <Menutop />
            <Menuleft />
            <div className={css.containerAddTour}>
                <Formik
                    initialValues={{ tenTour: '', loaiTour: '', tinh: '', giaTour: '', gioiThieu: '', noiDung: '', diemXuatPhat: '', diemDen: '' }}
                    validate={values => {
                        const errors = {};
                        if (!values.tenTour) errors.tenTour = 'Tên Tour không được bỏ trống';
                        if (values.tenTour.length > 49) errors.tenTour = 'Tên Tour không dài hơn 50 ký tự';
                        if (!values.giaTour) errors.giaTour = "Giá Tour không được bỏ trống"
                        if (isNaN(values.giaTour)) errors.giaTour = "Giá Tour phải là số"
                        if (!values.gioiThieu) errors.gioiThieu = 'Giới thiệu không được bỏ trống';
                        if (values.gioiThieu.length > 499) errors.gioiThieu = 'Giới thiệu không dài hơn 500 ký tự';
                        if (!values.noiDung) errors.noiDung = 'Nội dung không được bỏ trống';
                        if (values.noiDung.length > 299) errors.noiDung = 'Nội dung không dài hơn 300 ký tự';
                        if (!values.diemXuatPhat) errors.diemXuatPhat = 'Điểm đi không được bỏ trống';
                        if (values.diemXuatPhat.length > 49) errors.diemXuatPhat = 'Điểm đi không dài hơn 50 ký tự';
                        if (!values.diemDen) errors.diemDen = 'Điểm đến không được bỏ trống';
                        if (values.diemDen.length > 49) errors.diemDen = 'Điểm đến không dài hơn 50 ký tự';
                        return errors;
                    }}
                    onSubmit={(values, { setSubmitting }) => {
                        if (!date) {
                            setErrDate('Vui lòng chọn ngày')
                        } else if (errDate == '') {
                            console.log(values);
                            alert(JSON.stringify(values, null, 2));
                        }
                        setSubmitting(false);
                        // axios.post("/api/products",{
                        //     MALOAI:MALOAI,
                        //     TENTOUR:TENTOUR,
                        //     GTTOUR:GTTOUR,
                        //     GIATOUR:GIATOUR,
                        //     NOIDUNGTOUR:NOIDUNGTOUR,
                        //     HINHANH:HINHANH,
                        //     NGAYDI:NGAYDI,
                        //     DIEMDI:DIEMDI,
                        //     DIEMDEN:DIEMDEN,
                        //   }
                        //   ).then(()=>{
                        //     alert("success")
                        //   })
                        // };

                    }}
                >
                    {({ isSubmitting }) => (
                        <Form>
                            <div className={css.rowInput}>
                                <div className={css.colHeader}>
                                    <div className={css.rowItem}>
                                        <p>Tên tour :</p>
                                        <Field type="tenTour" name="tenTour" className={css.input} />
                                    </div>
                                    <ErrorMessage className={css.err} name="tenTour" component="div" />
                                </div >
                                <div className={css.colHeader}>
                                    <div className={css.rowItem}>

                                        <p>Loại Tour :</p>
                                        <Field as="select" name="loaiTour" className={css.input}>
                                            {ticketTypes?.map(item => <option value={item.MALOAI}>{item.TENLOAI}</option>)}
                                        </Field>
                                    </div>
                                </div>
                                <div className={css.colHeader}>
                                    <div className={css.rowItem}>

                                        <p>Tỉnh :</p>
                                        <Field as="select" name="tinh" className={css.input}>
                                            <option value="SaiGon">Sài Gòn</option>
                                            <option value="NhaTrang">Nha Trang</option>
                                            <option value="PhuQuoc">Phú Quốc</option>
                                            <option value="LaoCai">Lào Cai</option>
                                            <option value="DaNang">Đà Nẵng</option>
                                            <option value="HaNoi">Hà Nội</option>
                                        </Field>
                                    </div>
                                </div>
                            </div>
                            <div className={css.rowInput}>
                                <div className={css.col50}>
                                    <div className={css.rowItem}>

                                        <p>Giá Tour :</p>
                                        <Field type="giaTour" name="giaTour" className={css.input} />
                                    </div>
                                    <ErrorMessage className={css.err} name="giaTour" component="div" />
                                </div>
                                <div className={css.col50}>
                                    <div className={css.rowItem}>
                                        <p>Ngày đi :</p>
                                        <DatePicker onChange={onChange} style={{ width: "100%", height: '40px' }} />
                                    </div>
                                    <div className={css.err}>{errDate}</div>

                                </div>
                            </div>
                            <div className={css.rowInput1}>
                                <div className={css.col50}>
                                    <div className={css.rowItem1}>

                                        <p>Giới Thiệu :</p>
                                        <Field type="gioiThieu" name="gioiThieu" className={css.input} as="textarea" style={{ height: '100px', resize: 'none' }} />
                                    </div>
                                    <ErrorMessage className={css.err} name="gioiThieu" component="div" />

                                </div>
                                <div className={css.col50}>
                                    <div className={css.rowItem1}>

                                        <p>Nội dung :</p>
                                        <Field type="noiDung" name="noiDung" className={css.input} as="textarea" style={{ height: '100px', resize: 'none' }} />
                                    </div>
                                    <ErrorMessage className={css.err} name="noiDung" component="div" />
                                </div>
                            </div>

                            <div className={css.rowItem1} style={{ margin: '0 20px 20px' }}>
                                <p>Hình ảnh :</p>
                                <Upload
                                    name="avatar"
                                    listType="picture-card"
                                    className="avatar-uploader"
                                    showUploadList={false}
                                    action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                                    beforeUpload={beforeUpload}
                                    onChange={handleChange}
                                >
                                    {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
                                </Upload>
                            </div>
                            <div className={css.rowInput}>
                                <div className={css.col50}>
                                    <div className={css.rowItem}>

                                        <p>Điểm đi :</p>
                                        <Field type="diemXuatPhat" name="diemXuatPhat" className={css.input} />
                                    </div>
                                    <ErrorMessage className={css.err} name="diemXuatPhat" component="div" />
                                </div>
                                <div className={css.col50}>
                                    <div className={css.rowItem}>

                                        <p>Điểm đến :</p>
                                        <Field type="diemDen" name="diemDen" className={css.input} />
                                    </div>
                                    <ErrorMessage className={css.err} name="diemDen" component="div" />
                                </div>
                            </div>


                            <button type="submit" disabled={isSubmitting} className={css.button}>
                                Submit
                            </button>
                        </Form>
                    )}
                </Formik>
            </div>

        </div>
    )
}

export default AddTour