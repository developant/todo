import React, { Component } from 'react'
import *as jwt_decode from 'jwt-decode'
import { viewTodo, createTodo, deleteTodo } from './UserFunctions';

class View extends Component {
  constructor() {
    super()
    this.state = {
      id: '',
      list: [],
      tempText: '',
      tempPriority: 0
    }
    console.log(this.state)
  }

  onChange = (e) => {
    this.setState({ [e.target.name]: e.target.value })
  }

  onSubmit = (e) => {
    e.preventDefault()

    const todo = {
      senderID: this.state.id,
      text: this.state.tempText,
      priority: this.state.tempPriority
    }

    createTodo(todo).then(res => {
      this.setState({
        list: [...this.state.list, ...res]
      });

      console.log(todo);
    })
  }

  deletetodo = (e) => {
    deleteTodo(e.target.id);
  }

  componentDidMount() {
    const token = localStorage.usertoken
    const decoded = jwt_decode(token);

    this.setState({
      id: decoded._id
    })

    viewTodo(decoded._id).then(res => {
      if (res)
        this.setState({
          list: res
        })
    })
  }

  render() {
    return (
      <div className="container">
        <div className="jumbotron mt-5">
          <div className="col-sm-8 mx-auto">
            <h1 className="text-center">PROFILE</h1>
          </div>
          <table className="table col-md-6 mx-auto">
            < tbody >
              {
                this.state.list.map((todo, i) => {
                  <tr key={i}>
                    <td>{todo.text}</td>
                    <td><button id={todo._id} onClick={this.deletetodo}>Delete</button></td>
                  </tr>
                })
              }
            </tbody>
          </table>
          <form noValidate onSubmit={this.onSubmit}>
            <h1 className="h3 mb-3 font-weight-normal">Create New</h1>
            <div className="form-group">
              <label htmlFor="tempText">ToDo</label>
              <input type="text"
                className="form-control"
                name="tempText"
                placeholder="Enter ToDo"
                value={this.state.tempText}
                onChange={this.onChange} />
            </div>
            <div className="form-group">
              <label htmlFor="tempPriority">Priority</label>
              <input type="text"
                className="form-control"
                name="tempPriority"
                placeholder="Enter Priority"
                value={this.state.tempPriority}
                onChange={this.onChange} />
            </div>
            <button type="submit" className="btn btn-lg btn-primary btn-block">
              Create
            </button>
          </form>
        </div>
      </div>
    )
  }
}

export default View