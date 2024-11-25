// 1. Базова структура для контенту 

interface BaseContent {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    status: 'чернетка' | 'опубліковано' | 'архівовано';
}

interface Article extends BaseContent {
    title: string;
    body: string;
    author: string;
    tags?: string[];
}

interface Product extends BaseContent {
    name: string;
    description: string;
    price: number;
    tags?: string[];
}

// 2. Операції з контентом 

type ContentOperations<T extends BaseContent> = {
    create(content: T): T;
    read(id: string): T | null;
    update(id: string, changes: Partial<T>): T | null;
    delete(id: string): boolean;
};

function createContentOperations<T extends BaseContent>(): ContentOperations<T> {
    const storage: Record<string, T> = {};

    return {
        create(content: T): T {
            storage[content.id] = content;
            return content;
        },
        read(id: string): T | null {
            return storage[id] || null;
        },
        update(id: string, changes: Partial<T>): T | null {
            if (!storage[id]) return null;
            storage[id] = { ...storage[id], ...changes, updatedAt: new Date() };
            return storage[id];
        },
        delete(id: string): boolean {
            if (!storage[id]) return false;
            delete storage[id];
            return true;
        },
    };
}

// 3. Управління правами доступу

type Role = 'admin' | 'editor' | 'viewer';

type Permission = {
    create: boolean;
    read: boolean;
    update: boolean;
    delete: boolean;
};

type AccessControl<T extends BaseContent> = {
    [role in Role]: Partial<Permission>;
};

function canPerform<T extends BaseContent>(
    role: Role,
    permission: keyof Permission,
    accessControl: AccessControl<T>
): boolean {
    return !!accessControl[role]?.[permission];
}

// 4. Валідація

type ValidationResult = { isValid: boolean; errors: string[] };

type Validator<T> = (content: T) => ValidationResult;

const validateArticle: Validator<Article> = (article) => {
    const errors: string[] = [];
    if (!article.title) errors.push('Потрібен заголовок.');
    if (!article.body) errors.push('Потрібна основна частина статті.');
    return { isValid: errors.length === 0, errors };
};

const validateProduct: Validator<Product> = (product) => {
    const errors: string[] = [];
    if (!product.name) errors.push('Потрібна назва продукту.');
    if (!product.description) errors.push('Потрібен опис продукту.');
    if (product.price <= 0) errors.push('Ціна продукту повинна бути більшою за нуль.');
    return { isValid: errors.length === 0, errors };
};

// 5. Версіонування

type Versioned<T extends BaseContent> = T & {
    version: number;
    history: T[];
};

function createVersionedContent<T extends BaseContent>(content: T): Versioned<T> {
    return {
        ...content,
        version: 1,
        history: [],
    };
}

function updateVersion<T extends BaseContent>(
    content: Versioned<T>,
    changes: Partial<T>
): Versioned<T> {
    const updatedContent: Versioned<T> = {
        ...content,
        ...changes,
        updatedAt: new Date(),
        version: content.version + 1,
        history: [...content.history, { ...content }],
    };
    return updatedContent;
}

// Використання 

// Операції для статей
const articleOperations = createContentOperations<Article>();
const newArticle = articleOperations.create({
    id: '1',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'чернетка',
    title: 'НОВА стаття',
    body: 'Вау. Це стаття. ',
    author: 'Якийсь Автор',
});
console.log('Створено статтю:', newArticle);

// Перевірка прав доступу для статей
const articleAccess: AccessControl<Article> = {
    admin: { create: true, read: true, update: true, delete: true },
    editor: { create: true, read: true, update: true },
    viewer: { read: true },
};
const canEditorUpdate = canPerform('editor', 'update', articleAccess);
console.log('Чи може редактор оновлювати статті?', canEditorUpdate);

// Валідація статті
const validation = validateArticle(newArticle);
console.log('Валідація статті:', validation.isValid ? 'Валідна' : 'Не валідна', validation.errors);

// Версіонування статті
const versionedArticle = createVersionedContent(newArticle);
console.log('Версіонована стаття:', versionedArticle);

const updatedArticle = updateVersion(versionedArticle, { title: 'Перероблена та оновлена стаття' });
console.log('Оновлена версія статті:', updatedArticle);

// Операції для продуктів
const productOperations = createContentOperations<Product>();
const newProduct = productOperations.create({
    id: '2',
    createdAt: new Date(),
    updatedAt: new Date(),
    status: 'опубліковано',
    name: 'Мило',
    description: 'Натуральне мило ручної роботи.',
    price: 150,
});
console.log('Створено продукт:', newProduct);

// Оновлення продукту
const updatedProduct = productOperations.update('2', {
    name: 'Органічне мило',
    price: 200,
});
console.log('Оновлений продукт:', updatedProduct);

// Видалення продукту
const deletedProduct = productOperations.delete('2');
console.log('Чи було видалено продукт?', deletedProduct);

// Перевірка прав доступу для продуктів
const productAccess: AccessControl<Product> = {
    admin: { create: true, read: true, update: true, delete: true },
    editor: { create: true, read: true, update: true },
    viewer: { read: true },
};

const canAdminCreateProduct = canPerform('admin', 'create', productAccess);
console.log('Чи може адміністратор створювати продукти?', canAdminCreateProduct);

// Валідація продукту
const productValidation = validateProduct(newProduct);
console.log('Валідація продукту:', productValidation.isValid ? 'Валідний' : 'Не валідний', productValidation.errors);

// Версіонування продукту
const versionedProduct = createVersionedContent(newProduct);
console.log('Версіонований продукт:', versionedProduct);

// Оновлення версії продукту
const updatedVersionedProduct = updateVersion(versionedProduct, { name: 'Оновлене мило', description: 'Органічне мило з ароматом лаванди' });
console.log('Оновлена версія продукту:', updatedVersionedProduct);
  console.log('- - - - - - - - - - - - - - - - - - - -');