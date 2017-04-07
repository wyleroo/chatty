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
    this.changeUser = this.changeUser.bind(this);
  }

  componentDidMount() {
    this.appSocket = new WebSocket("ws://localhost:3001");
    console.log('new WebSocket created');

    this.appSocket.onopen = (event) => {
      // this.appSocket.send("I just connected to you!");
    };

    this.appSocket.onmessage = (event) => {
      let parsed = JSON.parse(event.data);
      console.log('parsed: ', parsed);
      switch(parsed.type) {
        case: "message"
          let nextObj = {
            timestamp: parsed.timestamp,
            username: parsed.username,
            content: parsed.content
          };
          console.log('messages: ', messages);
          this.setState({messages});
          break;
        case: "notification"
          let nextObj = {
            oldName: parsed.oldName,
            name: parsed.name
          }
          break;
      }
      let messages = this.state.messages.concat(nextObj);
    };
  }

  changeUser(event) {
    if (event.key == 'Enter'){
      let eventObj = {type: "notification", oldName: this.state.currentUser, name: event.target.value}
      console.log("eventObj: ", eventObj);
      this.appSocket.send(JSON.stringify(eventObj));
      this.setState({currentUser: {name: event.target.value}});
    }
  }

  addMessage(event) {
    if (event.key=='Enter') {
      let messageObj = {
        type: "message"
        username: this.state.currentUser.name,
        content: event.target.value
      };
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
        <ChatBar changeUser={this.changeUser} addMessage={this.addMessage} currentUser={this.state.currentUser}></ChatBar>
      </div>
    );
  }
}
export default App;

