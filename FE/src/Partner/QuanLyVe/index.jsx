import { ExclamationCircleOutlined } from '@ant-design/icons';
import { Modal, Table } from 'antd';
import cx from 'classnames';
import React, { useState, useEffect } from 'react';
import { FaPen, FaTimes } from 'react-icons/fa';
import { FiPlus } from 'react-icons/fi';
import Menuleft from '../Menuleft';
import Menutop from '../Menutop';
import ButtonAction from './ButtonAction';
import { columns } from './configColumn';
import styles from './styles.module.css';
import axios from 'axios';
import LoadingSpinner from '../../components/LoadingSpinner';
import AlertPopup from '../../components/AlertPopup';

const { confirm } = Modal;

const QuanLyVe = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('Basic Modal');
  const [modalOkTitle, setModalOkTitle] = useState('Ok');
  const [modalCancelTitle, setModalCancelTitle] = useState('Cancel');
  const [dataSource, setDataSource] = useState([]);
  const [isShowLoadingSpinner, setIsShowLoadingSpinner] = useState(false);
  const [isShowAlertPopup, setIsShowAlertPopup] = useState(true);

  const handleNewTicket = () => {
    setModalTitle('Tạo Vé');
    setModalOkTitle('Tạo Vé');
    setModalCancelTitle('Hủy');
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  const showConfirm = (data) => {
    confirm({
      title: 'Bạn có thực sự muốn xóa vé này hay không?',
      icon: <ExclamationCircleOutlined />,
      onOk() {
        setIsModalVisible(false);
      },
      onCancel() {
        setIsModalVisible(false);
      },
      centered: true,
      cancelText: 'Hủy',
    });
  };

  const columnConfigurations = [
    ...columns,
    {
      title: '',
      render: (_, record) => {
        const handleUpdateTicket = () => {
          setModalTitle('Cập Nhật Vé');
          setModalOkTitle('Cập Nhật');
          setModalCancelTitle('Hủy');
          setIsModalVisible(true);
        };

        const handleDeleteTicket = () => {
          showConfirm(record);
        };

        const isValid = new Date(record.NGAYTAO) - new Date() >= 0;
        return (
          <>
            {isValid ? (
              <div className={styles.actions}>
                <ButtonAction
                  icon={<FaPen />}
                  placement='bottom'
                  tooltipTitle='Cập nhật vé'
                  buttonShape='default'
                  buttonType='primary'
                  handleClick={handleUpdateTicket}
                />
                <ButtonAction
                  icon={<FaTimes />}
                  placement='bottom'
                  tooltipTitle='Xóa vé'
                  buttonShape='default'
                  buttonType='danger'
                  handleClick={handleDeleteTicket}
                />
              </div>
            ) : (
              <ButtonAction
                icon={<FaPen />}
                placement='bottom'
                tooltipTitle='Xóa vé'
                buttonShape='default'
                buttonType='danger'
                handleClick={handleDeleteTicket}
              />
            )}
          </>
        );
      },
    },
  ];

  useEffect(() => {
    const parseTime = (data) => {
      return data.map((item) => ({
        ...item,
        NGAYTAO: new Date(item.NGAYTAO).toLocaleString(),
      }));
    };
    const getDataSource = async () => {
      const url = '/api/veproducts';
      try {
        const { data } = await axios.get(url);
        setDataSource(parseTime(data));
      } catch (error) {}
    };

    getDataSource();
  }, []);

  return (
    <>
      {isShowLoadingSpinner && <LoadingSpinner />}
      {isShowAlertPopup && (
        <AlertPopup
          type='success'
          title='Test Success'
          message='Test Success'
        />
      )}
      <Menutop />
      <Menuleft />
      <div className={styles.ticket__wrapper}>
        <div className={cx(styles.clearfix, styles.ticket__content)}>
          <h2 className={styles.ticket__content__header}>Quản Lý Vé</h2>
          <div className={styles.ticket__content__new}>
            <ButtonAction
              icon={<FiPlus />}
              placement='bottom'
              tooltipTitle='Tạo Vé'
              buttonType='success'
              buttonShape='round'
              buttonSize='large'
              handleClick={handleNewTicket}
            >
              <span className={styles.ticket__content__new__content}>
                Tạo Vé
              </span>
            </ButtonAction>
          </div>
          <Table
            dataSource={dataSource}
            columns={columnConfigurations}
            pagination={{
              position: ['bottomLeft'],
              pageSize: 10,
            }}
          />
          <Modal
            centered
            title={modalTitle}
            visible={isModalVisible}
            onOk={handleOk}
            onCancel={handleCancel}
            okText={modalOkTitle}
            cancelText={modalCancelTitle}
          ></Modal>
        </div>
      </div>
    </>
  );
};

export default QuanLyVe;
