class Calculator {
    constructor(previousOperandTextElement, currentOperandTextElement) {
        this.previousOperandTextElement = previousOperandTextElement;
        this.currentOperandTextElement = currentOperandTextElement;
        this.clear();
    }

    clear() {
        this.previousOperand = '';
        this.currentOperand = '';
        this.operation = undefined;
    }

    delete() {
        this.currentOperand = this.currentOperand.toString().slice(0, -1);
    }

    /**
     * SET ALL THE VALUES INSIDE THE CALCULATOR
     */

     //if the input contains just one dot, then return
    appendNumber(number) {
        if (number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

//if there is no input the do nothing 
    chooseOperation(operation) {
        if (this.currentOperand === '') return;
// if there is an input which contains a valid input, the compute
        if (this.previousOperand !== '') {
            return this.compute();
        }
        this.operation = operation;
        // after typing the valid input and adding the operation eg. + -
        // the value from the currentOperandTextElement will be displayed in previousOperandTextElement
        this.previousOperand = this.currentOperand;
        // after the value is displayed, the currentOperandTextElement will clear it's input
        this.currentOperand = '';
    }

    /**
     * DEALING WITH THE OPERATIONS
     */
    compute() {
        let computation;
        const prev = parseFloat(this.previousOperand);
        const current = parseFloat(this.currentOperand);
        if (isNaN(prev) || isNaN(current)) return;
        switch (this.operation) {
            case '+': 
                computation = prev + current;
                break;
            case '-':
                computation = prev - current;
                break;
            case '*':
                computation = prev * current;
                break;
            case '÷':
                computation = prev / current;
                break;
            default:
                return;
        }
        this.currentOperand = computation
        this.operand = undefined;
        this.previousOperand = '';
    }

   
    getDisplayNumber(number) {
        const stringNumber = number.toString();
        //checking for integers
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;
        if(isNaN(integerDigits)) {
            integerDisplay = '';
        } else {
             //add the coma for a number bigger than n * 10^3
            integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });
        }
        if (decimalDigits != null) {
            //if there is an integer, return the composed number
            return `${integerDisplay}.${decimalDigits}`;
        } else {
            //if there is no integer, return the number
            return integerDisplay;
        }
    }

    updateDisplay() {
        this.currentOperandTextElement.innerText = 
            this.getDisplayNumber(this.currentOperand);
            //if there is an operation then display the result
        if (this.operation != null) {
            this.previousOperandTextElement.innerText =
             `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        } 
        else  {
            this.previousOperandTextElement.innerText = '';
        }
    }
}

const numberButtons = document.querySelectorAll('[data-number]');
const operationButtons = document.querySelectorAll('[data-operation]');
const equalsButton = document.querySelector('[data-equals]');
const deleteButton = document.querySelector('[data-delete]');
const allClearButton = document.querySelector('[data-all-clear]');
const previousOperandTextElement = document.querySelector('[data-previous-operand]');
const currentOperandTextElement = document.querySelector('[data-current-operand]');

const calculator = new Calculator(previousOperandTextElement, currentOperandTextElement);


numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay()
    });
});

operationButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay()
    });
});

equalsButton.addEventListener('click', button => {
    calculator.compute();
    calculator.updateDisplay();
});

allClearButton.addEventListener('click', button => {
    calculator.clear();
    calculator.updateDisplay();
});

deleteButton.addEventListener('click', button => {
    calculator.delete();
    calculator.updateDisplay();
});