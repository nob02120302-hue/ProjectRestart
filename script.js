// script.js
let playerJob = "";
let playerSpirit = "";

function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
        
        // ダッシュボードを表示するタイミングで、選んだ情報をHTMLに流し込む
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
