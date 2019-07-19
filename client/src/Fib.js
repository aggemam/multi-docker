import React, { Component } from 'react';
import axios from 'axios';

class Fib extends Component {
  state = {
    seenIndexes: null,
    values: null,
    index: ''
  };

  componentWillMount() {
    this.fetchValues();
    this.fetchIndexes();
  }

  componentWillUnmount() {
    if (this.asyncFetchValues) {
      this.asyncFetchValues.cancel();
    }
    if (this.asyncfetchIndexes) {
      this.asyncfetchIndexes.cancel();
    }
  }
  fetchValues() {
    this.asyncFetchValues = axios.get('/api/values/current')
      .then(values => {
        this.setState({ values: values.data });
        this.asyncFetchValues = null;
      });
  }

  fetchIndexes() {
    this.asyncfetchIndexes = axios.get('/api/values/all')
      .then(seenIndexes => this.setState({ seenIndexes: seenIndexes.data }));
  }


  handleSubmit = event => {
    event.preventDefault();

    axios.post('/api/values', {
      index: this.state.index
    }).then(() => {
      this.setState({ index: '' })
      this.fetchValues();
      this.fetchIndexes();
    });
  };

  renderSeenIndexes = () => {
    return this.state.seenIndexes && <div>
      <h3>Indexes I have seen:</h3>
      {this.state.seenIndexes.map(({ number }) => number).join(', ')}
    </div>
  }

  renderValues = () => {
    if (!this.state.values) {
      return null;
    }
    const entries = [];


    for (let key in this.state.values) {
      entries.push(
        <div key={key}>
          For index {key} I calculated {this.state.values[key]}
        </div>
      );
    }

    return <div>
      <h3>Calculated Values:</h3>
      {entries}
    </div>
  }

  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>Enter your index:</label>
          <input
            value={this.state.index}
            onChange={event => this.setState({ index: event.target.value })}
          />
          <button>Submit</button>
        </form>

        {this.renderSeenIndexes()}
        {this.renderValues()}
      </div>
    );
  }
}

export default Fib;
