import "./App.css";
import { Route } from "react-router-dom";
import HomePage from "./Pages/Homepage";
import ChatPage from "./Pages/Chatpage";

function App() {
  return (
    <div className="App" id="home-authen">
      <Route path="/" component={HomePage} exact />
      <Route path="/chats" component={ChatPage} />
    </div>
  );
}

export default App;