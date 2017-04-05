import React from 'react';

class ChatBar extends React.Component {
  constructor(props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
  }

  handleKeyPress(event) {
    if(event.key == 'Enter'){
      // console.log('event.target.value', event.target.value)
      this.props.printMessage(event.target.value);
      event.target.value = "";
    }
  }

  render() {
    return (
      <div className="chatbar">
        <input className="chatbar-username" placeholder={this.props.currentUser.name} />
        <input onKeyPress={this.handleKeyPress} className="chatbar-message" placeholder="Type a message and hit ENTER" />
      </div>
    );
  }
}

export default ChatBar;