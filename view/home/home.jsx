import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import axios from 'axios';
import "./home.css";

export default class Home extends React.PureComponent {

  constructor(props) {
    super(props);

    this.state = {
      abstracts: [],
      fetchMoreStatus: '正在获取更多文章',
    }
  }

  fetchMore(lazyloadDOM) {
    let fetching = false;
    let lazyloadF = (event) => {
      if (lazyloadDOM === undefined) {
        document.onscroll = null;
      } else {
        if (fetching === false) {
          let scrollTop = window.scrollY;
          let innerHeight = window.innerHeight;
          let scrollBottomHeight = scrollTop + innerHeight;
          if (lazyloadDOM.offsetTop < scrollBottomHeight + 300) {
            if (this.state.abstracts.length === 0) {
              fetching = true;
              // fetch do not support get params, use axio instead
              // fetch('/api/home').then((response) => response.json()
              // ).then((response) => {
              //   if (response.abstracts.length === 0) {
              //     this.setState({
              //       fetchMoreStatus: '您已经浏览完所有的文章',
              //     })
              //     document.onscroll = null;
              //   }
              //   this.setState({
              //     abstracts: this.state.abstracts.concat(response.abstracts),
              //   })
              //   fetching = false;
              // }).catch(function(e) {
              //   fetching = false;                
              //   console.log(e);
              // })

              axios.get('/api/home').then((response) => {
                if (response.data.abstracts.length === 0) {
                  this.setState({
                    fetchMoreStatus: '您已经浏览完所有的文章',
                  })
                  document.onscroll = null;
                }
                this.setState({
                  abstracts: this.state.abstracts.concat(response.data.abstracts),
                })
                fetching = false;
              }).catch(function(e) {
                fetching = false;                
                console.log(e);
              });
            } else {
              fetching = true;
              let id = this.state.abstracts[this.state.abstracts.length - 1]._id;
              // fetch do not support get params, use axio instead
              // fetch('/api/home').then((response) => response.json()
              // ).then((response) => {
              //   if (response.abstracts.length === 0) {
              //     this.setState({
              //       fetchMoreStatus: '您已经浏览完所有的文章',
              //     })
              //     document.onscroll = null;
              //   }
              //   this.setState({
              //     abstracts: this.state.abstracts.concat(response.abstracts),
              //   })
              //   fetching = false;                
              // }).catch(function(e) {
              //   fetching = false;                
              //   console.log(e);
              // })

              axios.get('/api/home?id=' + id).then((response) => {
                if (response.data.abstracts.length === 0) {
                  this.setState({
                    fetchMoreStatus: '您已经浏览完所有的文章',
                  })
                  document.onscroll = null;
                }
                this.setState({
                  abstracts: this.state.abstracts.concat(response.data.abstracts),
                })
                fetching = false;
              }).catch(function(e) {
                fetching = false;                
                console.log(e);
              });
            }
        }
        }
      }
    }
    lazyloadF();
    return lazyloadF;
  }


  componentDidMount() {
    let lazyloadDOM = document.getElementById('fetch-more');
    document.onscroll = this.fetchMore(lazyloadDOM);
  }

  appendAbstracts(abstracts) {
    let stateAbstracts = this.state.abstracts;
    this.setState({
      abstracts: stateAbstracts.concat(abstracts),
    })
  }

  render() {
    return (
      <div>
      {this.state.abstracts.map(function(abstract) {
        return <GenerateAbstract abstract={abstract} key={abstract._id}/>;
      })}
      <div id='fetch-more'>{this.state.fetchMoreStatus}</div>
      </div>
    );
  }
}

const GenerateAbstract = ({abstract}) => {
  return (
    <article className="post">
        <div className="meta">
          <div className="date">{moment(abstract.meta.createAt).format('YYYY-MM-DD')}</div>
          <div className="comments">{abstract.comments}</div>
        </div>
        <h1 className="title">
          <Link to={abstract.link}>{abstract.title}</Link>
        </h1>
        <div className="post-content">
          <p className="abstract">{abstract.abstract}</p>
          <p>
            <Link to={abstract.link}>继续阅读</Link>
          </p>
        </div>
      </article>
  );
}