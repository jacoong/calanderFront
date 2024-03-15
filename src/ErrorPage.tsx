import React from 'react';
import { useLocation } from "react-router";
import {TodosContext} from './store/todo_context'
import {useContext,useEffect} from 'react';
const ErrorPage = () => {
  const todoCtx = useContext(TodosContext);

  const { state } = useLocation();
  console.log("sfes",state);

  useEffect(() => {
    console.log('watch this!',todoCtx.ErrorMsg);
    if (todoCtx.ErrorMsg) {
      todoCtx.ErrorMsg = ""
      console.log("this too!",todoCtx.ErrorMsg);
    }
  }, []); 

  return(
  
  <div>
    <h1>ErrorPage!</h1>
    <p>PageNotFound.</p>
    <p>{state.message}</p>
  </div>
  )
};

export default ErrorPage;