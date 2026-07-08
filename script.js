// ===== Project Restart v0.3.0 =====

let player = {
    name: "",
    job: "",
    level: 1,
    xp: 0,
    xpMax: 100,
    gold: 0,
    restart: 0
};

const jobs = {
    wizard: "🧙 賢者",
    warrior: "⚔ 戦士",
    bard: "🎵 吟遊詩人"
};

const titleScreen = document.getElementById("titleScreen");
const jobScreen = document.getElementById("jobScreen");
const homeScreen = document.getElementById("homeScreen");

const beginBtn = document.getElementById("beginBtn");
const jobStartBtn = document.getElementById("jobStartBtn");

let selectedJob = "";

beginBtn.addEventListener("click", () => {

    titleScreen.classList.add("hidden");
    jobScreen.classList.remove("hidden");

});

document.querySelectorAll(".job").forEach(card => {

    card.addEventListener("click", () => {

        document.querySelectorAll(".job").forEach(j => {
            j.classList.remove("selected");
        });

        card.classList.add("selected");

        selectedJob = card.dataset.job;

    });

});

jobStartBtn.addEventListener("click", () => {

    if(selectedJob === ""){
        alert("ジョブを選択してください");
        return;
    }

    player.job = selectedJob;

    if(player.name === ""){
        player.name = "Player";
    }

    savePlayer();

    openHome();

});
});

function savePlayer(){

    localStorage.setItem(
        "projectRestart",
        JSON.stringify(player)
    );

}

function loadPlayer(){

    const save =
    localStorage.getItem("projectRestart");

    if(save){

        player = JSON.parse(save);

    }

}

function openHome(){

    jobScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

    document.getElementById("playerName").textContent =
    player.name || "Player";

    document.getElementById("jobName").textContent =
    jobs[player.job];

    document.getElementById("level").textContent =
    player.level;

    document.getElementById("gold").textContent =
    player.gold;

    document.getElementById("restart").textContent =
    player.restart;

    document.getElementById("xpText").textContent =
    player.xp + " / " + player.xpMax + " XP";

    document.getElementById("xpFill").style.width =
    (player.xp/player.xpMax*100)+"%";

}

document.getElementById("completeBtn")
.addEventListener("click",()=>{

    player.xp += 25;
    player.gold += 10;

    if(player.xp>=player.xpMax){

        player.xp-=player.xpMax;

        player.level++;

        player.xpMax+=50;

        alert("🎉 LEVEL UP !!");

    }

    savePlayer();

    openHome();

});

loadPlayer();

if(player.job){

    titleScreen.classList.add("hidden");

    openHome();

}
