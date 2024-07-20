// Variables
let nameInput = '';
let expenseInput = 0;

// Selectors
const inputName = document.querySelector('#input-name');
const inputExpense = document.querySelector('#input-expense');
const btnRegister = document.querySelector('#btn-register');
const printReport = document.querySelector('#print-report');

// Arrays
let expensesArray = [];

// Class
class Account {
  constructor(idAccount, nameInput, expenseInput) {
    this.id = idAccount;
    this.name = nameInput;
    this.expense = expenseInput;
  };

  register(account) {
    
    expensesArray = [...expensesArray, account];

  };

  deleteExpense(account, id) {

    expensesArray = expensesArray.filter((expenseArray) => expenseArray.id !== id);

    ui.printReport(account);

  };

};

class UI {
  
  inputError(msg, type, reference) {
    
    const msgExist = document.querySelector('.textError');

    if (msgExist) {
      msgExist.remove();
    };

    const msgError = document.createElement('p');

    if (type === 'error') {
      msgError.classList.add('textError');
      reference.classList.add('inputError');
      reference.classList.remove('focus:border-sky-600');
      msgError.textContent = msg;
      reference.insertAdjacentElement('afterend', msgError);
    };

    setTimeout(() => {
      
      if (type === 'error') {
        msgError.remove();
      };

    }, 3000);

  };

  inputSuccess(reference) {
    
    reference.classList.remove('inputError');
    reference.classList.add('focus:border-sky-600');

  };

  registerBtnStatus() {
    
    btnRegister.disabled = !(nameInput && expenseInput > 0);

  };

  cleanInputs() {

    inputName.value = '';
    inputExpense.value = '';
    nameInput = '';
    expenseInput = 0;

  };

  printReport(account) {

    ui.preCleaning();

    expensesArray.forEach((table, i) => {

      const { name, expense, id } = table;

      const row = document.createElement('tr');
      row.classList.add('grid', 'grid-cols-6', 'gap-6');
      row.dataset.id = id;

      if (i % 2 === 0) {
        row.classList.add('bgListReport');
      } else {
        row.classList.add('bg-white');
      };

      row.innerHTML = `      
        <td class="col-span-3">${name}</td>
        <td class="col-span-2">${expense}</td>
        <button><i class="fa-solid fa-x textError" id="delete-btn"></i></button>

      `
      
      printReport.appendChild(row);
      const deleteBtn = row.querySelector('#delete-btn');

      deleteBtn.onclick = () => {

        account.deleteExpense(account, id);
      
      };

    });

  };

  preCleaning() {

    while (printReport.firstChild) {
      printReport.removeChild(printReport.firstChild);
    };

  };

};

// Instances
const ui = new UI();

export function setupRegister() {
  
  // Events
  inputName.addEventListener('blur', validateInputName);
  inputExpense.addEventListener('blur', validateInputExpense);
  btnRegister.addEventListener('click', accountRegister);

  function validateInputName(e) {
    
    nameInput = inputName.value.trim();

    if (!isNaN(nameInput) || nameInput === '') {
      ui.inputError(`Error en ${e.target.placeholder}`, 'error', inputName);
    } else {
      ui.inputSuccess(inputName);
    };

    ui.registerBtnStatus();

  };

  function validateInputExpense(e) {

    expenseInput = parseFloat(inputExpense.value);

    if (expenseInput <= 0 || isNaN(expenseInput)) {
      ui.inputError(`Error en ${e.target.placeholder}`, 'error', inputExpense);
    } else {
      ui.inputSuccess(inputExpense);
    };

    ui.registerBtnStatus();

  };

  function accountRegister(e) {
    e.preventDefault();

    const accountId = Date.now();
    const account = new Account(accountId, nameInput, expenseInput);
    account.register(account);

    ui.cleanInputs();
    ui.registerBtnStatus();
    ui.printReport(account);

  };

};