import React, { Component } from 'react';
import styles from './App.module.scss';
import Clock from './components/Clock';
import moment from 'moment'

export default class App extends Component {
  state = {
    bgColor: {
      backgroundColor: ''
    },
    formats: ['hh:mm A', 'hh:mm:ss A', 'MM/DD/YYYY', 'MMMM Do YY'],
    currentFormat: 0,
    time: ''
  }
  componentDidMount() {
    this.setState({
      time: moment(new Date()).format(this.state.formats[this.state.currentFormat]),
      bgColor: {
        backgroundColor: this.bgColorGenerator()
      }
    })
    this.tick();
  }

  tick() {
    setInterval(() => this.setState({ time: moment(new Date()).format(this.state.formats[this.state.currentFormat])}), 1000)
  }

  bgColorGenerator() {
    const arr = [];
    for(let i = 0; i < 3; i++){
      const num = Math.floor(Math.random() * 256);
      arr.push(num);
    }
    const newColor = `rgb(${arr[0]},${arr[1]},${arr[2]})`;

    return newColor
  }

  formatChangeHandler = () => {
    let { currentFormat, formats } = this.state;
    
    currentFormat >= formats.length - 1 ? currentFormat = 0 : currentFormat++
    const newColor = this.bgColorGenerator();
    this.setState({
      currentFormat,
      bgColor: {
        backgroundColor: newColor
      },
      time: moment(new Date()).format(this.state.formats[currentFormat])
    }, () => {
      console.log(this.state)
    })
  }

  render() {
    const { currentFormat, formats, time } = this.state;
    return (
      <div className={styles.container} onClick={this.formatChangeHandler} style={this.state.bgColor}>
        <div className={styles.title}>Click anywhere to change formats</div>
        <Clock time={time} />
      </div>
    )
  }
}
