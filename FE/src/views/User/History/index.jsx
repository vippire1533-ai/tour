import { Table, Empty } from 'antd';
import React, { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import classes from './styles.module.css';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { default as axios } from './../../../utils/axios';
import moment from 'moment';
import NumberFormat from 'react-number-format';

const columnConfigs = [
  {
    title: 'Mã đơn đặt',
    dataIndex: 'MA_DON_DAT',
    key: 'MA_DON_DAT',
    sorter: (item1, item2) => +item1['MA_DON_DAT'] - item2['MA_DON_DAT'],
  },
  {
    title: 'Tour',
    dataIndex: 'TEN_TOUR',
    key: 'TEN_TOUR',
    ellipsis: true,
  },
  {
    title: 'Loại Vé',
    dataIndex: 'LOAI_VE',
    key: 'LOAI_VE',
  },
  {
    title: 'Số Lượng Vé',
    dataIndex: 'SO_LUONG_VE',
    key: 'SO_LUONG_VE',
    sorter: (item1, item2) => +item1['SO_LUONG_VE'] - item2['SO_LUONG_VE'],
  },
  {
    title: 'Tổng Tiền',
    dataIndex: 'TONG_TIEN',
    key: 'TONG_TIEN',
    render: (value) => (
      <NumberFormat thousandSeparator={true} displayType={'text'} thousandsGroupStyle='thousand' value={value} />
    ),
    sorter: (item1, item2) => +item1['TONG_TIEN'] - item2['TONG_TIEN'],
  },
  {
    title: 'Điểm Đến',
    dataIndex: 'DIEM_DEN',
    key: 'DIEM_DEN',
    ellipsis: true,
  },
  {
    title: 'Điểm Xuất Phát',
    dataIndex: 'DIEM_XUAT_PHAT',
    key: 'DIEM_XUAT_PHAT',
    ellipsis: true,
  },
  {
    title: 'Ngày Đi',
    dataIndex: 'NGAY_DI',
    key: 'NGAY_DI',
    render: (value) => moment(value).format('DD/MM/YYYY'),
    sorter: (item1, item2) => new Date(item1['NGAY_DI']).getTime() - new Date(item2['NGAY_DI']).getTime(),
  },
  {
    title: 'Tình Trạng Thanh Toán',
    dataIndex: 'TINH_TRANG_THANH_TOAN',
    key: 'TINH_TRANG_THANH_TOAN',
  },
  {
    title: 'Tình Trạng Đơn',
    dataIndex: 'TINH_TRANG_DON',
    key: 'TINH_TRANG_DON',
  },
  {
    title: 'Ngày Đặt Đơn',
    dataIndex: 'NGAY_TAO_DON',
    key: 'NGAY_TAO_DON',
    render: (value) => moment.utc(value).format('HH:mm - DD/MM/YYYY'),
    sorter: (item1, item2) => new Date(item1['NGAY_TAO_DON']).getTime() - new Date(item2['NGAY_TAO_DON']).getTime(),
  },
];

const History = () => {
  const [dataSource, setDataSource] = useState([]);

  //#region initialize hook
  const navigate = useNavigate();

  //#region Load data source
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('dataUser'));
    if (!user) {
      Swal.fire({
        title: 'Thông báo',
        text: 'Vui lòng đăng nhập để thực hiện tính năng này!',
        icon: 'info',
      }).then(() => {
        navigate('/');
      });
    } else {
      axios
        .get('/api/lich-su-dat-tour')
        .then((res) => {
          setDataSource(res.data);
        })
        .catch((err) => {
          Swal.fire({ title: 'Lỗi', text: err.message, icon: 'error' });
        });
    }
  }, []);
  //#endregion
  return (
    <>
      <Header />
      <div className={classes['heading-container']}>
        <h3 className={classes['heading']}>Lịch Sử Đặt Vé</h3>
      </div>
      <div className={classes['table-container']}>
        {dataSource.length ? (
          <Table
            dataSource={dataSource}
            columns={columnConfigs}
            bordered
            pagination={{
              pageSize: 7,
            }}
          />
        ) : (
          <div className={classes['empty-container']}>
            <Empty description='Không có dữ liệu' />
          </div>
        )}
      </div>
    </>
  );
};

export default History;
