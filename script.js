// ===== Project Restart v1.0 =====

// 1. 変数・配列定義（一番上に持ってくることで参照エラーを回避）
let player = {
    name: "Player",
    job: "",
    level: 1,
    xp: 0,
    xpMax: 100,
    gold: 0,
    restart: 0
};

const jobs = {
    warrior: "⚔ 戦士",
    wizard: "🧙 賢者",
    bard: "🎵 吟遊詩人"
};

const dailyQuestPool = [
    "AIで記事構成を考える",
    "500文字以上書く",
    "画像を1枚作る",
    "noteを公開する",
    "下書きを1本作る",
    "タイトルを5個考える",
    "過去記事をリライトする",
    "AIにアイデアを10個出してもらう"
];

// 2. DOM取得
const titleScreen = document.getElementById("titleScreen");
const jobScreen = document.getElementById("jobScreen");
const homeScreen = document.getElementById("homeScreen");
const beginBtn = document.getElementById("beginBtn");
const jobStartBtn = document.getElementById("jobStartBtn");
const completeBtn = document.getElementById("completeBtn");

let selectedJob = "";

// 3. 関数定義（generateQuestは配列定義より後に記述）
function savePlayer(){
    localStorage.setItem("projectRestart", JSON.stringify(player));
}

function loadPlayer(){
    const save = localStorage.getItem("projectRestart");
    if(save){ player = JSON.parse(save); }
}

function generateQuest(){
    const today = new Date().toLocaleDateString();
    if(localStorage.getItem("questDate") === today && localStorage.getItem("dailyQuest")){
        document.getElementById("questList").innerHTML = "<li>☐ " + localStorage.getItem("dailyQuest") + "</li>";
        return;
    }
    const quest = dailyQuestPool[Math.floor(Math.random() * dailyQuestPool.length)];
    localStorage.setItem("questDate", today);
    localStorage.setItem("dailyQuest", quest);
    document.getElementById("questList").innerHTML = "<li>☐ " + quest + "</li>";
}

function openHome(){
    jobScreen.classList.add("hidden");
    titleScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

    document.getElementById("welcome").textContent = "ようこそ、" + jobs[player.job] + "！";
    document.getElementById("playerName").textContent = player.name;
    document.getElementById("jobName").textContent = jobs[player.job];
    document.getElementById("level").textContent = player.level;
    document.getElementById("gold").textContent = player.gold;
    document.getElementById("restart").textContent = player.restart;
    document.getElementById("xpText").textContent = player.xp + " / " + player.xpMax + " XP";
    document.getElementById("xpFill").style.width = (player.xp / player.xpMax * 100) + "%";

    generateQuest();
}

function dailyLogin(){
    const today = new Date().toLocaleDateString();
    if(localStorage.getItem("lastLogin") !== today){
        player.gold += 50;
        player.restart++;
        localStorage.setItem("lastLogin", today);
        savePlayer();
        alert("🎁 ログインボーナス！");
    }
}

// 4. イベント登録
beginBtn.addEventListener("click", () => {
    titleScreen.classList.add("hidden");
    jobScreen.classList.remove("hidden");
});

document.querySelectorAll(".job").forEach(card => {
    card.addEventListener("click", () => {
        document.querySelectorAll(".job").forEach(j => j.classList.remove("selected"));
        card.classList.add("selected");
        selectedJob = card.dataset.job;
    });
});

jobStartBtn.addEventListener("click", () => {
    if(selectedJob === ""){ alert("ジョブを選択してください"); return; }
    player.job = selectedJob;
    savePlayer();
    openHome();
});

completeBtn.addEventListener("click", () => {
    player.xp += 25;
    player.gold += 10;
    if(player.xp >= player.xpMax){
        player.xp -= player.xpMax;
        player.level++;
        player.xpMax += 50;
        alert("🎉 LEVEL UP!");
    }
    savePlayer();
    openHome();
});

// 5. 初期起動処理
loadPlayer();
if(player.job){
    dailyLogin();
    openHome();
}
