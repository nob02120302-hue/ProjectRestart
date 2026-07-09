// シーン切り替え関数
function showScene(sceneId) {
    document.querySelectorAll('.scene').forEach(s => s.classList.remove('active'));
    const target = document.getElementById(sceneId);
    if (target) {
        target.classList.add('active');
    }
}

// 職業選択ボタン用
function selectJob(jobName) {
    console.log("選択した職業: " + jobName);
    showScene('spirit-scene');
}
