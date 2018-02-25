import './styles/main.scss';

import React from 'react';
import ReactDom from 'react-dom';
import superagent from 'superagent';

const API_URL = 'https://www.reddit.com/r';

class SearchForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      toSearch: '',
      searchLimit: 1,
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    if(e.target.name === 'to-search') this.setState({toSearch: e.target.value});
    if(e.target.name === 'search-limit') this.setState({searchLimit: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    this.props.update_state(this.state);
  }


  render() {
    return (
      <form
        className={this.props.search_error ? 'form-error search-form' : 'search-form'}
        onSubmit={this.handleSubmit}>
        <input
          type="text"
          name="to-search"
          value={this.state.toSearch}
          onChange={this.handleChange}
          placeholder="what you wanna search?"/>

        <input
          type="number"
          name="search-limit"
          value={this.state.searchLimit}
          min="1"
          max="20"
          onChange={this.handleChange}
          placeholder="1-20"/>

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
            <ul>
              {this.props.topics.map((data, i) => {
                return <li key={i}>
                  <a href={`https://www.reddit.com${data[0]}`}>
                    <h2>{data[1]}</h2>
                  </a>
                  {data[3].startsWith('https://www.reddit') ?
                    undefined
                    :
                    <img src={data[3]}></img>}
                  <p>{data[2]} updoots</p>
                </li>;
              })}
            </ul>
          </section>
          :
          undefined
        }

        {this.props.error ?
          <section className="reddit-error">
            <h2>something erroneous is going on...</h2>
          </section>
          :
          undefined
        }
      </div> 
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      topics: [],
      searchError: null,
    };

    this.updateState = this.updateState.bind(this);
    this.searchApi = this.searchApi.bind(this);
  }

  updateState(state) {
    this.searchApi(state)
      .then(res => {
        return this.setState(
          {topics: res.body.data.children.map(i => 
            [
              i.data.permalink,
              i.data.title,
              i.data.ups,
              i.data.url
            ]
          ), searchError: null});
      })
      .catch(err => this.setState({topics: [], searchError: err}));
  }

  searchApi(state) {
    return superagent.get(`${API_URL}/${state.toSearch}.json?limit=${state.searchLimit}`);
  }
  
  render() {
    return (
      <div className="application">
        <section id="SearchForm">
          <SearchForm update_state={this.updateState} search_error={this.state.searchError}/>
        </section>

        <section id="SearchResult">
          <SearchResultList topics={this.state.topics} error={this.state.searchError}/>
        </section>
      </div>
    );
  } 
}

ReactDom.render(<App />, document.getElementById('root'));