import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

class MessageList extends React.Component {

  render() {
    return (
      <main className="messages">
        {this.props.messages.map(function(message) {
          return <Message key={message.timestamp} username={message.username} content={message.content}></Message>
          }
        )};
        <div className="message system">
        </div>
      </main>
    );
  }
}

export default MessageList;