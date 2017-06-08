import React from 'react';
import {NavLink, } from 'react-router-dom';
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
              <NavLink to="/">首页</NavLink>
            </li>
            <li>
              <NavLink to="/archives">归档</NavLink>
            </li>
            <li>
              <NavLink to="/series">专题</NavLink>
            </li>
            <li>
              <NavLink to="/search">搜索</NavLink>
            </li>
          </ul>
        </nav>
      </header>
    );
  }
}