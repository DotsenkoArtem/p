"use strict"
const banksData = [
	{
		name: 'alpha',
		percent: 8.7
	},
	{
		name: 'sber',
		percent: 8.4
	},
	{
		name: 'pochta',
		percent: 7.9
	},
	{
		name: 'tinkoff',
		percent: 9.2
	},
];
// ЗНАЧЕНИЯ ИЗ ТЕКСТОВЫХ ИНПУТОВ
const realtyCost 	= document.getElementById('realty-cost'),
	  initialFee 	= document.getElementById('initial-fee'),
 	  creditTerm 	= document.getElementById('credit-term');



 // ИТОГОВЫЕ ЗНАЧЕНИЯ
const creditSum 		= document.getElementById('credit-sum'),
	monthlyPayment 	= document.getElementById('monthly-payment'),
 	advisableIncome = document.getElementById('advisable-income');


// ВСЕ RANGE-СЛАЙДЕРОВ
const inputsRange = document.querySelectorAll('.range-slider');

// ВСЕ КНОПКИ БАНКОВ С ПРОЦЕНТНОЙ СТАВКОЙ
const percentBtns = document.querySelectorAll('.bank');



/* ИНИЦИАЛИЗАЦИЯ RANGE-СЛАЙДЕРОВ ПО ID */
var realtyCostRange = document.getElementById('realty-cost-range');
noUiSlider.create(realtyCostRange, {
    start: 300000,
   	connect: [true, false],
    range: {
        'min': 300000,
        'max': 10000000
    }
});

var initialFeeRange = document.getElementById('initial-fee-range');
noUiSlider.create(initialFeeRange, {
    start: 100000,
   	connect: [true, false],
    range: {
        'min': 100000,
        'max': 1000000
    }
});

var creditTermRange = document.getElementById('credit-term-range');
noUiSlider.create(creditTermRange, {
    start: 12,
   	connect: [true, false],
    range: {
        'min': 12,
        'max': 240
    }
});
/* ------------------------------------------ */

/* ПОЛУЧЕНИЕ МАССИВА ВСЕХ RANGE-СЛАЙДЕРОВ */
const rangeBlocks = document.querySelectorAll('.range-block');
let currentPercent = banksData[0].percent;


assignValue();



function assignValue() {
	for(let i = 0; i < rangeBlocks.length; i++){
		let	rangeSlider = rangeBlocks[i].querySelector('.range-slider'),
			rangeValue  = rangeBlocks[i].querySelector('.range__value'),
			minRange 	= rangeBlocks[i].querySelector('.min-range'),
			maxRange 	= rangeBlocks[i].querySelector('.max-range');

		/* ПРОСТАВЛЕНИЕ МИНИМАЛЬНЫХ И МАКСИМАЛЬНЫХ ЗНАЧЕНИЙ В HTML-БЛОКАХ */
		minRange.innerHTML = Math.round( rangeSlider.querySelector('.noUi-handle.noUi-handle-lower').getAttribute('aria-valuemin'));
		maxRange.innerHTML = Math.round( rangeSlider.querySelector('.noUi-handle.noUi-handle-lower').getAttribute('aria-valuemax'));

		/* СВЯЗКА RANGE-СЛАЙДЕРА C ИНПУТОМ */

		rangeSlider.noUiSlider.on('update', function (values, handle) {
		    rangeValue.value = Math.round(values[handle]);
		    calc(realtyCost.value, initialFee.value, creditTerm.value);
		});
		/* СВЯЗКА ИНПУТА С RANGE-СЛАЙДЕРОМ */
		rangeValue.addEventListener('change', function () {
		    rangeSlider.noUiSlider.set(this.value);
		});
	}

}






for(let i = 0; i < percentBtns.length; i++){
	percentBtns[i].addEventListener('click', function () {
		for(let j = 0; j < percentBtns.length; j++){
			percentBtns[j].classList.remove('active');
		}
		this.classList.add('active');
		getActiveBank(percentBtns[i]);
		calc(realtyCost.value, initialFee.value, creditTerm.value);									//пересчет при изменении % ставки
	})
}

/* ЗАПИСЬ ПРОЦЕНТНОЙ СТАВКИ В КНОПКУ С НАЗВАНИЕМ БАНКА */
for(let k = 0; k < percentBtns.length; k++){
	let bankPercent = percentBtns[k].querySelector('.bank__percent'); 								//нашел <span>, в который вставлять значение процентной ставки
	let currentArray = banksData.find(perc => perc.name === percentBtns[k].dataset.name); 			//нашел нужный объект из "banksData" по дата атрибуту
	bankPercent.innerHTML = currentArray.percent + '%';  											//записал в <span> процентную ставку, соответствующую дата-атрибуту
}


/* ПОЛУЧЕНИЕ ЗНАЧЕНИЯ ДАТА АТРИБУТА КНОПКИ С ПРОЦЕНТНОЙ СТАВКОЙ */
function getActiveBank(currentActive) {
	const dataAttrValue = currentActive.dataset.name;
	const currentBank = banksData.find(bank => bank.name === dataAttrValue);
	currentPercent = currentBank.percent;
	// console.log(currentPercent);
}


function calc(realtyCost = 300000, initialFee = 100000, creditTerm = 12) {
	/*
	ФОРМУЛА РАСЧЕТА
	ЕП - ежемесячный платеж
	РК - размер кредита
	ПС - процентная ставка
	КМ - количество месяцев

	ЕП = (РК + (((РК / 100) * ПС) / 12) * КМ) / КМ
	*/
	let calcMonthlyPayment,								//ежемесячный платеж
		calcCreditSum 		= realtyCost - initialFee,	//сумма кредита
	 	calcInterestRate 	= currentPercent;			//процентная ставка


	 calcMonthlyPayment = (calcCreditSum + (((calcCreditSum / 100) * calcInterestRate) / 12) * creditTerm) / creditTerm;
	 const monthlyPaymentRounded = Math.round(calcMonthlyPayment);
	 console.log(monthlyPaymentRounded);
	 if(monthlyPaymentRounded < 0){
	 	return false;
	 }else{
	 	creditSum.value 		= calcCreditSum;
	 	monthlyPayment.value 	= monthlyPaymentRounded;
	 	advisableIncome.value	= Math.round((monthlyPaymentRounded / 100 * 35) + monthlyPaymentRounded);
	 }
	
}
// calc(realtyCost.value, initialFee.value, creditTerm.value);
// console.log(currentPercent);