import TodoItem from './TodoItem'
import {useContext} from 'react';
import {TodosContext} from '../store/todo_context'
import Loading from './compoentItem/Loading';

type userIdtype = {
  userId:string;
}

const Todos = ({userId}:userIdtype) => {
  let todoCtx = useContext(TodosContext);
  console.log('sefsfesfe',todoCtx.items)
  return(
  <div style={{ marginBottom: 15 }}>
    {
      todoCtx.items
      ?
      todoCtx.items.map((item,i)=>
        <TodoItem
          // arrayOfcomment={item.comments}
          clickable={true}
          commentId ={item._id}
          // profileImg={item.profileImg}
          userId={userId}
          // author={item.author}
          // key={`key$aw${item._id}es`}
          // text={item.content}
          // username={item.writer}
          onDeleteTOdo={todoCtx.deleteTodo.bind(null,item._id)}
        />
      )
      :
      null
    }
  </div>
  )
};



export default Todos;

