import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
    currentUser: {name: "Bobby"},
    messages: [
    {
      username: "Bobby",
      content: "Where me marbles?",
    },
    {
      username: "Anonymous",
      content: "I took them from you and discarded them without remorse."
    }
        ]
    };
    this.addMessage = this.addMessage.bind(this);
  }

    componentDidMount() {
    const appSocket = new WebSocket("ws://localhost:3001");
    console.log('new WebSocket created');

    appSocket.onopen = function (event) {
      appSocket.send("I just connected to you! lolol");
    };

    appSocket.onmessage= function(message){
      console.log(message.data);
    };

    setTimeout(() => {
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      this.setState({messages})
    }, 5000);
  }

  addMessage(event) {
    if (event.key=='Enter') {
      let messageObj = {username: this.state.currentUser.name, content: event.target.value};
      let messages = this.state.messages.concat(messageObj);
      this.setState({messages: messages});
      appSocket.send(JSON.stringify(messageObj));
      event.target.value = "";
    } else {
      console.log('butts');
    }
  }



  render() {
    // console.log('addMessage from app', this.addMessage);
    return (
      <div>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser}></ChatBar>
      </div>
    );
  }

}
export default App;

