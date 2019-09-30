import React, { Component } from 'react';
import TodoInput from './Components/TodoInput';
import TodoList from './Components/TodoList';
import 'bootstrap/dist/css/bootstrap.min.css';
import uuid from 'uuid';
// import { log } from 'util';
// import TodoItem from './Components/TodoItem';

class App extends Component {

    state = {
      items: [],
      id: uuid(),
      item: '',
      editItem: false,
      checkedItem: false
    }

  

  handleChange = (e) => {
    this.setState({
      item: e.target.value
    });
  }

  handleSubmit = (e) => {

    e.preventDefault();

    const newItem = {
      id: this.state.id,
      title: this.state.item,
      editItem: this.state.editItem,
      checkedItem: this.state.checkedItem
    }

    const updateItems = [...this.state.items, newItem];

    this.setState({
      items: updateItems,
      item: '',
      id: uuid(),
      editItem: false,
      checkedItem: false
    });

    console.log(this.state);

  }

  clearList = () => {
    this.setState({
      items: []
    })
  }

  handleDelete = (index, e) => {
    
    const todosnew = Object.assign([], this.state.items);
    
    todosnew.splice(index,1);

    this.setState({
      items: todosnew
    })

  }

  handleEdit = (e, id) => {
    
    const index = this.state.items.findIndex((item) => {
       return item.id === id
     });

    // const todosItems = Object.assign([], this.state.items)

    // todosItems[index].item = e.target.value;

    this.setState({
      item: this.state.items[index].item
    })

  }

  handleChecked = (e, id) => {

    const i = this.state.items.findIndex((item) => {
      return item.id === id  
    })

    const newItems = Object.assign([], this.state.items)

    newItems[i].checkedItem = e.target.checked
    
    this.setState({
      items: newItems
    })
  }

  UNSAFE_componentWillMount(){
    localStorage.getItem('todos') && this.setState({
      items: JSON.parse(localStorage.getItem('todos'))
    })   
  }

  UNSAFE_componentWillUpdate(nextProps, nextState) {
    localStorage.setItem('todos', JSON.stringify(nextState.items));
  }

  render() {
    return (
      <div className='container'>
        <div className='row'>
          <div className='col-10 mx-auto col-md-8 mt-4'>
            <h3 className='text-capitalize text-center'>todo input</h3>
            <TodoInput
              item={this.state.item}
              handleChange={this.handleChange}
              handleSubmit={this.handleSubmit}
              editItem={this.state.editItem}
            />
            <TodoList
              items={this.state.items}
              clearList={this.clearList}
              handleDelete={this.handleDelete}
              handleEdit={this.handleEdit}
              handleChecked={this.handleChecked}
            />
          </div>
        </div>
      </div>
    );
  }
}

export default App;
