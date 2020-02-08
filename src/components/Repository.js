import React, {Component} from "react";
import './repository.css'
import {timeAgo} from "./util/timeAgo";

class Repository extends Component {
    render() {
        console.log(JSON.stringify(this.props.repo, null, 2));
        return (
            <div className='repository-all'>
                <div className='book'>
                    <img src='/book.svg'/>
                </div>
                <div className='repository'>
                    <a className='full-name' href='#'>{this.props.repo.full_name}</a>
                    <div className='description'>{this.props.repo.description}</div>
                    <div className='info'>
                        <div className='another-info'>
                            <img className='star' src='/star.svg'/>
                            {this.props.repo.stargazers_count}
                        </div>
                        <div className='another-info'>
                            <span className='repo-language-color'/>
                            {this.props.repo.language}
                        </div>
                        {/*<div className='another-info'>*/}
                        {/*    {this.props.repo.license.name}*/}
                        {/*</div>*/}
                        <div className='another-info'>
                            {timeAgo(this.props.repo.updated_at)}
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default Repository;