// CONSTS && VARS
const requestAnimationFrame =
  window.requestAnimationFrame ||
  window.mozRequestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.msRequestAnimationFrame;
const cancelAnimationFrame =
  window.cancelAnimationFrame || window.mozCancelAnimationFrame;


// Переменные для lockPage()
let lockedDocumentWidth = window.innerWidth;
let unLockedDocumentWidth = document.documentElement.clientWidth;
let scrollBarWidth = lockedDocumentWidth - unLockedDocumentWidth
// Переменные для виджета wsChat
let wsChat = document.querySelector(
  ".ws-chat .ws-chat-btn-el-container"
);
let wsChatBtns = document.querySelectorAll(".multi_button");
let initialWsChatBtnRightOffset

const header = document.querySelector("header.fixed");


// FUNCTIONS
// ПП - полоса прокрутка
// Функция блокировки прокрутки страницы
function lockPage(unLockedDocumentWidth, header) {
  // Запрет прокрутки
  document.body.style.overflow = `hidden`;
  document.body.style.backgroundColor = `#f1f1f1`;

  // Если ширина окна (без учета ПП) до запрета прокрутки неравна ширине экрана (также без учета ПП) после запрета прокрутки, то есть ПП изначально существует и исчезает после запрета прокрутки.
  if (unLockedDocumentWidth !== lockedDocumentWidth) {
    document.body.style.paddingRight = `${scrollBarWidth}px`;
    header.style.left = `${unLockedDocumentWidth / 2 - 650}px`;




    if (wsChatBtns.length > 0) {
      wsChatBtns.forEach((item) => {
        item.style.right = `${initialWsChatBtnRightOffset + scrollBarWidth}px`;
        // console.log('initialWsChatBtnRightOffset: ', initialWsChatBtnRightOffset);
        // console.log('item.style.right: ', item.style.right);
      });
    }

    if (wsChat) {
      wsChat.style.right = `${scrollBarWidth}px`;
    }
    
    // End of - Действия с виджетом wsChat
  }
}

// Функция разблокировки прокрутки страницы
function unLockPage(header) {
  document.body.style.overflow = ``;
  document.body.style.backgroundColor = ``;

  if (unLockedDocumentWidth !== lockedDocumentWidth) {
    document.body.style.paddingRight = ``;
    header.style.left = ``;
  }

  if (wsChatBtns.length > 0) {
    wsChatBtns.forEach((item) => {
      item.style.right = `${initialWsChatBtnRightOffset}px`;
    });
  }

  if (wsChat) {
    wsChat.style.right = ``;
  }
  // End of - Действия с виджетом wsChat
  
}
/* End of - БЛОКИРОВКА-РАЗБЛОКИРОВКА ПОЛОСЫ ПРОКРУТКИ */








window.addEventListener("load", function() {
  // Действия с виджетом wsChat
  wsChatBtns = document.querySelectorAll(".multi_button");
  wsChat = document.querySelector(".ws-chat .ws-chat-btn-el-container")
  // Отступ справа - с прокруткой
  // Повторяется определение переменной $initialWsChatBtnRightOffset, так как wsChatBtns появятся после события load, 
  // А выше она определяется для того, чтобы перехватить при ресайзе окна
  // console.log('wsChatBtns.length: ', wsChatBtns.length);
  if(wsChatBtns.length > 0) {initialWsChatBtnRightOffset = unLockedDocumentWidth - wsChatBtns[0].getBoundingClientRect().right}

})


let scrollDirection = 0;
let startY = window.pageYOffset;
let currentY = 0;

function getScrollDirection() {
  currentY = window.pageYOffset;
  scrollDirection = startY - currentY;
  startY = currentY;
}

window.addEventListener('scroll', () => {
  getScrollDirection()
})
