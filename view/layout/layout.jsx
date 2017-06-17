import React from 'react';
import Bundle from '../bundle/bundle.jsx';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Home from '../home/home.jsx';
import Archives from 'bundle-loader?lazy&name=[name]!../archives/archives.jsx';
import Series from 'bundle-loader?lazy&name=[name]!../series/series.jsx';
import Search from 'bundle-loader?lazy&name=[name]!../search/search.jsx';
import Error from 'bundle-loader?lazy&name=[name]!../error/error.jsx';
import Article from 'bundle-loader?lazy&name=[name]!../article/article.jsx';
// import Archives from '../archives/archives.jsx';
// import Series from '../series/series.jsx';
// import Search from '../search/search.jsx';
// import Error from '../error/error.jsx';
// import Article from '../article/article.jsx';
import { Router, Route, Switch, HashRouter} from 'react-router-dom';
import './layout.css';
import 'whatwg-fetch';

const ArchivesLazy = (props) => {
  return (
    <Bundle load={Archives}>
      {/*//这里只是给this.props.child传一个方法，最后在Bundle的render里面调用*/}
      {(Container) => <Container />}
    </Bundle>
  );
} 

const SeriesLazy = (props) => {
  return (
    <Bundle load={Series}>
      {/*//这里只是给this.props.child传一个方法，最后在Bundle的render里面调用*/}
      {(Container) => <Container />}
    </Bundle>
  );
}

const SearchLazy = (props) => {
  return (
    <Bundle load={Search}>
      {/*//这里只是给this.props.child传一个方法，最后在Bundle的render里面调用*/}
      {(Container) => <Container />}
    </Bundle>
  );
}

const ErrorLazy = (props) => {
  return (
    <Bundle load={Error}>
      {/*//这里只是给this.props.child传一个方法，最后在Bundle的render里面调用*/}
      {(Container) => <Container />}
    </Bundle>
  );
}

const ArticleLazy = (props) => {
  return (
    <Bundle load={Article}>
      {/*//这里只是给this.props.child传一个方法，最后在Bundle的render里面调用*/}
      {(Container) => <Container {...props}/>}
    </Bundle>
  );
}

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
      <HashRouter>
        <div>
          <Header />
          <div id="content-wrap">
            <div id="content">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/archives' component={ArchivesLazy}/>
                <Route path='/series' component={SeriesLazy}/>
                <Route path='/search' component={SearchLazy}/> 
                <Route path='/post/:link' component={ArticleLazy}/> 
                <Route component={ErrorLazy} />              
              </Switch>
            </div>
            <Footer />  
          </div>
        </div>
      </HashRouter>
    );
  }
}