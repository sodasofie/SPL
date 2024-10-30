export function openModal(): void {
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
    modal.style.zIndex = '1000';
    modal.style.transition = 'opacity 0.3s ease';
    modal.style.opacity = '1';

    modal.innerHTML = `
        <div style="text-align: center; background: rgba(255, 255, 255, 0.9); padding: 20px; border-radius: 10px;">
            <h2 style="color: #414164;">Модальне Вікно</h2>
            <p style="color: #07071a;">Це вміст модального вікна!</p>
            <button id="closeModal" style="padding: 10px 20px; background: #414164; color: white; border: none; border-radius: 5px; cursor: pointer;">Закрити</button>
        </div>
    `;

    document.body.appendChild(modal);

    document.getElementById('closeModal')?.addEventListener('click', () => {
        modal.remove();
    });
}
