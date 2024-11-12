import ClosedButton from "../../compoent/compoentItem/ClosedButton";
import { IoCloseOutline,IoTrashOutline,IoPencil } from "react-icons/io5";
import useModal from "../../hook/useModal";
import React, { ReactNode,useContext } from 'react';
import styles from './ModalLayer.module.css';
import { ModalStateContext } from "../../store/ModalProvider";
import { ModalOptions } from '../../store/types';
import { useNavigate } from 'react-router-dom'



function ModalLayer({width,height,isFull,children,isCenterMessage,navButtonOption,eventId,eventTimeId,category}:ModalOptions){
  
  const ModalCtx = useContext(ModalStateContext);

    const  { closeModal } = useModal();
    const navigate = useNavigate();


  const customStyle = {
    width: isFull ? '100%' : width,
    height: isFull ? '100%' : height,
    borderRadius: isFull ?   'none' : '0.75rem'
  };

    const handleClosed = () => {
      const lastModalIndex = ModalCtx.length - 1;
        closeModal(lastModalIndex);
      };
    const handleEdit = () =>{
      closeModal(0);
      const typeOfMakeInfo = {
        view: "eventEdit",
        categoryValue:category
      }
      console.log(category)     
      navigate( `/calendar/eventId/${eventId}/eventTimeId/${eventTimeId}`, { state:typeOfMakeInfo})
    }
    const handleDelete = () =>{
      closeModal(0);
      // navigate( `/calendar/eventId/${eventId}`)
    }
     
      const preventBubbling = (e:React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.stopPropagation(); // 클릭 이벤트가 전파되지 않도록 함
        return
      };


      const renderButtons = () => {
        const buttons = [];
    

        if (navButtonOption.isDelete) {
          buttons.push(
            <ClosedButton key="delete" onClick={handleDelete}>
              <IoTrashOutline />
            </ClosedButton>
            
          );
        }
      
    
        if (navButtonOption.isEdit) {
          buttons.push(
            <ClosedButton key="edit" onClick={handleEdit}>
              <IoPencil />
            </ClosedButton>
          );
        }
    
        if (navButtonOption.isClose) {
          buttons.push(
            <ClosedButton key="close" onClick={handleClosed}>
              <IoCloseOutline />
            </ClosedButton>
          );
        }
    
        // 모든 버튼이 없는 경우, placeholder를 렌더링합니다.
        if (buttons.length === 0) {
          return <div className={styles.placeholder}></div>;
        }
    
        return buttons;
      };

return(
    <div style={customStyle} className={`${styles.container}`} onClick={preventBubbling}>
      <div className={styles.header}>
        <div className={styles.placeholder}></div>

        {isCenterMessage ? (
          <div className={styles.centerMessage}>
            <h1>{isCenterMessage}</h1>
          </div>
        ) : (
          <div className={styles.placeholder}></div>
        )}


        <div className={styles.renderButtons}>
            {renderButtons()}
        </div>


      </div>
      <div className={styles.content}>
        {children}
      </div>
    </div>
   

)
}

export default ModalLayer;