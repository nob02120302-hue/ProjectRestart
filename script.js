console.log("Project Restart 起動");

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

window.addEventListener("DOMContentLoaded", () => {

    const titleScreen = document.getElementById("titleScreen");
    const jobScreen = document.getElementById("jobScreen");
    const homeScreen = document.getElementById("homeScreen");

    const beginBtn = document.getElementById("beginBtn");
    const jobStartBtn = document.getElementById("jobStartBtn");
    const completeBtn = document.getElementById("completeBtn");

    let selectedJob = "";

    beginBtn.addEventListener("click", () => {
        titleScreen.classList.add("hidden");
        jobScreen.classList.remove("hidden");
    });

    document.querySelectorAll(".job").forEach(card => {

        card.addEventListener("click", () => {

            document.querySelectorAll(".job").forEach(job => {
                job.classList.remove("selected");
            });

            card.classList.add("selected");

            selectedJob = card.dataset.job;

        });

    });

    jobStartBtn.addEventListener("click", () => {

        if (selectedJob === "") {
            alert("ジョブを選択してください");
            return;
        }

        player.job = selectedJob;

        openHome();

    });

    function openHome() {

        titleScreen.classList.add("hidden");
        jobScreen.classList.add("hidden");
        homeScreen.classList.remove("hidden");

        const welcome = document.getElementById("welcome");
        const playerName = document.getElementById("playerName");
        const jobName = document.getElementById("jobName");
        const level = document.getElementById("level");
        const gold = document.getElementById("gold");
        const restart = document.getElementById("restart");
        const xpText = document.getElementById("xpText");
        const xpFill = document.getElementById("xpFill");

        if (welcome) {
            welcome.textContent =
                "ようこそ、" + jobs[player.job] + "！";
        }

        if (playerName) playerName.textContent = player.name;
        if (jobName) jobName.textContent = jobs[player.job];
        if (level) level.textContent = player.level;
        if (gold) gold.textContent = player.gold;
        if (restart) restart.textContent = player.restart;

        if (xpText) {
            xpText.textContent =
                player.xp + " / " + player.xpMax + " XP";
        }

        if (xpFill) {
            xpFill.style.width =
                (player.xp / player.xpMax * 100) + "%";
        }

        generateQuest();

    }

    function generateQuest() {

        const questList = document.getElementById("questList");

        if (!questList) return;

        const quest =
            dailyQuestPool[
                Math.floor(Math.random() * dailyQuestPool.length)
            ];

        questList.innerHTML =
            "<li>☐ " + quest + "</li>";

    }

    if (completeBtn) {

        completeBtn.addEventListener("click", () => {

            player.xp += 25;
            player.gold += 10;

            if (player.xp >= player.xpMax) {

                player.xp -= player.xpMax;
                player.level++;
                player.xpMax += 50;

                alert("🎉 LEVEL UP!");

            }

            openHome();

        });

    }

});
