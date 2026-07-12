console.log("Project Restart START");

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
    warrior: "⚔️ 戦士",
    wizard: "🔮 魔法使い",
    thief: "🗡️ 盗賊"
};
const jobIcons = {
    warrior: "⚔️",
    wizard: "🔮",
    thief: "🗡️"
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

window.addEventListener("DOMContentLoaded", function () {

    const titleScreen = document.getElementById("titleScreen");
const genderScreen = document.getElementById("genderScreen");
const jobScreen = document.getElementById("jobScreen");
const homeScreen = document.getElementById("homeScreen");

   const beginBtn = document.getElementById("beginBtn");
const genderStartBtn = document.getElementById("genderStartBtn");
const jobStartBtn = document.getElementById("jobStartBtn");
const completeBtn = document.getElementById("completeBtn");

    let selectedJob = "";
let selectedGender = "";
    beginBtn.onclick = function () {
    titleScreen.classList.add("hidden");
    genderScreen.classList.remove("hidden");
};
document.querySelectorAll(".gender").forEach(function (card) {

    card.onclick = function () {

        document.querySelectorAll(".gender").forEach(function (gender) {
            gender.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedGender = card.getAttribute("data-gender");

    };

});

genderStartBtn.onclick = function () {

    if (selectedGender === "") {
        alert("性別を選択してください");
        return;
    }

    player.gender = selectedGender;

    genderScreen.classList.add("hidden");
    jobScreen.classList.remove("hidden");

};
    document.querySelectorAll(".job").forEach(function (card) {

        card.onclick = function () {

            document.querySelectorAll(".job").forEach(function (job) {
                job.classList.remove("selected");
            });

            card.classList.add("selected");

            selectedJob = card.getAttribute("data-job");

        };

    });

    jobStartBtn.onclick = function () {

        if (selectedJob === "") {
            alert("ジョブを選択してください");
            return;
        }

        player.job = selectedJob;

        openHome();

    };

    function openHome() {

        titleScreen.classList.add("hidden");
        jobScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");

        setText("playerName", player.name);
        setText("jobName", jobs[player.job]);
        setText("level", player.level);
        setText("gold", player.gold);
        setText("restart", player.restart);
        setText(
            "xpText",
            player.xp + " / " + player.xpMax + " XP"
        );

        const welcome = document.getElementById("welcome");

        if (welcome) {
            welcome.textContent =
                "ようこそ、" + jobs[player.job] + "！";
        }

        const xpFill = document.getElementById("xpFill");

        if (xpFill) {
            xpFill.style.width =
                (player.xp / player.xpMax * 100) + "%";
        }

        generateQuest();

    }

    function setText(id, value) {

        const element = document.getElementById(id);

        if (element) {
            element.textContent = value;
        }

    }

    function generateQuest() {

        const questList = document.getElementById("questList");

        if (!questList) {
            return;
        }

        const randomIndex = Math.floor(
            Math.random() * dailyQuestPool.length
        );

        const quest = dailyQuestPool[randomIndex];

        questList.innerHTML = "";

        const li = document.createElement("li");

        li.textContent = "☐ " + quest;

        questList.appendChild(li);

    }

    if (completeBtn) {

        completeBtn.onclick = function () {

            player.xp += 25;
            player.gold += 10;

            if (player.xp >= player.xpMax) {

                player.xp -= player.xpMax;
                player.level += 1;
                player.xpMax += 50;

                alert("🎉 LEVEL UP!");

            }

            openHome();

        };

    }

});
