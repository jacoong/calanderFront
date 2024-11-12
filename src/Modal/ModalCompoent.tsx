import React, { useContext, useEffect } from 'react';
import { ModalStateContext } from "../store/ModalProvider";
import useModal from '../hook/useModal';
import { createPortal } from 'react-dom';
import ViewEvent from './ModalType/ViewEvent';
import MakeEvent from './ModalType/MakeEvent';
import ModalLayer from './ModalLayerType/ModalLayer';
import CategoryDelete from './ModalType/CategoryDelete';
import AskOneMoreTimeToReturn from './ModalType/AskOneMoreTimeToReturn';
import AskOptionOfInterval from './ModalType/AskOptionOfInterval';
import ColorSelector from './PopUpType/ColorSelector';
import MakeEventPopup from './PopUpType/MakeEventPopup';
import PopupCalendar from './PopUpType/PopupCalendar';
import PopupCategory from './PopUpType/PopupCategory';

// 모달 타입 정의
const MODAL_TYPES = {
  ViewEvent: "ViewEvent",
  CategoryDelete: "CategoryDelete",
  MakeEvent: 'MakeEvent',
  CategoryAdd: 'CategoryAdd',
  AskOneMoreTimeToReturn:'AskOneMoreTimeToReturn',
  AskOptionOfInterval:'AskOptionOfInterval'
} as const;

const POPUP_TYPES = {
  MakeEventPopup: "MakeEventPopup",
  PopupCalendar: "PopupCalendar",
  PopupCategory:"PopupCategory",
  CategoryEdit:`CategoryEdit`,
} as const;



type ModalType = typeof MODAL_TYPES[keyof typeof MODAL_TYPES]; // 'ViewEvent' | 'CategoryDelete' | ...
type PopupType = typeof POPUP_TYPES[keyof typeof POPUP_TYPES]; // 'ViewEvent' | 'CategoryDelete' | ...

const MODAL_COMPONENTS: Record<ModalType, React.ComponentType<any>> = {
  ViewEvent,
  CategoryDelete,
  MakeEvent,
  CategoryAdd: ColorSelector,
  AskOneMoreTimeToReturn,
  AskOptionOfInterval
};

const POPUP_COMPONENTS: Record<PopupType, React.ComponentType<any>> = {
  MakeEventPopup,
  PopupCalendar,
  PopupCategory,
  CategoryEdit:ColorSelector,
};

const ModalComponent: React.FC = () => {
  const modalStates = useContext(ModalStateContext); // 배열 형태의 모달 상태를 가져옴
  const { closeModal } = useModal();

  if (!modalStates || modalStates.length === 0) {
    return null; // 모달이 없으면 null 반환
  }

  const closeCurrentModal = (e: React.MouseEvent<HTMLDivElement, MouseEvent>,  isForce?: boolean) => {
    e.stopPropagation(); // 클릭 이벤트 전파 방지
    if (!isForce ) {
      const lastModalIndex = modalStates.length - 1;
      closeModal(lastModalIndex);
    }
  };



  return (
    <>
      {modalStates.map((modalState, index) => {
        const { type, value } = modalState;
        const isPopup = type === 'Popup'; // type이 'Popup'인지 확인
        const Modal = isPopup 
          ? POPUP_COMPONENTS[value!.typeOfPopup as PopupType]
          : MODAL_COMPONENTS[type as ModalType];
        if (!Modal) {
          console.log(Modal);
          return null;
        }


        // 스타일 객체 정의
        const overlayStyle: React.CSSProperties = {
          zIndex: 50+index,
          position: 'fixed',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: isPopup ? 'transparent' : 'rgba(107, 114, 128, 0.5)'
        };

        if (value!.isPotal) {
          const modalRoot = document.getElementById(value?.potalSpot);

          if (!modalRoot) {
            return null; // modal-root가 없으면 null 반환
          }

          return createPortal(
            <>
              <div key={`overlay-${index}`} style={overlayStyle} onClick={(e) => closeCurrentModal(e,value?.isForce)}>

              </div>
              {isPopup ? (
                  <Modal {...value} />
            ):               
            <ModalLayer {...value!.modal!}>
            <Modal {...value} />
          </ModalLayer>}
            </>,
            modalRoot
          );
        } else {
          return (
            <div key={`overlay-${index}`} style={overlayStyle} onClick={(e) => closeCurrentModal(e, value?.isForce)}>
               {isPopup ? (
                  <Modal {...value} />
            ):               
            <ModalLayer {...value!.modal!}>
            <Modal {...value}/>
          </ModalLayer>}
            </div>
          );
        }
      })}
    </>
  );
};

export default ModalComponent;