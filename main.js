const menberData = ["レトログリズリー", "ヤマトマスラオ", "ジェットマスター", "トリプルシェイク", "ハニースリープ", "エターナルフレンド", "ウォーキンコレクト"];
const voteData = menberData.map((e) => {
    return ({
        name: e,
        ballot: 0,
    });
});

const menberTable = document.getElementById("menberTable");
const voteNumberSelector = document.getElementById("voteNumberSelector");
const votePointForm = document.getElementById("votePointForm");
const voteButton = document.getElementById("voteButton");
const voteHistory = document.getElementById("voteHistory");

menberData.forEach((menberName, i) => {
    const option = document.createElement("option");
    option.appendChild(document.createTextNode(`${i+1}${menberName}`));
    option.setAttribute("value", i);
    voteNumberSelector.appendChild(option);

    const tr = document.createElement("tr");
    const td1 = document.createElement("td");
    td1.appendChild(document.createTextNode(i+1));
    const td2 = document.createElement("td");
    td2.appendChild(document.createTextNode(menberName));
    const td3 = document.createElement("td");
    tr.appendChild(td1);
    tr.appendChild(td2);
    tr.appendChild(td3);
    menberTable.appendChild(tr);
});

const calculateOdds = (data) => {
    const total = data.reduce((s, e) => s + e.ballot, 0);
    const oddsData = data.map((e) => e.ballot !== 0 ? Math.floor(total / e.ballot * 10) / 10 : 0);
    return oddsData;
}

const vote = () => {
    const menber = +voteNumberSelector.value;
    const point = +votePointForm.value;
    if(!Number.isInteger(menber) || !Number.isInteger(point) || point<=0) {
        alert("不正な入力です。");
        return;
    }
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(`${menber+1}${menberData[menber]} ${point}点`));
    voteHistory.insertAdjacentElement("afterbegin", li);
    voteData[menber].ballot += point;
    const oddsData = calculateOdds(voteData);
    oddsData.forEach((odds, i) => {
        let oddsText = odds;
        if(odds === 0){
            oddsText = "元返し";
        }else if(Number.isInteger(odds)){
            oddsText = `${odds}.0`;
        }
        menberTable.children[i].children[2].textContent = oddsText;
    })
    voteNumberSelector.value = "null";
    votePointForm.value = 1;
}
voteButton.onclick = () => vote();
