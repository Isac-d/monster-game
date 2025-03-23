// variables
let startValue = 50;
let monsterList = [];
let logArray = [];
let activeMonster;
let isOpen = false;

// DOM
const energyButton = document.querySelector(".energy-btn");
const playButton = document.querySelector(".play-btn");
const feedButton = document.querySelector(".feed-btn");
const addCard = document.querySelector(".div-add-new-monster-card");
const overlay = document.querySelector(".overlay");
const addNewButton = document.querySelector(".add-new");
const listContainer = document.querySelector('.monster-stats')
const addbutton = document.querySelector(".add-btn");
const monsterName = document.getElementById("monster-name");
const monsterType = document.querySelector(".monster-type");
const monsterEnergy = document.querySelector(".energy");
const monsterHunger = document.querySelector(".hunger");
const monsterHappiness = document.querySelector(".happiness");
const monsterImage = document.querySelector(".monster-image");
const monsterSelect = document.getElementById("monster-name");
const noMonsterText = document.querySelector(".no-monster");
const statDiv = document.querySelector(".stat-container");
const activityButton = document.querySelectorAll(".monster-btn");
const monsterContainer = document.querySelector('.image-container')
const logDiv = document.querySelector(".log");



// monster Class
class Monster {
  constructor(name, monsterType) {
    this.name = name;
    this.monsterType = monsterType;
    this.energy = 50;
    this.happiness = 50;
    this.fullness = 50;
    this.interval = null;
  }

  feed() {
    const oldFullness = this.fullness;
    const oldHappiness = this.happiness;
    const oldEnergy = this.energy;
    
    this.fullness = Math.min(this.fullness + 30, 100);
    this.happiness = Math.min(this.happiness + 5, 100);
    this.energy = Math.max(this.energy - 10, 0);
    
    // Show floating numbers for stat changes
    showStatChange(monsterHunger, this.fullness - oldFullness);
    showStatChange(monsterHappiness, this.happiness - oldHappiness);
    showStatChange(monsterEnergy, this.energy - oldEnergy);
    
    logArray.push(`You gave ${this.name} some food!`);
    renderLog();
    renderMonsterStats()
    renderMonster();
  }

  rest() {
    const oldFullness = this.fullness;
    const oldHappiness = this.happiness;
    const oldEnergy = this.energy;
    
    this.fullness = Math.max(this.fullness - 10, 0);
    this.happiness = Math.max(this.happiness - 10, 0);
    this.energy = Math.min(this.energy + 40, 100);
    
    // Show floating numbers for stat changes
    showStatChange(monsterHunger, this.fullness - oldFullness);
    showStatChange(monsterHappiness, this.happiness - oldHappiness);
    showStatChange(monsterEnergy, this.energy - oldEnergy);
    
    logArray.push(`${this.name} took a nap!`);
    renderLog();
    renderMonster();
    renderMonsterStats()
  }

  play() {
    const oldFullness = this.fullness;
    const oldHappiness = this.happiness;
    const oldEnergy = this.energy;
    
    this.fullness = Math.max(this.fullness - 10, 0);
    this.happiness = Math.min(this.happiness + 30, 100);
    this.energy = Math.max(this.energy - 10, 0);
    
    showStatChange(monsterHunger, this.fullness - oldFullness);
    showStatChange(monsterHappiness, this.happiness - oldHappiness);
    showStatChange(monsterEnergy, this.energy - oldEnergy);
    
    logArray.push(`You played with ${this.name}!`);
    renderLog();
    renderMonsterStats()
    renderMonster();
  }

  statTimer() {
    if (this.interval) return;
    this.interval = setInterval(() => {
      if (this.fullness > 0 || this.energy > 0 || this.happiness > 0) {
        const oldFullness = this.fullness;
        const oldHappiness = this.happiness;
        const oldEnergy = this.energy;
        
        this.fullness = Math.max(this.fullness - 15, 0);
        this.energy = Math.max(this.energy - 15, 0);
        this.happiness = Math.max(this.happiness - 15, 0);
        
        // Only show floating numbers if this monster is the active one
        if (this === activeMonster) {
          showStatChange(monsterHunger, this.fullness - oldFullness);
          showStatChange(monsterHappiness, this.happiness - oldHappiness);
          showStatChange(monsterEnergy, this.energy - oldEnergy);
        }
        
        renderMonster();
        renderMonsterStats()
      } else {
        clearInterval(this.interval);
        this.interval = null;
      }
    }, 10000);
  }
}

// delete monster
const deleteMonster = () => {
  if (!activeMonster) return;
  if (
    activeMonster.energy <= 0 ||
    activeMonster.happiness <= 0 ||
    activeMonster.fullness <= 0
  ) {
    logArray.push(`${activeMonster.name} ran away!`);
    monsterContainer.style.filter = 'opacity(0)'

    setTimeout(() => {
            
      monsterList = monsterList.filter((monster) => monster !== activeMonster);
      activeMonster = monsterList.length > 0 ? monsterList[0] : null;
      renderMonster()
      renderMonsterList();
      renderMonsterStats();
      renderLog();

      monsterContainer.style.filter = 'opacity(100)'
      
    }, 500);

  }
};


// render monster
const renderMonster = () => {
  deleteMonster();
  if (!activeMonster) return;
  
  monsterName.value = activeMonster.name;
  monsterType.innerHTML = activeMonster.monsterType;
  monsterEnergy.innerHTML = activeMonster.energy;
  monsterHunger.innerHTML = activeMonster.fullness;
  monsterHappiness.innerHTML = activeMonster.happiness;
  
  let type = activeMonster.monsterType.toLowerCase();
  if (monsterList.length == 0) {
    monsterImage.src =
      "images/dcxehfe-dd22d80d-4cff-49bf-be56-bb51f5ea0a78.gif";
  } else {
      monsterImage.src =
        type === "dragon"
          ? "images/dragon.png"
          : type === "golem"
          ? "images/golem.png"
          : type === "troll"
          ? "images/troll.png"
          : "images/unknown.png";
  }
};

const renderMonsterList = () => {
  monsterSelect.innerHTML = "";

  if (monsterList.length === 0) {
    activityButton.forEach((button) => {
      button.disabled = true;
      button.style.filter = "opacity(50%)";
      button.style.cursor = "default";
    });
    monsterImage.src =
      "images/dcxehfe-dd22d80d-4cff-49bf-be56-bb51f5ea0a78.gif";
    monsterType.style.display = "none";
    monsterSelect.style.display = "none";
    statDiv.style.display = "none";
    noMonsterText.style.display = "block";
  } else {
    activityButton.forEach((button) => {
      button.disabled = false;
      button.style.filter = "none";
      button.style.cursor = "pointer";
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
  renderMonsterStats()
};

const renderMonsterStats = () => {

  listContainer.style.filter = monsterList.length < 1 ? 'opacity(0)' : 'opacity(100)';

  
  listContainer.innerHTML = "";
  monsterList.forEach(monster => {
    const listDiv = document.createElement('div')
    listDiv.classList.add('monster-stat')
    listContainer.appendChild(listDiv)
    
    const monsterName = document.createElement('div')
    monsterName.classList.add('monster-stat-name')
    monsterName.innerHTML = monster.name

    const monsterValues = document.createElement('div')
    monsterValues.classList.add('monster-stat-values')
    monsterValues.innerHTML = `${monster.energy}/${monster.happiness}/${monster.fullness}`

    listDiv.appendChild(monsterName)
    listDiv.appendChild(monsterValues)
    
  });
}

// add new monster with constructor
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
  newMonster.statTimer(); 
  monsterList.push(newMonster);
  activeMonster = newMonster; 
  

  inputValue.value = "";
  isOpen = false;

  monsterContainer.style.filter = "opacity(0)";
    setTimeout(() => {
    monsterContainer.style.filter = "opacity(100)";
      renderMonsterList();
      renderMonsterStats()
      renderMonster();
    }, 500); 

  addCard.style.display = "none";
  overlay.style.display = "none";
};

// change monster from list
const handleChangeMonster = () => {
  const selectedMonsterName = document.getElementById("monster-name").value;

  activeMonster = monsterList.find(
    (monster) => monster.name === selectedMonsterName
  );

  if (activeMonster) {
    monsterContainer.style.filter = "opacity(0)";
    setTimeout(() => {
    monsterContainer.style.filter = "opacity(100)";

      renderMonster();
      activeMonster.statTimer();
    }, 500); 

  }
};

// render history log
const renderLog = () => {
  logDiv.innerHTML = "";

  const reversedArr = logArray.reverse();
  reversedArr.forEach((log) => {
    const logItem = document.createElement("div");
    logItem.classList.add("log-item");
    logItem.innerHTML = log;

    if (log.includes("food")) {
      logItem.classList.add("log-feed");
    } else if (log.includes("played")) {
      logItem.classList.add("log-play");
    } else if (log.includes("nap")) {
      logItem.classList.add("log-rest");
    } else if (log.includes("ran")) {
      logItem.classList.add("log-ranaway");
    }

    logDiv.appendChild(logItem);
  });
};
// toggle add new monster popup
const handleToggle = () => {
  if (!isOpen) {
    addCard.style.display = "flex";
    overlay.style.display = "block";
  } else {
    addCard.style.display = "none";
    overlay.style.display = "none";
  }
  isOpen = !isOpen;
};

// function to show floating number when stat changes
const showStatChange = (element, value) => {
  const floatingNumber = document.createElement('div');
  floatingNumber.classList.add('floating-number');
  
  if (value > 0) {
    floatingNumber.classList.add('increase');
    floatingNumber.innerText = `+${value}`;
  } else {
    floatingNumber.classList.add('decrease');
    floatingNumber.innerText = value;
  }
  
  // get the position of stat element
  const rect = element.getBoundingClientRect();

  floatingNumber.style.position = 'absolute';
  floatingNumber.style.left = `${rect.left + rect.width / 2}px`;
  floatingNumber.style.top = `${rect.top - 20}px`;
  
  document.body.appendChild(floatingNumber);
  
  setTimeout(() => {
    floatingNumber.style.top = `${rect.top - 50}px`;
    floatingNumber.style.opacity = '0';
  }, 50);
  
  setTimeout(() => {
    document.body.removeChild(floatingNumber);
  }, 1000);
};

// Event listeners
if (overlay) {
  overlay.addEventListener("click", handleToggle);
}
addNewButton.addEventListener("click", handleToggle);
feedButton.addEventListener("click", () => activeMonster.feed());
playButton.addEventListener("click", () => activeMonster.play());
energyButton.addEventListener("click", () => activeMonster.rest());
addbutton.addEventListener("click", addNewMonster);
document
  .getElementById("monster-name")
  .addEventListener("change", handleChangeMonster);


renderMonsterList();