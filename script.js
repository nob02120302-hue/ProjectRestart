// ===== Project Restart v0.3.0 =====

let player = {
    name: "",
    job: "",
    level: 1,
    xp: 0,
    xpMax: 100,
    gold: 0,
    restart: 0
};

const jobs = {
    wizard: "🧙 賢者",
    warrior: "⚔ 戦士",
    bard: "🎵 吟遊詩人"
};

const titleScreen = document.getElementById("titleScreen");
const jobScreen = document.getElementById("jobScreen");
const homeScreen = document.getElementById("homeScreen");

const beginBtn = document.getElementById("beginBtn");
const jobStartBtn = document.getElementById("jobStartBtn");

let selectedJob = "";

beginBtn.addEventListener("click", () => {

    titleScreen.classList.add("hidden");
    jobScreen.classList.remove("hidden");

});

document.querySelectorAll(".job").forEach(card => {

    card.addEventListener("click", () => {

        document.querySelectorAll(".job").forEach(j => {
            j.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedJob = card.dataset.job;

    });

});

jobStartBtn.addEventListener("click", () => {

    if(selectedJob === ""){
        alert("ジョブを選択してください");
        return;
    }

    player.job = selectedJob;

    if(player.name === ""){
        player.name = "Player";
    }

    savePlayer();

    openHome();

    document.getElementById("welcome").textContent =
    "ようこそ、" + jobs[player.job] + "！";

});

function savePlayer(){

    localStorage.setItem(
        "projectRestart",
        JSON.stringify(player)
    );

}

function loadPlayer(){

    const save =
    localStorage.getItem("projectRestart");

    if(save){

        player = JSON.parse(save);

    }

}

function openHome(){

    jobScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

    document.getElementById("playerName").textContent =
    player.name || "Player";

    document.getElementById("jobName").textContent =
    jobs[player.job];

    document.getElementById("level").textContent =
    player.level;

    document.getElementById("gold").textContent =
    player.gold;

    document.getElementById("restart").textContent =
    player.restart;

    document.getElementById("xpText").textContent =
    player.xp + " / " + player.xpMax + " XP";

    document.getElementById("xpFill").style.width =
    (player.xp/player.xpMax*100)+"%";

}

document.getElementById("completeBtn")
.addEventListener("click", () => {

    let gainXP = 25;
    let gainGold = 10;

    animateXP(gainXP);

    player.gold += gainGold;

    document.getElementById("gold").textContent =
    player.gold;

    savePlayer();



loadPlayer();

if(player.job){

    titleScreen.classList.add("hidden");

    dailyLogin();

    openHome();

}

function animateXP(amount){

    let current = 0;

    const timer = setInterval(()=>{

        current++;

        player.xp++;

        if(player.xp >= player.xpMax){

            player.xp = 0;
            player.level++;
            player.xpMax += 50;

            alert("🎉 LEVEL UP!");

            document.getElementById("level").textContent =
            player.level;

        }

        document.getElementById("xpText").textContent =
        player.xp + " / " + player.xpMax + " XP";

        document.getElementById("xpFill").style.width =
        (player.xp/player.xpMax*100)+"%";
        
generateQuest();

        }
                              
        if(current >= amount){

            clearInterval(timer);

            savePlayer();

        }

    },25);

}
function dailyLogin(){

    const today = new Date().toLocaleDateString();

    const lastLogin =
    localStorage.getItem("lastLogin");

    if(lastLogin !== today){

        player.gold += 50;

        player.restart += 1;

        localStorage.setItem(
            "lastLogin",
            today
        );

        savePlayer();

        alert(
            "🎁 ログインボーナス！\n\n" +
            "💰 Gold +50\n" +
            "🔥 Restart +1"
        );

    }

}
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

function generateQuest(){

    const today = new Date().toLocaleDateString();

    const savedDate = localStorage.getItem("questDate");
    const savedQuest = localStorage.getItem("dailyQuest");

    if(savedDate === today && savedQuest){

        document.getElementById("questList").innerHTML =
        "<li>☐ " + savedQuest + "</li>";

        return;

    }

    const quest =
    dailyQuestPool[
        Math.floor(
            Math.random()*dailyQuestPool.length
        )
    ];

    localStorage.setItem("dailyQuest",quest);
    localStorage.setItem("questDate",today);

    document.getElementById("questList").innerHTML =
    "<li>☐ " + quest + "</li>";

}
