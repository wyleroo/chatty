import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      currentUser: {name: "Bobby"},
      messages: []
    };
    this.addMessage = this.addMessage.bind(this);
  }

  componentDidMount() {
    this.appSocket = new WebSocket("ws://localhost:3001");
    console.log('new WebSocket created');

    this.appSocket.onopen = (event) => {
      // this.appSocket.send("I just connected to you!");
    };

    this.appSocket.onmessage = (event) => {
      console.log(event.data);
      let messages = this.state.messages.concat(event);
      this.setState({messages});
    };
  }

  addMessage(event) {
    if (event.key=='Enter') {
      let messageObj = {username: this.state.currentUser.name, content: event.target.value};
      this.appSocket.send(JSON.stringify(messageObj));
      event.target.value = "";
    } else {
      console.log('butts');
    }
  }

  render() {
    return (
      <div>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar addMessage={this.addMessage} currentUser={this.state.currentUser}></ChatBar>
      </div>
    );
  }

}
export default App;

