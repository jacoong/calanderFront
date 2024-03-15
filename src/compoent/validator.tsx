import axios from "axios";
import { error } from "console";

interface typeofIsExistInDb  {
  input:string|number;
  type:string
}

export const emailValidator = async(email:string,type?:string) => {
    if (!email) {
      return {touched:false,error:false,message:""};
    } 
    else if (!new RegExp(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,}$/).test(email)) {
      return {touched:true,error:true,message:"Incorrect email format"};
    }
    
    if(type){
      const isExisting = await isExistInDb({input:email,type:'email'})
      if(isExisting){
        return {touched:true,error:true,message:"Already existing Email"};
      }
    }


    return {touched:true,error:false,message:"Success!"};
  };

  export const isExistInDb = async(data:typeofIsExistInDb) => {
    const url = 'https://firstdatebhyunwu-3f2a47c92258.herokuapp.com/checkDb'
    return axios.post(url,data,{ withCredentials: true })
    .then(res =>{
      if(res.status === 200 && res){
       return  res.data.result
      }else{
        console.log(res.data)
      }

    })
    .catch(e=>{
        throw e
    })
  }
  
  export const passwordValidator = (password:string) => {
    if (!password) {
      return {touched:false,error:false,message:""};
    } else if (password.length < 8) {
      return {touched:true,error:true,message:"Password must have a minimum 8 characters"};
    }
    return {touched:true,error:false,message:"Success"};
  };
  
  export const confirmPasswordValidator = (password:string,confirmPassword:string) => {
    if (!confirmPassword) {
      return {touched:false,error:false,message:""};
    } 
    else if (confirmPassword !== password) {
      return {touched:true,error:true,message:"Passwords do not match"};
    }
    return {touched:true,error:false,message:"Success"};
  };


  export const userNameValidator = async(username:string) => {
    if (!username) {
      return {touched:false,error:false,message:""};
    } 
    else if (username.length < 2) {
      return {touched:true,error:true,message:"uesrname must have a minimum 8 characters"};
    }
    else if (!/^[a-zA-Z]+$/.test(username)) {
      return {touched: true,error: true,message: "Username must contain only English letters",
      };
    }

    const isExisting = await isExistInDb({input:username,type:'username'})
    if(isExisting){
      return {touched:true,error:true,message:"Already existing Username"};
    }
    return {touched:true,error:false,message:"Success"};
  };