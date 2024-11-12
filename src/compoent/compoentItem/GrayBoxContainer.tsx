import React, { ReactNode,useState,useEffect } from 'react';
import styles from '../pages/css/GrayBoxContainer.module.css'
interface GrayBoxContainerProps {
    onClick?:(value:any) =>void;
    children:ReactNode;
  }

const GrayBoxContainer = ({ children,onClick }:GrayBoxContainerProps) => {


  return (
              <div onClick={onClick} className={styles.grayBoxContainer}>
                    {children}
              </div>
        );
      };



export default GrayBoxContainer;

