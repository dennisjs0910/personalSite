import React, { Component } from 'react';
import { Search, Dropdown } from 'semantic-ui-react'
import ResultItem from './ResultItem';
import './BlogSearch.css';

const DEFAULT_SEARCH = "title";
const TAG_SEARCH = "tag";
const DropdownOptions = [
  {
    key: DEFAULT_SEARCH,
    value: DEFAULT_SEARCH,
    text: "Title"
  },
  {
    key: TAG_SEARCH,
    value: TAG_SEARCH,
    text: "Tag"
  }
];

const renderItems = (props) => <ResultItem { ...props } />;

export default class BlogSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      results : [],
      searchField: DEFAULT_SEARCH,
      value: "",
    }
  };

  /**
   * This function sets the input value to component's state value
   * @param  {Event} e              [Javascript Event Object]
   * @param  {String} options.value [String value that is passed from input]
   */
  handleSearchChange = (e, { value }) => {
    this.setState({
      value,
      results: value !== "" ? this.filterResults(value) : []
    });
  };

  /**
   * Changes search field when user selects a search option
   * @param  {String} value [search field string value]
   */
  handleSearchValueChange = (value) => {
    this.setState({ searchField: value });
  };

  /**
   * Searches through blog's search field.
   * @param  {String} value       [value to match and filter on]
   * @return {Blog[]}             [filtered blog array]
   */
  filterResults = (query) => {
    return this.state.searchField === DEFAULT_SEARCH ?
      this.props.data.filter((item) => item.title.toLowerCase().includes(query)):
      this.props.data.filter(
        (item) => (item.category || []).some(tag => tag.toLowerCase().includes(query))
      );
  };

  /**
   * Calls callback fn when user clicks on search item
   * @param  {Event} event
   * @param  {Blog Object} options.result [Blog Object = { title, summary, contents, ...}]
   */
  handleSearchSelect = (event, { result }) => {
    this.props.handleSelect(result);
  };

  /**
   * Sets search field to value
   * @param  {Event} e
   * @param  {String} options.value [User dropdown select]
   */
  handleDropDownChange = (e, { value }) => {
    this.setState({ searchField: value });
  }

  render() {
    const { value, results } = this.state;
    return(
      <div className="blog-search-container">
        <Dropdown
          defaultValue={DEFAULT_SEARCH}
          selection
          className="blog-search-dropdown"
          options={ DropdownOptions }
          onChange={ this.handleDropDownChange.bind(this) }
        />
        <Search
          className="blog-search-input-container"
          onSearchChange={ this.handleSearchChange.bind(this) }
          value={ value }
          results={ results }
          fluid
          resultRenderer={ renderItems }
          onResultSelect={ this.handleSearchSelect.bind(this) }
        />
      </div>
    );
  }
}