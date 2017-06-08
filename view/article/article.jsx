import React from 'react';
import PageNav from '../page-nav/page-nav.jsx';
import moment from 'moment';
import {Link} from 'react-router-dom';
import './article.css';

export default class article extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      link: "",
      article: null,
      content: null,
      series: null,
      pageNav: null,
      pageNavPn: null,
    }
  }

  componentWillReceiveProps(nextProps) {
    let link = nextProps.match.url;
    if (this.state.link !== link) {
      fetch('/api' + link).then((response) => response.json()).
      then((response) => {
        this.setState({
          link: link,
          content: response.content,
          article: response.article,
          series: response.series,
          pageNav: response.pageNav,
          pageNavPn: response.pageNavPn,
        })
      })
    }
  }

  componentDidMount() {
    let link = this.props.match.url;
    if (this.state.link !== link) {
      fetch('/api' + link).then((response) => response.json()).
      then((response) => {
        this.setState({
          link: link,
          content: response.content,
          article: response.article,
          series: response.series,
          pageNav: response.pageNav,
          pageNavPn: response.pageNavPn,
        })
      })
    }
  }

  render() {
    return (
      <div id='article'>
        <GenerateArticle article={this.state.article} content={this.state.content}/>
        <GenerateSeries series={this.state.series} article={this.state.article}/>
        <PageNav pageNav={this.state.pageNav} pageNavPn={this.state.pageNavPn}/>
      </div>
    );
  }
}

const GenerateArticle = (props) => {
  if (props.article === null) {
    return null;
  } else {
    return (
      <div>
        <div dangerouslySetInnerHTML={{__html: props.content}}></div>
        <div className="eof">--EOF--</div>
        <div className="post-info">
          发表于 
          <span className="time">{moment(props.article.meta.createAt).format('YYYY-MM-DD')}</span> 
          并被添加「<span>{props.article.categories.map((cate, index) => {
            return (
              <span className="tag" key={cate}>
                <Link to='/search'>{cate}</Link>
              </span>
            );
          })}</span>」标签，最后修改于
          <span className="time">{moment(props.article.meta.updateAt).format('YYYY-MM-DD')}</span>
        </div>
      </div>
    );
  }
}

const GenerateSeries = (props) => {
  if (props.series) {
    return (
      <div id="arti-series">
        <h3 className="series-info">专题「{props.article.series[0]}」相关的其他文章 <Link to='/series' /> » </h3>
        <ul className="series-ul">
          {props.series.articles.map((i)=> {
            return (
              <li key={i.title}>
                <Link to={i.link}>{i.title}</Link>
                <span className="time">{moment(i.meta.createAt).format('MMM DD, YYYY')}</span>
              </li>
            );
          })}
        </ul>
      </div> 
    );
  } else {
    return null;
  }
}