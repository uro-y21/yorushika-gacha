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
"森の協会",
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
'{"owned":{},"lastDate":"","dailyCount":0}'
);

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

if(
data.lastDate === todayString()
&&
data.dailyCount >= 2
){

remaining.textContent =
"本日のガチャ終了";

gachaBtn.disabled = true;

}else{

remaining.textContent =
`残り ${2 - (data.dailyCount || 0)} 回`;

gachaBtn.disabled = false;

}else{

remaining.textContent =
"ガチャ可能";

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

data.dailyCount++;

saveData();

updateStatus();

animationArea.innerHTML = "";

const pulls = [];

for(let i=0;i<10;i++){

pulls.push(
randomSong()
);

}

const specialSongs = [

"夜行",
"花に亡霊",
"春泥棒",
"晴る"

];

const specialHit =
pulls.some(
song =>
specialSongs.includes(song)
);

if(specialHit){

document.body.classList.add(
"night-mode"
);

}else{

document.body.classList.remove(
"night-mode"
);

}

for(const song of pulls){

await showSongAnimation(song);

await sleep(300);

}

saveData();

renderCollection();

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
()=>{
alert("完了");
}
);

updateStatus();

renderCollection();

renderTopSongs();
