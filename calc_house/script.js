const square = document.getElementById('square');

square.addEventListener('change', function(){
	calc(windowsOpt, communicationsOpt, fineFinishOpt, roughFinishOpt);
})
// - - - - - - - - - - - - - - - - - - - - - - -
// МАССИВЫ ДАННЫХ ДЛЯ СЕЛЕКТОВ
const foundationList = [	{name: 'фундамент 1', price: 1000},
							{name: 'фундамент 2', price: 1200},
							{name: 'фундамент 3', price: 1300}
];
const wallsList 	 = [	{name: 'стена 1', price: 2000},
							{name: 'стена 2', price: 2900},
							{name: 'стена 3', price: 3400}
];
const overlapList 	 = [	{name: 'перекрытие 1', price: 2000},
							{name: 'перекрытие 2', price: 2900},
							{name: 'перекрытие 3', price: 3400}
];
const roofList 	 	 = [	{name: 'кровля 1', price: 2000},
							{name: 'кровля 2', price: 2900},
							{name: 'кровля 3', price: 3400}
];
const frontageList 	 = [	{name: 'фасад 1', price: 2000},
							{name: 'фасад 2', price: 2900},
							{name: 'фасад 3', price: 3400}
];
// - - - - - - - - - - - - - - - - - - - - - - -
// ГЕНЕРАЦИЯ ОПШЕНОВ В HTML
creatOptionList(foundationList, '#foundation');
creatOptionList(wallsList, '#walls');
creatOptionList(overlapList, '#overlap');
creatOptionList(roofList, '#roof');
creatOptionList(frontageList, '#frontage');

function creatOptionList(array, optionListId) {
	for(let i = 0; i < array.length; i++){
		let li = document.createElement('li');
		li.setAttribute('data-price', array[i].price);
		li.innerHTML = array[i].name;
		li.classList.add('option-item');
		let optionList = document.querySelector(optionListId);
		optionList.appendChild(li);
	}
}
// - - - - - - - - - - - - - - - - - - - - - - -
let currentFoundation 	= 0,
	currentWalls 		= 0,
	currentOverlap 		= 0,
	currentRoof 		= 0,
	currentFrontage 	= 0;


// ПОЛУЧЕНИЕ ВЫПАДАЮЩИХ СПИСКОВ
const foundation 	= document.querySelector('#foundation');
const walls 		= document.querySelector('#walls');
const overlap 		= document.querySelector('#overlap');
const roof 			= document.querySelector('#roof');
const frontage 		= document.querySelector('#frontage');

// ПОЛУЧЕНИЕ ЦЕНЫ ИЗ ОПШЕНА ПРИ КЛИКЕ
const foundationItems = foundation.querySelectorAll('.option-item');
for (let i = 0; i < foundationItems.length; i++){
	let foundationItem = foundationItems[i];
	foundationItem.addEventListener('click', function(){
		currentFoundation = Number(this.getAttribute('data-price'));
		calc(windowsOpt, communicationsOpt, fineFinishOpt, roughFinishOpt);
		// console.log(currentFoundation);
	})
}

// ПОЛУЧЕНИЕ ЦЕНЫ ИЗ ОПШЕНА ПРИ КЛИКЕ
const wallsItems = walls.querySelectorAll('.option-item');
for (let i = 0; i < wallsItems.length; i++){
	let wallsItem = wallsItems[i];
	wallsItem.addEventListener('click', function(){
		currentWalls = Number(this.getAttribute('data-price'));
		calc(windowsOpt, communicationsOpt, fineFinishOpt, roughFinishOpt);
		// console.log(currentWalls);
	})
}

// ПОЛУЧЕНИЕ ЦЕНЫ ИЗ ОПШЕНА ПРИ КЛИКЕ
const overlapItems = overlap.querySelectorAll('.option-item');
for (let i = 0; i < overlapItems.length; i++){
	let overlapItem = overlapItems[i];
	overlapItem.addEventListener('click', function(){
		currentOverlap = Number(this.getAttribute('data-price'));
		calc(windowsOpt, communicationsOpt, fineFinishOpt, roughFinishOpt);
		// console.log(currentOverlap);
	})
}

// ПОЛУЧЕНИЕ ЦЕНЫ ИЗ ОПШЕНА ПРИ КЛИКЕ
const roofItems = roof.querySelectorAll('.option-item');
for (let i = 0; i < roofItems.length; i++){
	let roofItem = roofItems[i];
	roofItem.addEventListener('click', function(){
		currentRoof = Number(this.getAttribute('data-price'));
		calc(windowsOpt, communicationsOpt, fineFinishOpt, roughFinishOpt);
		// console.log(currentRoof);
	})
}

// ПОЛУЧЕНИЕ ЦЕНЫ ИЗ ОПШЕНА ПРИ КЛИКЕ
const frontageItems = frontage.querySelectorAll('.option-item');
for (let i = 0; i < frontageItems.length; i++){
	let frontageItem = frontageItems[i];
	frontageItem.addEventListener('click', function(){
		currentFrontage = Number(this.getAttribute('data-price'));
		calc(windowsOpt, communicationsOpt, fineFinishOpt, roughFinishOpt);
		// console.log(currentFrontage);
	})
}

// ОБРАБОТКА ФУНКЦИОНАЛА ВЫПАДАЮЩИХ СПИСКОВ
// ПОЛУЧЕНИЕ ВСЕХ СЕЛЕКТОВ
const selects = document.querySelectorAll('.select');

for (let i = 0; i < selects.length; i++){

	const optionWrap 		= selects[i].querySelector('.option-wrap');
	const optionChecked 	= selects[i].querySelector('.option_checked');
	const optionBox 	 	= selects[i].querySelector('.option-box');
	const angle 	  	 	= selects[i].querySelector('.angle');

	optionWrap.addEventListener('click', function(event){
		// если список открыт - мы его захлопнем
		if(optionBox.classList.contains('shown')){
			optionBox.classList.remove('shown');
			angle.classList.remove('up');
		} else{
			// в остальных случаях - закрываем все списки, затем открываем требуемый при клике
			for(let j = 0; j < selects.length; j++){
				// повторный перебор всех списков и их закрытие, и поорот стрелки в исходное положение
				let currentOptionBox = selects[j].querySelector('.option-box'),
					currentAngle 	 = selects[j].querySelector('.angle');
				currentOptionBox.classList.remove('shown');
				currentAngle.classList.remove('up');
			}
			// открытие списка селекта при клике
			optionBox.classList.add('shown');
			angle.classList.add('up');
		}
		// подставляем в селект значение выбранного опшена
		const optionList = optionBox.querySelectorAll('.option-item');
		for(let i = 0; i < optionList.length; i++){
			optionList[i].addEventListener('click', function () {
				// optionChecked.innerHTML = optionList[i].innerHTML; // этот фокус не проодит в IE
				optionChecked.innerHTML = this.innerHTML;
			})
		}
		// закрытие списка селекта при клике за его пределы - полюбому не пойдет в iOS
		document.body.addEventListener('click', function(){
			optionBox.classList.remove('shown');
			angle.classList.remove('up');
		})
		event.stopPropagation();
	})
}

// ЗНАЧЕНИЕ НЕВЫБРАННЫХ ОПЦИЙ ТРЕТЬЕЙ СТРОКИ
const optionsValues = {
	windows			: 0,
	communications	: 0,
	fineFinish		: 0,
	roughFinish 	: 0
};

let   windowsOpt			= 0,
	  communicationsOpt		= 0,
	  fineFinishOpt			= 0,
	  roughFinishOpt		= 0;
// - - - - - - - - - - - - - - - - - - - - - - -

// ПОЛУЧЕНИЕ ВСЕХ ЧЕКБОКСОВ
const options = document.querySelectorAll('.input_checkbox');

for(let i = 0; i < options.length; i++){
	let option = options[i];
	option.addEventListener('click', function () {

		// повторный перебор всех опшенов и проставление значений в переменные (требуется для сброса значений РАДИО-кнопки)
		for(let k = 0; k < options.length; k++){
			let option = options[k];
			let optionId = option.id;
			// если опция выбрана - ставим значение в переменную из ID, иначе - 0
			option.checked ? optionsValues[optionId] = option.value : optionsValues[optionId] = 0;

			windowsOpt 	 		= Number(optionsValues.windows),
			communicationsOpt	= Number(optionsValues.communications),
			fineFinishOpt		= Number(optionsValues.fineFinish),
			roughFinishOpt 		= Number(optionsValues.roughFinish);
			// -------------------------------------------------------------------
		}

		calc(windowsOpt, communicationsOpt, fineFinishOpt, roughFinishOpt);

	})

}


// ПОЛУЧЕНИЕ ПОЛЯ ВЫВОДА ИТОГОВОЙ СУММЫ
const totalSummValue = document.getElementById('total-summ__value');


calc();

function calc(){
	let summ  = square.value*7 + currentFoundation + currentWalls + currentOverlap + currentRoof + currentFrontage + (windowsOpt + communicationsOpt + fineFinishOpt + roughFinishOpt);
	// console.log(summ);
	
	let summRound = summ.toFixed(2);

	totalSummValue.innerHTML = summRound + ' <span>Руб</span>';
}

