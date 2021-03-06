import React from 'react';

class ChatBar extends React.Component {
  render() {
    return (
      <div className="chatbar">
        <input onKeyPress={this.props.changeUser} className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input onKeyPress={this.props.addMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </div>
    );
  }
}

export default ChatBar;