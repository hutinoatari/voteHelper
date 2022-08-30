const express = require("express");
const path = require("path");
const app = express();
const port = 3000;

const members = [
    {
        "name": "レトログリズリー",
        "ballot": 136,
    },
    {
        "name": "ヤマトマスラオ",
        "ballot": 41,
    },
    {
        "name": "ジェットマスター",
        "ballot": 23,
    },
    {
        "name": "トリプルシェイク",
        "ballot": 11,
    },
    {
        "name": "ハニースリープ",
        "ballot": 9,
    },
    {
        "name": "エターナルフレンド",
        "ballot": 17,
    },
    {
        "name": "ウォーキンコレクト",
        "ballot": 8,
    },
];

app.get("/api/member", (_req, res) => {
    const data = members.map((m) => m.name);
    res.json(data);
})
app.get("/api/odds", (_req, res) => {
    const total = members.reduce((s, e) => s + e.ballot, 0);
    const data = members.map((e) => e.ballot !== 0 ? Math.floor(total / e.ballot * 10) / 10 : null);
    res.json(data);
})
app.post("/api/vote", (req, res) => {
    const {number} = req.query;
    members[+number].ballot += 1;
    res.send();
})

app.use(express.static(path.join(__dirname, "public")));

app.listen(port, () => console.log(`This app listening on port: ${port}`))