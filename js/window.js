// js/window.js

document.getElementById('button1').addEventListener('click', () => {
  
});

document.getElementById('button2').addEventListener('click', () => {
  // Другая логика для Кнопки 2
});

document.getElementById('button3').addEventListener('click', () => {
  togglePopup();
});

function togglePopup() {
  const popup = document.getElementById('popup');
  popup.classList.toggle('active');
}

// Обработка формы
document.getElementById('event-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;

  if (!category || !description) {
    alert('Пожалуйста, выберите категорию и введите описание.');
    return;
  }

  // Здесь можно добавить логику для создания точки на карте
  console.log('Категория:', category);
  console.log('Описание:', description);

  // Закрываем окно после отправки
  togglePopup();
});