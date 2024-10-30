class Cat {
    constructor(name, age, color) {
        this.name = name;
        this.age = age;
        this.color = color;
    }

    meow() {
        return `${this.name} meows`;
    }

    sleep(hours) {
        return `${this.name} has been sleeping for ${hours} hours.`;
    }

    eat(food) {
        return `${this.name} is eating ${food}.`;
    }

    play(toy) {
        return `${this.name} is playing with a ${toy}.`;
    }

    getInfo() {
        return `${this.name} is a ${this.age}-year old ${this.color} cat.`;
    }
}

let wisp = new Cat('Wisp', 1, 'dirty white');
let herbert = new Cat('Herbert', 5, 'white');
let bean = new Cat('Bean', 3, 'red and white');
let noodle = new Cat('Noodle', 4, 'brown');

let cats = [wisp, herbert, bean, noodle];

function displayCats(cats) {
    for (let cat of cats) {
        console.log(cat.getInfo());
    }
}

function makeAllCatsMeow(cats) {
    for (let cat of cats) {
        console.log(cat.meow());
    }
}

function feedAllCats(cats, food) {
    for (let cat of cats) {
        console.log(cat.eat(food));
    }
}

function playWithAllCats(cats, toy) {
    for (let cat of cats) {
        console.log(cat.play(toy));
    }
}

displayCats(cats);

makeAllCatsMeow(cats);

feedAllCats(cats, 'fish');

playWithAllCats(cats, 'mouse toy');


function createCat(name, age, color) {
    return new Cat(name, age, color);
}

function updateCatAge(cat, newAge) {
    cat.age = newAge;
    console.log(`${cat.name}'s age has been updated to ${newAge}.`);
}

function changeCatColor(cat, newColor) {
    cat.color = newColor;
    console.log(`${cat.name}'s color has been changed to ${newColor}.`);
}


let luna = createCat('Luna', 2, 'black');
console.log(luna.getInfo());
updateCatAge(luna, 3);
changeCatColor(luna, 'grey and white');
console.log(luna.getInfo());

function countCatsOlderThan(cats, age) {
    let count = 0;
    for (let cat of cats) {
        if (cat.age > age) {
            count++;
        }
    }
    return count;
}

let olderCatsCount = countCatsOlderThan(cats, 2);
console.log(`Number of cats older than 2 years: ${olderCatsCount}`);

function getCatNames(cats) {
    return cats.map(cat => cat.name);
}

let catNames = getCatNames(cats);
console.log(`Cat names: ${catNames.join(', ')}`);

function findCatByName(cats, name) {
    return cats.find(cat => cat.name === name);
}

let foundCat = findCatByName(cats, 'Herbert');
console.log(foundCat ? foundCat.getInfo() : 'Cat not found.');


function simulateDay(cat) {
    console.log(cat.meow());
    console.log(cat.eat('treats'));
    console.log(cat.play('laser pointer'));
    console.log(cat.sleep(8));
}

for (let cat of cats) {
    console.log(`A day in the life of ${cat.name}:`);
    simulateDay(cat);
    console.log('-------------------');
}

function createCatReport(cats) {
    let report = 'Cat Report:\n';
    for (let cat of cats) {
        report += `Name: ${cat.name}, Age: ${cat.age}, Color: ${cat.color}\n`;
    }
    return report;
}

let report = createCatReport(cats);
console.log(report);

function catBirthday(cat) {
    cat.age++;
    console.log(`Happy birthday to the ${cat.name}! ${cat.name} is now ${cat.age} years old.`);
}

for (let cat of cats) {
    catBirthday(cat);
}
