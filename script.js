// script.js
let playerJob = "";
let playerSpirit = "";

function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
        
        if (sceneId === 'dashboard-scene') {
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
function checkTask() {
    const urlInput = document.getElementById('task-url').value;
    
    // 例：URLに "note" という文字が含まれていたら達成とみなす
    if (urlInput.includes("note")) {
        alert("クエスト達成！");
        // チェックボックスにチェックを入れる
        document.querySelector('#task-1 input').checked = true;
        // 入力欄をクリア
        document.getElementById('task-url').value = "";
    } else {
        alert("URLが正しくありません");
    }
}
// ----------------
// note URL クエスト判定
// ----------------

function checkTask() {

    const urlInput = document.getElementById("task-url");

    if (!urlInput) {
        return;
    }

    const noteUrl = urlInput.value.trim();

    if (noteUrl.includes("note.com")) {

        alert("🎉 クエスト達成！");

        player.xp += 25;
        player.gold += 10;

        savePlayer();
        openHome();

        urlInput.value = "";

    } else {

        alert("noteのURLを入力してください");

    }

}
