import React, { Component } from 'react';
import '../App.css';
import CircularProgress from '@material-ui/core/CircularProgress';
import InfiniteScroll from 'react-infinite-scroll-component';
import SearchLine from '../components/SearchLine';
import Repository from '../components/Repository';

class GlobalSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      searchWord: '',
      loading: false,
      allRepos: {
        items: [],
      },
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.loadMore = this.loadMore.bind(this);
  }

  async handleSubmit() {
    const { searchWord, sorting, language } = this.state;
    const url = 'https://api.github.com/search/repositories';
    let search = url + '?q=' + searchWord;
    if (language !== undefined) {
      search = search + '+language:' + language;
    }
    if (sorting !== undefined) {
      search = search + '&sort=' + sorting;
    }
    this.setState({ loading: true });
    const response = await fetch(search);
    const repositoriesResult = await response.json();
    this.setState({ allRepos: repositoriesResult, loading: false, pageNum: 1 });
  }

  async loadMore() {
    const {
      searchWord, sorting, language, pageNum,
    } = this.state;
    const url = 'https://api.github.com/search/repositories';
    let search = url + '?q=' + searchWord;
    if (language !== undefined) {
      search = search + '+language:' + language;
    }
    if (sorting !== undefined) {
      search = search + '&sort=' + sorting;
    }
    const searchPage = search + '&page=' + pageNum + '&per_page=30';
    this.setState({ loading: true });
    const response = await fetch(searchPage);
    const repositoriesResult = await response.json();
    const newItems = repositoriesResult.items;
    // eslint-disable-next-line react/destructuring-assignment,react/no-access-state-in-setstate
    const fullList = this.state.allRepos.items.concat(newItems);
    this.setState({ loading: false, pageNum: pageNum + 1, allRepos: { items: fullList } });
  }

  render() {
    const { loading, allRepos: { items } } = this.state;
    const repos = [];
    for (let i = 0; i < items.length; i++) {
      repos.push(<Repository
        key={items[i].id}
        repo={items[i]}
      />);
    }
    return (
      <div className="App">
        <SearchLine
          onSearchWordChange={(searchWord) => { this.setState({ searchWord }); }}
          onLanguageChange={(language) => { this.setState({ language }); }}
          onSortingChange={(sortingType) => { this.setState({ sorting: sortingType }); }}
          handleSubmit={this.handleSubmit}
        />
        <InfiniteScroll
          loader={loading && <CircularProgress />}
          hasMore
          dataLength={repos.length}
          next={this.loadMore}
        >
          {!loading && repos}
        </InfiniteScroll>
      </div>
    );
  }
}

export default GlobalSearch;
