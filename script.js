
class Calculator{
  constructor(previousOperandElement, currentOperandElement){
    this.previousOperandElement = previousOperandElement;
    this.currentOperandElement = currentOperandElement;
    this.clear()
  }
  clear(){
    this.currentOperand = '';          //curentoperandpreviousopeand  -- holds the reference to the htmlelemnt but not the text content
    this.previousOperand = '';
    this.operation = undefined;
  }
  
  delete(){
    this.currentOperand = this.currentOperand.toString().slice(0,-1)    // tString - to get the last value , slice - to remove the last value
  }

  appendNumber(number){
    if(number === '.' && this.currentOperand.includes('.')) return    //In the overall input only on e.(period) is allowed
    this.currentOperand = this.currentOperand.toString()+number.toString();   //to append we conver to sting
  }

  operationPerformed(operation){
    if(this.currentOperand === '') return
    if(this.previousOperand !==''){
      this.compute()            //computes for evry singe opration
    }
    this.operation = operation;
    this.previousOperand = this.currentOperand    //operator is moved to previous to be able to give next operand
    this.currentOperand = ''
  }

  compute(){
    let computation
    const prev = parseFloat(this.previousOperand)
    const current = parseFloat(this.currentOperand)
    if(isNaN(prev) || isNaN(current))  return  //if no number is selected computation is not dona nad retuned
    switch(this.operation){
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
          return
    }
    this.currentOperand = computation
    this.operation = undefined
    this.previousOperand= ''
    
  }

  addDelimiter(number){
    const stringNumber = number.toString();
    const integerDigits = parseFloat(stringNumber.split('.')[0]);   //gives the numbers before the decimal pos
    const decimalDigits = stringNumber.split('.')[1];                 //gives number after the decimal, pos
    let integerDisplay;

    if (isNaN(integerDigits)) {
      integerDisplay = '';
    } else {
      integerDisplay = integerDigits.toLocaleString('en', { maximumFractionDigits: 0 });         //maxFractionDigits is to check no decimal places further
    }

    if (decimalDigits != null) {
      return `${integerDisplay}.${decimalDigits}`;
    } else {
      return integerDisplay;
    }
  }


  display(){
    this.currentOperandElement.innerText = this.addDelimiter(this.currentOperand);
    if(this.operation != null){
      this.previousOperandElement.innerText = `${this.addDelimiter(this.previousOperand)} ${this.operation}`  ;   
   }else{
    this.previousOperandElement.innerText = ''
   }
   
  }



}



const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalsButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const previousOperandElement = document.querySelector('[data-previous-operand]')
const currentOperandElement = document.querySelector('[data-current-operand]')


const calculator = new Calculator(previousOperandElement, currentOperandElement)  //object creation

numberButtons.forEach(button =>{
  button.addEventListener('click', () =>{
    calculator.appendNumber(button.innerText)
    calculator.display()
  })
})

operationButtons.forEach(button =>{
  button.addEventListener('click', () =>{
    calculator.operationPerformed(button.innerText)
    calculator.display()
  })
})

equalsButton.addEventListener('click', button=>{
  calculator.compute()
  calculator.display()
})

allClearButton.addEventListener('click', button=>{
  calculator.clear()
  calculator.display()
})

deleteButton.addEventListener('click', button=>{
  calculator.delete()
  calculator.display()
})

