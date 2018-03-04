
import 'flatpickr/dist/themes/material_green.css'
import React, { Component } from 'react'
import { render } from 'react-dom'
import Flatpickr from '../lib/index.js'
import RadioButtonsGroup from './radioButtonGroup';
import MultipleSelect from './dropdown';
class App extends Component {
  state = {
    v: '2016-01-01 01:01',
    mode: 'single',
    selectedDates: [],
    selectedDays: [],
    rangeSel:false
  }
  days = {
    alldays:0,
    sunday: 1,
    monday: 2,
    tuesday: 3,
    wednesday: 4,
    thursday: 5,
    friday: 6,
    saturday: 7
  }
  isAllDays=false;
  onDaySelected=(e)=>{
    // console.log(this.state.selectedDays);
    let selectedDays = [];
    let options = e.target.options;
    for (var i = 0; i < options.length; i++) {
      if (options[i].selected) selectedDays.push(Number(options[i].value));
    }
    if (selectedDays.indexOf(0) !== -1) {
      this.isAllDays = !this.isAllDays;
      if (this.isAllDays)
        selectedDays = Object.values(this.days);
      else
        selectedDays = [];
    }
    if (this.state.rangeSel && selectedDays.length !== 0) {
      let selectedDates = this.state.selectedDates.filter(x => selectedDays.indexOf(x.getDay()) !== -1);
      this.setState({ selectedDates/* , mode: 'multiple' */, rangeSel: false });
    }
    // console.log(selectedDays);
    this.setState({
      selectedDays
    });
  }
  onModeSelected = (selectedMode) => {
    this.setState({ mode: selectedMode, selectedDates: [] });
  }
  onDatesSelected = (selectedDates) => {
    if(this.state.mode === 'range' && selectedDates.length===2)
    {
      let dates=[];
      for(let i=selectedDates[0];i<selectedDates[1];i=new Date(i.setDate(i.getDate()+1))){
        dates.push(i);
      }
      selectedDates=dates;
      this.setState({rangeSel:true,selectedDates});
    }
    else
      this.setState({rangeSel:false});
    // console.log(this.state.selectedDates);
  }
  getNumberOfDays = () => {
    return this.state.mode === 'range' && this.state.selectedDates.length === 2 ?
      Math.round((this.state.selectedDates[1].getTime() - this.state.selectedDates[0].getTime()) / (1000 * 60 * 60 * 24)) :
      this.state.selectedDates.length;
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
  // radioButton = (btnName) => (
  //   <label key={btnName}>
  //     <input type="radio" value={btnName} name={btnName} checked={this.state.mode === btnName} onChange={(e) => this.onModeSelected(e.target.value)} />
  //     {` ${btnName} `}
  //   </label>
  // )
  render() {
    const { v } = this.state

    return (
      <div>
          {/* <form>
            {['single', 'multiple', 'range'].map(x => this.radioButton(x))}
          </form> */}
        <RadioButtonsGroup options={['single', 'multiple', 'range']} label='Calendar mode' mode={this.state.mode} onModeSelect={this.onModeSelected}/>
        <div className="datePickerWrap">
          {this.state.mode === 'range' &&
            <MultipleSelect label='Days' items={Object.getOwnPropertyNames(this.days)} selItems={this.state.selectedDays}
            <select multiple onChange={this.onDaySelected} value={this.state.selectedDays}>
              <option value={0}>alldays</option>
              {Object.getOwnPropertyNames(this.days).map(x => x !== 'alldays' ? <option key={x} value={this.days[x]}>{x}</option> : null)}
            </select>}
          <Flatpickr value={this.state.selectedDates} options={{
            mode: this.state.mode, allowInput: true, closeOnSelect: false,
            ignoredFocusElements: [document.getElementsByClassName('datePickerWrap')[0]]
          }} onChange={this.onDatesSelected} />
        </div>
        <br />
        <label>{this.getNumberOfDays()}</label>
         {/* <select multiple onChange={this.onDaySelected} value={0}>
                <option value={0}>allDays</option>
                {Object.getOwnPropertyNames(this.days).map(x => x === 'allDays' ? null : <option value={this.days[x]} key={x}
                  disabled={this.state.isAllDays}>{x}</option>)}
              </select> : '' */}
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
      </div>
    )
  }
}

window.init = () => {
  render(<App />, document.querySelector('#container'))
}
