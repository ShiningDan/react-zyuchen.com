import React from 'react';

export default class Archives extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      articles: [],
    }
  }

  render() {
    return (
      <div>
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
      </div>
    ); 
  }
}

const GenerateToc = (props) => {
  let lis = [];
  for (let i = props.articles.length - 1; i >= 0; i--) {
    for (let j in props.articles[i]) {
      lis.push(
        <li>
          <a href={"#toc-" + j}>{j} 年</a>
        </li>
      );
    }
  }
  return (
    <ul>{lis}</ul>
  );  
}