
import style from './PopUpTypeCss/MakeEventPopup.module.css';
import { useNavigate } from 'react-router-dom';
import { useParams } from 'react-router-dom';
import useModal from '../../hook/useModal';
import { useLoginInfo } from '../../hook/useLoginInfo';
import ModalLayer from '../ModalLayerType/ModalLayer';
import { initialTime } from '../../compoent/compoentItem/BigCalendar';
import { useEffect } from 'react';
const MakeEventPopup = (value:any) =>{
    const {baseDateValue} = value;
    console.log('sefse',value)
    const { viewType, year, month, day } = useParams();
    console.log('sefseㄴㄷㄹ',viewType, year, month, day);
    const{categoryValue} = value;
    const navigate = useNavigate();
    const  { openModal,closeModal } = useModal();
    const [loginInfo, setLoginInfo] = useLoginInfo();
    const {startDate,endDate} = initialTime(baseDateValue,baseDateValue)
    console.log(startDate,endDate)
    const makePlanOftodayProp = {
        view:'makeEvent',
        startTime:startDate,
        endTime:endDate,
        isDisplayOfDay:true,
        categoryValue:categoryValue,
        currentCategoryValue:categoryValue[0],
        attenderEmailDTOS:{attenderInfoAuth:[{ attenderEmail:loginInfo?.email, role: 'GENERATOR' }],isSendEmailToAttender:false,isInvitableAnyoneLink: false,}
      }

      const handleModalOpen= ({type,value}:any)=>{ 
        openModal({type:type,value:value})
        closeModal(0);
      }


      useEffect(()=>{
        console.log(startDate,endDate,'test needed')
      },[])
     
    return(
        <div className={`${style.banner__popup}`}>
        <div className={`${style.banner__popup__container__item}`} onClick={() => { handleModalOpen({ type: 'MakeEvent', value:{isForce:true,value:makePlanOftodayProp} }) }}>
            <p>MakeEvent</p>
        </div>
    <div className={`${style.banner__popup__container__item}`} onClick={()=>{ navigate('/calendar/aiEventCalendarPage')}}>
            <p>AI Plan Maker</p>
        </div>
    </div>
    )
}

export default MakeEventPopup;
