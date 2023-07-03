// Global Varibales
let TRANSACTIONS = [];
const MONTHS = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];
let TOTAL_INCOME = 0;
let TOTAL_EXPENSE = 0;
let TOTAL_BALANCE = 0;

// DOM ELEMENTS
const totalIncome = document.getElementById("total-income");
const totalExpense = document.getElementById("total-expense");
const totalBalance = document.getElementById("total-balance");
const expenseForm = document.getElementById("expense-form");
const titleInput = document.getElementById("title-input");
const amountInput = document.getElementById("amount-input");
const expenseList = document.getElementById("expense-list");

// Listening to form submission event
expenseForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const title = titleInput.value.trim();
  const amount = +amountInput.value.trim();
  if (title === "" || amount === "") {
    alert("Please fill all the fields");
    return;
  }
  if (isNaN(amount)) {
    alert("Only number is allowed in amount field");
    return;
  }
  if (amount < 0 && Math.abs(amount) > TOTAL_BALANCE) {
    alert("Insufficient Balance");
    return;
  }
  // Proceed to add transaction.
  addTransaction(title, amount);
  updateTransactionDetails();
});

// Function to add transaction.
function addTransaction(title, amount) {
  console.log(title, amount);
  const transaction = {
    transactionTitle: title,
    transactionAmount: amount,
    transactionDate: new Date().getDate(),
    transactionMonth: MONTHS[new Date().getMonth()],
    transactionYear: new Date().getFullYear(),
  };
  TRANSACTIONS.push(transaction);
  console.log(TRANSACTIONS);
  expenseList.innerHTML = "";
  TRANSACTIONS.forEach((transaction) => {
    addTransactionToDOM(transaction);
  });
}

// Function to add transaction to the DOM.
function addTransactionToDOM(transaction) {
  const list = document.createElement("li");
  list.classList.add("expense__item");
  const html = `
  <div class="expense__left">
    <div class="expense__date">
      <p class="day">${transaction.transactionDate}</p>
      <p class="month">${transaction.transactionMonth}</p>
      <p class="year">${transaction.transactionYear}</p>
    </div>
    <p class="expense__title">${transaction.transactionTitle}</p>
  </div>

  <p class="expense__amount ${
    transaction.transactionAmount < 0 ? "expense" : "income"
  }">&#8377;${Math.abs(transaction.transactionAmount)}</p>
`;
  list.innerHTML = html;
  console.log(list);
  expenseList.append(list);
}
//update transaction details
function updateTransactionDetails() {
  TOTAL_INCOME = TRANSACTIONS.filter((transaction) => {
    return transaction.transactionAmount > 0;
  }).reduce((acc, currentItem) => {
    return (acc = acc + currentItem.transactionAmount);
  }, 0);
  TOTAL_EXPENSE = TRANSACTIONS.filter((transaction) => {
    return transaction.transactionAmount < 0;
  }).reduce((acc, currentItem) => {
    return (acc = acc + currentItem.transactionAmount);
  }, 0);
  TOTAL_BALANCE = TOTAL_INCOME + TOTAL_EXPENSE;
  totalIncome.innerText = TOTAL_INCOME;
  totalExpense.innerText = Math.abs(TOTAL_EXPENSE);
  totalBalance.innerText = TOTAL_BALANCE;
}
