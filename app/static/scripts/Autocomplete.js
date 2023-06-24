const input = document.getElementById("query");
const datalist = document.querySelector("#cities");

fetch('https://raw.githubusercontent.com/TDanilV16/citiesRuEn/main/citiesRuEn.json')
    .then(res => res.json())
    .then(data => handler(data));

function handler(data) {
    data["name"].forEach(name => {
        const option = document.createElement('option');
        option.value = `${name}`;
        datalist.appendChild(option);
    })
}