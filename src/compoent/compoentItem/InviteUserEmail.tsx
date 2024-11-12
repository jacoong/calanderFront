import React, { useEffect, useState,useContext } from 'react';
import { WithContext as ReactTags, Tag } from 'react-tag-input';
import '../pages/css/InviteUserEmail.css';
import CloseButtonForInviteUser from './CloseButtonForInviteUser';
import { emailValidator } from '../validator';
import {TodosContext} from '../../store/todo_context';
import {typeOfDefaultInviteValue,typeCheckBox,AttenderInfoAuth} from '../../store/types';
import {EmailTag} from '../../store/types';
import style from '../pages/css/InviteUserEmail.module.css';
const KeyCodes = {
  comma: 188,
  enter: 13,
};

const delimiters = [KeyCodes.comma, KeyCodes.enter];

// interface EmailTag extends Tag {
//   id: string;
//   text: string;
//   role:'GENERATOR'|'MANAGER'|'ATTENDER';
// }

interface ErrorMessages {
  [key: string]: string;
}

interface typeOfValidate {
  error:boolean, message:string;
}

// Example email suggestions
// const emailSuggestions: Tag[] = [
//   { id: 'example1@gmail.com', text: 'example1@gmail.com'},
//   { id: 'example2@yahoo.com', text: 'example2@yahoo.com' },
//   { id: 'example3@hotmail.com', text: 'example3@hotmail.com' },
// ];

interface typeOfInviteUserEmailProps {
  sendInviteUserEmail:(data:EmailTag[]) => void;
  defaultInviteValue?:AttenderInfoAuth[];
}

const InviteUserEmail = ({sendInviteUserEmail,defaultInviteValue=[]}:typeOfInviteUserEmailProps) => {
  const [tags, setTags] = useState<EmailTag[]>([]);
  const [errorMessages, setErrorMessages] = useState<ErrorMessages>({});
  const [validateResult, setValidateResult] = useState<typeOfValidate>({error:false,message:''});
  const [currentInputValue, setCurrentInputValue] = useState<string>('');
  const todoCtx = useContext(TodosContext);



  const handleDelete = (i: number) => {
    console.log('sefsefse')
    setTags(tags.filter((tag, index) => index !== i));
  };

  const AttenderInfoAuthToDefaultValue = () =>{
    const formForTags = defaultInviteValue
    // .filter((value) => value.role !== 'GENERATOR')  //
    .map((value)=>
      {
      return{
        id: value.attenderEmail,
        text: value.attenderEmail,
        role: value.role,
    }})
        setTags(formForTags);
  }

  useEffect(()=>{
    AttenderInfoAuthToDefaultValue();
  },[defaultInviteValue])

  const handleAddition = async (tag: { id: string; text: string }) => {
      const textValue = tag.text;
      const validateResult = await emailValidator(textValue);
      if(validateResult.error){
        return
      }else{
        setTags((pretag)=>{
          const updatedTags = [...pretag, { ...tag, role: 'ATTENDER' as 'ATTENDER' | 'MANAGER' | 'GENERATOR'  }];
          sendInviteUserEmail(updatedTags);
          return updatedTags
        }
      );
      }
  };

  const validateEmail = async(e:any) =>{
     const validateResult = await emailValidator(e);
     setValidateResult(validateResult);
  }


  const updateTagAuthentication =(selectedItem:typeCheckBox,selectedIndex:number)=>{
    console.log(selectedItem,'dd',selectedIndex)
    const newRole = selectedItem.value.toUpperCase() as 'ATTENDER' | 'MANAGER' | 'GENERATOR';
    setTags((preTags) => {
      // 1. 상태를 업데이트할 새로운 배열을 생성합니다.
      const updatedTags = preTags.map((tag, i) =>
          i === selectedIndex
              ? { ...tag, role: newRole }
              : tag
      );

      // 2. 상태 업데이트 후 sendInviteUserEmail을 호출합니다.
      sendInviteUserEmail(updatedTags);

      // 3. 새로운 상태 배열을 반환합니다.
      return updatedTags;
  });
  }



  useEffect(()=>{
console.log(tags)  },[tags])



  return (
    <div>
      <ReactTags
        id={`${validateResult.error?'invalid':'success'}`}
        handleInputChange={validateEmail}
        tags={tags}
        // suggestions={emailSuggestions} // Add suggestions here
        delimiters={delimiters}
        handleDelete={handleDelete}
        handleAddition={handleAddition}
        inputFieldPosition="top"
        inputProps={{
          placeholder: "Add Email",
       }}
        autocomplete
        placeholder="Enter emails separated by commas"
        removeComponent={(props) => (
          <CloseButtonForInviteUser
            defaultValue={tags}
            sendAuthenticationOfInviter={updateTagAuthentication}
            index={props.index} // index 전달
            onRemove={() => handleDelete(props.index)}
          />
        )}
        // handleTagClick={handleTag}
      />
      {/* {
      tags.map((tag,index)=>
      <CloseButtonForInviteUser
                  defaultValue={tag}
                  sendAuthenticationOfInviter={updateTagAuthentication}
                  index={index-1} // index 전달
                />)
      } */}

    
    </div>
  );
};

export default InviteUserEmail;