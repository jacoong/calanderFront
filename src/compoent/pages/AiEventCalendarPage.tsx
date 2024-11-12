import {useContext,useEffect,useState} from 'react';
import { useNavigate,useParams,useLocation } from 'react-router-dom';
import {instance} from '../../store/axios_context';
import {getCookie} from '../../store/coockie'
import {TodosContext} from '../../store/todo_context'
import MakeEvent from '../../Modal/ModalType/MakeEvent';
import DetailMakeEvent from '../DetailMakeEvent';
import AiSubmitForm from '../compoentItem/AiSubmitForm';


function AiEventCalendarPage() {
    const todoCtx = useContext(TodosContext);
    const { eventId } = useParams();
    const navigate = useNavigate();
    const location = useLocation();
    const detailEventInformation = { ...location.state };



    const [eventInformation,setEventInformation] = useState<any>()
  


      return(
        <AiSubmitForm/>
      )
      }
      
  export default AiEventCalendarPage;