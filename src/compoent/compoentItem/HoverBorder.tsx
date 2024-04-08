import React,{ReactNode,useState} from 'react';
import styles from '../pages/css/HoverBorder.module.css' 


interface HoverBorderProps {
    backgroundColor?: string;
    padding?:string
    children?: ReactNode;
  }

const HoverBorder = ({ children, backgroundColor='#EAEAEA',padding }:HoverBorderProps) => { // 수정: 함수명의 첫 문자를 대문자로 변경하여 컴포넌트 이름 변경
    const [isHover,setIsHover] = useState(false)

  const containerStyle = {
    backgroundColor: isHover?backgroundColor:'', 
    padding:padding
  };

  const handleOnhover = ()=>{
    setIsHover(true)
  }

  const handleOffhover = ()=>{
    setIsHover(false)
  }

  return (
    <div onMouseEnter={handleOnhover} onMouseLeave={handleOffhover} className={styles.container} style={containerStyle}> 
      {children}
    </div>
  );
};

export default HoverBorder;
