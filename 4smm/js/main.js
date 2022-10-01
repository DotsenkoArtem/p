// MOBILE-MENU-SETTINGS
const menuToggle  	= document.querySelector('.top-menu-toggler'),
	  topMenuClose		= document.querySelector('.top-menu-close'),
	  menu 			= document.querySelector('.top-menu_mobile'),
      menuOverl  	= document.querySelector('.top-menu-overl');

menuToggle.addEventListener('click', function(){
	menu.classList.toggle('open');
	document.body.classList.toggle('scroll-hidden');
	menuOverl.classList.toggle('open');
});

menuOverl.addEventListener('click', menuClose);
topMenuClose.addEventListener('click', menuClose);

function menuClose(){
	menu.classList.remove('open');
	document.body.classList.remove('scroll-hidden');
	menuOverl.classList.remove('open');
}
//------------------------------------------------------------------------------


// TUBS-SETTINGS
const tabsBoxes = document.querySelectorAll('.tabs-wrap');

for (let i = 0; i < tabsBoxes.length; i++) {
	// ПОЛУЧЕНИЕ МАССИВА ВСЕХ ВКЛАДОК
	const tabs = tabsBoxes[i].querySelectorAll('.tabs__item');
	// ПОЛУЧЕНИЕ БЛОКА С ЭЛЕМЕНТАМИ КОНТЕНТА ВКЛАДОК
	const tabsContent = tabsBoxes[i].querySelector('.tabs-content');
	// ПОЛУЧЕНИЕ ВСЕХ ЭЛЕМЕНТОВ КОНТЕНТА ВКЛАДОК
	const tabsContentItems = tabsContent.querySelectorAll('.tabs-content__item');

	for (let i = 0; i < tabs.length; i++) {
		let tab = tabs[i];

		tab.addEventListener('click', function () {
			// УБАРИЕМ КЛАСС "ACTIVE" СО ВСЕХ ВКЛАДОК
			for (let j = 0; j < tabs.length; j++) {
				tabs[j].classList.remove('active');
			}

			// АКТИВНАЯ ВКЛАДКА ПРИ КЛИКЕ
			let tabContentId = '#' + this.dataset.target;
			this.classList.add('active');

			// УБАРИЕМ КЛАСС "ACTIVE" СО ВСЕХ ЭЛЕМЕНТОВ КОНТЕНТА ВКЛАДОК
			for (let k = 0; k < tabsContentItems.length; k++) {
				tabsContentItems[k].classList.remove('active');
			}

			// АКТИВНЫЙ ЭЛЕМЕНТ КОНТЕНА ВКЛАДКИ ПРИ КЛИКЕ
			tabsContent.querySelector(tabContentId).classList.add('active');
		})
	}
}
//------------------------------------------------------------------------------


// COLLAPSE-SETTINGS
const 	collapses	= document.querySelectorAll('.collapse');
for(let i = 0; i < collapses.length; i++) {
	let collapse = collapses[i];
	let collapseBtn = collapse.querySelector('.collapse-btn');
	let collapseContent = collapse.querySelector('.collapse-content');

	collapseBtn.addEventListener('click', function() {
		if(collapseContent.style.maxHeight) {
			collapseContent.style.maxHeight = '';
			collapse.classList.remove('open');
		} else {
			collapseContent.style.maxHeight = collapseContent.scrollHeight + 'px';
			collapse.classList.add('open');
		}
	});
}
//------------------------------------------------------------------------------