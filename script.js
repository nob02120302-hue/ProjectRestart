// script.js
let playerJob = "";
let playerSpirit = "";

function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
        
        // ダッシュボード画面が表示された時だけ、選んだ情報を表示する
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
