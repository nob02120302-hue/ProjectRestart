console.log("Project Restart START");

// 1. プレイヤーデータの初期化（保存データがあれば読み込む）
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

const dailyQuestPool = [
    "AIで記事構成を考える", "500文字以上書く", "画像を1枚作る",
    "noteを公開する", "下書きを1本作る", "タイトルを5個考える",
    "過去記事をリライトする", "AIにアイデアを10個出してもらう"
];

// 2. 画面更新関数（どこからでも呼べるように外に出しました）
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
        const charHtml = `<img src="./${player.gender}-${player.job}.png" style="width: 50px; height: 50px; object-fit: contain;">`;
        const avatar = document.querySelector(".avatar");
        if (avatar) avatar.innerHTML = charHtml;
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

    // 既存の保存データがあればホームを表示
    if (player.job !== "") {
        document.getElementById("titleScreen").classList.add("hidden");
        document.getElementById("homeScreen").classList.remove("hidden");
        openHome();
    }

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
    openHome();
    alert("購入しました！");
}

function showScreen(screenId) {
    document.querySelectorAll('.screen').forEach(s => s.classList.add('hidden'));
    document.getElementById(screenId).classList.remove('hidden');
}
