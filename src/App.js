import React, { Component } from "react";
import TodoList from "./Todolist";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";

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
            <strong>
              0
              {/*
                this.state.todos.filter(todo => {
                  ---need to return true/false. 
                  see how used other filters
              }
              ).length */}
            </strong>{" "}
            item(s) left
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
          <button
            onClick={this.handleClearCompletedTodos}
            className="clear-completed"
          >
            Clear completed
          </button>
        </footer>
      </section>
    );
  }
}

export default App;
