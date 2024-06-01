import { Box } from "@chakra-ui/layout";
import { useState } from "react";
import { ChatState } from "../Context/ChatProvider";
import SideDrawer from "../components/miscellaneous/SideDrawer";
import MyChats from "../components/MyChats";
import ChatBox from "../components/ChatBox";
import "../components/miscellaneous/styles.css";

const Chatpage = () => {
  const [fetchAgain, setFetchAgain] = useState(false);
  const { user } = ChatState();

  return (
    <div style={{ width: "100%" }}>
      {user && <SideDrawer />}
      <Box w="100%" h="91.5vh" p="10px" 
      id="bottom-chat">
        {user && <MyChats fetchAgain={fetchAgain}/>}
        {user && (
          <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain}/>
        )}
        
      </Box>
    </div>
  );
};

export default Chatpage;