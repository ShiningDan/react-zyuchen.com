import React from 'react';

export default class Bundle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mod: null,
    }
  }

  componentWillMount() {
    this.load(this.props);
  }

  componentWillReceoveProps(nextProps) {
    if (nextProps.load !== this.props.load) {
      this.load(nextProps);
    }
  }

  load(props) {
    // 重置状态
    this.setState({
      mod: null
    });
    props.load((mod) => {
      this.setState({
        mod: mod.default ? mod.default : mod,
      })
    })
  }

  render() {
    return this.state.mod ? this.props.children(this.state.mod) : null;
  }
}