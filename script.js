console.log("Project Restart START");

// 1. プレイヤーデータの初期化
let player = JSON.parse(localStorage.getItem('savedPlayer')) || {
    name: "Player",
    job: "",
    gender: "",
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

// 2. 画面更新関数
function openHome() {
    setText("playerName", player.name);
    setText("jobName", jobs[player.job] || "未選択");
    setText("genderName", player.gender === "male" ? "男性" : (player.gender === "female" ? "女性" : "性別未選択"));
    
    setText("level", player.level);
    setText("gold", player.gold);
    setText("restart", player.restart);
    setText("xpText", player.xp + " / " + player.xpMax + " XP");
    
    setText("levelStat", player.level);
    setText("goldStat", player.gold);
    setText("restartStat", player.restart);

    const welcome = document.getElementById("welcome");
    if (welcome) welcome.textContent = "ようこそ、" + (jobs[player.job] || "冒険者") + "！";

    const xpFill = document.getElementById("xpFill");
    if (xpFill) xpFill.style.width = (player.xp / player.xpMax * 100) + "%";

   // アバター更新
if (player.gender && player.job) {

    const img =
        `<img src="./${player.gender}-${player.job}.png"
        style="width:100%;height:100%;object-fit:contain;">`;

    const avatar = document.querySelector(".avatar");
    if (avatar) avatar.innerHTML = img;

    const character = document.querySelector(".character-placeholder");
    if (character) character.innerHTML = img;
}
    
    // データ保存
    localStorage.setItem('savedPlayer', JSON.stringify(player));
}

function setText(id, value) {
    const element = document.getElementById(id);
    if (element) element.textContent = value;
}

// 3. メイン処理
window.addEventListener("DOMContentLoaded", function () {
    const beginBtn = document.getElementById("beginBtn");
    const genderStartBtn = document.getElementById("genderStartBtn");
    const jobStartBtn = document.getElementById("jobStartBtn");
    const completeBtn = document.getElementById("completeBtn");

    let selectedJob = "";
    let selectedGender = "";

    // ★修正：自動ログインを廃止し、リロード時は必ずタイトル画面を表示
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById("titleScreen").classList.remove("hidden");

    if (beginBtn) beginBtn.onclick = () => {
        document.getElementById("titleScreen").classList.add("hidden");
        document.getElementById("genderScreen").classList.remove("hidden");
    };

    document.querySelectorAll(".gender").forEach(card => {
        card.onclick = () => {
            document.querySelectorAll(".gender").forEach(g => g.classList.remove("selected"));
            card.classList.add("selected");
            selectedGender = card.getAttribute("data-gender");
        };
    });

    if (genderStartBtn) genderStartBtn.onclick = () => {
        if (!selectedGender) return alert("性別を選択してください");
        player.gender = selectedGender;
        document.getElementById("genderScreen").classList.add("hidden");
        document.getElementById("jobScreen").classList.remove("hidden");
    };

    document.querySelectorAll(".job").forEach(card => {
        card.onclick = () => {
            document.querySelectorAll(".job").forEach(j => j.classList.remove("selected"));
            card.classList.add("selected");
            selectedJob = card.getAttribute("data-job");
        };
    });

    if (jobStartBtn) jobStartBtn.onclick = () => {
        if (!selectedJob) return alert("ジョブを選択してください");
        player.job = selectedJob;
        document.getElementById("jobScreen").classList.add("hidden");
        document.getElementById("homeScreen").classList.remove("hidden");
        openHome();
    };

    if (completeBtn) completeBtn.onclick = () => {
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
});

// 4. ショップ・共通関数
function buyItem(type, cost, value) {
    if (player.gold < cost) return alert("Goldが足りません！");
    player.gold -= cost;
    if (type === 'xp') {
        player.xp += value;
        if (player.xp >= player.xpMax) {
            player.xp -= player.xpMax;
            player.level += 1;
            player.xpMax += 50;
            alert("レベルアップ！");
        }
    }
    openHome(); // 最新状態に更新して保存
    alert("購入しました！");
}

function showScreen(screenId) {

    document.querySelectorAll(".screen").forEach(screen => {
        screen.classList.add("hidden");
    });

    const target = document.getElementById(screenId);
    if (target) {
        target.classList.remove("hidden");
    }

    const menu = document.getElementById("topMenu");

    if (menu) {
        if (
            screenId === "homeScreen" ||
            screenId === "shopScreen"
        ) {
            menu.classList.remove("hidden");
        } else {
            menu.classList.add("hidden");
        }
    }

    if (screenId === "homeScreen") {
        openHome();
    }

}
