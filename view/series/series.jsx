import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './series.css';

export default class Series extends React.PureComponent {

  constructor(props) {
    super(props);
    this.state = {
      series: [],
    }
  }

  componentDidMount() {
    fetch('/api/series').then((Response) => Response.json()).
    then((response) => {
      this.setState({
        series: response.series,
      })
    })
  }

  render() {
    return (
      <div id='series'>
        <GenerateToc series={this.state.series}/>
        <h1>专题</h1>
        <p>
          这里是博客的专题部分，将笔者平时的总结文章按照专题进行如下的区分。但是专题部分中收录的并不是所有的文章，如果想查看所有的文章，可以点击 
          <Link to="/archives"> 归档 </Link> 
          按照时间顺序浏览。
        </p>
        <GenerateSeries serieses={this.state.series}/>
      </div>
    );
  }
}

const GenerateSeries = ({serieses}) => {
  let series = [];
  serieses.forEach(function(s, index) {
    series.push(
      <div key={"toc-" + index}>
        <h2 name={"toc-" + index}>{s.name}</h2>
        <ul>
          {s.articles.map((article) => 
            <li key={article.link}>
              <Link to={article.link}>{article.title}</Link>
              <div className="time">{moment(article.meta.createAt).format('MMM DD, YYYY')}</div>
            </li>
          )}
        </ul>
      </div>
    );
  }, this);
  return (<div>{series}</div>)
}

const GenerateToc = ({series}) => {
  return (
    <div id="toc">
      <header>年份列表</header>
      <ul>
        {
          series.map((s, index) => 
            <li key={"#toc" + index}>
              <a href={"#toc" + index}>{s.name}</a>
            </li>
          )
        }
      </ul>
    </div>
  );
}