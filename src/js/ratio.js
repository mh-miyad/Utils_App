let partners = JSON.parse(localStorage.getItem("partners")) || [];
let reports = JSON.parse(localStorage.getItem("reports")) || [];

function addPartner() {
  const name = document.getElementById("name").value;
  const capital = parseFloat(document.getElementById("capital").value);

  if (name && capital > 0) {
    partners.push({ name, capital });
    localStorage.setItem("partners", JSON.stringify(partners));
    document.getElementById("name").value = "";
    document.getElementById("capital").value = "";
    updatePartnerList();
  } else {
    alert("Please enter valid details.");
  }
}

function updatePartnerList() {
  const totalCapital = partners.reduce((sum, p) => sum + p.capital, 0);
  const list = document.getElementById("partnerList");
  list.innerHTML = "";

  partners.forEach((p, index) => {
    let ratio = ((p.capital / totalCapital) * 100).toFixed(2);
    list.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${p.name}: $${p.capital.toFixed(
      2
    )} | Ratio: <strong>${ratio}%</strong>
                <button class="btn btn-danger btn-sm" onclick="removePartner(${index})">Remove</button>
            </li>`;
  });
}

function removePartner(index) {
  partners.splice(index, 1);
  localStorage.setItem("partners", JSON.stringify(partners));
  updatePartnerList();
}

function calculateShares() {
  const totalCapital = partners.reduce((sum, p) => sum + p.capital, 0);
  const profitLoss = parseFloat(document.getElementById("profitLoss").value);
  const period = document.getElementById("period").value;
  const resultList = document.getElementById("resultList");

  if (isNaN(profitLoss)) {
    alert("Please enter a valid profit/loss amount.");
    return;
  }

  resultList.innerHTML = "";
  let periodLabel = period === "monthly" ? "Monthly" : "Yearly";

  partners.forEach((p) => {
    let ratio = (p.capital / totalCapital) * 100;
    let share = (p.capital / totalCapital) * profitLoss;

    resultList.innerHTML += `
            <li class="list-group-item">
                ${p.name}: <strong>$${share.toFixed(
      2
    )}</strong> (${ratio.toFixed(2)}% share - ${periodLabel})
            </li>`;

    reports.push({
      period: periodLabel,
      name: p.name,
      capital: p.capital,
      ratio: ratio.toFixed(2),
      profitLoss: share.toFixed(2),
    });
  });

  localStorage.setItem("reports", JSON.stringify(reports));
  updateReport();
}

function updateReport() {
  const reportTable = document.getElementById("reportTable");
  reportTable.innerHTML = "";
  reports.forEach((r) => {
    reportTable.innerHTML += `
            <tr>
                <td>${r.period}</td>
                <td>${r.name}</td>
                <td>$${r.capital.toFixed(2)}</td>
                <td>${r.ratio}%</td>
                <td>$${r.profitLoss}</td>
            </tr>`;
  });
}

// Load stored data
updatePartnerList();
updateReport();
