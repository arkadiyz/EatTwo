import React, { Component } from 'react';

class ShowHideText extends Component {
  state = { text: '', showLink: 'hide', linkText: '' };
  componentDidMount() {
    let textLength = this.props.text.length;
    if (Math.floor(textLength / 60) > this.props.showRows) {
      let text = this.props.text.slice(0, 180);
      this.setState({ text: `${text} ...`, showLink: '', linkText: 'show more' });
    } else {
      this.setState({ text: this.props.text });
    }
  }

  toggleText = ev => {
    ev.preventDefault();
    if (this.state.linkText === 'show more') {
      this.setState({ text: this.props.text, showLink: '', linkText: 'show less' });
    } else {
      let text = this.props.text.slice(0, 180);
      this.setState({ text: `${text} ...`, showLink: '', linkText: 'show more' });
    }
  };

  render() {
    console.log('ShowHideText');
    
    return (

      <div className='card-bottom-border show-hide-text-container'>
        <p>
          {this.state.text}
          <a className={this.state.showLink} href='#' onClick={this.toggleText}>
            {this.state.linkText}
          </a>
        </p>
      </div>
    );
  }
}

export default ShowHideText;
