import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import PageNav from '../page-nav/page-nav.jsx';
import './layout.css';

export default class Layout extends React.Component {

  render() {
    let pageNavPn = {
      prev: "gt",
      next: "lt",
    };

    let pageNav = {
      "prev": pageNavPn.prev === "" ? undefined : "上一页",
      "next": pageNavPn.next === "" ? undefined : "下一页",
      "center": "博客归档"
    };
    return (
      <div>
        <Header />
        <div id="content-wrap">
          <div id="content">
            <PageNav pageNav={pageNav} pageNavPn={pageNavPn}/>
          </div>
          <Footer />  
        </div>
      </div>
    );
  }
}