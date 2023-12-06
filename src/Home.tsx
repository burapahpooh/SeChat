import hash from "hash.js";
import "./fonts.css";
import "./index.css";
import { users, user } from "./data/data.tsx";
import React, { useState } from "react";
import { appPortal } from "./main.tsx";
import Modal from "react-bootstrap/Modal";
import {
  BiCog,
  BiHome,
  BiMessage,
  BiSearch,
  BiMessageAdd,
  BiSolidUserCircle,
  BiSolidUserPin,
  BiSolidUserAccount,
  BiX,
} from "react-icons/bi";

export var loginUser = null as user | null;

//Define Function
//---Hash Function---///
function hashFunction(message: string) {
  const encryptedMessage: string = hash.sha256().update(message).digest("hex");
  return encryptedMessage;
}

export function resetLoginUser() {
  loginUser = null;
}

export default function Home() {
  // const encryptedMessage: string = hash
  //   .sha256()
  //   .update("B_password")
  //   .digest("hex");
  // return encryptedMessage;

  //Define Parameter
  var username: string = "";
  var password: string = "";
  var [loginStatus, setLoginStatus] = useState("");
  var [modalStatus, setModalStatus] = useState(false);
  var [loginModal, setLoginModalStatus] = useState(false);

  //---Login Function---///
  function loginFunction(username: string, password: string) {
    password = hashFunction(password);
    if (
      users.find((e) => {
        if (e.user_username === username && e.user_password === password) {
          loginUser = e;
        }
        return e.user_username === username && e.user_password === password;
      }) == null
    ) {
      (document.getElementById("username") as HTMLInputElement)!.value = "";
      (document.getElementById("password") as HTMLInputElement)!.value = "";
      document.getElementsByClassName("login-status")[0].className =
        "login-status failed";
      return "Login Failed";
    } else {
      document.getElementsByClassName("login-status")[0].className =
        "login-status success";

      setLoginModalStatus(false);
      setModalStatus(true);
      setTimeout(() => {
        appPortal();
        setModalStatus(false);
      }, 1000);
      return "Login Success";
    }
  }
  //mock up post
  var postArray = [];
  for (let i = 0; i < 10; i++) {
    postArray.push(
      <div className="post">
        <div className="post-owner">
          <div className="post-owner-profile">
            <BiSolidUserCircle
              style={{ width: "auto", height: "100%" } as React.CSSProperties}
            />
          </div>
          <div className="post-owner-name">Burapa Kulnin</div>
        </div>
        <div className="post-content">
          He scolded himself for being so tentative. He knew he shouldn't be so
          cautious, but there was a sixth sense telling him that things weren't
          exactly as they appeared. It was that weird chill that rolls up your
          neck and makes the hair stand on end. He knew that being so tentative
          could end up costing him the job, but he learned that listening to his
          sixth sense usually kept him from getting into a lot of trouble.
        </div>
      </div>
    );
  }
  return (
    <>
      <div className="bg-login">
        <div
          style={
            {
              width: "100%",
              height: "100%",
              flexDirection: "row",
              display: "flex",
            } as React.CSSProperties
          }
        >
          <div
            style={
              {
                width: "15%",
                height: "100vh",
                backgroundColor: "#111",
                position: "fixed",
                left: "15%",
              } as React.CSSProperties
            }
          >
            <div style={{ width: "100%" } as React.CSSProperties}>
              <div
                style={
                  {
                    width: "40%",
                    padding: "5%",
                    display: "flex",
                    flexDirection: "row",
                    color: "#fff",
                    cursor: "pointer",
                  } as React.CSSProperties
                }
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  style={{
                    fillRule: "evenodd",
                    width: "100%",
                  }}
                  viewBox="0 0 500 500"
                >
                  <g>
                    <path
                      fill="#fefffe"
                      d="M 83.5,4.5 C 90.5476,4.52485 96.5476,7.02485 101.5,12C 108.984,16.0377 116.984,18.2044 125.5,18.5C 132.489,17.6005 139.489,17.4338 146.5,18C 153.952,21.3956 157.452,27.229 157,35.5C 157.667,55.5 157.667,75.5 157,95.5C 156.253,116.821 148.087,134.654 132.5,149C 120.217,157.615 108.217,166.615 96.5,176C 90.5283,179.265 84.5283,179.265 78.5,176C 66.7758,167.277 54.7758,158.944 42.5,151C 27.1756,138 18.3422,121.5 16,101.5C 15.3333,77.1667 15.3333,52.8333 16,28.5C 17.4056,23.4268 20.5723,19.9268 25.5,18C 39.9033,19.9019 53.9033,18.2352 67.5,13C 72.8099,9.84855 78.1433,7.01521 83.5,4.5 Z M 84.5,44.5 C 95.8399,48.7785 107.507,51.9452 119.5,54C 120,54.5 120.5,55 121,55.5C 121.667,68.8333 121.667,82.1667 121,95.5C 117.603,115.565 106.27,128.898 87,135.5C 67.5875,129.422 55.9209,116.422 52,96.5C 51.3333,82.8333 51.3333,69.1667 52,55.5C 52.8333,54.6667 53.6667,53.8333 54.5,53C 65.0466,51.6453 75.0466,48.812 84.5,44.5 Z"
                    />
                  </g>
                  <g>
                    <path
                      fill="#fefffe"
                      d="M 205.5,73.5 C 238.185,73.1207 270.852,73.6207 303.5,75C 327.344,80.5105 341.178,95.3439 345,119.5C 345.667,191.167 345.667,262.833 345,334.5C 341.551,344.932 334.384,349.099 323.5,347C 321.275,346.439 319.275,345.439 317.5,344C 300.167,328.333 282.833,312.667 265.5,297C 214.135,296.973 162.802,296.306 111.5,295C 88.596,289.693 74.7626,275.526 70,252.5C 69.3333,242.833 69.3333,233.167 70,223.5C 72.1566,214.997 77.6566,210.664 86.5,210.5C 94.008,210.838 99.1747,214.505 102,221.5C 102.354,230.192 103.021,238.859 104,247.5C 104.996,253.159 108.162,256.993 113.5,259C 168.13,260.312 222.796,260.979 277.5,261C 279.725,261.561 281.725,262.561 283.5,264C 292,272.5 300.5,281 309,289.5C 309.98,232.13 309.646,174.797 308,117.5C 305.055,111.571 300.221,108.404 293.5,108C 262.5,107.667 231.5,107.333 200.5,107C 189.691,101.241 186.858,92.7412 192,81.5C 195.363,76.6806 199.863,74.0139 205.5,73.5 Z"
                    />
                  </g>
                </svg>
              </div>
            </div>
            <div
              style={
                {
                  color: "#fff",
                  backgroundColor: "transparent",
                  textAlign: "left",
                  margin: "5% 2%",
                  borderRadius: "100vh",
                  fontSize: " 3vh",
                  padding: "0% 10% 0% 10%",
                  cursor: "pointer",
                } as React.CSSProperties
              }
            >
              <BiHome style={{ marginRight: "10%" } as React.CSSProperties} />
              Home
            </div>
            <div
              style={
                {
                  color: "#fff",
                  backgroundColor: "transparent",
                  textAlign: "left",
                  margin: "5% 2%",
                  borderRadius: "100vh",
                  fontSize: " 3vh",
                  padding: "0% 10% 0% 10%",
                  cursor: "pointer",
                } as React.CSSProperties
              }
            >
              <BiMessage
                style={{ marginRight: "10%" } as React.CSSProperties}
              />
              Message
            </div>
            <div
              style={
                {
                  color: "#fff",
                  backgroundColor: "transparent",
                  textAlign: "left",
                  margin: "2%",
                  borderRadius: "100vh",
                  fontSize: " 3vh",
                  padding: "0% 10% 0% 10%",
                  cursor: "pointer",
                } as React.CSSProperties
              }
            >
              <BiCog style={{ marginRight: "10%" } as React.CSSProperties} />
              Setting
            </div>
          </div>
          <div
            style={
              {
                width: "40%",
                height: "auto",
                backgroundColor: "#131313",
                borderLeft: " 1px solid white",
                borderRight: " 1px solid white",
                display: "flex",
                flexDirection: "column",
                position: "fixed",
                left: "30%",
              } as React.CSSProperties
            }
          >
            <div
              style={
                {
                  color: "#fff",
                  backgroundColor: "#111",
                  width: "100%",
                  height: "5%",
                  padding: "1% 2%",
                  display: "flex",
                  flexDirection: "row",
                } as React.CSSProperties
              }
            >
              <div
                style={
                  {
                    backgroundColor: "#222",
                    width: "93%",
                    height: "100%",
                    borderRadius: "100vh",
                    padding: "1% 2%",
                  } as React.CSSProperties
                }
              >
                <input
                  className="search-box"
                  style={
                    {
                      backgroundColor: "transparent",
                      border: "0px",
                      width: "100%",
                      height: "100%",
                      fontSize: "2.5vh",
                    } as React.CSSProperties
                  }
                  placeholder="Search in Community"
                ></input>
              </div>
              <div
                style={
                  { width: "7%", padding: "0.5% 0%" } as React.CSSProperties
                }
              >
                <BiSearch
                  style={
                    {
                      marginLeft: "10%",
                      height: "100%",
                      width: "auto",
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
            {/*Continue Post */}
            <div
              style={
                {
                  width: "100%",
                  height: "100vh",
                  overflowY: "auto",
                  position: "relative",
                } as React.CSSProperties
              }
            >
              {postArray}
              <div
                style={
                  {
                    color: "#fff",
                    position: "sticky",
                    bottom: "7%",
                    left: "90%",
                    backgroundColor: "#222",
                    borderRadius: "100vh",
                    width: "10%",
                    height: "auto",
                    padding: "1.5%",
                  } as React.CSSProperties
                }
              >
                <BiMessageAdd
                  style={
                    {
                      width: "100%",
                      height: "100%",
                      WebkitTransform: "scaleX(-1)",
                    } as React.CSSProperties
                  }
                />
              </div>
            </div>
          </div>
          <div
            style={
              {
                width: "15%",
                height: "100%",
                backgroundColor: "#111",
                position: "fixed",
                right: "15%",
                padding: "1%",
              } as React.CSSProperties
            }
          >
            <div
              style={
                {
                  width: "100%",
                  height: "15%",
                  backgroundColor: "#111",
                  borderRadius: "1vh",
                  border: "1px solid #333",
                  marginBottom: "1vh",
                  display: "flex",
                  flexDirection: "column",
                  color: "#fff",
                } as React.CSSProperties
              }
            >
              <div
                style={
                  {
                    fontSize: "3vh",
                    textAlign: "center",
                  } as React.CSSProperties
                }
              >
                Access All Features
              </div>
              <div
                style={
                  {
                    border: "1px solid #333",
                    margin: "1% 5%",
                    height: "25%",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "2.5vh",
                    borderRadius: "15vh",
                    cursor: "pointer",
                  } as React.CSSProperties
                }
              >
                <BiSolidUserPin
                  style={
                    {
                      height: "100%",
                      width: "auto",
                      marginRight: "5%",
                    } as React.CSSProperties
                  }
                />
                Sign Up
              </div>
              <div
                style={
                  {
                    border: "1px solid #333",
                    margin: "1% 5%",
                    height: "25%",
                    display: "flex",
                    justifyContent: "center",
                    fontSize: "2.5vh",
                    borderRadius: "15vh",
                    cursor: "pointer",
                  } as React.CSSProperties
                }
                onClick={() => {
                  setLoginModalStatus(true);
                }}
              >
                <BiSolidUserAccount
                  style={
                    {
                      height: "100%",
                      width: "auto",
                      marginRight: "5%",
                    } as React.CSSProperties
                  }
                />
                Sign In
              </div>
            </div>
            <div
              style={
                {
                  width: "100%",
                  height: "20%",
                  backgroundColor: "#222",
                  borderRadius: "1vh",
                } as React.CSSProperties
              }
            ></div>
          </div>
        </div>
        <Modal
          show={modalStatus}
          className="chat-process-modal"
          centered
          size="sm"
        >
          <Modal.Body>Processing...</Modal.Body>
        </Modal>
        <Modal show={loginModal} centered size="xl">
          <Modal.Body>
            <div className="login-pop">
              <BiX
                style={
                  {
                    position: "absolute",
                    top: "5%",
                    right: "2%",
                    width: "3%",
                    height: "auto",
                    cursor: "pointer",
                  } as React.CSSProperties
                }
                onClick={() => {
                  setLoginModalStatus(false);
                }}
              />
              <div
                style={
                  {
                    position: "relative",
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  } as React.CSSProperties
                }
              >
                <input
                  name="username"
                  type="text"
                  className="input-bar"
                  placeholder="Username"
                  id="username"
                  onChange={(e) => {
                    username = e.target.value;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setLoginStatus(loginFunction(username, password));
                    }
                  }}
                  required
                />
                <label htmlFor="username" className="input-label">
                  Username
                </label>
              </div>
              <div
                style={
                  {
                    position: "relative",
                    width: "50%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  } as React.CSSProperties
                }
              >
                <input
                  name="password"
                  type="password"
                  className="input-bar"
                  placeholder="Password"
                  id="password"
                  onChange={(e) => {
                    password = e.target.value;
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      setLoginStatus(loginFunction(username, password));
                    }
                  }}
                  required
                />
                <label htmlFor="password" className="input-label">
                  Password
                </label>
              </div>
              <div className="login-status">{loginStatus}</div>
              <button
                className="button-cs"
                onClick={() => {
                  setLoginStatus(loginFunction(username, password));
                }}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    setLoginStatus(loginFunction(username, password));
                  }
                }}
              >
                LOGIN
              </button>
            </div>
          </Modal.Body>
        </Modal>
      </div>
    </>
  );
}
