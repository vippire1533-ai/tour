import { Modal } from 'antd';
import React, { useEffect } from 'react';

const ReachableContext = React.createContext();

const config = (title, message) => ({
  title: title,
  content: (
    <>
      <ReachableContext.Consumer>
        {() => <i>{message}</i>}
      </ReachableContext.Consumer>
    </>
  ),
  centered: true,
});

const AlertPopup = ({ type, title, message }) => {
  const [modal, contextHolder] = Modal.useModal();
  useEffect(() => {
    switch (type) {
      case 'success': {
        modal.success(config(title, message));
        break;
      }
      case 'error': {
        modal.error(config(title, message));
        break;
      }
      case 'info': {
        modal.info(config(title, message));
        break;
      }
    }
  }, []);

  return (
    <>
      <ReachableContext.Provider value='Light'>
        {contextHolder}
      </ReachableContext.Provider>
    </>
  );
};

export default AlertPopup;
