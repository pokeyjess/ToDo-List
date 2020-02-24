import React, { Component } from "react";
import TodoItem from "./Todoitem";
import { connect } from "react-redux";
import { deleteTodo, toggleTodo } from "./actions";

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem
              handleToggleComplete={event => this.props.toggleTodo(todo.id)}
              handleDeleteTodo={event => this.props.deleteTodo(todo.id)}
              title={todo.title}
              completed={todo.completed}
            />
          ))}
        </ul>
      </section>
    );
  }
}
const mapDispatchToProps = {
  deleteTodo,
  toggleTodo
};
export default connect(null, mapDispatchToProps)(TodoList);
