import React from 'react';
import "./header.css";

export default class Header extends React.Component {

  render() {
    return (
      <header id="header">
        <div id="avatar">
          <a href="/"></a>
        </div>
        <h1>
          <a href="/">Yuchen</a>
        </h1>
        <div id="sup">
          <p>前端开发</p>
          <p>软件定义网络</p>
        </div>
        <nav id="main-nav">
          <ul>
            <li>
              <a href="/">首页</a>
            </li>
            <li>
              <a href="/archives/">归档</a>
            </li>
            <li>
              <a href="/series/">专题</a>
            </li>
            <li>
              <a href="/search/">搜索</a>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}