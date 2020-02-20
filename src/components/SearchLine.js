import React, { Component } from 'react';
import './searchLine.css';
import PropTypes from 'prop-types';

class SearchLine extends Component {
  constructor(props) {
    super(props);

    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    // eslint-disable-next-line react/destructuring-assignment
    this.props.onSearchWordChange(event.target.value);
  }

  render() {
    const { onLanguageChange, onSortingChange, handleSubmit } = this.props;
    return (
      <div>
        <div className="search-line">
          <input className="search-input" onChange={this.handleChange} />
          <select
            className="select-button"
            onBlur={(event) => {
              onLanguageChange(event.target.value);
            }}
          >
            <option>All</option>
            <option>JavaScript</option>
            <option>Php</option>
            <option>Java</option>
            <option>Python</option>
            <option>Perl</option>
          </select>
          <select
            className="select-button"
            onBlur={(event) => {
              onSortingChange(event.target.value);
            }}
          >
            <option>Best</option>
            <option>Stars</option>
            <option>Forks</option>
            <option>Help-wanted-issues</option>
            <option>Updated</option>
          </select>
          <button type="button" className="search-button" onClick={handleSubmit}>Search</button>
        </div>
      </div>
    );
  }
}

SearchLine.propTypes = {
  onSearchWordChange: PropTypes.func.isRequired,
  onLanguageChange: PropTypes.func.isRequired,
  onSortingChange: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
};

export default SearchLine;
