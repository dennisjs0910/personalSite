import React, { Component } from 'react';
import { AutoComplete, Input } from 'antd';
import './BlogSearch.css';

const { Option } = AutoComplete;
const { Search } = Input;

export default class BlogSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredResults : props.data,
    }
  };

  /**
   * if value is not null set state with filtered results, otherwise all the data
   * @param  {String} value [search string that is passed from Autocomplete component]
   */
  handleSearch = value => {
    this.setState({
      filteredResults: value ? this.searchResult(value) : this.props.data
    });
  };

  /**
   * When item is selected, search through filteredResults to obtains actual object where item.id === key
   * After finding appropriate data, call handleReadModal to show modal.
   * @param  {String} id [Dom Key based off of item's id]
   */
  onSelect = id => {
    const [blog] = this.state.filteredResults.filter(item => item.id === parseInt(id));
    if (blog) {
      this.props.handleReadModal(blog);
    }
  };

  /**
   * TODO: search on tag (category)
   * Searches through item's title.
   * @param  {String} query [query to filter on]
   * @return {Blog[]}       [filtered blog array]
   */
  searchResult = query => {
    const result = this.props.data.filter((item) => item.title.toLowerCase().includes(query));
    return result;
  };


  /**
   * TODO: Make more informative
   * Transform blog objects into Option Components
   * @param  {Blog} item
   * @return {Component}
   */
  renderOption(item) {
    return(
      <Option key={ item.id } text={ item.title }>
        <div className="global-search-item">
          <span className="global-search-item-desc">
            <p>Title: { item.title }</p>
            <p>Tags: {item.category}</p>
          </span>
        </div>
      </Option>
    )
  };

  render() {
    const { filteredResults } = this.state;
    return (
      <div className="blogSearch-container">
      <AutoComplete
        className="blogSearch-autocomplete"
        size="large"
        dataSource={ filteredResults.map(this.renderOption) }
        onSelect={ this.onSelect }
        onSearch={ this.handleSearch }
        placeholder="Search for blogs"
        optionLabelProp="text"
      >
        <Search className="blogSearch-input"/>
      </AutoComplete>
      </div>
    );
  };
}