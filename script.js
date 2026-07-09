// シーン切り替え関数
function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
    }
}

// 職業選択時の動作
function selectJob(jobName) {
    console.log("選択した職業: " + jobName);
    
    // ここで次のシーン（精霊選択）へ切り替える
    showScene('spirit-scene');
}
