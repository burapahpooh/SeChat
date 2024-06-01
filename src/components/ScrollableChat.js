import {
  Radio,
  RadioGroup
} from '@chakra-ui/react'
import { Avatar } from "@chakra-ui/avatar";
import { Tooltip } from "@chakra-ui/tooltip";
import ScrollableFeed from "react-scrollable-feed";
import {
  isLastMessage,
  isSameSender,
  isSameSenderMargin,
  isSameUser,
} from "../Config/ChatLogics";
import { ChatState } from "../Context/ChatProvider";

const ScrollableChat = ({ messages }) => {
  const { user } = ChatState();

  return (
    <ScrollableFeed>
      {messages &&
        messages.map((m, i) => (
          <div style={{ display: "flex" }} key={m._id}>
            {(isSameSender(messages, m, i, user._id) ||
              isLastMessage(messages, i, user._id)) && (
              <Tooltip label={m.sender.name} placement="bottom-start" hasArrow>
                <Avatar
                  mt="7px"
                  mr={1}
                  size="sm"
                  cursor="pointer"
                  name={m.sender.name}
                  src={m.sender.pic}
                />
              </Tooltip>
            )}
            <div
              style={{
                backgroundColor: `${
                  m.sender._id === user._id ? "#BEE3F8" : "#B9F5D0"
                }`,
                marginLeft: isSameSenderMargin(messages, m, i, user._id),
                marginTop: isSameUser(messages, m, i, user._id) ? 3 : 10,
                borderRadius: "20px",
                padding: "5px 15px",
                maxWidth: "75%",
              }}
            >
              {console.log(m.content)}
              {m.content==="testcase2024" ? 
                <div>
                <div style={{fontSize:'20px',fontWeight:'800'}}>การตรวจสอบความปลอดภัยทางไซเบอร์</div>
                <div>สวัสดีครับ คุณ {user.name} ขออนุญาตสอบถามข้อมูลครับ คุณได้ทำการล็อคอินเข้าสู่ระบบจากอุปกรณ์ Window จำนวน 10 ครั้งอย่างต่อเนื่อง ในเวลา 8.00 น. จริงหรือไม่</div>
                <RadioGroup style={{display:'flex',flexDirection:'column'}}>
                    <Radio value='Yes'>ใช่! ฉันเป็นคนดำเนินการเอง</Radio>
                    <Radio value='No'>ไม่ใช่! รบกวนช่วยฉันด้วย</Radio>
                </RadioGroup>
              </div>
                :
                m.content
                }
            </div>
          </div>
        ))}
    </ScrollableFeed>
  );
};

export default ScrollableChat;