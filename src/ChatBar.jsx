import React from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input onKeyPress={this.props.addMessage} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </div>
    );
  }
}

export default ChatBar;