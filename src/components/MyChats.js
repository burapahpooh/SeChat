import { AddIcon } from "@chakra-ui/icons";
import { Box, Stack, Text } from "@chakra-ui/layout";
import { useToast } from "@chakra-ui/toast";
import axios from "axios";
import { useEffect, useState } from "react";
import { getSender } from "../Config/ChatLogics";
import ChatLoading from "./ChatLoading";
import GroupChatModal from "./miscellaneous/GroupChatModal";
import { Button } from "@chakra-ui/react";
import { ChatState } from "../Context/ChatProvider";
import "./styles.css";
const ENDPOINT = "http://localhost:5000";
const ENDPOINT_KEY ="http://localhost:5174";
var temp = [];
var botCheck = false;

const MyChats = ({ fetchAgain }) => {
  const [loggedUser, setLoggedUser] = useState();

  const { selectedChat, setSelectedChat, setSharedKey, user, chats, setChats } = ChatState();

  const toast = useToast();

  const fetchChats = async () => {
    // console.log(user._id);
    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(ENDPOINT+"/api/chat", config);
      if(data.length===0){setChats([]);}
      else{
        temp = [];
        await data.forEach(async(e,i) => {
          botCheck=false;
          e.users.forEach(x => {
            if(x.isBot){botCheck=x.isBot}
          })
          if(!botCheck){
            if(e.hasOwnProperty("latestMessage")&&e.latestMessage!=null){
              const data_key = await axios.post(ENDPOINT_KEY+`/get_sharedKey`,
            {
              user_id: e.users[0]._id,
              shared_user_id: e.users[1]._id,
            },
            );
            await axios.post(ENDPOINT_KEY+`/encrypt_decrypt`,
            {
              message:e.latestMessage.content,
              mode:"decrypt",
              shared_key:data_key.data.shared_key
            },
            ).then((x)=>{
              data[i].latestMessage.content=x.data.output;
              if(temp.length<data.length){
                temp.push(data[i]);
                console.log("push");
              if(temp.length===data.length){setChats(temp);}
              }
              else if(temp.length===data.length){setChats(temp);}
            }
            );
            }
            else{
              if(temp.length<data.length){
                temp.push(data[i]);
                if(temp.length===data.length){setChats(temp);}
              }
              else if(temp.length===data.length){setChats(temp);}
            }
          }
          else{
            if(temp.length<data.length){
              temp.push(data[i]);
              console.log("push");
            if(temp.length===data.length){setChats(temp);}
            }
            else if(temp.length===data.length){setChats(temp);}
          }
          
          
        });
      }
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the chats",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    setLoggedUser(JSON.parse(localStorage.getItem("userInfo")));
    fetchChats();
    // eslint-disable-next-line
  }, [fetchAgain]);

  async function getChat(chat) {
    botCheck=false;
    chat.users.forEach(e => {
      if(e.isBot){botCheck=e.isBot}
  });
  if(!botCheck){
    const data_key = await axios.post(ENDPOINT_KEY+`/get_sharedKey`,
    {
      user_id: chat.users[0]._id,
      shared_user_id: chat.users[1]._id,
    },
    );
    setSharedKey(data_key.data.shared_key);
    toast({
      title: "Infomation",
      description: "This chat is protected by End-to-End Encryption",
      status: "info",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
  }
    setSelectedChat(chat)
  }

  return (
    <Box
      d={{ base: selectedChat ? "none" : "flex", md: "flex" }}
      flexDir="column"
      alignItems="center"
      p={3}
      bg="white"
      w={{ base: "100%", md: "31%" }}
      borderRadius="lg"
      borderWidth="1px"
    >
      <Box
        pb={3}
        px={3}
        fontSize={{ base: "28px", md: "30px" }}
        fontFamily="Work sans"
        d="flex"
        w="100%"
        id="top-top-chat"
      >
        My Chats
        <GroupChatModal>
          <Button
            d="flex"
            fontSize={{ base: "17px", md: "10px", lg: "17px" }}
            rightIcon={<AddIcon />}
          >
            New Group Chat
          </Button>
        </GroupChatModal>
      </Box>
      <Box
        id="top-bottom-chat"
        p={3}
        bg="#F8F8F8"
        w="100%"
        h="90%"
        borderRadius="lg"
        overflowY="hidden"
      >
        {chats ? (
          <Stack overflowY="scroll">
            {chats.map((chat) => (
              <Box
                onClick={() => getChat(chat)}
                cursor="pointer"
                bg={selectedChat === chat ? "#38B2AC" : "#E8E8E8"}
                color={selectedChat === chat ? "white" : "black"}
                px={3}
                py={2}
                borderRadius="lg"
                key={chat._id}
              >
                <Text>
                  {!chat.isGroupChat
                    ? getSender(loggedUser, chat.users)
                    : chat.chatName}
                </Text>
                {chat.latestMessage && (
                  <Text fontSize="xs">
                    <b>{chat.latestMessage.sender.name} : </b>
                    {chat.latestMessage.content.length > 50
                      ? chat.latestMessage.content.substring(0, 51) + "..."
                      : chat.latestMessage.content}
                  </Text>
                )}
              </Box>
            ))}
          </Stack>
        ) : (
          <ChatLoading />
        )}
      </Box>
    </Box>
  );
};

export default MyChats;