/* eslint-disable camelcase */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import './repository.css';
import timeAgo from '../util/timeAgo';

class Repository extends Component {
  render() {
    const {
      repo: {
        full_name, description, stargazers_count, language, updated_at, url, license,
        owner: { login },
      },
    } = this.props;

    return (
      <div className="repository-all">
        <div className="book">
          <img alt="book" src="/book.svg" />
        </div>
        <div className="repository">
          <a className="full-name" href={url}>{full_name}</a>
          <div className="description">{description}</div>
          <div className="info">
            <div className="another-info">
              <img alt="star" className="star" src="/star.svg" />
              {stargazers_count}
            </div>
            <div className="another-info">
              <span className="repo-language-color" />
              {language}
            </div>
            { license
              && (
              <div className="another-info">
                {license.name}
              </div>
              )}
            <div className="another-info">
              {timeAgo(updated_at)}
              <a href={'/user/' + login} target='_blank'>{login}</a>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

Repository.propTypes = {
  repo: PropTypes.shape({
    url: PropTypes.string.isRequired,
    full_name: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    stargazers_count: PropTypes.number.isRequired,
    language: PropTypes.string.isRequired,
    license: PropTypes.shape({
      name: PropTypes.string,
    }),
    updated_at: PropTypes.string.isRequired,
  }).isRequired,
};

export default Repository;
