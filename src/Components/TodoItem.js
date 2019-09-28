import React, { Component } from 'react';
import './TodoList.css'

class TodoItem extends Component {
  render() {
    const { title, handleDelete, handleEdit, handleChecked, checkedItem, id } = this.props;
    console.log(checkedItem);

    return (
      <li className='list-group-item text-capitalize d-flex justify-content-between my-2'>
        <span width='20px'>
          <input
            id={id}
            type='checkbox'
            onChange={handleChecked}
            checked={checkedItem}
          />
        </span>
        <h6 id='title'
          className={
            checkedItem
              ? 'Todolist-ItemChecked'
              : ''
          }
        >{title}</h6>
        <div className='todo-icon'>
          <span className='mx-2 text-success' onClick={handleEdit}>
            <i className='fas fa-pen' />
          </span>
          <span className='mx-2 text-danger' onClick={handleDelete}>
            <i className='fas fa-trash' />
          </span>
        </div>

      </li>
    );
  }
}

export default TodoItem;
