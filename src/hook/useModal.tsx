import { useContext, useEffect } from "react";
import { ModalSetterContext,ModalStateContext } from "../store/ModalProvider";
import { ModalState,ModalStates } from "../store/types";

interface OpenModalProps {
  type: string | null;
  value?: any; // props의 타입을 필요에 따라 정의
}

function useModal() {
  const setModalStates = useContext(ModalSetterContext);
  const modalStates = useContext(ModalStateContext);

  if (setModalStates === undefined) {
    throw new Error("useModal must be used within a ModalProvider");
  }

  const openModal = ({ type, value }: OpenModalProps) => {
    setModalStates((prevStates: ModalStates) => [
      ...prevStates,
      {
      type,
      value: {
        ...value,
        isPotal: value?.isPotal ?? false, // 명시되지 않았다면 기본값 false
        isForce: value?.isForce ?? false, // 명시되지 않았다면 기본값 false
        potalSpot: value?.isPotal ? (value?.potalSpot || value?.typeOfPopup) : null,
        modal: {
          width:value?.width ?? 'auto',
          eventId:value?.modal?.eventId ?? null,
          eventTimeId:value?.modal?.eventTimeId ?? null,
          category:value?.modal?.category ?? null,
          height:value?.height ?? 'auto',
          isFull: value?.modal?.isFull ?? false,
          isCenterMessage:value?.modal?.isCenterMessage ?? null,
          navButtonOption: {
            isClose: value?.modal?.navButtonOption?.isClose ?? true,
            isEdit: value?.modal?.navButtonOption?.isEdit ?? false,
            isDelete: value?.modal?.navButtonOption?.isDelete ?? false,
          },
        }
      }
    },
    ]);
  };

  const closeModal = (index: number) => {
    setModalStates((prevStates: ModalStates) =>
      prevStates.filter((_, i) => i !== index)
    );
  }

  const updateModalValue = (index: number, newValue: any) => {
    console.log(JSON.stringify(newValue, null, 2));
    setModalStates((prevStates: ModalStates) =>
      prevStates.map((modal, i) => i === index ? { ...modal, value: newValue } : modal)
    );
  };



  return { openModal, closeModal, updateModalValue };
}

export default useModal;