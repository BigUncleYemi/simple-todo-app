import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';

const Form = ({
  handleAddTask
}) => (
  <form onSubmit={handleAddTask}>
    <input type="text" name="task" id="task" placeholder="Enter Task" />
    <input type="time" name="time" id="time" placeholder="Enter time" />
    <input type="submit" value="Add Task" style={{padding: '7px 20px', color: '#2b2c34', backgroundColor: 'white', border: 'none'}}/>
  </form>
);

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      tasks: []
    }
    this.handleAddTask = this.handleAddTask.bind(this);
    this.handleRemoveTask = this.handleRemoveTask.bind(this);
    this.handleUpdateTask = this.handleUpdateTask.bind(this);
  }

  handleAddTask(e){
    if(document.getElementById('time').value && document.getElementById('task').value ){
      e.preventDefault();
      const task = e.target.task.value;
      const done = e.target.time.value;
      const date = new Date();
      const time = date.toLocaleTimeString();
      const newTask = {name: task, created: time, done };
      this.setState((currState) => {
        return{
          tasks: currState.tasks.concat([newTask]),
        }
      })
      e.target.reset();
    }else{
      alert('Task not Entered')
      e.preventDefault();
    }
  }

  handleRemoveTask(item){
    this.setState((currState) => {
      return{
        tasks: currState.tasks.filter((task) => task !== item)
      }
    })
  }

  handleUpdateTask(item){
    if( !document.getElementById('task').value ){
      document.getElementById('task').value = item.name;
      document.getElementById('time').value = item.done;
      this.setState((currState) => {
        return{
          tasks: currState.tasks.filter((task) => task !== item)
        }
      })
    }else{
      alert('input is not empty')
    }
  }

  render() {

    const {tasks} = this.state;
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>
            React Todo App
          </p>
          <Form handleAddTask={this.handleAddTask} />
          <h3>Tasks</h3>
          <ul>
            {tasks.map((item, i) => <li onClick={() => this.handleUpdateTask(item)} key={i}>{item.name}  {item.done} - created {item.time} <button onClick={() => this.handleRemoveTask(item)} style={{padding: '3px 20px', color: 'red', backgroundColor: 'white', border: 'none'}}>del</button></li>)}
          </ul>
        </header>

      </div>
    );
  }
}

export default App;
