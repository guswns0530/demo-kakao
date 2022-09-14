window.addEventListener("load", windowLoad);

function windowLoad() {
  const token = isLogin();
  const option = {
  };

  if (!token) {
    location.href =
      "http://localhost:8080/oauth2/authorization/kakao?redirect_uri=http://localhost:5500";
  }

  const domEvent = new DomEvent(token, option);
  const socket = new Socket(token, option);
}

function isLogin() {
  const url_string = window.location.href;
  token = new URL(url_string).searchParams.get("token");

  return token;
}

class Socket {
  constructor(token, option) {
    this.token = "Bearer " + token;
    this.option = option;

    this.init();
  }

  async init() {
    await this.connect();

    this.chatRoom = new ChatRoom(this.socket, this.stompClient, this.option);
  }

  async connect() {
    const socket = new SockJS("http://localhost:8080/ws");
    const stompClient = Stomp.over(socket);
    stompClient.debug = null

    const frame = await new Promise((res, rej) => {
      stompClient.connect(
        {
          Authorization: this.token,
        },
        (frame) => {
          res(frame);
        }
      );
    });

    this.option.userId = frame.headers["user-name"];

    this.socket = socket;
    this.stompClient = stompClient;

    return true;
  }
}

class ChatRoom {
  constructor(socket, stompClient, option) {
    this.socket = socket;
    this.stompClient = stompClient;
    this.option = option;
    this.init();
  }

  init() {
    this.chatBox = document.querySelector("ul > li");

    this.roomSubscribe(this.option.userId, this.option.roomId);
    this.addEvent();
  }

  receive = (chat) => {
    const content = JSON.parse(chat.body);
    const div = document.createElement("div");

    switch (content.type) {
      case "JOIN":
        div.innerText = content.message;
        break;
      case "LEAVE":
        div.innerText = content.message;
        break;
      case "MESSAGE":
        div.innerText = `${content.writer}: ${content.message}`;
        break;
    }

    const subscription = chat.headers.subscription

    if(subscription === this.option.subId) {
        this.chatBox.appendChild(div);
    }
  };

  addEvent() {
    const room = document.querySelector("#roomForm");
    const chat = document.querySelector("#chatForm");

    room.addEventListener("submit", this.join);
    chat.addEventListener("submit", this.send);
  }

  join = (e) => {
    e.preventDefault();
    const value = e.target.text.value;

    let { userId, roomId } = this.option;

    this.roomUnsubscribe(userId, roomId);
    this.roomSubscribe(userId, value);

    this.option.roomId = value;
  };

  roomUnsubscribe(userId, roomId) {
    console.log(roomId);
    this.stompClient.send(
      "/app/chat/leave",
      {},
      JSON.stringify({
        roomId,
        writer: userId,
      })
    );

    this.stompClient.unsubscribe(this.option.subId);
    this.chatBox.innerHTML = "";
  }

  roomSubscribe(userId, roomId) {
    const { id } = this.stompClient.subscribe(
      "/queue/chat/room/" + roomId,
      this.receive
    );
    this.stompClient.send(
      "/app/chat/join",
      {},
      JSON.stringify({
        roomId,
        writer: userId,
      })
    );

    this.option.subId = id;
  }

  send = (e) => {
    e.preventDefault();
    const value = e.target.text.value;
    e.target.text.value = ''
    e.target.text.focus()

    this.stompClient.send(
      "/app/chat/message",
      {},
      JSON.stringify({
        roomId: this.option.roomId,
        message: value,
        writer: this.option.userId,
      })
    );
  };
}

class DomEvent {
  constructor(token, option) {
    this.token = "Bearer " + token;
    this.option = option;

    this.init();
  }

  async init() {
    (await this.selectRoom()).forEach((e, i) => {
        if(i === 1) {
            this.option.roomId = e.roomId
        }
      document.querySelector("#roomForm > select").innerHTML += `<option ${
        e.roomId == this.option.roomId && "selected"
      } value="${e.roomId}">${e.name}</option>`;
    });
  }

  async selectRoom() {
    const res = await fetch("http://localhost:8080/chat/rooms", {
      headers: {
        Authorization: this.token,
        "Content-Type": "application/json",
        mods: "cors",
      },
    });

    return await res.json();
  }
}
