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
    this.printMessage = this.printMessage.bind(this);
  }

  printMessage(userMessage) {
    let messageObj = {username: this.state.currentUser.name, content: userMessage};
    let messages = this.state.messages.concat(messageObj);
    // console.log('this.state.messages', this.state.messages);
    this.setState({messages: messages});
  }

  componentDidMount() {
    // console.log("componentDidMount <App />");
    setTimeout(() => {
      // console.log("Simulating incoming message");
      const newMessage = {id: 3, username: "Michelle", content: "Hello there!"};
      const messages = this.state.messages.concat(newMessage)
      // console.log(messages);
      this.setState({messages})
    }, 500);
  }

  render() {
    // console.log('printMessage from app', this.printMessage);
    return (
      <div>
        <MessageList messages={this.state.messages}></MessageList>
        <ChatBar printMessage={this.printMessage} currentUser={this.state.currentUser}></ChatBar>
      </div>
    );
  }

}
export default App;

