// 1: Типи товарів
type BaseProduct = {
    id: number;
    name: string;
    price: number;
    description?: string; 
};

type Electronics = BaseProduct & {
    category: 'electronics';
    brand: string;
    warranty: number;
};

type Clothing = BaseProduct & {
    category: 'clothing';
    size: string;
    material: string;
};

type Book = BaseProduct & {
    category: 'book';
    author: string;
    genre: string;
};

// 2: Функції для пошуку товарів

// Пошук за ID
const findProduct = <T extends BaseProduct>(products: T[], id: number): T | undefined => {
    return products.find(product => product.id === id);
};

// Фільтрація за ціною
const filterByPrice = <T extends BaseProduct>(products: T[], maxPrice: number): T[] => {
    return products.filter(product => product.price <= maxPrice);
};

// Функція для додавання товару в кошик
const addToCart = <T extends BaseProduct>(cart: CartItem<T>[], product: T, quantity: number): CartItem<T>[] => {
    const itemIndex = cart.findIndex(item => item.product.id === product.id);
    if (itemIndex > -1) {
        cart[itemIndex].quantity += quantity;
    } else {
        cart.push({ product, quantity });
    }
    return cart;
};

// Функція для підрахунку загальної вартості
const calculateTotal = <T extends BaseProduct>(cart: CartItem<T>[]): number => {
    return cart.reduce((total, item) => total + item.product.price * item.quantity, 0);
};

// 3: Створення кошика
type CartItem<T> = {
    product: T;
    quantity: number;
};

// 4: Тестування функцій для всіх типів товарів

// Створення тестових даних
const electronics: Electronics[] = [
    {
        id: 1,
        name: "Телефон",
        price: 10000,
        description: "Сучасний смартфон з великим екраном і швидким процесором",
        category: 'electronics',
        brand: "Samsung",
        warranty: 24
    },
    {
        id: 2,
        name: "Ноутбук",
        price: 20000,
        description: "Потужний ноутбук для роботи і розваг",
        category: 'electronics',
        brand: "Dell",
        warranty: 12
    }
];

const clothing: Clothing[] = [
    {
        id: 3,
        name: "Футболка",
        price: 500,
        description: "Зручна футболка з натуральної бавовни",
        category: 'clothing',
        size: "L",
        material: "Cotton"
    },
    {
        id: 4,
        name: "Джинси",
        price: 800,
        description: "Зручні джинси для повсякденного носіння",
        category: 'clothing',
        size: "M",
        material: "Denim"
    }
];

const books: Book[] = [
    {
        id: 5,
        name: "Історична драма",
        price: 300,
        description: "Відома класична література від українського автора",
        category: 'book',
        author: "Іван Франко",
        genre: "Історія"
    },
    {
        id: 6,
        name: "Роман",
        price: 400,
        description: "Захоплюючий роман про пригоди і боротьбу",
        category: 'book',
        author: "Марія Левченко",
        genre: "Пригоди"
    }
];

// Тест 1: Пошук товару для різних категорій
console.log('Тест 1: Пошук товару');
const electronicsProduct1 = findProduct(electronics, 1);
const electronicsProduct2 = findProduct(electronics, 2);
const clothingProduct1 = findProduct(clothing, 3);
const clothingProduct2 = findProduct(clothing, 4);
const bookProduct1 = findProduct(books, 5);
const bookProduct2 = findProduct(books, 6);

console.log(
    electronicsProduct1 ? `Товар знайдено: ${electronicsProduct1.name}` : 'Товар не знайдено'
);
console.log(
    electronicsProduct2 ? `Товар знайдено: ${electronicsProduct2.name}` : 'Товар не знайдено'
);
console.log(
    clothingProduct1 ? `Товар знайдено: ${clothingProduct1.name}` : 'Товар не знайдено'
);
console.log(
    clothingProduct2 ? `Товар знайдено: ${clothingProduct2.name}` : 'Товар не знайдено'
);
console.log(
    bookProduct1 ? `Товар знайдено: ${bookProduct1.name}` : 'Товар не знайдено'
);
console.log(
    bookProduct2 ? `Товар знайдено: ${bookProduct2.name}` : 'Товар не знайдено'
);

// Тест 2: Фільтрація товарів за ціною
console.log('Тест 2: Фільтрація товарів за ціною');
const filteredElectronics = filterByPrice(electronics, 15000);
const filteredClothing = filterByPrice(clothing, 1000);
const filteredBooks = filterByPrice(books, 300);

console.log(
    `Фільтрована електроніка: ${filteredElectronics.length} товарів знайдено (ціна <= 15000)`
);
console.log(
    `Фільтрований одяг: ${filteredClothing.length} товарів знайдено (ціна <= 1000)`
);
console.log(
    `Фільтровані книги: ${filteredBooks.length} товарів знайдено (ціна <= 300)`
);

// Тест 3: Додавання товарів до кошика
console.log('Тест 3: Додавання товару в кошик');
let cart: CartItem<BaseProduct>[] = [];
if (electronicsProduct1) cart = addToCart(cart, electronicsProduct1, 1);
if (electronicsProduct2) cart = addToCart(cart, electronicsProduct2, 1);
if (clothingProduct1) cart = addToCart(cart, clothingProduct1, 2);
if (clothingProduct2) cart = addToCart(cart, clothingProduct2, 1);
if (bookProduct1) cart = addToCart(cart, bookProduct1, 1);
if (bookProduct2) cart = addToCart(cart, bookProduct2, 2);

const totalItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

console.log(`Кількість товарів в кошику: ${totalItemsInCart}`);
cart.forEach(item => {
    console.log(
        `Товар: ${item.product.name}, Кількість: ${item.quantity}, Ціна: ${item.product.price}`
    );
});


// Тест 4: Обчислення загальної вартості кошика
console.log('Тест 4: Підсумок вартості кошика');
const total = calculateTotal(cart);
console.log(`Загальна вартість кошика: ${total}`);

// Порівняння з очікуваною сумою
const expectedTotal = 32900; // нова очікувана сума
if (total === expectedTotal) {
    console.log('Підсумок вартості кошика правильний!');
} else {
    console.log(`Помилка! Очікувана вартість: ${expectedTotal}, отримана: ${total}`);
}