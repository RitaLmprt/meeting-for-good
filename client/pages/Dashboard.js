/* vendor dependencies */
import React from 'react';
import fetch from 'isomorphic-fetch';
import cssModules from 'react-css-modules';

/* external components */
import EventCard from '../components/EventCard';

/* styles */
import styles from '../styles/dashboard';

/* utilities */
import { checkStatus, parseJSON } from '../util/fetch.util';

class Dashboard extends React.Component {
  constructor() {
    super();
    this.state = {
      events: [],
    };
  }

  componentDidMount() {
    $(document).ready(() => {
      $('.modal-trigger').leanModal();
    });

    fetch('/api/events')
      .then(checkStatus)
      .then(parseJSON)
      .then(events => this.setState({ events }));

    $.get('/api/auth/current', user => {
      if (user === '') window.location.href = '/';
    });
  }

  render() {
    return (
      <div styleName="wrapper">
        { /* New Event Icon */ }
        <div className="fixed-action-btn" styleName="new-event-icon">
          <a className="btn-floating btn-large red" href="/event/new">
            <i className="large material-icons">add</i>
          </a>
        </div>
        { /* Card Template */ }
        {this.state.events.map(event => (
          <EventCard key={event._id} event={event} />
        ))}
      </div>
    );
  }
}

export default cssModules(Dashboard, styles);