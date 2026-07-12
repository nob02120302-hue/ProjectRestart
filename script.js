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

    if (beginBtn) {
        beginBtn.onclick = function () {
            titleScreen.classList.add("hidden");
            genderScreen.classList.remove("hidden");
        };
    }

    document.querySelectorAll(".gender").forEach(function (card) {
        card.onclick = function () {
            document.querySelectorAll(".gender").forEach(g => g.classList.remove("selected"));
            card.classList.add("selected");
            selectedGender = card.getAttribute("data-gender");
        };
    });

    if (genderStartBtn) {
        genderStartBtn.onclick = function () {
            if (selectedGender === "") {
                alert("性別を選択してください");
                return;
            }
            player.gender = selectedGender;
            genderScreen.classList.add("hidden");
            jobScreen.classList.remove("hidden");
        };
    }

    document.querySelectorAll(".job").forEach(function (card) {
        card.onclick = function () {
            document.querySelectorAll(".job").forEach(j => j.classList.remove("selected"));
            card.classList.add("selected");
            selectedJob = card.getAttribute("data-job");
        };
    });

    if (jobStartBtn) {
        jobStartBtn.onclick = function () {
            if (selectedJob === "") {
                alert("ジョブを選択してください");
                return;
            }
            player.job = selectedJob;
            jobScreen.classList.add("hidden");
            homeScreen.classList.remove("hidden");
            openHome();
        };
    }

    function openHome() {
        setText("playerName", player.name);
        setText("jobName", jobs[player.job]);

        // 画像の読み込み
        const fileName = `${player.gender}-${player.job}.png`;
        const charHtml = `<img src="./${fileName}" style="width: 100%; height: 100%; object-fit: contain;">`;

        const avatar = document.querySelector(".avatar");
        const characterPlaceholder = document.querySelector(".character-placeholder");
        if (avatar) avatar.innerHTML = charHtml;
        if (characterPlaceholder) characterPlaceholder.innerHTML = charHtml;

        setText("genderName", player.gender === "male" ? "男性" : "女性");
        setText("level", player.level);
        setText("gold", player.gold);
        setText("restart", player.restart);
        setText("xpText", player.xp + " / " + player.xpMax + " XP");
        
        // 追加: status-grid側のIDも更新する場合
        setText("levelStat", player.level);
        setText("goldStat", player.gold);
        setText("restartStat", player.restart);

        const welcome = document.getElementById("welcome");
        if (welcome) welcome.textContent = "ようこそ、" + jobs[player.job] + "！";

        const xpFill = document.getElementById("xpFill");
        if (xpFill) xpFill.style.width = (player.xp / player.xpMax * 100) + "%";

        generateQuest();
    }

    function setText(id, value) {
        const element = document.getElementById(id);
        if (element) element.textContent = value;
    }

    function generateQuest() {
        const questList = document.getElementById("questList");
        if (!questList) return;
        const quest = dailyQuestPool[Math.floor(Math.random() * dailyQuestPool.length)];
        questList.innerHTML = "<li>☐ " + quest + "</li>";
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
