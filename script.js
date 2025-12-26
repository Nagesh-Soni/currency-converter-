const dropdown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const from = document.querySelector(".from select");
const to = document.querySelector(".to select");

for (let select of dropdown) {
  for (let curreCode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = curreCode;
    newOption.value = curreCode;

    if (select.name === "from" && curreCode === "USD") {
      newOption.selected = "USD";
    }
    if (select.name === "to" && curreCode === "INR") {
      newOption.selected = "INR";
    }

    select.append(newOption);
  }

  select.addEventListener("change", (e) => {
    updateFlag(e.target);
  });
}

const updateFlag = (element) => {
  let currCode = element.value;
  let countryCode = countryList[currCode];
  let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;

  let img = element.parentElement.querySelector("img");
  img.src = newSrc;
};

// 🔥 FIX: Update flags on load
updateFlag(from);
updateFlag(to);

btn.addEventListener("click", async (evt) => {
  evt.preventDefault();

  let amount = document.querySelector(".amount input");
  let amtvalue = amount.value;

  if (amtvalue === "" || amtvalue < 1) {
    amtvalue = 1;
    amount.value = "1";
  }

  const fromCurrency = from.value;
  const toCurrency = to.value;

  const URL = `https://v6.exchangerate-api.com/v6/2b8434d67b9eb72c844871bd/latest/${fromCurrency}`;

  let response = await fetch(URL);
  let data = await response.json();

  let rate = data.conversion_rates[toCurrency];
  let finalAmount = (amtvalue * rate).toFixed(2);

  document.querySelector(".msg").innerText =
    `${amtvalue} ${fromCurrency} = ${finalAmount} ${toCurrency}`;
});
