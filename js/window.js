// js/window.js

document.getElementById('button1').addEventListener('click', () => {
  togglePopup();
});

document.getElementById('button2').addEventListener('click', () => {
  // Другая логика для Кнопки 2
});

document.getElementById('button3').addEventListener('click', () => {
  // Другая логика для Кнопки 3
});

function togglePopup() {
  const popup = document.getElementById('popup');
  popup.classList.toggle('active');
}