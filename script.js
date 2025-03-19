let startValue = 50;
let monsterList = [];
let logArray = [];
let activeMonster;

const energyButton = document.querySelector(".energy-btn");
const playButton = document.querySelector(".play-btn");
const feedButton = document.querySelector(".feed-btn");

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

    logArray.push(`You gave ${this.name} some food`)
    renderMonster();

  };

  this.rest = function () {
    this.fullness = Math.max(this.fullness - 10, 0);
    this.happiness = Math.max(this.happiness - 10, 0);
    this.energy = Math.min(this.energy + 40, 100);

    logArray.push(`${this.name} took a nap`)
    renderMonster();

  };
  this.play = function () {
    this.fullness = Math.max(this.fullness - 10, 0);
    
    this.happiness = Math.min(this.happiness + 30, 100);
    
    this.energy = Math.max(this.energy - 10, 0);

    logArray.push(`You played with ${this.name}`)
    renderMonster();
  };
  
  };

const renderMonster = () => {
  //   const monsterName = document.querySelector(".monster-name");
  const monsterType = document.querySelector(".monster-type");
  const monsterEnergy = document.querySelector(".energy");
  const monsterHunger = document.querySelector(".hunger");
  const monsterHappiness = document.querySelector(".happiness");
  const monsterImage = document.querySelector(".monster-image");

  monsterType.innerHTML = activeMonster.monsterType;
  monsterEnergy.innerHTML = activeMonster.energy;
  monsterHunger.innerHTML = activeMonster.fullness;
  monsterHappiness.innerHTML = activeMonster.happiness;

  let type = activeMonster.monsterType.toLowerCase();

  monsterImage.src =
    type === "dragon"
      ? "/images/dragon.png"
      : type === "golem"
      ? "/images/golem.png"
      : type === "troll"
      ? "/images/troll.png"
      : "/images/unknown.png";
};

const renderMonsterList = () => {
  const monsterSelect = document.getElementById("monster-name");
  const monsterType = document.querySelector(".monster-type");
  const noMonsterText = document.querySelector(".no-monster");
  monsterSelect.innerHTML = "";

  if (monsterList.length === 0) {
    monsterType.style.display = "none";
    monsterSelect.style.display = "none";

    noMonsterText.style.display = "block";
  } else {
    monsterType.style.display = "block";
    monsterSelect.style.display = "block";
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
  if (monsterList.length > 3) {
    alert("stop");
  } else {
    const monsterName = document.getElementById("name").value;
    const monsterType = document.getElementById("type").value;

    let newMonster = new Monster(monsterName, monsterType);
    monsterList.push(newMonster);
    activeMonster = monsterList[monsterList.length - 1];
    renderMonsterList();
    renderMonster();
  }
  console.log(monsterList);
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



feedButton.addEventListener("click", () => activeMonster.feed());
playButton.addEventListener("click", () => activeMonster.play());
energyButton.addEventListener("click", () => activeMonster.rest());
addbutton.addEventListener("click", addNewMonster);
document
  .getElementById("monster-name")
  .addEventListener("change", handleChangeMonster);

renderMonsterList();
