import TodoList from "./components/TodoList";

//Dùng thư viện Atlassian
//npm install @atlaskit/button @atlaskit/textfield @atlaskit/icon
import Textfield from '@atlaskit/textfield';
import Button from '@atlaskit/button';
import {useCallback, useState} from "react";

//npm i uuid
import {v4} from 'uuid';

function App() {

  //Dùng React Hook
  const [todoList, setTodoList] = useState([]); // trả về array với 2 element, 1 lưu trữ state todoList, 2 là một medthod dùng để cập nhập state 1
  //state Lưu trữ giá trị user vừa nhập vào thẻ input
  const [textInput, setTextInput] = useState(""); //string

  const onTextInputChange= useCallback((e) =>{
    //e.target.value là nội dung user đã nhập vào thẻ input
    setTextInput(e.target.value);
  },[]);
  //useCallback(function, array) biến onTextInputChange   và biến onAddBtnClick không bị khởi tạo lại sau mỗi lần add render lại khi truyền một biến vào array
  //khi truyền todoList vào array, thì function ở tham số 1 chỉ bị khởi tạo lại khi biến todoList có sự thay đổi về giá trị,
  //không cần truyền biến nào vô biến này, vì function onTextInputChange không hề gọi đến bất kì biến nào từ phía ngoài


  const onAddBtnClick=useCallback((e)=>{
    //Thêm giá textInput hiện tại vào danh sách todolist ở trên
    setTodoList([{id:v4(), name: textInput, isComplete:false },...todoList]);
    //isComplete để xác định xem đã hoàn thành hay chưa, mặc định là chưa
    //để tạo được id thì phải dùng 1 package là uuid npm i uuid

    setTextInput(""); //khi thêm mới một việc cần làm thì nội dung input sẽ được xoá đi

  },[textInput, todoList]);
  //function onAddBtnClick có gọi đến biến textInput phía ngoài nên cần truyền biến vào function
  //Khi có sự thay đổi của textInput thì function sec được chạy lại để cập nhập giá trị mới nhất

    //Khi bấm vào check-icon thì cần cập nhập lại totoList ở App.js component
    //Để từ component con Todo.js cập nhập lại 1 step từ component cha thì cần truyền 1 method  từ app component vô Todo list và vô Todo
    //Method này dẽ thực hiện việc cập nhập lại giá trị state ở phía component cha (App.js)

  const onCheckBtnClick=useCallback((id)=>{
    //cần filter trên todoList để tìm ra việc cần làm nào có id tương ứng và cập nhập lại giá trị cho field isComplete từ false thành true
    setTodoList((prevState)=>
      prevState.map((todo) => 
        todo.id===id?{...todo,isComplete:true} : todo)
    );
  })

  return (
    <>
    <h3>Danh sách cần làm:</h3>
    <Textfield name="add-todo" placeholder="Thêm việc cần làm" elemAfterInput={
       //elemAfterInput 
       //isDisabled={true} Mặc định khi user không nhập bất kì nội dung nào trong input thì button thêm được disable 
       //giá trị của isDisabled sẽ phụ thuộc vào thuộc tính của textInput nêú textInput có giá trị thì isDisable sẽ là false và ngược lại
      <Button isDisabled={!textInput} appearance='primary' onClick={onAddBtnClick}>Thêm</Button>
    }
    css={{ padding: "2px 4px 2px" }}
    value ={textInput}
    //Khi có sự kiện thay đổi, user nhập input thì ta sẽ xét value textinput bằng với giá trị mà user vừa nhập vào
    onChange={onTextInputChange}
    
     ></Textfield>
     {/* //Truyền giá trị setTodoList vào component Todolist để render ra các giá trị thực tế mà user đã nhập vô */}
     {/* Truyền vô component TodoList thông qua Props */}
     <TodoList todoList={todoList} onCheckBtnClick={onCheckBtnClick}/>
    </>
    
  );
}

export default App;
