import React from 'react';
import ReactDOM from 'react-dom';

class Message extends React.Component {

  render() {
    console.log('Message from ' + this.props.username);
    return (
      <div className="message">
        <span className="message-username">{this.props.username}</span>
        <span className="message-content">{this.props.content}</span>
      </div>
    );
  }
}

export default Message;