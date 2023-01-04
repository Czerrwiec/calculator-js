class Calc {
    constructor() {
        this.numbers = []
        this.operators = []
        this.elements = []
        this.initApp()
    }


    initApp = () => {
        this.connectDOM()
        console.log(this.numbers);
        console.log(this.operators);
        console.log(this.elements);
    }

    connectDOM() {
        const elements = document.querySelectorAll('[data-bind-js]')
        const numbers = document.querySelectorAll('.number')
        const operators = document.querySelectorAll('.operator')

        for (const element of elements) {
            this.elements[element.classList[0]] = element
        }   
        for (const number of numbers) {
            this.numbers[number.classList[0] + number.textContent] = number
        }
        for (const item of operators) {
            this.operators[item.classList[0]] = item
        }
    }


}



document.addEventListener('DOMContentLoaded', new Calc())