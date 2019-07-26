import React, { Component } from 'react';
import { AutoComplete, Input } from 'antd';

const { Option } = AutoComplete;
const { Search } = Input;

export default class BlogSearch extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredResults : props.data,
    }
  };

  handleSearch = value => {
    this.setState({
      filteredResults: value ? this.searchResult(value) : this.props.data
    });
  };

  onSelect = id => {
    const [blog] = this.state.filteredResults.filter(item => item.id === parseInt(id));
    if (blog) {
      this.props.handleReadModal(blog);
    }
  };

  searchResult = query => {
    const result = this.props.data.filter((item) => item.title.toLowerCase().includes(query));
    return result;
  };

  renderOption(item) {
    console.log(item);
    return(
      <Option key={ item.id } text={ item.title }>
        <div className="global-search-item">
          { item.title }
        </div>
      </Option>
    )
  };

  render() {
    const { filteredResults } = this.state;
    return (
      <AutoComplete
        className="global-search"
        size="large"
        dataSource={ filteredResults.map(this.renderOption) }
        onSelect={ this.onSelect }
        onSearch={ this.handleSearch }
        placeholder="input here"
        optionLabelProp="text"
      >
        <Search />
      </AutoComplete>
    );
  };
}