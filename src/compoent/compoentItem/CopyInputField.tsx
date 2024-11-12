import React, {useState} from 'react';
import style from '../pages/css/CopyInputField.module.css'
import { PiCopyBold } from "react-icons/pi";

interface CopyInputFieldType  {
    urlInformation:string;
};


const CopyInputField =({urlInformation}:CopyInputFieldType) => {
    const [isPopupShow, setIsPopupShow] = useState<boolean>();
    const [valueOfPopup, setValueOfPopup]= useState<boolean>(false);

   
    console.log('sefsef',urlInformation)
  
    const handleCopy = () => {
        navigator.clipboard.writeText(urlInformation);
        updatedMessage();
      }


    const updatedMessage = () =>{
        setValueOfPopup(true)
        setTimeout(function(){
            setIsPopupShow(false)
            setValueOfPopup(false)
        }, 2000);
    }

    const PopupShow = () =>{
        setIsPopupShow(true)
    }

    const PopupDisapper = () =>{
        setIsPopupShow(false)
    }

return (
    <div className={style.copyLink}>
      <input
        className={style.copyLinkInput}
        value={urlInformation}
        readOnly
      />
        <div className={style.copyLinkButton}>
            {
            isPopupShow ? 
                <div className={style.copyLinkButton__message}>
                    {valueOfPopup ?
                    <p>Copied!</p>
                     :
                    <p>Copy url to clipboard</p>
                    }
                </div>
            :
            null
            }
        <button className={style.copyLinkButton__button} onMouseEnter={PopupShow} onMouseLeave={PopupDisapper} onClick={handleCopy}>
            <PiCopyBold></PiCopyBold>
        </button>
        </div>
    </div>
);
}




export default CopyInputField;