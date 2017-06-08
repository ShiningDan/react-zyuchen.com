import React from 'react';
import {Link} from 'react-router-dom';
import './page-nav.css';

export default class PageNav extends React.Component {

  render() {
    if (this.props.pageNav) {
      return (
        <nav id="page-nav">
          <Link to={this.props.pageNavPn.prev} className="prev">{this.props.pageNav.prev}</Link>
          <Link to={this.props.pageNavPn.next} className="next">{this.props.pageNav.next}</Link>
          <div className="center">
            <Link to="/archives">{this.props.pageNav.center}</Link>
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