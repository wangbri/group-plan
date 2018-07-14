import React from 'react';
import { render } from 'react-dom';
import Scheduler from '../src/scheduler';
import RangeDate from '../src/range_date';
import DateRange from '../src/date_range';
import { whyDidYouUpdate } from 'why-did-you-update';

// Uncomment this to examine where you can get performance boosts
//whyDidYouUpdate(React);

var resources = ['7am', '9am', '11am', '1pm', '3pm', '5pm', '7pm'],
    today = new RangeDate(new Date()),
    events = [
      {
        id: 'foobar',
        title: 'Do this',
        startDate: today.advance('days', 0).toRef(),
        duration: 1,
        resource: '7am'
      }
    ]

class Basic extends React.Component {
  constructor(props) {
    super(props)
    let from = new RangeDate() // Removed by Josh
    let to = from.advance('days', 0)

    this.state = {
      events: props.events,
      range: new DateRange(from, to)
    }
  }

  eventChanged() {
    const index = this.state.events.findIndex(event => event.id === props.id)
    const newEvents = this.state.events
    newEvents[index] = props
    this.setState({ ...props, events: newEvents })
    console.log(props)
  }props

  eventResized(props) {
    const index = this.state.events.findIndex(event => event.id === props.id)
    const newEvents = this.state.events
    newEvents[index] = props
    this.setState({ ...props, events: newEvents })
    console.log(props)
  }

  eventClicked(props) {
    alert(`${props.title} clicked!`)
    console.log(props)
  }

  cellClicked(props) {
    var newEvents = this.state.events
    var newEvent = {
      id: props.id,
      title: props.title,
      startDate: props.startDate,
      duration: props.duration,
      resource: props.resource
    };
    newEvents.push(newEvent);
    console.log(newEvents);
    this.setState({events: newEvents});

    // const index = this.state.events.findIndex(event => event.id === props.id)
    // const newEvents = this.state.events
    // newEvents[index] = props
    // this.setState({ ...props, events: newEvents })
    // console.log(props)


  }

  rangeChanged(range) {
    this.setState({ range: range })
  }

  render() {
    const { events, range, title, startDate, duration, resource } = this.state,
          { from, to } = range

    return (
      <div>
        <Scheduler
          from={from}
          to={to}
          resources={resources}
          events={events}
          width={1100}
          onEventChanged={::this.eventChanged}
          onEventResized={::this.eventResized}
          onEventClicked={::this.eventClicked}
          onCellClicked={::this.cellClicked}
          onRangeChanged={::this.rangeChanged}
        />
        <br />
        <div className='well' style={{ width: 1100 }}>
          <h3>Current Event</h3>
          <ul>
            <li>Title: {title}</li>
            <li>Start Date: {startDate}</li>
            <li>Duration: {duration} days</li>
            <li>Resource: {resource}</li>
          </ul>
        </div>
      </div>
    )
  }
}

require('../src/css/default.scss')
render(<Basic resources={resources} events={events} />, document.getElementById('react'))
