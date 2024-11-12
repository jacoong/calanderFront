import React, {ChangeEvent,forwardRef,useEffect,useState} from 'react';
import style from '../pages/css/CheckBox.module.css';
import { typeCheckBox } from '../../store/types';


interface CheckboxProps {
  name?:string;
    option: typeCheckBox;
    handleCheckedLogic:(isChecked:boolean,value:string)=>void;
    Checked?: boolean; // 추가된 속성
    backgroundColor?:string;
  }


  const Checkbox = forwardRef<HTMLInputElement, CheckboxProps>(
    ({ name, option, handleCheckedLogic,Checked,backgroundColor }, ref) => {

    const { value, label } = option;
    const [isChecked, setIsChecked] = useState<boolean>();

    const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
      console.log('dd')
        const isChecked = event.target.checked;
        handleCheckedLogic(isChecked,value)
      };

    const styleOfCheckBox = {

      border:backgroundColor?`2px solid ${backgroundColor}`:'',
      backgroundColor:Checked?(backgroundColor?backgroundColor:'#255cd2'):'transparent'
    }







  return (
    <div className={style.checkbox_wrapper_65}>
      <label htmlFor={`cbk1_65${name}`}>
        <input checked={Checked} ref={ref} type="checkbox" id={`cbk1_65${name}`} onChange={handleCheckboxChange}/>
        <span className={style.cbx} style={styleOfCheckBox}>
          <svg width="12px" height="11px" viewBox="0 0 12 11">
            <polyline points="1 6.29411765 4.5 10 11 1"></polyline>
          </svg>
        </span>
        <div className={style.checkbox_wrapper_65__label}>
          <span>{label}</span>
        </div>
       
      </label>
    </div>
  );
}
  );

export default Checkbox;


