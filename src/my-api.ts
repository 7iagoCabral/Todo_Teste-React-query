import axios from 'axios';


function getTodos() {
  return axios({
    method: 'get',
    url: 'http://localhost:3000/todo'
  })
  .then(res => res.data)

}
function postTodo({ id, title }){
  return axios({
    method: 'post',
    url: 'http://localhost:3000/todo',
    data: {
      id, 
      title,
      done: false
    }
  })

}
function doneTodo({id, done}){
  return axios({
    method: 'patch',
    url: `http://localhost:3000/todo/${id}`,
    data: {
      done
    }


  })
}


export { getTodos, postTodo, doneTodo };