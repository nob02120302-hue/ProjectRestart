// script.js - シーン管理システム

// シーン切り替え関数
function showScene(sceneId) {
    // 1. すべてのシーンから 'active' クラスを外す
    document.querySelectorAll('.scene').forEach(scene => {
        scene.classList.remove('active');
    });

    // 2. 指定されたシーンに 'active' クラスを付ける
    const targetScene = document.getElementById(sceneId);
    if (targetScene) {
        targetScene.classList.add('active');
        console.log("切り替え先: " + sceneId);
    } else {
        console.error("シーンが見つかりません: " + sceneId);
    }
}

// --- 動作テスト用（ブラウザで確認用）---
// 3秒ごとに自動でシーンが切り替わります
const scenes = ['opening-scene', 'job-scene', 'spirit-scene', 'adventure-scene', 'final-scene'];
let currentIndex = 0;

setInterval(() => {
    currentIndex = (currentIndex + 1) % scenes.length;
    showScene(scenes[currentIndex]);
}, 3000);
