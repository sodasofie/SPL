import { Post } from '../../types/CustomTypes';

export async function fetchData(): Promise<void> {
    try {
        const response = await fetch('https://jsonplaceholder.typicode.com/posts');
        const data: Post[] = await response.json();
        const postsSection = document.querySelector('.posts');
        
        data.forEach((post: Post) => {
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
