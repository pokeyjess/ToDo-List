import React, { Component } from "react";
import TodoList from "./Todolist";
import "./index.css";
import todosList from "./todos.json";
import { Route, NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { addTodo, clearCompletedTodos } from "./actions";

class App extends Component {
  state = {
    todos: todosList
  };
  handleClearCompletedTodos = event => {
    this.props.clearCompletedTodos();
  };

  handleCreateTodo = event => {
    if (event.key === "Enter") {
      this.props.addTodo(event.target.value);
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
          <TodoList todos={this.props.todos} />
        </Route>
        <Route exact path="/active">
          <TodoList
            todos={this.props.todos.filter(todo => todo.completed === false)}
          />
        </Route>
        <Route exact path="/completed">
          <TodoList
            todos={this.props.todos.filter(todo => todo.completed === true)}
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
const mapStateToProps = state => {
  return {
    todos: state.todos
  };
};
const mapDispatchToProps = {
  addTodo,
  clearCompletedTodos
};

export default connect(mapStateToProps, mapDispatchToProps)(App);
