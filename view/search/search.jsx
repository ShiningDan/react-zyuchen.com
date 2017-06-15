import React from 'react';
import {Link} from 'react-router-dom';
import './search.css';

export default class Search extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      info: undefined,
      keyword: undefined,
      results: [],
    }

    this.onClickHandle = this.onClickHandle.bind(this);
  }

  onClickHandle(event) {
    event.preventDefault();
    let value = document.getElementById('keyword').value.split(' ').join('+');
    fetch('/api/search?s=' + value).then((response) => response.json()).
    then((response) => {
      this.setState({
        results: response.results,
        info: response.info,
      })
    })
  }

  render() {
    return (
      <div>
        <h1>站内搜索</h1>
        <div id="search">
          <div id="search-wrapper">
            <div id="keyword-wrapper">
              <input type="search" id="keyword" maxLength='80' placeholder="请输入关键字..." name='s' required='true' />
            </div>
            <input type="submit" id="submit" onClick={this.onClickHandle}/>
          </div>
        </div>
        <GenerateResult results={this.state.results} info={this.state.info} />
      </div>
    );
  }
}

const GenerateResult = ({results, info}) => {

  if (results.length > 0) {
    return (<div id="searchResult">
            <div id="searchInfo">本次搜索共找到结果 {info} 条</div>
            {results.map((result) => {
              return (
                <div className='searchItem' key={result._source.link}>
                  {result.highlight.title ? 
                    <Link to={"/post/" + result._source.link} className='searchTitle' dangerouslySetInnerHTML={{__html: result.highlight.title}} /> :
                    <Link to={"/post/" + result._source.link} className='searchTitle' dangerouslySetInnerHTML={{__html: result._source.title}} />}
                  <div className='searchContent' dangerouslySetInnerHTML={{__html: result.highlight.content.join(' ... ')}} />
                </div>
              );
            })}
          </div>);
  } else {
    return null;
  }
}