import React,{useState,useRef,useEffect,useContext} from 'react';
import {TodosContext} from '../../store/todo_context'
import {ModalStateContext} from '../../store/ModalProvider'
import styles from '../pages/css/CustomSelector.module.css';
import { MdKeyboardArrowDown } from "react-icons/md";

interface CustomSelectorProps {
    handleItemClick: (id: any) => void;
    selectedItem: string;
    labels: string[];
    name:string;
    isDisable?:boolean;
    padding?:number;
    fontSize?:string;
}

const CustomSelector: React.FC<CustomSelectorProps> = ({ fontSize,padding,isDisable,name,handleItemClick, selectedItem, labels }) => {



    const todoCtx = useContext(TodosContext);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const selectedRef = useRef<any>(null); 
    // 요소의 open 상태를 토글하는 함수
    const toggleOpen = () => {
        if(isDisable){
            return
        }
        setIsOpen(!isOpen);
        const GetCurrentOpenAndType = todoCtx.openAndType

        const newObj = { ...GetCurrentOpenAndType,popupValue:`openCustomSelector${name}` };
        todoCtx.sendFlexbox(newObj)
    };


    const customStyle ={
        fontSize:fontSize
    }


    return (
        <div style={customStyle} id={`${name}`} className={`${styles.customSelect}`} onClick={toggleOpen}>
            {/* <div style={{padding}}className={`${styles.radios} ${isDisable? styles.disable:''} ${valye === `openCustomSelector${name}` ? styles.focus: null}`}> */}
            <div style={{padding}}className={`${styles.radios} ${isDisable? styles.disable:''} ${false ? styles.focus: null}`}>
                <span>{labels[parseInt(selectedItem) - 1]}</span> {/* 선택된 항목의 레이블을 표시합니다. */}
                <MdKeyboardArrowDown></MdKeyboardArrowDown>
            </div>
            {/* {value === {`openCustomSelector${name}`} && ( // isOpen 상태에 따라 목록을 표시하거나 숨깁니다. */}
            {true && ( // isOpen 상태에 따라 목록을 표시하거나 숨깁니다.
                <ul className={styles.list}>
                    {labels.map((label, index) => (
                        <li key={label} onClick={(e) => handleItemClick(`${index + 1}`)}>
                            <label  className={styles.label} htmlFor={`${name}${index + 1}`}>
                                {label}
                                <span style={{ display: selectedItem === `item${index + 1}` ? 'block' : 'none' }}></span>
                            </label>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
};

export default CustomSelector;