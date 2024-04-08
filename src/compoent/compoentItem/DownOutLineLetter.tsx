
import React, {ReactNode} from 'react';
import { IoCaretDownOutline } from "react-icons/io5";


type Type = {
    children:ReactNode;
}

const DownOutLineLetter =({children}:Type) => {
    
    return (
        <div style={{display:'flex',alignItems: 'center',}}>
        <span style={{padding:'0 10px'}}>{children}</span>
        <IoCaretDownOutline style={{fontSize:'13px'}}>
        </IoCaretDownOutline>
        </div>

    )
}

export default DownOutLineLetter;