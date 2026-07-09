// script.js
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
    playerJob = jobName;
    console.log("Job selected: " + playerJob);
    showScene('spirit-scene');
}

function selectSpirit(spiritName) {
    playerSpirit = spiritName;
    console.log("Spirit selected: " + playerSpirit);
    showScene('adventure-scene');
}
