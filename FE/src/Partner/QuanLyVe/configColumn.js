import { Tag, Modal } from 'antd';
import ButtonAction from './ButtonAction';
import { FaPen, FaTimes, FaEye } from 'react-icons/fa';
import classes from './styles.module.css';
import * as quanLyVeActions from './../../Redux/Action/quanLyVeActions';
import * as appActions from './../../Redux/Action/appActions';
import moment from 'moment';
import NumberFormat from 'react-number-format';

export const TAG_CONFIG = {
  active: {
    title: 'Còn hiệu lực',
    color: 'green',
  },
  booked: {
    title: 'Đã được đặt',
    color: 'blue',
  },
  expired: {
    title: 'Đã quá hạn',
    color: 'red',
  },
};

const showModal = (type, config) => {
  Modal[type](config);
};

const constructFilterObj = (data, field) => {
  const values = data.reduce((acc, item) => {
    if (item[field]) {
      acc.push(item[field]);
    }
    return acc;
  }, []);
  const items = new Set(values);
  return Array.from(items).map((item) => ({ text: item, value: item }));
};

export const createColumnConfigurations = (
  data,
  dispatch,
  showUpdateModal,
  formik,
) => {
  return [
    {
      title: 'Mã Vé',
      dataIndex: 'MAVE',
      key: 'MAVE',
      sorter: (item1, item2) => +item1['MAVE'] - +item2['MAVE'],
    },
    {
      title: 'Loại Tour',
      dataIndex: 'LOAITOUR',
      key: 'LOAITOUR',
      filters: constructFilterObj(data, 'LOAITOUR'),
      sorter: (item1, item2) =>
        item1['LOAITOUR'].localeCompare(item2['LOAITOUR']),
      onFilter: (value, record) => record['LOAITOUR'] === value,
    },
    {
      title: 'Loại Vé',
      dataIndex: 'LOAIVE',
      key: 'LOAIVE',
      filters: constructFilterObj(data, 'LOAIVE'),
      sorter: (item1, item2) => item1['LOAIVE'].localeCompare(item2['LOAIVE']),
      onFilter: (value, record) => record['LOAIVE'] === value,
    },
    {
      title: 'Khách Hàng',
      dataIndex: 'HOTEN',
      key: 'HOTEN',
    },
    {
      title: 'Giá Vé',
      dataIndex: 'GIAVE',
      key: 'GIAVE',
      render: (value) => (
        <NumberFormat
          thousandSeparator={true}
          displayType={'text'}
          thousandsGroupStyle='thousand'
          value={value}
        />
      ),
      sorter: (item1, item2) => +item1['GIAVE'] - +item2['GIAVE'],
    },
    {
      title: 'Ngày Tạo Vé',
      dataIndex: 'NGAYTAO',
      key: 'NGAYTAO',
      render: (value) => new Date(value).toLocaleString(),
      sorter: (item1, item2) =>
        new Date(item1['NGAYTAO']).getTime() -
        new Date(item2['NGAYTAO']).getTime(),
    },
    {
      title: 'Hiệu Lực Tới Ngày',
      dataIndex: 'NGAYCOHIEULUC',
      key: 'NGAYCOHIEULUC',
      render: (value) => new Date(value).toLocaleString(),
      sorter: (item1, item2) =>
        new Date(item1['NGAYCOHIEULUC']).getTime() -
        new Date(item2['NGAYCOHIEULUC']).getTime(),
    },
    {
      title: 'Tình Trạng Vé',
      dataIndex: 'TINHTRANG',
      key: 'TINHTRANG',
      render: (value) => {
        const tagType = TAG_CONFIG[value];
        return <Tag color={tagType.color}>{tagType.title}</Tag>;
      },
      filters: [
        {
          text: 'Đã được đặt',
          value: 'booked',
        },
        {
          text: 'Đã quá hạn',
          value: 'expired',
        },
        {
          text: 'Còn hiệu lực',
          value: 'active',
        },
      ],
      onFilter: (value, record) => {
        return record.TINHTRANG === value;
      },
    },
    {
      title: 'Hành Động',
      key: 'HANHDONG',
      render: (_, record) => {
        const showConfirmDeletionModal = () => {
          showModal('confirm', {
            title: 'Xác Nhận',
            content: (
              <span>
                Bạn có chắc muốn xóa vé <b>{record.MAVE}</b> hay không?
              </span>
            ),
            centered: true,
            onOk: () => {
              dispatch(appActions.showLoading());
              dispatch(quanLyVeActions.deleteTicket(record.MAVE));
            },
            okText: 'Xóa',
            cancelText: 'Hủy',
          });
        };

        const showUpdateTickerModal = () => {
          showUpdateModal();
          formik.setValues({
            ...record,
            MATOUR: record.MALOAITOUR,
            LOAIVE: record.MALOAIVE,
            GIAVE: record.GIAVE,
            NGAYCOHIEULUC: moment(record.NGAYCOHIEULUC),
          });
        };
        const BtnUpDateTicket = () => (
          <ButtonAction
            icon={<FaPen />}
            tooltipTitle='Cập nhật vé'
            placement='bottom'
            buttonType='primary'
            handleClick={showUpdateTickerModal}
          />
        );
        const BtnDeleteTicket = () => (
          <ButtonAction
            icon={<FaTimes />}
            tooltipTitle='Xóa vé'
            placement='bottom'
            buttonType='danger'
            handleClick={showConfirmDeletionModal}
          />
        );
        const BtnShowInfo = () => (
          <ButtonAction
            icon={<FaEye />}
            tooltipTitle='Chi tiết vé'
            placement='bottom'
            buttonType='default'
          />
        );
        return (
          <div className={classes.ticket__content__table__actions}>
            {record.TINHTRANG === 'active' ? (
              <>
                <BtnUpDateTicket />
                <BtnDeleteTicket />
              </>
            ) : record.TINHTRANG === 'booked' ? (
              <BtnShowInfo />
            ) : (
              <BtnDeleteTicket />
            )}
          </div>
        );
      },
    },
  ];
};
