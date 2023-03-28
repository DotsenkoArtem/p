const initialDocumentWidth = document.documentElement.clientWidth;
let lockedDocumentWidth = undefined
const header = document.querySelector("header.fixed");
let initialWsChatBtnRight = undefined;

function lockPage(initialDocumentWidth, header) {


  document.body.style.overflow = `hidden`;
  


  lockedDocumentWidth = document.documentElement.clientWidth
  if (initialDocumentWidth !== lockedDocumentWidth) {

    console.log('initialDocumentWidth: ', initialDocumentWidth);
    console.log('lockedDocumentWidth: ', lockedDocumentWidth);
    console.log(initialDocumentWidth === lockedDocumentWidth);

    
    let wsChat = document.querySelector(".ws-chat .ws-chat-btn-el-container");
    let wsChatBtns = document.querySelectorAll(".multi_button");


    document.body.style.paddingRight = `${lockedDocumentWidth - initialDocumentWidth}px`;

    header.style.left = `${initialDocumentWidth / 2 - 650}px`;

    if (wsChat) {
      if (initialWsChatBtnRight === undefined) {
        initialWsChatBtnRight =
        lockedDocumentWidth -
          wsChatBtns[0].getBoundingClientRect().right;
      }

      wsChat.style.right = `${
        lockedDocumentWidth - initialDocumentWidth
      }px`;
      // wsChat.forEach(item => item.style.right = `${document.documentElement.clientWidth - initialDocumentWidth}px`)

      wsChatBtns.forEach(
        (item) =>
          (item.style.right = `${
            initialWsChatBtnRight +
            (lockedDocumentWidth - initialDocumentWidth)
          }px`)
      );
    }
  }
}

function unLockPage(header) {
    document.body.style.overflow = ``;
    

  if (initialDocumentWidth !== lockedDocumentWidth) {

    console.log('unLockPage: ', initialDocumentWidth === lockedDocumentWidth);


    let wsChat = document.querySelector(".ws-chat .ws-chat-btn-el-container");
    let wsChatBtns = document.querySelectorAll(".multi_button");


    wsChat.style.right = ``
    wsChatBtns.forEach(
      (item) => (item.style.right = `${initialWsChatBtnRight}px`)
    );

    document.body.style.paddingRight = ``;
    header.style.left = ``;
  }
}

