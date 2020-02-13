import React, { Component } from "react";
import TodoItem from "./Todoitem";

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              key={todo.id}
              handleDeleteTodo={event =>
                this.props.handleDeleteTodo(event, todo.id)
              }
              title={todo.title}
              completed={todo.completed}
              id={todo.id}
              handleToggleComplete={this.props.handleToggleComplete}
            />
          ))}
        </ul>
      </section>
    );
  }
}
export default TodoList;
