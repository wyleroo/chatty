import React, {Component} from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      clients: 0,
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
      let nextObj = {};
      let messages = [];
      switch(parsed.type) {
        case "message":
          nextObj = {
            type: "message",
            timestamp: parsed.timestamp,
            username: parsed.username,
            content: parsed.content
          };
          messages = this.state.messages.concat(nextObj);
          this.setState({messages});
          break;
        case "notification":
          nextObj = {
            type: "notification",
            timestamp: parsed.timestamp,
            content: parsed.oldName.name + " changed their name to " + parsed.name
          }
          messages = this.state.messages.concat(nextObj);
          this.setState({messages});
          break;
        case "clientCount":
          this.setState({clients: (parsed.value)})
          break;
        default:
          throw new Error("Holy shite! Unknown event type " + parsed.type);
      }
      console.log('messages: ', messages);
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
        type: "message",
        username: this.state.currentUser.name,
        content: event.target.value
      };
      this.appSocket.send(JSON.stringify(messageObj));
      event.target.value = "";
    }
  }

  render() {
    return (
      <div>
        <nav className="navbar">
          <a className="navbar-brand">PeopleTalker</a>
          <span id="clientCount">Currently {this.state.clients} of us</span>
        </nav>
        <MessageList messages={this.state.messages}></MessageList>
        <footer className="chatbar">
          <ChatBar changeUser={this.changeUser} addMessage={this.addMessage} currentUser={this.state.currentUser}></ChatBar>
        </footer>
      </div>
    );
  }
}
export default App;

