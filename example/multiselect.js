
import 'flatpickr/dist/themes/material_green.css'

import React, { Component } from 'react'
import { render } from 'react-dom'

import Flatpickr from '../lib/index.js'
import { isatty } from 'tty';

class App extends Component {
  state = {
    // v: '2016-01-01 01:01',
    // onChange: (_, str) => {
    //   console.info(str)
    // }
    selectedDates:[],
    selectedDays:[]
  }
  days={
    alldays:0,
    sunday:1,
    monday:2,
    tuesday:3,
    wednesday:4,
    thursday:5,
    friday:6,
    saturday:7
  }
  isAllDays=false;
  onDaySelected=(e)=>{
    console.log(this.state.selectedDays);
    let selectedDays = [];
    let options = e.target.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) selectedDays.push(Number(options[i].value));
    }
    if (selectedDays.indexOf(0) !== -1) {
      this.isAllDays = !this.isAllDays;
      if (this.isAllDays)
        selectedDays = [0, 1, 2, 3, 4, 5, 6, 7];
      else
        selectedDays = [];
    }
    // console.log(selectedDays);
    this.setState({
      selectedDays
    })
  }
  onDatesSelected=(selectedDates)=>{
    if(this.state.selectedDays.length!==0)
    selectedDates = selectedDates.filter(x => {
      this.state.selectedDays.indexOf(x.getDay()) !== -1
    });
    this.setState({selectedDates});
  }
  componentDidMount() {
    // setTimeout(() => {
    //   this.setState(state => ({
    //     v: state.v.replace('2016', '2017'),
    //     onChange: (_, str) => {
    //       console.info('New change handler: ', str)
    //     }
    //   }))
    // }, 2000)
  }

  render() {
    const { v } = this.state

    return (
      <main>
        <select multiple onChange={this.onDaySelected} value={this.state.selectedDays}>
          <option value={0}>alldays</option>
          {Object.getOwnPropertyNames(this.days).map(x=> x!=='alldays'? <option key={x} value={this.days[x]}>{x}</option>:null)}
        </select> 
        <Flatpickr value={this.state.selectedDates} options={{ mode: 'range' }}
          onChange={this.onDatesSelected/*(_, str) => console.info(str)*/} />
        {'   '}

        {/* <Flatpickr data-enable-time className='test'
          onChange={(_, str) => console.info(str)} />
        <Flatpickr data-enable-time defaultValue='2016-11-11 11:11'
          onChange={(_, str) => console.info(str)} />
        <Flatpickr data-enable-time value={v}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={v} options={{minDate: '2016-11-01'}}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={[v, '2016-01-10']} options={{mode: 'range'}}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr options={{mode:'multiple'}} onChange={(selectedDates,value,selfInst,data)=>console.log(selectedDates)}/>
        <Flatpickr onChange={this.state.onChange}
          onOpen={() => { console.info('opened (by prop)') }}
          options={{
            onClose: () => {
              console.info('closed (by option)')
            },
            maxDate: new Date()
          }} />
        <Flatpickr value={new Date()}
          onChange={(_, str) => console.info(str)} />
        <Flatpickr value={v} options={{wrap: true}}
          onChange={(_, str) => console.info(str)}
        >
          <input type='text' data-input />
          <button type='button' data-toggle>Toggle</button>
          <button type='button' data-clear>Clear</button>
        </Flatpickr> */}
      </main>
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('#container'))
}
