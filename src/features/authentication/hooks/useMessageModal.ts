import { useState } from 'react';
import { MessageModalType } from '../../../constants/ui/modals/successModal';

export const useMessageModal = () => {
  const [modalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState('');
  const [modalType, setModalType] = useState<MessageModalType>('success');
  const [onModalConfirm, setOnModalConfirm] = useState<(() => void) | undefined>(undefined);

  const showMessage = (
    message: string, 
    type: MessageModalType = 'success',
    onConfirm?: () => void
  ) => {
    setModalMessage(message);
    setModalType(type);
    setOnModalConfirm(() => onConfirm);
    setModalVisible(true);
  };

  const hideMessage = () => {
    setModalVisible(false);
  };

  return {
    modalVisible,
    modalMessage,
    modalType,
    onModalConfirm,
    showMessage,
    hideMessage,
  };
};