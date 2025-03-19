let startValue = 50;
let monsterList = [];
let activeMonster;

function Monster(name, monsterType) {
  this.name = name;
  this.monsterType = monsterType;
  this.energy = startValue;
  this.happiness = startValue;
  this.fullness = startValue;

  this.feed = function () {
    this.fullness += 10;
    
  };

  this.rest = function () {
    this.energy += 10;
    
  };

  this.playWith = function () {
    this.happiness += 10;
    
  };
}
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
    const noMonsterText = document.querySelector('.no-monster')
    monsterSelect.innerHTML = "";

    if(monsterList.length === 0){
        monsterSelect.style.display = 'none'
        noMonsterText.style.display = 'block'

    }else{   
        monsterSelect.style.display = 'block'
        noMonsterText.style.display = 'none'

        monsterList.forEach((monster) => {
            const monsterOption = document.createElement("option");
            monsterOption.value = monster.name;
            monsterOption.innerHTML = monster.name;
            monsterSelect.appendChild(monsterOption);
        });
    }
};

const addNewMonster = () => {
    if(monsterList.length > 3) {
        alert('stop')
    }else{

        const monsterName = document.getElementById("name").value;
        const monsterType = document.getElementById("type").value;
        
        let newMonster = new Monster(monsterName, monsterType);
        monsterList.push(newMonster);
        activeMonster = monsterList[0]
        renderMonsterList();
        renderMonster()
        
    }
  console.log(monsterList);
};

const handleChangeMonster = () => {
    const selectedMonsterName =  document.getElementById("monster-name").value;

    activeMonster = monsterList.find(monster => monster.name === selectedMonsterName);

    if (activeMonster) {
        renderMonster();
    }
}

const addbutton = document.querySelector(".add-btn");
addbutton.addEventListener("click", addNewMonster);
document.getElementById("monster-name").addEventListener("change", handleChangeMonster);

renderMonsterList();
