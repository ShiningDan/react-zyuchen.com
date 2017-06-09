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
      onscrollF: undefined,
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
          pageNavPn: response.pageNavPn
        }, () => {
          document.body.scrollTop = 0;
          let images = document.getElementsByTagName('img');
          // let comments = document.getElementById('comments');
          // let lazyloadDOM = Array.from(images).concat(comments);
          let lazyloadDOM = Array.from(images);
          let lazyLoadF = this.onscorllF(lazyloadDOM);
          this.setState({
            onscorllF: lazyLoadF,
          }, () => {
            // document.addEventListener('scroll', this.state.onscrollF);
            document.onscroll = lazyLoadF;
          }) 
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
        }, () => {      
          let images = document.getElementsByTagName('img');
          // let comments = document.getElementById('comments');
          // let lazyloadDOM = Array.from(images).concat(comments);
          let lazyloadDOM = Array.from(images);
          
          let lazyLoadF = this.onscorllF(lazyloadDOM);
          this.setState({
            onscrollF: lazyLoadF,
          }, () => {
            // document.addEventListener('scroll', this.state.onscrollF);
            document.onscroll = lazyLoadF;
          })
        })
      })
    }
  }


  onscorllF(lazyloadDOM) {
    return (event) => {
      // should receive lazyloadDOM
      let scrollTop = window.scrollY;
      let innerHeight = window.innerHeight;
      let scrollBottomHeight = scrollTop + innerHeight;
      for (let i = 0; i < lazyloadDOM.length; i++) {
        let dom = lazyloadDOM[i];
        if (dom.offsetTop < scrollBottomHeight + 300) {
          let src = dom.getAttribute('data-src');
          if (src) {
            dom.setAttribute('src', src);
          }
          let className = dom.getAttribute('class');
          if (className) {
            className += ' load';
          }
          else {
            className = 'load';
          }
          dom.setAttribute('class', className);
          lazyloadDOM.splice(i, 1);
          i = 0;
          if (lazyloadDOM.length === 0) {
            // document.removeEventListener('scroll', this.state.onscrollF);
            document.onscroll = null;
          }
        } else {
          break;
        }
      }
      if (lazyloadDOM.length === 0) {      
        // document.removeEventListener('scroll', this.state.onscrollF);
        document.onscroll = null;
      }
    };
  };


  componentWillMount() {
    // console.log('unmount', this.state.onscrollF);
    // document.removeEventListener('scroll', this.state.onscrollF);
    document.onscroll = null;
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