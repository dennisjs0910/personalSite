import React, { Component } from 'react';
// import './BlogSearch.css';

// Styling
import { Search, Container, Header, Segment, Select } from 'semantic-ui-react'
const DEFAULT_SEARCH = "title";

const TagComponent = ({ tags }) => {
  return(
    <div className="blogSearch-tags-container">
      <p className="blogSearch-tag">Tags:</p>
      { tags.map((item) => <p key={item} className="blogSearch-tag">{item}</p>) }
    </div>
  )
};

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
   * if value is not null set state with filtered results and search string, otherwise all the data and empty string
   * @param  {String} value [search string that is passed from Autocomplete component]
   */
  handleSearch = value => {
    this.setState({
      filteredResults: value ? this.searchResult(value) : this.props.data
    });
  };
  /**
   * This function sets the input value to component's state value
   * @param  {Event} e              [Javascript Event Object]
   * @param  {String} options.value [String value that is passed from input]
   */
  handleSearchChange = (e, { value }) => {
    this.setState({
      value,
      results: value !== "" ? this.searchResult(value) : []
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
   * Searches through blog's search field.
   * @param  {String} query       [query to filter on]
   * @return {Blog[]}             [filtered blog array]
   */
  searchResult = (query) => {
    // return this.state.searchField === DEFAULT_SEARCH ?
    //   this.props.data.filter((item) => item.title.toLowerCase().includes(query)):
    //   this.props.data.filter(
    //     (item) => (item.category || []).some(tag => tag.toLowerCase().includes(query))
    //   );
    return [];
  };

  /**
   * TODO: Make more informative
   * Transform blog objects into Option Components
   * @param  {Blog} item
   * @return {Component}
   */
  // renderOption(item) {
  //   return(
  //     <Option key={ item.id } text={ item.title }>
  //       <div className="global-search-item">
  //         <span className="global-search-item-desc">
  //           <p className="blogSearch-option-title">Title: { item.title }</p>
  //           <TagComponent tags={item.category} />
  //         </span>
  //       </div>
  //     </Option>
  //   )
  // };

  // render() {
  //   const { filteredResults } = this.state;
  //   return (
  //     <div className="blogSearch-container">
  //       <InputGroup compact size="large" className="blogSearch-inputGroup">
  //         <Select
  //           className="blogSearch-select"
  //           defaultValue={ DEFAULT_SEARCH }
  //           onChange={ this.handleSearchValueChange }
  //         >
  //           <Option value="title">Title</Option>
  //           <Option value="tag">Tag</Option>
  //         </Select>
  //         <AutoComplete
  //           className="blogSearch-autocomplete"
  //           size="large"
  //           dataSource={ filteredResults.map(this.renderOption) }
  //           onSelect={ this.onSelect }
  //           onSearch={ this.handleSearch }
  //           placeholder="Search for blogs with title or tag"
  //           optionLabelProp="text"
  //         >
  //           <Search className="blogSearch-input" />
  //         </AutoComplete>
  //       </InputGroup>
  //     </div>
  //   );
  // };

  // TODO: options for Select : Title (default), Tag
  render() {
    const { value, results } = this.state;
    return(
      <Container>
        <Select options={[]} placeholder='Select your country'/>
        <Search
          onSearchChange={ this.handleSearchChange }
          value={ value }
          results={ results }
        >
        </Search>
      </Container>
    );
  }
}