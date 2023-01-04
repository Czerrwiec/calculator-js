class Calc {
	constructor() {
		this.numbers = [];
		this.operators = [];
		this.elements = [];
		this.result = '';
		this.initApp();
	}

	initApp = () => {
		this.connectDOM();
		this.setupListeners();
	};

	connectDOM = () => {
		const elements = document.querySelectorAll('[data-bind-js]');
		const numbers = document.querySelectorAll('.number');
		const operators = document.querySelectorAll('.operator');

		for (const element of elements) {
			this.elements[element.classList[0].replace('-', '_')] = element;
		}
		for (const number of numbers) {
			this.numbers[number.classList[0] + number.innerHTML.replace('.', '')] =
				number;
		}
		for (const item of operators) {
			this.operators[item.classList[0]] = item;
		}
	};

	setupListeners = () => {
		Object.values(this.operators).forEach((button) =>
			button.addEventListener('click', this.operate)
		);
		this.operators.cop.addEventListener('click', this.clearScreen);

		Object.values(this.numbers).forEach((number) =>
			number.addEventListener('click', this.displayNumbers)
		);

		this.elements.history_btn.addEventListener('click', this.clearHistory);
	};

	displayNumbers = (e) => {
		const number = this.elements.currentNumber;

		if (e.target.textContent === '.' && number.innerHTML.includes('.')) {
			return;
		} else if (e.target.textContent === '.' && number.innerHTML === '') {
			return (number.innerHTML = '0.');
		} 
        
		number.innerHTML += e.target.textContent;
	};

	operate = (e) => {
		if (
			this.elements.currentNumber.innerHTML === '' &&
			e.target.textContent === '-'
		) {
			this.elements.currentNumber.innerHTML = '-';
			return;
		} else if (this.elements.currentNumber.innerHTML === '') return;

		if (this.elements.mathSign.innerHTML !== '') {
			this.showResult();
			return;
		}

		this.elements.previousNumber.innerHTML =
			this.elements.currentNumber.innerHTML;
		this.elements.mathSign.innerHTML = e.target.textContent;
		this.elements.currentNumber.innerHTML = '';
	};

	showResult = () => {
		let a = Number(this.elements.previousNumber.innerHTML);
		let b = Number(this.elements.currentNumber.innerHTML);
		let operator = this.elements.mathSign.innerHTML;

		if (a === '' || b === '') return;

		switch (operator) {
			case '+':
				this.result = a + b;
				break;

			case '-':
				this.result = a - b;
				break;

			case 'x':
				this.result = a * b;
				break;

			case ':':
				this.result = a / b;
				break;

			case '2^':
				this.result = a ** b;
				break;
		}

		this.addToHistory();
		this.elements.history_btn.classList.add('active');
		this.elements.currentNumber.innerHTML = this.result;
		this.elements.previousNumber.innerHTML = '';
		this.elements.mathSign.innerHTML = '';
	};

	addToHistory = () => {
		const newHistoryItem = document.createElement('li');
		newHistoryItem.innerHTML = `${this.elements.previousNumber.innerHTML} ${this.elements.mathSign.innerHTML} ${this.elements.currentNumber.innerHTML} = ${this.result}`;

		newHistoryItem.classList.add('history-item');
		this.elements.history.appendChild(newHistoryItem);
	};

	clearScreen = () => {
		this.result = '';
		this.elements.currentNumber.innerHTML = '';
		this.elements.mathSign.innerHTML = '';
		this.elements.previousNumber.innerHTML = '';
	};

	clearHistory = () => {
		this.elements.history.textContent = '';
		if (this.elements.history.textContent === '') {
			this.elements.history_btn.classList.remove('active');
		}
	};
}

document.addEventListener('DOMContentLoaded', new Calc());
