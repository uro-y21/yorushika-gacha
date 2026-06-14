const SONGS = [

"夏陰、ピアノを弾く",
"カトレア",
"言って。",
"あの夏に咲け",
"飛行",
"靴の花火",
"雲と幽霊",
"前世",
"負け犬にアンコールはいらない",
"爆弾魔",
"ヒッチコック",
"落下",
"準透明少年",
"ただ君に晴れ",
"冬眠",
"夏、バス停、君を待つ",
"8/31",
"藍二乗",
"八月、某、月明かり",
"詩書きとコーヒー",
"7/13",
"踊ろうぜ",
"六月は雨上がりの街を書く",
"五月は花緑青の窓辺から",
"夜紛い",
"5/6",
"パレード",
"エルマ",
"4/10",
"だから僕は音楽を辞めた",
"車窓",
"憂一乗",
"夕凪、某、花惑い",
"雨とカプチーノ",
"湖の街",
"神様のダンス",
"雨晴るる",
"歩く",
"心に穴が空いた",
"森の教会",
"声",
"エイミー",
"海底、月明かり",
"ノーチラス",
"音楽泥棒の自白",
"昼鳶",
"春ひさぎ",
"爆弾魔(Re-Recording)",
"青年期、空き巣",
"レプリカント",
"花人局",
"朱夏期、音楽泥棒",
"盗作",
"思想犯",
"逃亡",
"幼年期、思い出の中",
"夜行",
"花に亡霊",
"強盗と花束",
"春泥棒",
"創作",
"風を食む",
"嘘月",
"夏の肖像",
"都落ち",
"ブレーメン",
"チノカテ",
"雪国",
"月に吠える",
"451",
"パドドゥ",
"又三郎",
"靴の花火(Re-Recording)",
"老人と海",
"さよならモルテン",
"いさな",
"左右盲",
"アルジャーノン",
"第一夜",
"第二夜",
"第三夜",
"第四夜",
"第五夜",
"第六夜",
"第七夜",
"第八夜",
"第九夜",
"第十夜",
"早朝、郵便受け",
"雲になる",
"花も騒めく",
"魔性",
"プレイシック",
"ポスト春",
"太陽",
"晴る",
"忘れてください",
"修羅",
"火星人",
"ルバート",
"火葬",
"アポリア",
"へび",
"うめき",
"啄木鳥",
"ヒッチコック(Re-Recording)",
"月光浴",
"千鳥",
"櫂",
"海へ",
"テレパス",
"斜陽",
"茜",
"あぶく"

];

const STORAGE_KEY = "yorushika_gacha";

const PLAYER_NAME_KEY =
"yorushika_player_name";

let data = JSON.parse(
localStorage.getItem(STORAGE_KEY)
||
'{"owned":{},"titles":[],"lastDate":"","dailyCount":0}'
);

if(typeof data.dailyCount === "undefined"){

data.dailyCount = 0;

saveData();

}

if(!data.titles){
  data.titles = [];
}

if(!data.completeDate){
  data.completeDate = null;
}

if(!data.completePulls){
  data.completePulls = null;
}

const fixedTitles = {};

data.titles.forEach(title=>{

  if(typeof title === "string"){
    title = {
      name:title,
      date:null
    };
  }

  title.name = title.name
    .replace(/\s*完成$/,"");

  fixedTitles[title.name] = title;

});

data.titles = Object.values(fixedTitles);

saveData();

const gachaBtn =
document.getElementById("gachaBtn");

const animationArea =
document.getElementById("animationArea");

const collectionGrid =
document.getElementById("collectionGrid");

const progress =
document.getElementById("progress");

const remaining =
document.getElementById("remaining");

const modal =
document.getElementById("detailModal");

const closeModal =
document.getElementById("closeModal");

const detailTitle =
document.getElementById("detailTitle");

const detailBody =
document.getElementById("detailBody");

const playerNameInput =
document.getElementById(
"playerName"
);

const saveNameBtn =
document.getElementById(
"saveNameBtn"
);

const topSongs =
document.getElementById(
"topSongs"
);

function saveData(){

localStorage.setItem(
STORAGE_KEY,
JSON.stringify(data)
);

}

function todayString(){

const now =
new Date();

const year =
now.getFullYear();

const month =
String(
now.getMonth()+1
).padStart(2,"0");

const day =
String(
now.getDate()
).padStart(2,"0");

return `${year}-${month}-${day}`;

}

function updateStatus(){

const ownedCount =
Object.keys(data.owned).length;

progress.textContent =
`収集率 ${ownedCount} / ${SONGS.length}`;

const count =
(
data.lastDate === todayString()
)
?
(data.dailyCount || 0)
:
0;

if(count >= 20){

remaining.textContent =
"本日のガチャ終了";

gachaBtn.disabled = true;

}else{

remaining.textContent =
`残り ${20 - count} 回`;

gachaBtn.disabled = false;

}

}

function randomSong(){

return SONGS[
Math.floor(
Math.random()*SONGS.length
)
];

}

function playSongEffect(song){

  if([
    "靴の花火",
    "夕凪、某、花惑い",
    "花に亡霊",
    "靴の花火(Re-Recording)"
  ].includes(song)){
    fireworkEffect();
    return;
  }

  if([
    "春泥棒"
  ].includes(song)){
    sakuraEffect();
    return;
  }

  if([
    "八月、某、月明かり",
    "嘘月",
    "月光浴",
    "月に吠える"
  ].includes(song)){
    moonEffect();
    return;
  }

  if([
    "レプリカント"
  ].includes(song)){
    laserEffect();
    return;
  }

  if([
    "爆弾魔",
    "爆弾魔(Re-Recording)"
  ].includes(song)){
    bombEffect();
    return;
  }
}

function fireworkEffect(){
  for(let i=0;i<20;i++){
    const dot = document.createElement("div");
    dot.className = "firework";
    dot.style.left = Math.random()*100 + "vw";
    dot.style.top = Math.random()*100 + "vh";
    document.body.appendChild(dot);

    setTimeout(()=>dot.remove(), 800);
  }
}

function sakuraEffect(){
  for(let i=0;i<30;i++){
    const petal = document.createElement("div");
    petal.className = "sakura";
    petal.style.left = Math.random()*100 + "vw";
    petal.style.animationDuration = (2+Math.random()*3)+"s";
    document.body.appendChild(petal);

    setTimeout(()=>petal.remove(), 5000);
  }
}

function moonEffect(){

  document.body.classList.add("moon-mode");

  const moon = document.createElement("div");
  moon.className = "moon";

  document.body.appendChild(moon);

  setTimeout(()=>{
    moon.remove();
    document.body.classList.remove("moon-mode");
  }, 2000);
}

function laserEffect(){
  const laser = document.createElement("div");
  laser.className = "laser";
  document.body.appendChild(laser);

  setTimeout(()=>laser.remove(), 600);
}

function bombEffect(){

  // 爆弾本体
  const bomb = document.createElement("div");
  bomb.className = "bomb-core";
  document.body.appendChild(bomb);

  // 少し待って爆発
  setTimeout(()=>{

    bomb.classList.add("explode");

    // 破片生成
    for(let i=0;i<25;i++){
      const shard = document.createElement("div");
      shard.className = "bomb-shard";

      shard.style.left = "50vw";
      shard.style.top = "50vh";

      const angle = Math.random() * Math.PI * 2;
      const distance = 100 + Math.random()*200;

      shard.style.setProperty("--dx", Math.cos(angle) * distance + "px");
      shard.style.setProperty("--dy", Math.sin(angle) * distance + "px");

      document.body.appendChild(shard);

      setTimeout(()=>shard.remove(), 800);
    }

    setTimeout(()=>bomb.remove(), 600);

  }, 200);
}

function sleep(ms){

return new Promise(
resolve =>
setTimeout(resolve,ms)
);

}

function loadPlayerName(){

const savedName =
localStorage.getItem(
PLAYER_NAME_KEY
);

if(savedName){

const playerInfo =
document.getElementById(
"playerInfo"
);

playerInfo.textContent =
`プレイヤー：${savedName}`;

playerNameInput.style.display =
"none";

saveNameBtn.style.display =
"none";

}

}

function savePlayerName(){

const name =
playerNameInput.value.trim();

if(name===""){

alert(
"プレイヤー名を入力してください"
);

return;

}

localStorage.setItem(
PLAYER_NAME_KEY,
name
);

alert(
"保存しました"
);

}

const TITLE_SETS = {

  "夏草が邪魔をする":[
    "夏陰、ピアノを弾く",
    "カトレア",
    "言って。",
    "あの夏に咲け",
    "飛行",
    "靴の花火",
    "雲と幽霊"
  ],

  "負け犬にアンコールはいらない":[
    "前世",
    "負け犬にアンコールはいらない",
    "爆弾魔",
    "ヒッチコック",
    "落下",
    "準透明少年",
    "ただ君に晴れ",
    "冬眠",
    "夏、バス停、君を待つ"
  ],

  "だから僕は音楽を辞めた":[
    "8/31",
    "藍二乗",
    "八月、某、月明かり",
    "詩書きとコーヒー",
    "7/13",
    "踊ろうぜ",
    "六月は雨上がりの街を書く",
    "五月は花緑青の窓辺から",
    "夜紛い",
    "5/6",
    "パレード",
    "エルマ",
    "4/10",
    "だから僕は音楽を辞めた"
  ],

  "エルマ":[
    "車窓",
    "憂一乗",
    "夕凪、某、花惑い",
    "雨とカプチーノ",
    "湖の街",
    "神様のダンス",
    "雨晴るる",
    "歩く",
    "心に穴が空いた",
    "森の教会",
    "声",
    "エイミー",
    "海底、月明かり",
    "ノーチラス"
  ],

  "盗作":[
    "音楽泥棒の自白",
    "昼鳶",
    "春ひさぎ",
    "爆弾魔(Re-Recording)",
    "青年期、空き巣",
    "レプリカント",
    "花人局",
    "朱夏期、音楽泥棒",
    "盗作",
    "思想犯",
    "逃亡",
    "幼年期、思い出の中",
    "夜行",
    "花に亡霊"
  ],

  "創作":[
    "強盗と花束",
    "春泥棒",
    "創作",
    "風を食む",
    "嘘月"
  ],

  "夏の肖像":[
    "夏の肖像",
    "都落ち",
    "ブレーメン",
    "チノカテ",
    "雪国",
    "月に吠える",
    "451",
    "パドドゥ",
    "又三郎",
    "靴の花火(Re-Recording)",
    "老人と海",
    "さよならモルテン",
    "いさな",
    "左右盲",
    "アルジャーノン"
  ],

  "踊る動物":[
    "第一夜",
    "第二夜",
    "第三夜",
    "第四夜",
    "第五夜",
    "第六夜",
    "第七夜",
    "第八夜",
    "第九夜",
    "第十夜"
  ],

  "二人称":[
    "早朝、郵便受け",
    "雲になる",
    "花も騒めく",
    "魔性",
    "プレイシック",
    "ポスト春",
    "太陽",
    "晴る",
    "忘れてください",
    "修羅",
    "火星人",
    "ルバート",
    "火葬",
    "アポリア",
    "へび",
    "うめき",
    "啄木鳥",
    "ヒッチコック(Re-Recording)",
    "月光浴",
    "千鳥",
    "櫂",
    "海へ"
  ]

};

function isAllComplete(){

  return SONGS.every(
    song => data.owned[song]
  );

}

function checkTitles(){

  const unlocked = [];

  for(const [title,songs] of Object.entries(TITLE_SETS)){

    const complete =
      songs.every(song => data.owned[song]);

    if(complete){
      unlocked.push(title);
    }
  }

if(
  unlocked.includes("夏の肖像") &&
  unlocked.includes("踊る動物")
){
  unlocked.push("幻燈");
}
  
  return unlocked;
}



function renderTopSongs(){

if(!topSongs){

return;

}

topSongs.innerHTML = "";

const ranking =
Object.entries(
data.owned
)
.sort(
(a,b)=>
b[1].count-a[1].count
)
.slice(0,10);

if(ranking.length===0){

topSongs.innerHTML =
"<div class='top-song'>まだデータがありません</div>";

return;

}

ranking.forEach(
([song,info],index)=>{

const div =
document.createElement(
"div"
);

div.className =
"top-song";

div.innerHTML =

`<strong>#${index+1}</strong>
 ${song}
 (${info.count}回)`;

topSongs.appendChild(
div
);

});

}

let completeTapCount = 0;

async function showCompletePopup(){

  const popup =
  document.getElementById(
    "completePopup"
  );

  const info =
  document.getElementById(
    "completeInfo"
  );

  info.innerHTML = `

    獲得種類数<br>
    ${SONGS.length}/${SONGS.length}

    <br><br>

    全種類獲得日<br>
    ${data.completeDate}

    <br><br>

    ガチャ回数<br>
    ${data.completePulls}回

  `;

  popup.classList.remove(
    "hidden"
  );

  completeTapCount = 0;

}

function renderCompleteRecord(){

  const el =
  document.getElementById(
    "completeRecord"
  );

  if(!el) return;

  if(data.completeDate){

    el.innerHTML = `

      👑 ${SONGS.length}曲コンプリート👑

      <br><br>

      日付：
      ${data.completeDate}

      <br><br>

      ガチャ回数：
      ${data.completePulls}回

    `;

  }else{

    el.innerHTML =
    "未達成";

  }

}

function renderTitles(){

  const titleList =
  document.getElementById("titleList");

saveData();

  if(!titleList) return;

  titleList.innerHTML = "";

  data.titles.forEach(title=>{

    const div =
    document.createElement("div");

    div.className =
    "title-card";

    if(title.name === "幻燈"){
  div.classList.add("gento-card");
}

    if(title.name === "幻燈"){

  div.innerHTML = `
    <div class="gento-title">
      幻燈
    </div>

    <div class="gento-sub">
      第一章:夏の肖像
    </div>

    <div class="gento-sub">
      第二章:踊る動物
    </div>
  `;

}else{

  div.textContent =
  title.name;

}

    div.addEventListener(
      "click",
      ()=>showTitleDetail(title)
    );

    titleList.appendChild(div);

  });

}

document
.getElementById("completePopup")
.addEventListener(
"click",
()=>{

  completeTapCount++;

  if(completeTapCount >= 2){

    document
    .getElementById(
      "completePopup"
    )
    .classList.add(
      "hidden"
    );

  }

});

function getAlbumCompleteDate(
  songs
){

  let latest = "";

  songs.forEach(song=>{

    const owned =
    data.owned[song];

    if(!owned) return;

    if(
      !latest ||
      owned.firstDate > latest
    ){
      latest =
      owned.firstDate;
    }

  });

  return latest;

}

function showTitleDetail(title){

  detailTitle.textContent =
  title.name;

  let completeDate =
  title.date;

  if(!completeDate){

  if(title.name==="幻燈"){

    completeDate =
    getGentoDate();

  }else{

    const songs =
    TITLE_SETS[title.name];

    if(songs){

      completeDate =
      getAlbumCompleteDate(
        songs
      );

    }

  }

}


  detailBody.innerHTML = `
    アルバム完成<br><br>

    完成日時：
    ${completeDate || "不明"}
  `;

  modal.classList.remove(
    "hidden"
  );

}


function getGentoDate(){

  const natsu =
  getAlbumCompleteDate(
    TITLE_SETS["夏の肖像"]
  );

  const odoru =
  getAlbumCompleteDate(
    TITLE_SETS["踊る動物"]
  );

  if(!natsu) return odoru;
  if(!odoru) return natsu;

  return natsu > odoru
    ? natsu
    : odoru;

}

async function showTitleUnlock(title){

  const popup =
  document.getElementById(
    "titleUnlock"
  );

  const titleName =
  document.getElementById(
    "titleUnlockName"
  );

  titleName.textContent =
`${title} 完成！`;

  popup.classList.remove(
    "hidden"
  );

  if(title === "幻燈"){

    document.body.classList.add(
      "moon-mode"
    );

  }

  await sleep(3000);

  popup.classList.add(
    "hidden"
  );

  document.body.classList.remove(
    "moon-mode"
  );

  await sleep(500);

}

async function showSongAnimation(song){

const card =
document.createElement("div");

card.className =
"paper-card";

const grid =
document.createElement("div");

grid.className =
"paper-grid";

for(let i=0;i<30;i++){

const cell =
document.createElement("div");

cell.className =
"paper-cell";

grid.appendChild(cell);

}

card.appendChild(grid);

const result =
document.createElement("div");

result.className =
"song-result";

card.appendChild(result);

animationArea.appendChild(card);

playSongEffect(song);

const cells =
grid.querySelectorAll(".paper-cell");

for(let i=0;i<song.length;i++){

if(i >= cells.length) break;

cells[i].textContent =
song[i];

await sleep(80);

}

let isNew = false;

if(!data.owned[song]){

data.owned[song] = {

count:1,
firstDate:todayString()

};

isNew = true;

}else{

data.owned[song].count++;

}

if(isNew){

result.innerHTML =
`${song}<br><span class="new-song">初獲得</span>`;

}else{

result.innerHTML =
`${song}<br><span class="owned-song">所持済み</span>`;

}

}

async function runGacha(){

  if(data.lastDate !== todayString()){
    data.lastDate = todayString();
    data.dailyCount = 0;
  }

  // 1日20回制限
  if(data.dailyCount >= 20){
    updateStatus();
    return;
  }

  data.dailyCount++;
  saveData();
  updateStatus();

  animationArea.innerHTML = "";

  const song = randomSong();

await showSongAnimation(song);

renderCompleteRecord();
  
  const oldTitles =
data.titles.map(
t => t.name
);

const titles =
checkTitles();

const newTitles =
titles.filter(
title =>
!oldTitles.includes(title)
);

newTitles.sort((a,b)=>{

  if(a === "幻燈") return 1;

  if(b === "幻燈") return -1;

  return 0;

});

for(const title of newTitles){

  data.titles.push({
    name:title.replace(" 完成",""),
    date:todayString()
  });

}

if(
  isAllComplete()
  &&
  !data.completeDate
){

  data.completeDate =
  todayString();

  data.completePulls =
  Object.values(data.owned)
  .reduce(
    (sum,song)=>
    sum + song.count,
    0
  );

  saveData();

  await showCompletePopup();

}

saveData();

for(const title of newTitles){

  await showTitleUnlock(title);

}

renderCollection();

renderTitles();
  
}

function renderCollection(mode="all"){

collectionGrid.innerHTML = "";

SONGS.forEach(song=>{

const owned =
data.owned[song];
  
if(
mode==="owned"
&&
!owned
){

return;

}

if(
mode==="missing"
&&
owned
){

return;

}

const card =
document.createElement("div");

card.className =
"song-card";

if(!owned){

card.classList.add(
"missing"
);

}

if(owned){

card.innerHTML =

`<div class="song-name">
${song}

</div>

<div class="song-count">
所持回数:
${owned.count}
</div>`;

}else{

card.innerHTML =

`<div class="song-name">
未取得

</div>

<div class="song-count">
？？？
</div>`;

}

card.addEventListener(
"click",
()=>showDetail(song)
);

collectionGrid.appendChild(
card
);

});

updateStatus();
renderTopSongs();

}

function showDetail(song){

detailTitle.textContent =
song;

const owned =
data.owned[song];

if(!owned){

detailBody.innerHTML =

`未取得です`;

}else{

detailBody.innerHTML =

`
初獲得日:
${owned.firstDate} <br><br>

所持回数:
${owned.count}
回
`;

}

modal.classList.remove(
"hidden"
);

}

closeModal.addEventListener(
"click",
()=>{

modal.classList.add(
"hidden"
);

}
);

modal.addEventListener(
"click",
(e)=>{

if(e.target===modal){

modal.classList.add(
"hidden"
);

}

}
);

document
.getElementById(
"showAllBtn"
)
.addEventListener(
"click",
()=>renderCollection("all")
);

document
.getElementById(
"showOwnedBtn"
)
.addEventListener(
"click",
()=>renderCollection("owned")
);

document
.getElementById(
"showMissingBtn"
)
.addEventListener(
"click",
()=>renderCollection("missing")
);

gachaBtn.addEventListener(
"click",
runGacha
);

loadPlayerName();

saveNameBtn.addEventListener(
"click",
savePlayerName
);

updateStatus();

renderCollection();

renderTopSongs();

renderTitles();

renderCompleteRecord();
