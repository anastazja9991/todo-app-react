import React from 'react';
import './App.css';
import AddTask from './AddTask';
import TaskList from './TaskList';


class App extends React.Component {

  counter = 0

  state = {
    tasks: []
  }

  deleteTask = (id) => {
    // ROBIMY KOPIĘ TABLICY
    const tasks = [...this.state.tasks];
    // SPOSÓB 1:
    const index = tasks.findIndex(task => task.id === id);
    tasks.splice(index, 1)

    this.setState({
      tasks
    })
  }

  // SPOSÓB 2:
  //   let tasks = [...this.state.tasks];
  //   tasks = tasks.filter(task => task.id !== id)
  //   this.setState({
  //     tasks
  //   })
  // }

  changeTaskStatus = (id) => {
    // ROBIMY KOPIĘ TABLICY:
    const tasks = Array.from(this.state.tasks);
    tasks.forEach(task => {
      if (task.id === id) {
        task.active = false
        task.finishDate = new Date().getTime()
      }
    })
    this.setState({
      tasks
    })
  }

  addTask = (text, date, important) => {
    const task = {
      id: this.counter,
      text: text, // tekst z inputa
      date: date,
      important: important,
      active: true,
      finishDate: null
    }
    this.counter++

    // tworzymy nową tablicę, która składa się ze wszystkich elementów + nowego taska
    this.setState(prevState => ({
      tasks: [...prevState.tasks, task]
    }))
    return true
  }

  render() {
    return (
      <div className="App">
        <h1>TODO APP</h1>
        <AddTask add={this.addTask} />
        <TaskList tasks={this.state.tasks} delete={this.deleteTask} change={this.changeTaskStatus} />
      </div>
    );
  }
}

export default App;
