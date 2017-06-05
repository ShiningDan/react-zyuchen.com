import React from 'react';
import ReactDOM from 'react-dom';
import Layout from '../../view/layout/layout.jsx'


class HelloWorld extends React.Component {
  render() {
    return (
        <Layout />
        );
  }
}

ReactDOM.render(<HelloWorld />, document.body);