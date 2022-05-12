import { Modal, Table } from 'antd';
import cx from 'classnames';
import React, { useEffect, useState } from 'react';
import { FiPlus } from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import AlertPopup from '../../components/AlertPopup';
import LoadingSpinner from '../../components/LoadingSpinner';
import Menuleft from '../Menuleft';
import Menutop from '../Menutop';
import * as quanLyVeActions from './../../Redux/Action/quanLyVeActions';
import ButtonAction from './ButtonAction';
import styles from './styles.module.css';
import { createColumnConfigurations } from './configColumn';

const QuanLyVe = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [modalTitle, setModalTitle] = useState('Basic Modal');
  const [modalOkTitle, setModalOkTitle] = useState('Ok');
  const [modalCancelTitle, setModalCancelTitle] = useState('Cancel');
  const [columnConfigurations, setColumnConfigurations] = useState([]);

  const dispatch = useDispatch();
  const tickets = useSelector((state) => state.quanLyVeState.tickets);
  const { isLoading, isShowModal } = useSelector((state) => state.appState);
  console.log(isShowModal);

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };

  useEffect(() => {
    dispatch(quanLyVeActions.getAllTickets());
    setColumnConfigurations(createColumnConfigurations(tickets, dispatch));
  }, []);

  return (
    <>
      {isLoading && <LoadingSpinner />}
      {isShowModal && (
        <AlertPopup
          title='Thành Công'
          message='Thao tác thành công'
          type='success'
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
            >
              <span className={styles.ticket__content__new__content}>
                Tạo Vé
              </span>
            </ButtonAction>
          </div>
          <Table
            dataSource={tickets}
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
