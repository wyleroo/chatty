import React from 'react';
import ReactDOM from 'react-dom';
import Message from './Message.jsx';

class MessageList extends React.Component {

  render() {
    return (
      <main className="messages">
        {this.props.messages.map(function(message) {
          return (<Message type={message.type} key={message.timestamp} username={message.username} content={message.content} oldName={message.oldName}></Message>)
          }
        )}
      </main>
    );
  }
}

export default MessageList;