import React from 'react';
import Header from '../header/header.jsx';
import Footer from '../footer/footer.jsx';
import Home from '../home/home.jsx';
import Archives from '../archives/archives.jsx';
import Series from '../series/series.jsx';
import Search from '../search/search.jsx';
import Error from '../error/error.jsx';
import Article from '../article/article.jsx';
import { Router, Route, Switch, BrowserRouter} from 'react-router-dom';
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
      <BrowserRouter>
        <div>
          <Header />
          <div id="content-wrap">
            <div id="content">
              <Switch>
                <Route exact path='/' component={Home} />
                <Route path='/archives' component={Archives}/>
                <Route path='/series' component={Series}/>
                <Route path='/search' component={Search}/> 
                <Route path='/post/:link' component={Article}/> 
                <Route component={Error} />              
              </Switch>
            </div>
            <Footer />  
          </div>
        </div>
      </BrowserRouter>
    );
  }
}