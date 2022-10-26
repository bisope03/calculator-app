class Calculator{
    constructor(previousOperandText, currentOperandText){
        this.previousOperandText = previousOperandText;
        this.currentOperandText = currentOperandText;
        this.clear();
    }

    clear(){
        this.currentOperand = '';
        this.previousOperand = '';
        this.operation = undefined;
    }

    delete(){
        this.currentOperand = this.currentOperand.toString.slice(0, -1);
    }

    appendNumber(number){
        if(number === '.' && this.currentOperand.includes('.')) return;
        this.currentOperand = this.currentOperand.toString() + number.toString();
    }

    chooseOperation(operation){
        if(this.currentOperand === '') return;
        if(this.previousOperand !== null){
            this.compute();
        }
        this.operation = operation;
        this.previousOperand = this.currentOperand;
        this.currentOperand = '';
    }

    compute(){
       let computation;
       const prev = parseFloat(this.previousOperand);
       const current = parseFloat(this.currentOperand);
       if(isNaN(prev) || isNaN(current)) return;
       switch(this.operation){
        case '+':
            computation = prev + current;
            break;
        case '-':
            computation = prev - current;
            break;
        case 'x':
            computation = prev * current;
            break;
        case '/':
            computation = prev / current;
            break;
        default:
            return;
       }

       this.currentOperand = computation;
       this.previousOperand = '';
       this.operation = undefined;
    }

    getDisplayNumber(number){
        const stringNumber = number.toString();
        const integerDigits = parseFloat(stringNumber.split('.')[0]);
        const decimalDigits = stringNumber.split('.')[1];
        let integerDisplay;

        if(isNaN(integerDigits)){
            integerDisplay = '';
        }else{
            integerDisplay = integerDigits.toLocaleString('en', {
                maximumFractionDigits: 0
            })
        }

        if(decimalDigits != null){
            return `${integerDisplay}. ${decimalDigits}`;
        }else{
            return integerDisplay;
        }
    }

    updateDisplay(){
        this.currentOperandText.innerText = this.getDisplayNumber(this.currentOperand);
        if(this.operation != null){
            this.previousOperandText.innerText = 
            `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`;
        }else{
            this.previousOperandText.innerText = '';
        }
        
    }
}

const themeBtns = document.querySelectorAll('.button');
const numberBtns = document.querySelectorAll('[data-number]');
const operationBtns = document.querySelectorAll('[data-operation]');
const previousOperandText = document.querySelector('[data-previous]');
const currentOperandText = document.querySelector('[data-current]');
const resetBtn = document.querySelector('[data-reset]');
const equalsBtn = document.querySelector('[data-equals]');
const deleteBtn = document.querySelector('[data-delete]');

var arr = [...themeBtns];

arr.forEach((element, index) => {
    element.addEventListener("click", () => {
        element.style.opacity = "1";

        if(index == 0){
            document.body.classList.add('darkMode');
            document.body.classList.remove('lightMode');
            document.body.classList.remove('purpleMode');
            localStorage.setItem('darkMode', 'enabled');
            localStorage.setItem('purpleMode', null);
            localStorage.setItem('lightMode', null);
        }else if(index == 1){
            document.body.classList.add('lightMode');
            document.body.classList.remove('darkMode');
            document.body.classList.remove('purpleMode');
            localStorage.setItem('darkMode', null);
            localStorage.setItem('purpleMode', null);
            localStorage.setItem('lightMode', 'enabled');
        }else{
            document.body.classList.add('purpleMode');
            document.body.classList.remove('darkMode');
            document.body.classList.remove('lightMode');
            localStorage.setItem('darkMode', null);
            localStorage.setItem('purpleMode', 'enabled');
            localStorage.setItem('lightMode', null);
        }

        arr
        .filter(function (item){
           return item != element;
        })
        .forEach((item) => {
            item.style.opacity = "0";
        });
    })
})

const calculator = new Calculator(previousOperandText, currentOperandText);

numberBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
        calculator.updateDisplay();
    })
});

operationBtns.forEach(button => {
    button.addEventListener('click', () => {
        calculator.chooseOperation(button.innerText);
        calculator.updateDisplay();
    })
});

resetBtn.addEventListener('click', () => {
    calculator.clear();
    calculator.updateDisplay();
})

deleteBtn.addEventListener('click', () => {
    calculator.delete();
    calculator.updateDisplay();
})

equalsBtn.addEventListener('click', () => {
    calculator.compute();
    calculator.updateDisplay();
})