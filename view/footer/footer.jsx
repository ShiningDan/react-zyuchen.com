import React from 'react';
import './footer.css';

export default class Footer extends React.Component {

  render() {
    return (
      <footer id="footer">
        © 2017 - Yuchen 的主页 - <a href='http://www.miitbeian.gov.cn/' target='_blank'>京 ICP 备 17026659 号</a>
        <br />
        Powered by <a href='https://github.com/expressjs/express' target='_blank'>Express</a>
      </footer>
    ); 
  }
}