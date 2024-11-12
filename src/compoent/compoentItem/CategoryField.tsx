import React, {useContext,ReactNode,useState,useEffect,useRef} from 'react';
import style from '../pages/css/CategoryField.module.css'
import {Categories,Category} from '../../store/types';
import { CiMenuKebab } from "react-icons/ci";
import ClosedButton from './ClosedButton';
import CheckBox from '../compoentItem/CheckBox';
import ColorSelector from '../../Modal/PopUpType/ColorSelector';
import { IoCloseOutline } from "react-icons/io5";
import { TodosContext } from '../../store/todo_context';
import { IoIosArrowUp } from "react-icons/io";
import { IoIosArrowDown, } from "react-icons/io";
import { LuPlus } from "react-icons/lu";
import useModal from '../../hook/useModal';
import { ModalStateContext } from "../../store/ModalProvider";


interface CategoryFieldProps {
    categoryValue: Categories;
    filterCalendarByCategory(isChecked:boolean,value:string):void;
  }

const CategoryField =({categoryValue,filterCalendarByCategory}:CategoryFieldProps) => {
    const todoCtx = useContext(TodosContext);
    const PopupCtx = useContext(ModalStateContext);
    
    const [category, setCategory] = useState<Categories>(null);
    const [isChecked, setIsChecked] = useState<boolean>(true);
    const [showCategoryEditPopup, setShowCategoryEditPopup] = useState<boolean>(false);
    const [isPopupShow, setIsPopupShow] = useState<boolean>(true);

  const checkBoxRefs = useRef<(HTMLInputElement | null)[]>([]);

  const { openModal } = useModal();

    useEffect(()=>{
        if(categoryValue){
          // console.log(categoryValue,'sefsefsefse')
            const PutHoverProperty = categoryValue.map(item =>{
                return {...item, isHover:false,isChecked:isChecked,showCategoryEditPopup:showCategoryEditPopup}
            })

            setCategory(PutHoverProperty);
        
        }
      },[categoryValue])

      const showOption = (indexValue:number) =>{
        setCategory((prevState:any) => {
          const updateCategory = [...prevState];
          updateCategory[indexValue].isHover = true;
          return updateCategory;
        });
      }
  
  
      const hideOption = (indexValue:number) =>{
        setCategory((prevState:any) => {
          const updateCategory = [...prevState];
          updateCategory[indexValue].isHover = false;
          return updateCategory;
        });
      }
   


      const showDeletePopup =(e:React.MouseEvent,categoryId:number,categoryName:string)=>{
        e.stopPropagation();
        openModal({type:'CategoryDelete',value:{categoryId:categoryId,categoryName:categoryName,isForce:true}})
      }

      const showAddPopup =(e:React.MouseEvent)=>{
        e.stopPropagation();
        openModal({type:'CategoryAdd',value:{isForce:true,modal:{isCenterMessage:'Category Add'},value:{isAddOrEdit:'add',independantPopup:true}}})
      }


      const showEditPopup =(e:React.MouseEvent,categoryColor:string,categoryId:number,index:any)=>{
        e.stopPropagation();
        openModal({type:'Popup',value:{isPotal:true,potalSpot:`CategoryEdit${index}`,typeOfPopup:`CategoryEdit`,value:{categoryValue:{categoryColor:categoryColor,categoryId:categoryId},isAddOrEdit:'edit',independantPopup:false}}})
      }

      const checkBoxClicked = (index: any) => {
        setCategory((prevState:any) => {
            const checkBox = checkBoxRefs.current[index];
            const updateCategory = [...prevState];
            if (checkBox && category !== null) { 
                updateCategory[index].isChecked = (!checkBox.checked)
                filterCalendarByCategory(updateCategory[index].isChecked,updateCategory[index].categoryId)
            }
            return updateCategory;
          });
      };


//       useEffect(()=>{
// console.log(category,'sfs')
//       },[category])

const handleCategoryPopup = () =>{
  setIsPopupShow(!isPopupShow)
}

return (
  <div>
  {category === null ? (
      <div>no context</div>
  ) : (
      <>
          <div className={style.categoryContainer} onClick={handleCategoryPopup}>
            
          <div className={style.categoryContainer__paddingContainer}>
            <p>Category</p>
          <div className={style.categoryContainer__arrow}> 
            <ClosedButton> {isPopupShow?  <IoIosArrowUp /> :<IoIosArrowDown />}</ClosedButton>
          </div>
          </div>
          </div>
          {isPopupShow ? (
            <>
              {category.map((item: Category, index: any) => (
         
                  <div
                      key={index}
                      className={style.categoryContainer}
                      onClick={() => checkBoxClicked(index)}
                      onMouseEnter={() => showOption(index)}
                      onMouseLeave={() => hideOption(index)}
                  >
                      <div className={style.categoryContainer__paddingContainer}>
                          <div className={style.categoryContainer__paddingContainer__categoryContainer}>
                              <CheckBox
                                  backgroundColor={item.categoryColor}
                                  Checked={item.isChecked}
                                  name={`${index}`}
                                  option={{ label: item.categoryName, value: String(item.categoryId) }}
                                  handleCheckedLogic={filterCalendarByCategory}
                                  ref={el => (checkBoxRefs.current[index] = el)}
                              />
                          </div>
                          <div className={style.categoryContainer__paddingContainer__menuContainer}>
                          {index === 0?null
                          :
                          <>
                               <ClosedButton onClick={(e: React.MouseEvent) => showDeletePopup(e,item.categoryId,item.categoryName)}>
                                    <IoCloseOutline />
                                </ClosedButton>
                                <div id={`CategoryEdit${index}`}>
                                <ClosedButton onClick={(e: React.MouseEvent) => showEditPopup(e,item.categoryColor,item.categoryId,index)}>
                                    <CiMenuKebab />
                                </ClosedButton>
                                </div>
                          
                          </>
                          }
                          </div>
                                {/* <ColorSelector CategoryValue={item} independantPopup={false} isAddOrEdit="edit" /> */}           
                      </div>
                  
                  </div>
              
                    
                  
              ))}
              <div className={style.categoryContainer} onClick={(e: React.MouseEvent) => showAddPopup(e)}>
            
            <div className={style.categoryContainer__paddingContainer}>
              <p>Category Add</p>
            <div className={style.categoryContainer__arrow}> 
              <ClosedButton>  <LuPlus></LuPlus> </ClosedButton>
            </div>
            </div>
            </div>
            </>
        ) : null}
      </>
  )}
</div>
);

}


export default CategoryField;