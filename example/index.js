import _ from 'lodash';
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
    rangeOfDates:[]
  }
  days=()=>['All days','Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
  daysOfWeek=()=>this.days().filter(x=>x!=='All days');
  onDaySelected=(selectedDays)=>{
    if(selectedDays.indexOf('All days')!==-1)
    {
      if(this.days().length>selectedDays.length)
        selectedDays = this.days();
      else
        selectedDays=selectedDays.filter(x=>x!=='All days');
    }
    else if(_.isEqual(selectedDays.sort(),this.daysOfWeek().sort()))
      selectedDays=[];
    if (this.state.mode==='range' && selectedDays.length !== 0) {
      let daysOfWeek=this.daysOfWeek();
      let rangeOfDates = this.state.rangeOfDates.filter(x => selectedDays.indexOf(daysOfWeek[x.getDay()]) !== -1);
      this.setState({ selectedDates:rangeOfDates });
    }
    // console.log(selectedDays);
    this.setState({
      selectedDays
    });
  }
  onModeSelected = (selectedMode) => {
      this.setState({ mode: selectedMode, selectedDates: [],selectedDays:[],rangeOfDates:[] });
  }
  onDatesSelected = (selectedDates) => {
    if(this.state.mode === 'range' && selectedDates.length===2)
    {
      let dates=[];
      let i=new Date(selectedDates[0]);
      while(i<=selectedDates[1]){
        dates.push(new Date(i));
        i=new Date(i.setDate(i.getDate()+1));
      }
      this.setState({rangeOfDates:dates});
    }
    this.setState({selectedDates});
    // console.log(this.state.selectedDates);
  }
  getNumberOfDays = () => {
    return this.state.mode === 'range' ? (this.state.selectedDays.length===0 ? this.state.rangeOfDates.length : this.state.selectedDates.length):
    this.state.selectedDates.length;
  }
  getMode=()=>{
    if(this.state.mode==='range' && this.state.selectedDays.length > 0)
      return 'multiple';
    return this.state.mode;
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
          <div className="selection" style={{display:'flex'}}>
        <RadioButtonsGroup options={['single', 'multiple', 'range']} label='Calendar mode' mode={this.state.mode} onModeSelect={this.onModeSelected}/>
          {this.state.mode === 'range' &&
            <MultipleSelect label='Days' items={this.days()} selItems={this.state.selectedDays} onItemSel={this.onDaySelected} style={{margin:'24px'}}/>}
          </div>
        <div className="datePickerWrap">
          <Flatpickr value={this.state.selectedDates} options={{
            mode: this.getMode(), allowInput: true, closeOnSelect: false,
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
