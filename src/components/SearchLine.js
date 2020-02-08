import React, {Component} from "react";
import './searchLine.css';
import Repository from "./Repository";

class SearchLine extends Component{
    constructor(props) {
        super(props);
        this.state = {
            searchWord : '',
            allRepos: {
                items : [{
                    full_name: 'first/project',
                    description: 'First project',
                    stargazers_count: '54',
                    language: 'Javascript',
                    license: {
                        key: "other",
                        name: "Other",
                        spdx_id: "NOASSERTION",
                        url: null,
                        node_id: "MDc6TGljZW5zZTA="
                    },
                    updated_at: '2020-02-07T05:47:34Z',
                }],
            },
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    };

    async handleSubmit(event) {
        const url = 'https://api.github.com/search/repositories';
        let search = url + '?q=' + this.state.searchWord;
        if (this.state.language !== undefined) {
            search = search + '+language:' + this.state.language;
        }
        if (this.state.sorting !== undefined){
            search = search + '&sort=' + this.state.sorting;
        }
        const response = await fetch(search);
        const repositoriesResult = await response.json();
        this.setState({allRepos: repositoriesResult});
    }

    handleChange(event) {
        this.setState({searchWord: event.target.value});
    }

    render() {
        let repos = [];
        for(let i = 0; i < this.state.allRepos.items.length; i++){
            repos.push(<Repository key={this.state.allRepos.items[i].id} repo={this.state.allRepos.items[i]}/>);
        }
        return (
            <div>
                <div className='search-line'>
                    <input className='search-input' onChange={this.handleChange}/>
                    <select className='select-button' onChange={(event)=>{this.setState({language: event.target.value})}}>
                        <option>All</option>
                        <option>JavaScript</option>
                        <option>Php</option>
                        <option>Java</option>
                        <option>Python</option>
                        <option>Perl</option>
                    </select>
                    <select  className='select-button' onChange={(event)=>{this.setState({sorting: event.target.value})}}>
                        <option>Best</option>
                        <option>Stars</option>
                        <option>Forks</option>
                        <option>Help-wanted-issues</option>
                        <option>Updated</option>
                    </select>
                    <button className='search-button' onClick={this.handleSubmit}>Search</button>
                </div>
                {repos}
            </div>
        )
    }
}

export default SearchLine;