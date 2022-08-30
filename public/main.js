const tableBody = document.querySelector("tbody");
const selector = document.querySelector("select");
const [oddsButton, voteButton] = document.querySelectorAll("button");

const updateOdds = () => {
    fetch("/api/odds").then(res => res.json()).then((data) => {
        data.forEach((odd, index) => {
            tableBody.rows[index].cells[2].textContent = odd ? (Number.isInteger(odd) ? `${odd}.0` : odd) : "特払い";
        })
    })
}

fetch("/api/member").then(res => res.json()).then((data) => {
    data.forEach((name, index) => {
        const tr = document.createElement("tr");
        tr.innerHTML = `<td>${index+1}</td><td>${name}</td><td></td>`;
        tableBody.appendChild(tr);
        const option = document.createElement("option");
        option.setAttribute("value", index);
        option.textContent = `[${index+1}]${name}`;
        selector.appendChild(option);
    })
}).then(() => updateOdds());

oddsButton.addEventListener("click", () => updateOdds());
voteButton.addEventListener("click", () => {
    fetch(`/api/vote?number=${selector.value}`, {method: "POST"});
})
