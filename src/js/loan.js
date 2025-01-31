const loanForm = document.getElementById("loan-form");
const calculateBtn = document.getElementById("calculate-btn");
const modal = document.getElementById("modal");
const monthlyPaymentElement = document.getElementById("monthly-payment");
const closeBtn = document.getElementById("close-btn");
const historyBody = document.getElementById("history-body");
const themeToggle = document.getElementById("theme-toggle");
let history = [];
let theme = "dark";

calculateBtn.addEventListener("click", calculateLoan);
closeBtn.addEventListener("click", close_modal);
themeToggle.addEventListener("click", toggleTheme);

function calculateLoan() {
  const loanAmount = parseFloat(document.getElementById("loan-amount").value);
  const interestRate =
    parseFloat(document.getElementById("interest-rate").value) / 100;
  const loanTerm = parseFloat(document.getElementById("loan-term").value);
  const loanUnit = document.getElementById("loan-unit").value;
  const currency = document.getElementById("currency").value;

  let months;
  switch (loanUnit) {
    case "year":
      months = loanTerm * 12;
      break;
    case "month":
      months = loanTerm;
      break;
    case "week":
      months = loanTerm / 4;
      break;
    default:
      months = loanTerm * 12;
  }

  const monthlyInterestRate = interestRate / 12;
  const numerator = Math.pow(1 + monthlyInterestRate, months);
  const denominator = numerator - 1;
  const monthlyPayment =
    (loanAmount * monthlyInterestRate * numerator) / denominator;

  monthlyPaymentElement.textContent = `Monthly Payment: ${currency} ${monthlyPayment.toFixed(
    2
  )}`;
  saveHistory(
    loanAmount,
    interestRate,
    loanTerm,
    loanUnit,
    monthlyPayment,
    currency
  );
  modal.style.display = "flex";
}

function saveHistory(
  loanAmount,
  interestRate,
  loanTerm,
  loanUnit,
  monthlyPayment,
  currency
) {
  history.push({
    date: new Date().toLocaleString(),
    loanAmount,
    interestRate,
    loanTerm,
    loanUnit,
    monthlyPayment,
    currency,
  });
  updateHistoryTable();
  localStorage.setItem("history", JSON.stringify(history));
}

function updateHistoryTable() {
  historyBody.innerHTML = "";
  history.forEach((item, index) => {
    const row = document.createElement("tr");
    row.innerHTML = `
                    <td>${item.date}</td>
                    <td>${
                      item.currency
                    } ${item.loanAmount.toLocaleString()}</td>
                    <td>${item.interestRate}%</td>
                    <td>${item.loanTerm} ${item.loanUnit}</td>
                    <td>${
                      item.currency
                    } ${item.monthlyPayment.toLocaleString()}</td>
                    <td>${item.currency}</td>
                `;
    historyBody.appendChild(row);
  });
}

function close_modal() {
  modal.style.display = "none";
}

function toggleTheme() {
  if (theme === "dark") {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    theme = "light";
    themeToggle.className = "fa-solid fa-sun theme-toggle";
    localStorage.setItem("theme", theme);
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    theme = "dark";
    themeToggle.className = "fa-solid fa-moon theme-toggle";
    localStorage.setItem("theme", theme);
  }
}

const storedHistory = localStorage.getItem("history");
if (storedHistory) {
  history = JSON.parse(storedHistory);
  updateHistoryTable();
}
const storedTheme = localStorage.getItem("theme");
if (storedTheme) {
  if (storedTheme === "light") {
    document.body.classList.remove("dark-mode");
    document.body.classList.add("light-mode");
    theme = "light";
    themeToggle.className = "fa-solid fa-sun theme-toggle";
  } else {
    document.body.classList.remove("light-mode");
    document.body.classList.add("dark-mode");
    theme = "dark";
    themeToggle.className = "fa-solid fa-moon theme-toggle";
  }
}
