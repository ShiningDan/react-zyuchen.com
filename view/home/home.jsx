import React from 'react';
import moment from 'moment';
import {Link} from 'react-router-dom';
import "./home.css";

export default class Home extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      abstracts: [],
    }
  }


  componentDidMount() {
    fetch('/api/home').then((response) => response.json()
    ).then((response) => {
      this.setState({
        abstracts: this.state.abstracts.concat(response.abstracts),
      })
    }).catch(function(e) {
      console.log(e);
    })
  }

  render() {
    return (
      <div>
      {this.state.abstracts.map(function(abstract) {
        return <GenerateAbstract abstract={abstract} key={abstract._id}/>;
      })}
      </div>
    );
  }
}

const GenerateAbstract = (props) => {
  return (
    <article className="post">
        <div className="meta">
          <div className="date">{moment(props.abstract.meta.createAt).format('YYYY-MM-DD')}</div>
          <div className="comments">{props.abstract.comments}</div>
        </div>
        <h1 className="title">
          <Link to={props.abstract.link}>{props.abstract.title}</Link>
        </h1>
        <div className="post-content">
          <p className="abstract">{props.abstract.abstract}</p>
          <p>
            <Link to={props.abstract.link}>继续阅读</Link>
          </p>
        </div>
      </article>
  );
}