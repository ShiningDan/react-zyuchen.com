import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom'
import './archives.css';

export default class Archives extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    }
  }
  
  componentDidMount() {
    fetch('/api/archives').then((response) => response.json()).
    then((response) => {
      this.setState({
        articles: response.articles,
      })
    })
  }

  render() {
    return (
      <div id='archives'>
        <div id="toc">
          <header>年份列表</header>
          <GenerateToc articles={this.state.articles}/>
        </div>
        <h1>归档</h1>
        <p>
          本博客系统是自己搭建的博客系统，后台系统用的是 <a href="http://expressjs.com/">Express JS</a>，前端的样式参考了 <a href="https://imququ.com/">屈屈老师的博客</a>。除了文章展示页面以外，还有后台页面管理系统，文章统计，搜索等辅助功能。之前使用 <a href="https://hexo.io/">Hexo</a> 作为博客系统，上面保留一些原来的博客文章，有一些不重要的就没有迁移过来了。
        </p>
        <p>
          归档部分按照时间顺序展示文章，文章质量良莠不齐，既有想与大家分享的个人心得，也有平时学习未整理好的总结笔记，如果大家想选择性阅读一些文章，可以点击链接来 <a href="/series">专题</a> 查看。希望自己的在这个浮躁的时代坚持阅读与写作，也非常感谢大家的支持与反馈。
        </p>
        <GenerateArch articles={this.state.articles}/>
      </div>
    ); 
  }
}

const GenerateToc = (props) => {
  let lis = [];
  for (let i = props.articles.length - 1; i >= 0; i--) {
    for (let j in props.articles[i]) {
      lis.push(
        <li key={j}>
          <a href={"#toc-" + j}>{j} 年</a>
        </li>
      );
    }
  }
  return (
    <ul>{lis}</ul>
  );  
}

const GenerateArch = (props) => {
  let tocs = [];
  for (let i = props.articles.length - 1; i >= 0; i--) {
    for (let j in props.articles[i]) {
      let tocmonths = [];
      for (let k = props.articles[i][j].length - 1; k>=0; k--) {
        for (let l in props.articles[i][j][k]) {
          tocmonths.push(
            <div key={j+" " + l}>
              <h2>{j} 年 {l} 月</h2>
              <ul>
                {
                  props.articles[i][j][k][l].map(function(article) {
                    return (
                      <li key={article.link}>
                        <Link to={article.link}>{article.title}</Link>
                        <div className="time">{moment(article.date).format('MMM DD, YYYY')}</div>
                      </li>
                    );
                  })
                }
              </ul>
            </div>
          );
        }
      }
      tocs.push(<div name={"toc" + j} key={"toc" + j}>
          {tocmonths}
        </div>);
    }
  }
  return (<div>{tocs}</div>);
}