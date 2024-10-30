class Person {
    firstName: string;
    lastName: string;
    age: number;
    isEmployed: boolean;

    constructor(firstName: string = '', lastName: string = '', age: number = 0, isEmployed: boolean = false) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.age = age;
        this.isEmployed = isEmployed;
    }

    greet(): string {
        return `Hello, my name is ${this.firstName} ${this.lastName}.`;
    }

    getAge(): string {
        return `I am ${this.age} years old.`;
    }

    getEmploymentStatus(): string {
        return this.isEmployed ? `${this.firstName} is employed.` : `${this.firstName} is not employed.`;
    }

    haveBirthday(): string {
        this.age++;
        return `Happy Birthday, ${this.firstName}! You are now ${this.age}.`;
    }
}

const people: Person[] = [
    new Person('John', 'Doe', 25, true),
    new Person('Jane', 'Smith', 30, false),
    new Person('Bill', 'Gates', 65, true),
    new Person('Elon', 'Musk', 49, true),
    new Person('Ada', 'Lovelace', 28, false),
];

function displayPeople(people: Person[]): void {
    for (let person of people) {
        console.log(person.greet());
        console.log(person.getAge());
        console.log(person.getEmploymentStatus());
        console.log('---');
    }
}

displayPeople(people);

console.log('--- Giving John a birthday ---');
console.log(people[0].haveBirthday());

class Vehicle {
    brand: string;
    model: string;
    year: number;
    color: string;

    constructor(brand: string, model: string, year: number, color: string) {
        this.brand = brand;
        this.model = model;
        this.year = year;
        this.color = color;
    }

    startEngine(): string {
        return `The ${this.color} ${this.brand} ${this.model} (${this.year})'s engine started!`;
    }

    drive(): string {
        return `The ${this.color} ${this.brand} ${this.model} is driving.`;
    }

    paint(newColor: string): string {
        this.color = newColor;
        return `The car has been painted ${newColor}.`;
    }
}

const car: Vehicle = new Vehicle('Tesla', 'Model S', 2022, 'red');

console.log(car.startEngine());
console.log(car.drive());
console.log(car.paint('blue'));

class BankAccount {
    owner: string;
    balance: number;

    constructor(owner: string, balance: number) {
        this.owner = owner;
        this.balance = balance;
    }

    deposit(amount: number): string {
        this.balance += amount;
        return `Deposited $${amount}. New balance: $${this.balance}.`;
    }

    withdraw(amount: number): string {
        if (amount > this.balance) {
            return `Insufficient funds. Current balance: $${this.balance}.`;
        } else {
            this.balance -= amount;
            return `Withdrew $${amount}. New balance: $${this.balance}.`;
        }
    }

    checkBalance(): string {
        return `${this.owner}, your balance is $${this.balance}.`;
    }
}

const account: BankAccount = new BankAccount('Alice', 1000);

console.log(account.checkBalance());
console.log(account.deposit(500));
console.log(account.withdraw(200));
console.log(account.withdraw(1500));

function fibonacci(n: number): number {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

for (let i = 0; i < 10; i++) {
    console.log(`Fibonacci(${i}):`, fibonacci(i));
}

function generateRandomNumbers(count: number): number[] {
    let numbers: number[] = [];
    for (let i = 0; i < count; i++) {
        let num: number = Math.floor(Math.random() * 100);
        numbers.push(num);
    }
    return numbers;
}

let randomNumbers: number[] = generateRandomNumbers(10);
console.log('Random numbers:', randomNumbers);

randomNumbers.sort((a: number, b: number) => a - b);
console.log('Sorted numbers:', randomNumbers);

function reverseString(str: string): string {
    return str.split('').reverse().join('');
}

console.log(reverseString('Hello World'));

function isPrime(num: number): boolean {
    if (num <= 1) return false;
    for (let i = 2; i < num; i++) {
        if (num % i === 0) return false;
    }
    return true;
}

console.log('Prime numbers from 1 to 20:');
for (let i = 1; i <= 20; i++) {
    if (isPrime(i)) {
        console.log(i);
    }
}

function capitalizeWords(sentence: string): string {
    return sentence.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}

console.log(capitalizeWords('this is a random sentence'));

class Animal {
    name: string;
    species: string;

    constructor(name: string, species: string) {
        this.name = name;
        this.species = species;
    }

    makeSound(): string {
        return `${this.name} the ${this.species} makes a sound!`;
    }

    sleep(hours: number): string {
        return `${this.name} sleeps for ${hours} hours.`;
    }
}

const animals: Animal[] = [
    new Animal('Max', 'dog'),
    new Animal('Whiskers', 'cat'),
    new Animal('Nemo', 'fish'),
];

for (let animal of animals) {
    console.log(animal.makeSound());
    console.log(animal.sleep(8));
}

function findLongestWord(sentence: string): string {
    let words: string[] = sentence.split(' ');
    let longestWord: string = words[0];

    for (let word of words) {
        if (word.length > longestWord.length) {
            longestWord = word;
        }
    }

    return longestWord;
}

console.log(findLongestWord('The quick brown fox jumps over the lazy dog'));

function calculateFactorial(num: number): number {
    if (num === 0 || num === 1) return 1;
    return num * calculateFactorial(num - 1);
}

console.log('Factorials:');
for (let i = 0; i <= 5; i++) {
    console.log(`${i}! =`, calculateFactorial(i));
}

function average(arr: number[]): number {
    let sum: number = arr.reduce((acc: number, cur: number) => acc + cur, 0);
    return sum / arr.length;
}

console.log('Average of [1, 2, 3, 4, 5]:', average([1, 2, 3, 4, 5]));

class Book {
    title: string;
    author: string;
    pages: number;
    genre: string;

    constructor(title: string, author: string, pages: number, genre: string) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.genre = genre;
    }

    read(): string {
        return `You are reading "${this.title}" by ${this.author}.`;
    }

    getGenre(): string {
        return `${this.title} is a ${this.genre} book.`;
    }
}

const book: Book = new Book('1984', 'George Orwell', 328, 'dystopian');
console.log(book.read());
console.log(book.getGenre());

function countVowels(str: string): number {
    let count: number = 0;
    const vowels: string = 'aeiouAEIOU';

    for (let char of str) {
        if (vowels.includes(char)) {
            count++;
        }
    }

    return count;
}

console.log('Number of vowels in "Hello World":', countVowels('Hello World'));

function isPalindrome(str: string): boolean {
    const cleanedStr: string = str.replace(/[^a-zA-Z]/g, '').toLowerCase();
    return cleanedStr === cleanedStr.split('').reverse().join('');
}

console.log('Is "A man a plan a canal Panama" a palindrome?', isPalindrome('A man a plan a canal Panama'));
