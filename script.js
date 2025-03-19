let startValue = 50;
let monsterList = [];
let logArray = [];
let activeMonster;

let isOpen = false

const energyButton = document.querySelector(".energy-btn");
const playButton = document.querySelector(".play-btn");
const feedButton = document.querySelector(".feed-btn");
const addCard = document.querySelector('.div-add-new-monster-card')
const overlay = document.querySelector('.overlay')

const addbutton = document.querySelector(".add-btn");

function Monster(name, monsterType) {
  this.name = name;
  this.monsterType = monsterType;
  this.energy = startValue;
  this.happiness = startValue;
  this.fullness = startValue;

  this.feed = function () {
    if (this.fullness < 100) {
      this.fullness = Math.min(this.fullness + 30, 100);
    }
    if (this.happiness < 100) {
      this.happiness = Math.min(this.happiness + 5, 100);
    }
    if (this.energy > 0) {
      this.energy = Math.max(this.energy - 10, 0);
    }

    logArray.push(`You gave ${this.name} some food!`);
    renderLog();
    renderMonster();
  };

  this.rest = function () {
    this.fullness = Math.max(this.fullness - 10, 0);
    this.happiness = Math.max(this.happiness - 10, 0);
    this.energy = Math.min(this.energy + 40, 100);

    logArray.push(`${this.name} took a nap!`);
    renderLog();
    renderMonster();
  };
  this.play = function () {
    this.fullness = Math.max(this.fullness - 10, 0);

    this.happiness = Math.min(this.happiness + 30, 100);

    this.energy = Math.max(this.energy - 10, 0);

    logArray.push(`You played with ${this.name}!`);
    renderLog();
    renderMonster();
  };
}

const renderMonster = () => {

  if (activeMonster.energy === 0 || activeMonster.happiness === 0 || activeMonster.fullness === 0) {
    logArray.push(`${activeMonster.name} ran away!`);
    
    monsterList = monsterList.filter(monster => monster !== activeMonster);

    activeMonster = monsterList.length > 0 ? monsterList[0] : null;

    renderMonsterList();
    renderLog();

    if (!activeMonster) return;
  }



  const monsterName = document.getElementById("monster-name");
  const monsterType = document.querySelector(".monster-type");
  const monsterEnergy = document.querySelector(".energy");
  const monsterHunger = document.querySelector(".hunger");
  const monsterHappiness = document.querySelector(".happiness");
  const monsterImage = document.querySelector(".monster-image");

  monsterName.value = activeMonster.name
  monsterType.innerHTML = activeMonster.monsterType;
  monsterEnergy.innerHTML = activeMonster.energy;
  monsterHunger.innerHTML = activeMonster.fullness;
  monsterHappiness.innerHTML = activeMonster.happiness;

  let type = activeMonster.monsterType.toLowerCase();
  if(monsterList.length == 0){
    monsterImage.src = '/images/dcxehfe-dd22d80d-4cff-49bf-be56-bb51f5ea0a78.gif'
  }else{
    monsterImage.src =
    type === "dragon"
    ? "/images/dragon.png"
    : type === "golem"
    ? "/images/golem.png"
    : type === "troll"
    ? "/images/troll.png"
    : "/images/unknown.png";
  }
};

const renderMonsterList = () => {
  const monsterImage = document.querySelector(".monster-image");

  const monsterSelect = document.getElementById("monster-name");
  const monsterType = document.querySelector(".monster-type");
  const noMonsterText = document.querySelector(".no-monster");
  const statDiv = document.querySelector(".stat-container");
  const activityButton = document.querySelectorAll('.monster-btn')
  monsterSelect.innerHTML = "";

  if (monsterList.length === 0) {
    activityButton.forEach(button => {
      button.disabled = true
      button.style.filter = 'opacity(50%)'
      button.style.cursor = 'default'
    });
    monsterImage.src = '/images/dcxehfe-dd22d80d-4cff-49bf-be56-bb51f5ea0a78.gif';
    monsterType.style.display = "none";
    monsterSelect.style.display = "none";
    statDiv.style.display = "none";
    noMonsterText.style.display = "block";

  } else {

      activityButton.forEach(button => {
      button.disabled = false
      button.style.filter = 'none'
      button.style.cursor = 'pointer'
    });
    monsterType.style.display = "block";
    monsterSelect.style.display = "block";
    statDiv.style.display = "flex";
    noMonsterText.style.display = "none";

    monsterList.forEach((monster) => {
      const monsterOption = document.createElement("option");
      monsterOption.value = monster.name;
      monsterOption.innerHTML = monster.name;
      monsterSelect.appendChild(monsterOption);
    });
  }
};

const addNewMonster = () => {
  const inputValue = document.getElementById("name"); 

  if (monsterList.length > 3) {
    alert("stop");
    return;
  }

  const monsterName = inputValue.value.trim(); 
  const monsterType = document.getElementById("type").value;

  if (monsterName.length === 0) {
    alert("Name cannot be empty");
    return;
  }

  let newMonster = new Monster(monsterName, monsterType);
  monsterList.push(newMonster);
  activeMonster = monsterList[monsterList.length - 1];

  inputValue.value = ''; 
  isOpen = false;

  renderMonsterList();
  renderMonster();

  addCard.style.display = "none";
  overlay.style.display = "none";

};


const handleChangeMonster = () => {
  const selectedMonsterName = document.getElementById("monster-name").value;

  activeMonster = monsterList.find(
    (monster) => monster.name === selectedMonsterName
  );

  if (activeMonster) {
    renderMonster();
  }
};

const renderLog = () => {
  const logDiv = document.querySelector(".log");
  logDiv.innerHTML = "";
  const reversedArr = logArray.reverse()
  logArray.forEach((log) => {
    
    const logItem = document.createElement("div");
    logItem.classList.add("log-item");
    logItem.innerHTML = log;

    if (log.includes("food")) {
      logItem.classList.add("log-feed");
    } else if (log.includes("played")) {
      logItem.classList.add("log-play");
    } else if (log.includes("nap")) {
      logItem.classList.add("log-rest");
    } else if (log.includes("ran")){
      logItem.classList.add('log-ranaway')
    }

    logDiv.appendChild(logItem);
  });
};

const handleToggle = () => {
  if(!isOpen){
    addCard.style.display = 'flex'
    overlay.style.display = 'block'
  }else{
    addCard.style.display = 'none'
    overlay.style.display = 'none'
  }
isOpen = !isOpen
 
}

const addNewButton = document.querySelector('.add-new')
if(overlay){
  overlay.addEventListener('click', handleToggle)
}
addNewButton.addEventListener('click', handleToggle)
feedButton.addEventListener("click", () => activeMonster.feed());
playButton.addEventListener("click", () => activeMonster.play());
energyButton.addEventListener("click", () => activeMonster.rest());
addbutton.addEventListener("click", addNewMonster);
document
  .getElementById("monster-name")
  .addEventListener("change", handleChangeMonster);

renderMonsterList();
