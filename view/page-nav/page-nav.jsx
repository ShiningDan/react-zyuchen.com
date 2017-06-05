import React from 'react';
import './page-nav.css';

export default class PageNav extends React.Component {

  render() {
    if (this.props.pageNav) {
      return (
        <nav id="page-nav">
          <a href={this.props.pageNavPn.prev} className="prev">{this.props.pageNav.prev}</a>
          <a href={this.props.pageNavPn.next} className="next">{this.props.pageNav.next}</a>
          <div className="center">
            <a href="/archives/">{this.props.pageNav.center}</a>
          </div>
        </nav>
      );
    } else {
      return (
        <nav id="page-nav">
        </nav>
      );
    }
  }
}