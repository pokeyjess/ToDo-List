import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";

//fix first two errors in source code

class App extends Component {
  state = {
    todos: todosList
  };
  handleCreateTodo = event => {
    console.log(event.target.value);

    if (event.key === "Enter") {
      const newTodo = {
        userId: 1,
        id: Math.floor(Math.random() * 10000000),
        title: event.target.value,
        completed: false
      };
      const newTodoList = this.state.todos.slice();
      newTodoList.push(newTodo);
      this.setState({ todos: newTodoList });
      event.target.value = "";
    }
  };
  render() {
    return (
      <section className="todoapp">
        <header className="header">
          <h1>todos</h1>
          <input
            className="new-todo"
            placeholder="What needs to be done?"
            autofocus
            onKeyDown={this.handleCreateTodo}
          />
        </header>
        <TodoList todos={this.state.todos} />
        <footer className="footer">
          <span className="todo-count">
            <strong>0</strong> item(s) left
          </span>
          <button className="clear-completed">Clear completed</button>
        </footer>
      </section>
    );
  }
}

class TodoItem extends Component {
  render() {
    return (
      <li className={this.props.completed ? "completed" : ""}>
        <div className="view">
          <input
            className="toggle"
            type="checkbox"
            checked={this.props.completed}
          />
          <label>{this.props.title}</label>
          <button className="destroy" />
        </div>
      </li>
    );
  }
}

class TodoList extends Component {
  render() {
    return (
      <section className="main">
        <ul className="todo-list">
          {this.props.todos.map(todo => (
            <TodoItem title={todo.title} completed={todo.completed} />
          ))}
        </ul>
      </section>
    );
  }
}

export default App;
