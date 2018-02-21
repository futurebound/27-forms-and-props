// import './styles/main.scss';

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'http://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toSearch: '',
      searchLimit: null,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    this.setState({val: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update_state(this.state.val);
  }

  render() {
    return (
      <form
        className="search-form"
        onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="toSearch"
          value={this.state.toSearch}
          onChange={this.handleChange}
          placeholder="what you wanna find boo?"/>
        <input
          type="number"
          name="searchLimit"
          value={this.state.val}
          onChange={this.handleChange}
          placeholder="how many?"/>

        <button type="submit">Seach</button>
      </form>
    );
  }
}

class SearchResultList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return(
      <div className="results">
        {this.props.topics ?
          <section className="reddit-data">
            {console.log(this.props.topics)}
            <h2>{this.props.topics.subject}</h2>
            <img
              src={this.props.topics.image}
              alt={this.props.topics.namething}/>
          </section>
          :
          undefined
        }

        {this.props.error ?
          <section className="reddit-error">
            <h2>No bueno boobay.</h2>
          </section>
          :
          undefined
        }
      </div> 
    );
  }
}

class App extends React.Componenet {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      searchFormBoard: asdf,
      searchFormLimit: loodly,
      searchError: null,
    };

    this.updateState = this.updateState.bind(this);
    this.searchApi = this.searchApi.bind(this);
  }

  updateState(searchFormBoard, searchFormLimit) {
    this.searchApi(searchFormBoard, searchFormLimit)
      .then(res => this.setState({topics: res.body, searchError: null}))
      .catch(err => this.setState({topics: [], searchError: err}));
  }

  searchApi(searchFormBoard, searchFormLimit) {
    return superagent.get(`${API_URL}/${searchFormBoard}.json?limit=${searchFormLimit}`);
  }
  
  render() {
    return (
      <div className="application">
        <SearchForm update_state={this.updateState}/>
        <SearchResultList topics={this.state.topics} error={this.state.searchError}/>
      </div>
    );
  } 
}

ReactDom.render(<App />, document.getElementById('root'));