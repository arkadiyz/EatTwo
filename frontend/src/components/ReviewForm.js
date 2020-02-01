import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocketService from '../services/SocketService';
import Notification from './Notification'

class ReviewForm extends Component {
  state = {
    email: '',
    txt: '',
    rate: 0,
    starClass: 'icon-medium color-gray far fa-star',
    starSelected: 'icon-medium color-yellow far fa-star',
    showNotification: false
  };

  componentDidMount() {
    //socket setup
    //sign in to a new channel called 'review'
    //whenever a new msg arrives on socket from the backend - link to to the addMsg method

    SocketService.setup();
    SocketService.emit('newChannel', 'review');
    SocketService.on('addMsg', this.addMsg);
  }

  componentWillUnmount() {
    //unlink the addMsg method from the addMsg announcment
    //terminate the socket
    SocketService.off('addMsg', this.addMsg);
    SocketService.terminate();
  }

  addMsg = newMsg => {
    //open a notification showing a msg

    console.log(newMsg)
    // console.log('TEST addMsg -> ', newMsg);
    // this.setState({ showNotification: true })
    //  this.props.addMsg(newMsg)
    // console.log("addMsg -> props",this.props.msg);

    // this.setState({ msgs: newMsg });
  };//

  onSaveReviewForm = ev => {
    ev.preventDefault();
    this.props.onSaveReviewForm({ email: this.state.email, txt: this.state.txt, rate: this.state.rate });
    //emitting a new msg 
    SocketService.emit('newMsg', { email: this.state.email, txt: this.state.txt, rate: this.state.rate });
  };

  onToggleStar = ev => {
    ev.preventDefault();
    let id = ev.target.id;
    this.setState({ rate: id });
  };

  onHandleChange = ev => {
    ev.preventDefault();
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({ [name]: value });
  };

  // x = () => {
  //   console.log('TEST TEST -> ');
  //   id += 1
  //   SocketService.emit('newMsg', 'hii shuv' + id);

  // }

  render() {
    return (
      // [this.state.showNotification && <Notification open={true} msg={'test'}></Notification>,
      <div className='card-container-lg card-container-horizontal flex align-center justify-center'>
        <div className='card-background-lg main-review-form-container flex column align-end'>
          <i className='icon-medium color-gray fas fa-times' title='Close' onClick={this.props.onCloseReviewForm}></i>
          <form className='review-form flex column align-center' onSubmit={this.onSaveReviewForm}>
            <h3>How satisfied are you?</h3>
            <div className='rating flex margin-bottom-20'>
              {Array.from(Array(5), (_, idx) => {
                return <i key={idx} id={idx + 1} className={idx < this.state.rate ? this.state.starSelected : this.state.starClass} name={idx + 1} onClick={this.onToggleStar}></i>;
              })}
            </div>

            <h3>We would love to hear what you think</h3>
            <div className='email'>
              <input type='email' placeholder='Email' name='email' onChange={this.onHandleChange} required></input>
            </div>
            <div className='review'>
              <textarea className='' id='review' name='txt' onChange={this.onHandleChange} min='5' placeholder='Tell us what you think'></textarea>
            </div>
            <div className='save'>
              <button className='button btn-main'>SAVE</button>
            </div>
          </form>
          <h4 className='review-h5'>Thanks for your feedback</h4>
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
});

const mapDispatchToProps = {};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);


/*


import React, { Component } from 'react';
import { connect } from 'react-redux';
import SocketService from '../services/SocketService';
import { addMsg } from '../actions/SocketAction';
var id =1
class ReviewForm extends Component {
  state = {
    email: '',
    txt: '',
    rate: 0,
    starClass: 'icon-medium color-gray far fa-star',
    starSelected: 'icon-medium color-yellow far fa-star',
    msgs: ''
  };


  componentDidMount() {
    SocketService.setup();
    SocketService.emit('newChannel','review');
    SocketService.on('addMsg', this.addMsg);
  }//

  componentWillUnmount() {
    SocketService.off('addMsg', this.addMsg);
    SocketService.terminate();
  }//

  addMsg = newMsg => {
    console.log('TEST addMsg -> ',newMsg);

    //  this.props.addMsg(newMsg)
    // console.log("addMsg -> props",this.props.msg);

    // this.setState({ msgs: newMsg });
  };//



  onSaveReviewForm = ev => {

    ev.preventDefault();

    this.props.onSaveReviewForm({ email: this.state.email, txt: this.state.txt, rate: this.state.rate });
    SocketService.emit('newMsg', { email: this.state.email, txt: this.state.txt, rate: this.state.rate });

  };

  onToggleStar = ev => {
    ev.preventDefault();
    let id = ev.target.id;
    this.setState({ rate: id });
  };

  onHandleChange = ev => {
    ev.preventDefault();
    let name = ev.target.name;
    let value = ev.target.value;
    this.setState({ [name]: value });
  };
  x = () => {
    console.log('TEST TEST -> ');
    id+=1
    SocketService.emit('newMsg', 'hii shuv'+id);

  }
  render() {
    // console.log("ReviewForm SOCKET ",this.state.msgs);
    console.log("addMsg ->render -> props",this.props.msg);
    return (
      <div className='card-container-lg card-container-horizontal flex align-center justify-center'>
        <div className='card-background-lg main-review-form-container flex column align-end'>
          <i className='icon-medium color-gray fas fa-times' title='Close' onClick={this.props.onCloseReviewForm}></i>
          <form className='review-form flex column align-center' onSubmit={this.onSaveReviewForm}>
            <h3>How satisfied are you?</h3>
            <div className='rating flex margin-bottom-20'>
              {Array.from(Array(5), (_, idx) => {
                return <i key={idx} id={idx + 1} className={idx < this.state.rate ? this.state.starSelected : this.state.starClass} name={idx + 1} onClick={this.onToggleStar}></i>;
              })}
            </div>
              <span>{this.state.msgs}</span>
            <h3>We would love to hear what you think</h3>
            <div className='email'>
              <input type='email' placeholder='Email' name='email' onChange={this.onHandleChange} required></input>
            </div>
            <div className='review'>
              <textarea className='' id='review' name='txt' onChange={this.onHandleChange} min='5' placeholder='Tell us what you think'></textarea>
            </div>
            <div className='save'>
              <button className='button btn-main'>SAVE</button>
            </div>
          </form>
          <h4 className='review-h5'>Thanks for your feedback</h4>
        </div>


      </div>
    );
  }
}

const mapStateToProps = state => ({
  loggedInUser: state.user.loggedInUser,
  msg :state.socket.msg
});

const mapDispatchToProps = {
  addMsg
};
export default connect(mapStateToProps, mapDispatchToProps)(ReviewForm);

*/
