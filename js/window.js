// js/window.js

// Хранилище точек
const points = [];

// Функция для открытия/закрытия всплывающего окна
function togglePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.toggle('active');
}

// Обработка формы для создания точки
document.getElementById('event-form').addEventListener('submit', (event) => {
  event.preventDefault(); // Предотвращаем отправку формы по умолчанию

  const category = document.getElementById('category').value;
  const description = document.getElementById('description').value;

  if (!category || !description) {
    alert('Пожалуйста, выберите категорию и введите описание.');
    return;
  }

  // Создаем новую точку
  const newPoint = {
    category,
    description
  };

  // Добавляем точку в хранилище
  points.push(newPoint);

  // Очищаем форму
  document.getElementById('category').value = '';
  document.getElementById('description').value = '';

  // Закрываем окно после отправки
  togglePopup('popup');

  // Обновляем список точек
  updatePointsList();
});

// Обработка нажатия на кнопку для создания точки
document.getElementById('button3').addEventListener('click', () => {
  togglePopup('popup');
});

// Обработка нажатия на кнопку для просмотра списка точек
document.getElementById('button1').addEventListener('click', () => {
  togglePopup('popup-list');
  updatePointsList();
});

// Обработка нажатия на кнопку закрытия всплывающего окна
document.getElementById('close-popup').addEventListener('click', () => {
  togglePopup('popup');
});

// Функция для обновления списка точек
function updatePointsList() {
  const pointsList = document.getElementById('points-list');
  pointsList.innerHTML = ''; // Очищаем список

  points.forEach((point, index) => {
    const listItem = document.createElement('li');
    listItem.innerHTML = `
      <div class="point-details">
        <strong>${point.category}</strong><br>
        ${point.description}
      </div>
      <button class="delete-point" data-index="${index}">Удалить</button>
    `;
    pointsList.appendChild(listItem);
  });

  // Добавляем обработчики для кнопок удаления
  const deleteButtons = document.querySelectorAll('.delete-point');
  deleteButtons.forEach(button => {
    button.addEventListener('click', (event) => {
      const index = event.target.getAttribute('data-index');
      points.splice(index, 1);
      updatePointsList();
    });
  });
}