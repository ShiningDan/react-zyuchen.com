import React from 'react';
import {Link} from 'react-router-dom';

export default class Error extends React.Component {

  render() {

    return (
      <div>
        <h1>404 - 什么也没有</h1>
        <p>您要找的东西不在哦</p>
        <p>请检测 URL 拼写是否有误，或者通过 <Link to="/search">站内搜索</Link> 搜一下吧~</p>
      </div>
    );
  }
}