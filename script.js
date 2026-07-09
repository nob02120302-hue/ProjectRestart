// script.js
let playerJob = "";
let playerSpirit = "";

function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
        
        // --- ここを修正 ---
        if (sceneId === 'dashboard-scene') {
            // HTMLの新しい箱に合わせて、情報を表示する
            document.getElementById('display-job').textContent = playerJob;
            document.getElementById('display-spirit').textContent = playerSpirit;
        }
    }
}
function selectJob(jobName) {
    playerJob = jobName;
    console.log("Job selected: " + playerJob);
    showScene('spirit-scene');
}

function selectSpirit(spiritName) {
    playerSpirit = spiritName;
    console.log("Spirit selected: " + playerSpirit);
    showScene('adventure-scene');
}
/* ダッシュボード全体のレイアウト枠 */
.dashboard-layout {
    display: grid;
    /* 左側を2倍、右側を1倍の幅にする */
    grid-template-columns: 2fr 1fr;
    /* 箱同士の間隔 */
    gap: 15px;
    padding: 15px;
    background-color: #1a1a1a; /* 背景をRPGっぽいダークカラーに */
    color: white;
}

/* 各エリアの共通設定 */
.area-header, .area-tasks, .area-stats, .area-shop {
    background-color: #2d2d2d; /* 各カードの背景色 */
    padding: 15px;
    border-radius: 8px; /* 角を丸くする */
    border: 1px solid #444; /* 薄い枠線 */
}

/* ヘッダーは一番上に横幅いっぱい配置 */
.area-header { grid-column: 1 / 3; }

/* ショップも一番下に横幅いっぱい配置 */
.area-shop { grid-column: 1 / 3; }
