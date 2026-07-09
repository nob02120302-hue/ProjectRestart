// 選択した内容を記録する変数
let playerJob = "";
let playerSpirit = "";

function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
    }
}

function selectJob(jobName) {
    playerJob = jobName; // 職業を記録
    console.log("職業は " + playerJob + " です");
    showScene('spirit-scene');
}

function selectSpirit(spiritName) {
    playerSpirit = spiritName; // 精霊を記録
    console.log("精霊は " + playerSpirit + " です");
    
    // 冒険開始画面の表示を更新
    document.getElementById('adventure-scene').querySelector('h1').innerText = 
        playerJob + "と" + playerSpirit + "の冒険が始まる！";
    
    showScene('adventure-scene');
}
