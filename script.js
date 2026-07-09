// script.js
function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
    }
}

function selectJob(jobName) {
    console.log("選択した職業: " + jobName);
    showScene('spirit-scene');
}
// script.js の末尾にこれを追加

function selectSpirit(spiritName) {
    console.log("選択した精霊: " + spiritName);
    showScene('adventure-scene'); // 冒険開始画面へ
}
