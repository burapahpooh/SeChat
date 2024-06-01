import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip } from "@chakra-ui/tooltip";
import { BellIcon, ChevronDownIcon, InfoIcon, QuestionOutlineIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useHistory } from "react-router-dom";
import { useState,useEffect } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";
import ChatLoading from "../ChatLoading";
import NewsLoading from "../NewsLoading";
import { Spinner } from "@chakra-ui/spinner";
import ProfileModal from "./ProfileModal";
import NotificationBadge from "react-notification-badge";
import { Effect } from "react-notification-badge";
import { getSender } from "../../Config/ChatLogics";
import UserListItem from "../userAvatar/UserListItem";
import { ChatState } from "../../Context/ChatProvider";
import "./styles.css";
import TimerApp from "./TimerApp.js";
import { Wrap, WrapItem } from '@chakra-ui/react'
import { Center } from "@chakra-ui/react";
import { Grid, GridItem } from '@chakra-ui/react'
import React from "react";
import { BsTranslate } from "react-icons/bs";
const ENDPOINT = "http://localhost:5000";

const SideDrawer = () => {
    const [search, setsearch] = useState("");
    const [searchresult, setSearchResult] = useState([]);

    const [newsCategory, setNewsCategory] = useState("");
    const [newsCategoryHeader, setNewsCategoryHeader] = useState("");
    const [newsResult, setNewsResult] = useState([]);
    const [newsItem, setNewsItem] = useState(null);

    const [loading, setLoading] = useState(false);
    const [loadingChat, setloadingChat] = useState("");

    const [translateFlag, setTranslateFlag] = useState(true);

    const [caseResponse, setCaseResponse] = React.useState('Yes')

const {
    setSelectedChat,
    user,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const toast = useToast();
  const { 
    isOpen: isOpenSearch, 
    onOpen: onOpenSearch, 
    onClose: onCloseSearch 
} = useDisclosure()

  const { 
    isOpen: isOpenNews, 
    onOpen: onOpenNews, 
    onClose: onCloseNews 
} = useDisclosure()

  const { 
    isOpen: isOpenNewsItems, 
    onOpen: onOpenNewsItems, 
    onClose: onCloseNewsItems 
  } = useDisclosure()

  const history = useHistory();

  const logoutHandler = () => {
    localStorage.removeItem("userInfo");
    history.push("/");
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Please Enter something in search",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(ENDPOINT+`/api/user?search=${search}`, config);

      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleNews = async () => {
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      const { data } = await axios.get(ENDPOINT+`/api/news?search=${newsCategory}`, config);
      console.log(newsCategory);
      console.log(data);

      setLoading(false);
      setNewsResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the News",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  useEffect(() => {
    handleNews();
 }, [newsCategory]);

 useEffect(() => {
  setNewsItem(null);
}, [isOpenNewsItems]);

  const accessChat = async (userId) => {
    console.log(userId);

    try {
      setloadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const { data } = await axios.post(ENDPOINT+`/api/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setloadingChat(false);
      onCloseSearch();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

    return (
        <>
          <Box
            d="flex"
            justifyContent="space-between"
            alignItems="center"
            bg="white"
            w="100%"
            p="5px 10px 5px 10px"
            borderWidth="5px"
            id="top-chat"
          >
            <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
              <Button variant="ghost" onClick={onOpenSearch}>
                <i className="fas fa-search"></i>
                <Text d={{ base: "none", md: "flex" }} px={4}>
                  Search User
                </Text>
              </Button>
            </Tooltip>
            <Text fontSize="2xl" fontFamily="Work sans">
              SeChat
            </Text>
            <div>
              {/* NEWS */}
              <Menu>
                <MenuButton p={1} onClick={onOpenNews}>
                  <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                  />
                  <InfoIcon fontSize="xl" m={1} />
                </MenuButton>
              </Menu>
              

              {/* NEWS DRAWER */}
              <Drawer placement="left" onClose={onCloseNewsItems} isOpen={isOpenNewsItems} size='full'>
                <DrawerContent>
                  <DrawerHeader borderBottomWidth="1px" style={{justifyContent:'space-between',display:'flex'}}>
                    <div style={{fontSize:'30px',fontWeight:'900'}}>{newsCategoryHeader}</div>
                    <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between',width:'22%'}}>
                      <Button onClick={function (){setTranslateFlag(!translateFlag)}} leftIcon={<BsTranslate />} colorScheme='blue' variant='outline'>Translate</Button>
                      <Button onClick={onCloseNewsItems} colorScheme='pink' variant='solid'>Return to News Portal</Button>
                    </div>
                  </DrawerHeader>
                  <DrawerBody>
                    {loading ? (
                      <NewsLoading />
                    ) : (
                      <div style={{height:'100%',width:'100%',display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                        <div style={{height:'100%',overflowY:'scroll',width:'32.5%',scrollbarWidth:'thin'}}>
                            {
                              newsResult?.map((news) => (
                                <Box
                                cursor="pointer"
                                bg="#EDF2F7"
                                _hover={{
                                  background: "#38B2AC",
                                  color: "white",
                                }}
                                w="100%"
                                d="flex"
                                alignItems="center" 
                                style={{marginBottom:'2%',padding:'2%',borderRadius:'5px'}} onClick={function () {setNewsItem(news);}}>
                                  <div style={{fontSize:'20px',fontWeight:'900'}}>{translateFlag?news.Topic:news.Thai_Topic}</div>
                                  <div style={{fontSize:'15px',fontWeight:'bold'}}>Category: {news.Category.replace('$','')}</div>
                                  <div style={{fontSize:'15px',fontWeight:'bold'}}>{news.Date}</div>
                                  <img style={{marginTop:'1%',marginBottom:'1%'}} src={news.Image}></img>
                                  <div style={{overflowY:'hidden',textOverflow:'ellipsis',display:'-webkit-box',WebkitBoxOrient:'vertical',WebkitLineClamp:'3'}}>{translateFlag?news.Detail:news.Thai_Detail}</div>
                                </Box>
                              ))
                            }
                        </div>
                        {/* NEWS PART */}
                        <div style={{height:'100%',overflowY:'scroll',width:'65%',scrollbarWidth:'thin'}}>
                          {newsItem== null ? (
                            <div style={{fontSize:'30px',fontWeight:'500',textAlign:'center',width:'100%',height:'100%',justifyContent:'center',display:'flex',flexDirection:'column',color:'grey'}}><div>Select News on the left to read!</div></div>
                          ) : (
                                <div style={{marginBottom:'2%',backgroundColor:'#EDF2F7',padding:'2%',borderRadius:'5px'}}>
                                  <div style={{fontSize:'20px',fontWeight:'900'}}>{translateFlag?newsItem?.Topic:newsItem?.Thai_Topic}</div>
                                  <div style={{fontSize:'15px',fontWeight:'bold'}}>Category: {newsItem?.Category.replace('$','')}</div>
                                  <div style={{fontSize:'15px',fontWeight:'bold'}}>{newsItem?.Date}</div>
                                  <img style={{marginTop:'1%',marginBottom:'1%',width:"100%"}} src={newsItem?.Image}></img>
                                  <div>{translateFlag?newsItem?.Detail:newsItem?.Thai_Detail}</div>
                                  <a href={newsItem?.Full_Link} style={{color:'blue'}}><br></br>Source: {newsItem?.Full_Link}</a>
                                </div>
                          )}
                        </div>
                      </div>
                    )}
                  </DrawerBody>
                </DrawerContent>
              </Drawer>
            
              {/* NEWS MODAL */}
              <Modal closeOnOverlayClick={false} isOpen={isOpenNews} onClose={onCloseNews} size="full">
                <ModalContent pl={5} pr={5} pt={5}>
                  <div style={{fontSize:'30px',fontWeight:'900'}}>CYBER SECURITY NEWS</div>
                  <ModalBody style={{display:'flex',flexDirection:'row',justifyContent:'space-between',paddingLeft:'0',paddingRight:'0'}}>
                      {/* Flex 1 */}
                      <div style={{borderRadius:'5px',width:'32.5%',justifyContent:'space-between',display:'flex',flexDirection:'column'}}>
                        <TimerApp/>
                        <div id="allnews" style={{width:'100%',height:'67.5%',overflow:'hidden',borderRadius:'5px'}}
                        onClick={function () {onOpenNewsItems();setNewsCategory('');setNewsCategoryHeader('All News');}}>
                        </div>
                      </div>
                      {/* Flex 2 */}
                      <div style={{borderRadius:'5px',width:'32.5%',justifyContent:'space-between',display:'flex',flexDirection:'column'}}
                      onClick={function () {onOpenNewsItems();setNewsCategory('zero');setNewsCategoryHeader('Zero Day Attack');}}>
                        <div id="zero-day" style={{width:'100%',height:'49%',overflow:'hidden',borderRadius:'5px'}}>
                        </div>
                        <div id='exploit' style={{width:'100%',height:'49%',overflow:'hidden',borderRadius:'5px'}}
                        onClick={function () {onOpenNewsItems();setNewsCategory('hack');setNewsCategoryHeader('Exploitation and Hacking Likelihood');}}>
                        </div>
                      </div>
                      {/* Flex 3 */}
                      <div style={{borderRadius:'5px',width:'32.5%',justifyContent:'space-between',display:'flex',flexDirection:'column'}}>
                        <div id="data-security" style={{width:'100%',height:'49%',overflow:'hidden',borderRadius:'5px'}}
                        onClick={function () {onOpenNewsItems();setNewsCategory('data');setNewsCategoryHeader('Data Security');}}>
                        </div>
                        <div id="vulnerbility" style={{width:'100%',height:'49%',overflow:'hidden',borderRadius:'5px'}}
                        onClick={function () {onOpenNewsItems();setNewsCategory('vulner');setNewsCategoryHeader('Vulnerbility Likelihood');}}>
                        </div>
                      </div>
                  </ModalBody>
                  <ModalFooter>
                    <Button onClick={onCloseNews}>Return to Chat</Button>
                  </ModalFooter>
                </ModalContent>
              </Modal>
              {/* NOTIFICATION */}
              <Menu>
                <MenuButton p={1}>
                  <NotificationBadge
                    count={notification.length}
                    effect={Effect.SCALE}
                  />
                  <BellIcon fontSize="2xl" m={1} />
                </MenuButton>
                <MenuList pl={2}>
                  {!notification.length && "No New Messages"}
                  {notification.map((notif) => (
                    <MenuItem
                      key={notif._id}
                      onClick={() => {
                        setSelectedChat(notif.chat);
                        setNotification(notification.filter((n) => n !== notif));
                      }}
                    >
                      {notif.chat.isGroupChat
                        ? `New Message in ${notif.chat.chatName}`
                        : `New Message from ${getSender(user, notif.chat.users)}`}
                    </MenuItem>
                  ))}
                </MenuList>
              </Menu>
              <Menu>
                <MenuButton as={Button} bg="white" rightIcon={<ChevronDownIcon />}>
                  <Avatar
                    size="sm"
                    cursor="pointer"
                    name={user.name}
                    src={user.pic}
                  />
                </MenuButton>
                <MenuList>
                  <ProfileModal user={user}>
                    <MenuItem>My Profile</MenuItem>{" "}
                  </ProfileModal>
                  <MenuDivider />
                  <MenuItem onClick={logoutHandler}>Logout</MenuItem>
                </MenuList>
              </Menu>
            </div>
          </Box>
    
          <Drawer placement="left" onClose={onCloseSearch} isOpen={isOpenSearch}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerHeader borderBottomWidth="1px">Search Users</DrawerHeader>
              <DrawerBody>
                <Box d="flex" pb={2}>
                  <Input
                    placeholder="Search by name or email"
                    mr={2}
                    value={search}
                    onChange={(e) => setsearch(e.target.value)}
                  />
                  <Button onClick={handleSearch}>Go</Button>
                </Box>
                {loading ? (
                  <ChatLoading />
                ) : (
                  searchresult?.map((user) => (
                    <UserListItem
                      key={user._id}
                      user={user}
                      handleFunction={() => accessChat(user._id)}
                    />
                  ))
                )}
                {loadingChat && <Spinner ml="auto" d="flex" />}
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      );

};

export default SideDrawer;