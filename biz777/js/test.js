const initialDocumentWidth = document.documentElement.clientWidth;
const header = document.querySelector("header.fixed");
let initialWsChatBtnRight = undefined;

function lockPage(initialDocumentWidth, header) {
  let wsChat = document.querySelector(".ws-chat .ws-chat-btn-el-container");
  let wsChatBtns = document.querySelectorAll(".multi_button");

  document.body.style.overflow = `hidden`;
  if (initialDocumentWidth < document.documentElement.clientWidth) {
    document.body.style.paddingRight = `${
      document.documentElement.clientWidth - initialDocumentWidth
    }px`;
    header.style.left = `${initialDocumentWidth / 2 - 650}px`;

    if (wsChat) {
      if (initialWsChatBtnRight === undefined) {
        initialWsChatBtnRight =
          document.documentElement.clientWidth -
          wsChatBtns[0].getBoundingClientRect().right;
      }

      wsChat.style.right = `${
        document.documentElement.clientWidth - initialDocumentWidth
      }px`;

      wsChatBtns.forEach(
        (item) =>
          (item.style.right = `${
            initialWsChatBtnRight +
            (document.documentElement.clientWidth - initialDocumentWidth)
          }px`)
      );
    }
  }
  console.log(document.documentElement.clientWidth);
}

function unLockPage(header) {
  let wsChat = document.querySelector(".ws-chat .ws-chat-btn-el-container");
  let wsChatBtns = document.querySelectorAll(".multi_button");

  console.log("wsChat: ", wsChat);

  wsChat.style.right = ``;
  wsChatBtns.forEach(
    (item) => (item.style.right = `${initialWsChatBtnRight}px`)
  );

  document.body.style.overflow = ``;
  document.body.style.paddingRight = ``;
  header.style.left = ``;
  console.log(document.documentElement.clientWidth);
}

console.log("Test script is connected!");
