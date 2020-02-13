import React, { Component } from "react";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";

//react cards -- put components into separate files

class App extends Component {
  state = {
    todos: todosList
  };
  handleClearCompletedTodos = event => {
    const newTodoList = this.state.todos.filter(todo => {
      if (todo.completed === true) {
        return false;
      }
      return true;
    });
    this.setState({ todos: newTodoList });
  };

  handleDeleteTodo = (event, todoIdToDelete) => {
    const newTodoList = this.state.todos.filter(todo => {
      if (todo.id === todoIdToDelete) {
        return false;
      }
      return true;
    });
    this.setState({ todos: newTodoList });
  };

  handleToggleComplete = (event, todoIdToToggle) => {
    const newTodos = this.state.todos.slice();
    const newnewTodos = newTodos.map(todo => {
      if (todo.id === todoIdToToggle) {
        todo.completed = !todo.completed;
      }
      return todo;
    });
    this.setState({ todos: newnewTodos });
  };

  handleCreateTodo = event => {
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
            autoFocus
            onKeyDown={this.handleCreateTodo}
          />
        </header>
        <Route exact path="/">
          <TodoList
            todos={this.state.todos}
            handleToggleComplete={this.handleToggleComplete}
            handleDeleteTodo={this.handleDeleteTodo}
          />
        </Route>
        <Route exact path="/active">
          <TodoList
            todos={this.state.todos.filter(todo => todo.completed === false)}
            handleToggleComplete={this.handleToggleComplete}
            handleDeleteTodo={this.handleDeleteTodo}
          />
        </Route>
        <Route exact path="/completed">
          <TodoList
            todos={this.state.todos.filter(todo => todo.completed === true)}
            handleToggleComplete={this.handleToggleComplete}
            handleDeleteTodo={this.handleDeleteTodo}
          />
        </Route>

        <footer className="footer">
          {/* <!-- This should be `0 items left` by default --> */}
          <span className="todo-count">
            <strong>What to put here?</strong> item(s) left
          </span>
          <ul className="filters">
            <li>
              <NavLink exact activeClassName="selected" to="/">
                All
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="selected" to="/active">
                Active
              </NavLink>
            </li>
            <li>
              <NavLink exact activeClassName="selected" to="/completed">
                Completed
              </NavLink>
            </li>
          </ul>
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
            onChange={event =>
              this.props.handleToggleComplete(event, this.props.id)
            }
          />
          <label>{this.props.title}</label>
          <button className="destroy" onClick={this.props.handleDeleteTodo} />
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

export default App;
