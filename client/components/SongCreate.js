import React, { Component } from 'react';
import {  graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Link, hashHistory } from 'react-router';
import query from '../queries/fetchSongs';


class SongCreate extends Component {
  constructor(props) {
    super(props);
    this.state = { title: ''};
  }

  onSubmit(event) {
    event.preventDefault();
    this.props.mutate({
      variables: {
        title: this.state.title
      },
      refetchQueries: [{ query }]
    }).then(() => hashHistory.push('/'))
  }

  render() {
    
    return (
      <div>
        <Link to="/"><h5>back</h5></Link>
        <h3>Create a new song</h3>
        <form onSubmit={this.onSubmit.bind(this)}>
          <label>Song Titile:</label>
          <input 
            onChange={event => this.setState({ title: event.target.value })}
            value={this.state.title}
          />
          <button  className="btn-floating btn-large red right">
        <i className="material-icons">add</i>
        </button>
        </form>
      </div>
    );
  }
}

const mutation = gql`
mutation AddSong($title: String) {
  addSong(title: $title) {
    title
  }
}
`;

export default graphql(mutation)(SongCreate)


