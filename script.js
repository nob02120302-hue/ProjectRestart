const setupScreen = document.getElementById("setupScreen");
const homeScreen = document.getElementById("homeScreen");

const startBtn = document.getElementById("startBtn");
const completeBtn = document.getElementById("completeBtn");

const quests = [
  "タイトルを考える",
  "300文字書く",
  "見出し画像を作る",
  "記事を公開する",
  "AIと構成を考える",
  "1つだけ追記する",
  "過去記事をリライトする",
  "コメント返信をする"
];

let player = JSON.parse(localStorage.getItem("ProjectRestart"));

if(player){
    showHome();
}else{
    showSetup();
}

function showSetup(){
    setupScreen.classList.remove("hidden");
    homeScreen.classList.add("hidden");
}

function showHome(){

    setupScreen.classList.add("hidden");
    homeScreen.classList.remove("hidden");

    document.getElementById("welcome").textContent =
        `こんにちは ${player.name} さん`;

    document.getElementById("level").textContent = player.level;

    document.getElementById("gold").textContent = player.gold;

    document.getElementById("restart").textContent = player.restart;

    updateXP();

    createQuest();

}

startBtn.addEventListener("click",()=>{

    const name=document.getElementById("name").value.trim();

    const note=document.getElementById("note").value.trim();

    if(name===""){
        alert("ニックネームを入力してください");
        return;
    }

    player={
        name:name,
        note:note,
        level:1,
        xp:0,
        gold:0,
        restart:0
    };

    save();

    showHome();

});

completeBtn.addEventListener("click",()=>{

    player.xp+=20;

    player.gold+=10;

    if(player.xp>=100){

        player.level++;

        player.xp=0;

        alert("🎉 LEVEL UP!");

    }

    save();

    updateXP();

    document.getElementById("gold").textContent=player.gold;

    document.getElementById("level").textContent=player.level;

    createQuest();

});

function updateXP(){

    document.getElementById("xpText").textContent =
        `${player.xp} / 100 XP`;

    document.getElementById("xpFill").style.width =
        player.xp+"%";

}

function createQuest(){

    const list=document.getElementById("questList");

    list.innerHTML="";

    let copy=[...quests];

    for(let i=0;i<3;i++){

        const index=Math.floor(Math.random()*copy.length);

        const li=document.createElement("li");

        li.textContent=copy[index];

        copy.splice(index,1);

        list.appendChild(li);

    }

}

function save(){

    localStorage.setItem(
        "ProjectRestart",
        JSON.stringify(player)
    );

}
