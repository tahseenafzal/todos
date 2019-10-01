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
    editItem: '',
    checkedItem: false
  }

  handleChange = (e) => {
    this.setState({
      item: e.target.value
    });
  }

  handleSubmit = (e) => {

    e.preventDefault();

    if (this.state.editItem !== '') {

      const i = this.state.items.findIndex((item) => {
        return item.id === this.state.editItem
      })

      const newList = Object.assign([], this.state.items);

      newList[i].title = this.state.item
      
      this.setState({
        items: newList,
        item: '',
        editItem: '',
        checkedItem: false
      })

    } else {
      const newItem = {
        id: this.state.id,
        title: this.state.item,
        editItem: '',
        checkedItem: false
      }

      const updateItems = [...this.state.items, newItem];

      this.setState({
        items: updateItems,
        item: '',
        id: uuid(),
        editItem: '',
        checkedItem: false
      });

    }


  }

  clearList = () => {
    this.setState({
      items: []
    })
  }

  handleDelete = (id) => {

    const i = this.state.items.findIndex((item) => {
      return item.id === id
    })

    const todosnew = Object.assign([], this.state.items);

    todosnew.splice(i, 1);

    this.setState({
      items: todosnew
    })

  }

  handleEdit = (id) => {

    const index = this.state.items.findIndex((item) => {
      return item.id === id
    });

    // console.log(this.state.items)

    // const newItem = this.state.items[index].title

    // console.log(newItem)

    this.setState({
      item: this.state.items[index].title,
      editItem: id
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

  UNSAFE_componentWillMount() {
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
