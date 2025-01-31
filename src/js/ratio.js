// let partners = [];

// function addPartner() {
//   const name = document.getElementById("name").value;
//   const capital = parseFloat(document.getElementById("capital").value);

//   if (name && capital > 0) {
//     partners.push({ name, capital });
//     updatePartnerList();
//   }
// }

// function updatePartnerList() {
//   const list = document.getElementById("partnerList");
//   list.innerHTML = "";
//   partners.forEach((p, index) => {
//     list.innerHTML += `<li>${p.name}: $${p.capital.toFixed(
//       2
//     )} <button onclick="removePartner(${index})">Remove</button></li>`;
//   });
// }

// function removePartner(index) {
//   partners.splice(index, 1);
//   updatePartnerList();
// }

// function calculateShares() {
//   const totalCapital = partners.reduce((sum, p) => sum + p.capital, 0);
//   const profitLoss = parseFloat(document.getElementById("profitLoss").value);
//   const resultList = document.getElementById("resultList");

//   resultList.innerHTML = "";
//   partners.forEach((p) => {
//     let share = (p.capital / totalCapital) * profitLoss;
//     resultList.innerHTML += `<li>${p.name}: $${share.toFixed(2)}</li>`;
//   });
// }
let partners = [];

function addPartner() {
  const name = document.getElementById("name").value;
  const capital = parseFloat(document.getElementById("capital").value);

  if (name && capital > 0) {
    partners.push({ name, capital });
    document.getElementById("name").value = "";
    document.getElementById("capital").value = "";
    updatePartnerList();
  } else {
    alert("Please enter valid details.");
  }
}

function updatePartnerList() {
  const list = document.getElementById("partnerList");
  list.innerHTML = "";
  partners.forEach((p, index) => {
    list.innerHTML += `
            <li class="list-group-item d-flex justify-content-between align-items-center">
                ${p.name}: $${p.capital.toFixed(2)}
                <button class="btn btn-danger btn-sm" onclick="removePartner(${index})">Remove</button>
            </li>`;
  });
}

function removePartner(index) {
  partners.splice(index, 1);
  updatePartnerList();
}

function calculateShares() {
  const totalCapital = partners.reduce((sum, p) => sum + p.capital, 0);
  const profitLoss = parseFloat(document.getElementById("profitLoss").value);
  const resultList = document.getElementById("resultList");

  if (isNaN(profitLoss)) {
    alert("Please enter a valid profit/loss amount.");
    return;
  }

  resultList.innerHTML = "";
  partners.forEach((p) => {
    let share = (p.capital / totalCapital) * profitLoss;
    resultList.innerHTML += `
            <li class="list-group-item">
                ${p.name}: <strong>$${share.toFixed(2)}</strong>
            </li>`;
  });
}
