import React, { Component } from 'react';
import '../App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import Repository from '../components/Repository';

class UserSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      allRepos: '',
    };
  }

  async componentDidMount() {
    const userName = this.props.match.params.username;
    const url = 'https://api.github.com/users/';
    const finalUrl = url + userName + '/repos';
    this.setState({ loading: true });
    const response = await fetch(finalUrl);
    const repositoriesResult = await response.json();
    this.setState({ allRepos: repositoriesResult, loading: false, pageNum: 1 });
    console.log(this.state.allRepos);
  }

  render() {
    const { allRepos } = this.state;
    const repos = [];
    for (let i = 0; i < allRepos.length; i++) {
      repos.push(<Repository
        key={allRepos[i].id}
        repo={allRepos[i]}
      />);
    }
    return (
      <div className="App">
        {repos}
      </div>
    );
  }
}

export default UserSearch;
