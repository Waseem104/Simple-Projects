const expenseForm = document.getElementById("expense-form");
const textInput = document.getElementById("description");
const numberInput = document.getElementById("amount");
const category = document.getElementById("category");
const selectedCategory = document.getElementById("filter-category");
const expenseList = document.getElementById("expense-list");
const total = document.getElementById("total");
// console.log(total);


let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

expenseForm.addEventListener("submit", function (event) {
  const descriptionValue = textInput.value;
  const amount = numberInput.value;
  const categoryValue = category.value;

  if (!descriptionValue || !amount || !categoryValue) return;

  const newExpense = { descriptionValue, amount, categoryValue };

  expenses.push(newExpense);
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
  event.target.reset();
});

function renderExpenses() {
  expenseList.innerHTML = "";

  expenses.forEach((expense, index) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `${expense.descriptionValue} - ${expense.amount} - ${expense.categoryValue}
        <button onclick="editExpense(${index})">Edit</button>
        <button onclick="deleteExpense(${index})">Delete</button>`;
    expenseList.appendChild(listItem);
  });
  calculateTotal();
}
function calculateTotal() {
  const Total = expenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
  document.getElementById('total').innerText = `Total Spent: $${Total.toFixed(2)}`;
}
function editExpense(index) {
  const expense = expenses[index];
  textInput.value = expense.descriptionValue;
  numberInput.value = expense.amount;
  category.value = expense.categoryValue;
  deleteExpense(index); 
}
function deleteExpense(index) {
  expenses.splice(index, 1);
  localStorage.setItem("expenses", expenses);
  renderExpenses();
}

function filterExpensesByCategory(categoryValue) {
  const filteredExpenses = expenses.filter((expense) => {
    expense.categoryValue === categoryValue || "";
  });
}
function renderFilteredExpenses(filterExpenses) {
  expenseList.innerHTML = "";

  filterExpenses.forEach((expense, index) => {
    const expenseItem = document.createElement("li");
    expenseItem.innerHTML = `${expense.descriptionValue} - ${expense.amount} - ${expense.categoryValue}
    <button onclick=editExpense(${index})>Edit</button>
    <button onclick=deleteExpense(${index})>Delete</button>`;
    expenseList.appendChild(expenseItem);
  });
  calculateTotal();
}
// initial render
renderExpenses();
