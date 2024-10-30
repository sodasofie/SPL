function openModal() {
    const modal = document.createElement('div');
    modal.id = 'modal';
    modal.style.position = 'fixed';
    modal.style.top = '0';
    modal.style.left = '0';
    modal.style.width = '100%';
    modal.style.height = '100%';
    modal.style.backgroundColor = 'rgba(100, 100, 150, 0.6)';
    modal.style.color = 'white';
    modal.style.display = 'flex';
    modal.style.justifyContent = 'center';
    modal.style.alignItems = 'center';
    modal.style.zIndex = '1000'; // Високий z-index
    modal.style.transition = 'opacity 0.3s ease'; // Додати анімацію
    modal.style.opacity = '1'; // Прозорість

    modal.innerHTML = `
        <div style="text-align: center; background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px;">
            <h2 style="color: #414164;">Модальне Вікно</h2>
            <p style="color: #07071a;">Це вміст модального вікна!</p>
            <button id="closeModal" style="padding: 10px 20px; background: #414164; color: white; border: none; border-radius: 5px; cursor: pointer;">Закрити</button>
        </div>
    `;

    document.body.appendChild(modal);

    // Закриття модального вікна
    document.getElementById('closeModal')?.addEventListener('click', () => {
        modal.remove();
    });
}



// Додавання обробника події до кнопки
const button = document.getElementById('arrowDown');
button?.addEventListener('click', (event) => {
    event.preventDefault();
    openModal();
});

// Скролл анімація
window.addEventListener('scroll', () => {
    const scrollPosition = window.scrollY;
    const header = document.getElementById('header');
    if (scrollPosition > 100) {
        header?.classList.add('scrolled');
    } else {
        header?.classList.remove('scrolled');
    }
});

// Fetch даних з API
async function fetchData() {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data = await response.json();
        const postsSection = document.querySelector('.posts');
        
        data.forEach((post: { title: string; body: string; }) => {
            const article = document.createElement('article');
            article.innerHTML = `
                <header>
                    <h2>${post.title}</h2>
                </header>
                <p>${post.body}</p>
                <ul class="actions special">
                    <li><a href="#" class="button">Full Story</a></li>
                </ul>
            `;
            postsSection?.appendChild(article);
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

// Виклик функції для отримання даних
fetchData();
