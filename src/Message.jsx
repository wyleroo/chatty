import React from 'react';
import ReactDOM from 'react-dom';

class Message extends React.Component {

  render() {
    if (this.props.type == 'message') {
      return (
        <div className="message">
          <span className="message-username">{this.props.username}</span>
          <span className="message-content">{this.props.content}</span>
        </div>
      );
    } else if (this.props.type == 'notification'){
      return (
        <div className="message system">
          {this.props.content}
        </div>
      );
    }

  }
}

export default Message;