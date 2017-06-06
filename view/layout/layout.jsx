import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import PageNav from '../page-nav/page-nav.jsx';
import Home from '../home/home.jsx';
import Archives from '../archives/archives.xjsx';
import './layout.css';
import 'whatwg-fetch';

export default class Layout extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      pageNav: null,
      pageNavPn: null
    }
  }

  render() {
    return (
      <div>
        <Header />
        <div id="content-wrap">
          <div id="content">
            <Home />
            {/*<Archives />*/}
            <PageNav pageNav={this.state.pageNav} pageNavPn={this.state.pageNavPn}/>
          </div>
          <Footer />  
        </div>
      </div>
    );
  }
}