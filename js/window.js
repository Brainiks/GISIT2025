// Хранилище точек
let points = [];

// Функция для открытия/закрытия всплывающего окна
function togglePopup(popupId) {
  const popup = document.getElementById(popupId);
  popup.classList.toggle('active');
}

// Функция для сохранения точек в localStorage
function savePointsToLocalStorage() {
  localStorage.setItem('points', JSON.stringify(points));
}

// Функция для загрузки точек из localStorage
function loadPointsFromLocalStorage() {
  const savedPoints = localStorage.getItem('points');
  if (savedPoints) {
    points = JSON.parse(savedPoints); // Преобразуем строку обратно в массив
    updatePointsList(); // Обновляем интерфейс
  }
}

// Загружаем точки при запуске приложения
loadPointsFromLocalStorage();

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

  // Сохраняем точки в localStorage
  savePointsToLocalStorage();

  // Очищаем форму
  document.getElementById('category').value = '';
  document.getElementById('description').value = '';

  // Закрываем всплывающее окно
  togglePopup('popup');

  // Возвращаем панель управления
  if (controlPanel) {
    controlPanel.classList.remove('hidden');
  }

  // Обновляем список точек
  updatePointsList();
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

// Обработка нажатия на кнопку закрытия всплывающего окна для списка точек
document.getElementById('close-list').addEventListener('click', () => {
  togglePopup('popup-list');
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
      points.splice(index, 1); // Удаляем точку из массива
      savePointsToLocalStorage(); // Сохраняем обновлённый массив в localStorage
      updatePointsList(); // Обновляем интерфейс
    });
  });
}

// Логика для выбора точки
const controlPanel = document.getElementById('control-panel');
const pointSelectionInterface = document.getElementById('point-selection-interface');
const mapPin = document.getElementById('map-pin');
const selectPointButton = document.getElementById('select-point-button');
const backButton = document.getElementById('back-button');

// Проверка наличия всех элементов
console.log('controlPanel:', controlPanel);
console.log('pointSelectionInterface:', pointSelectionInterface);
console.log('mapPin:', mapPin);
console.log('selectPointButton:', selectPointButton);
console.log('backButton:', backButton);

// Обработка нажатия на кнопку "Map pin"
document.getElementById('button3').addEventListener('click', () => {
  // Скрываем панель управления
  controlPanel.classList.add('hidden');

  // Показываем интерфейс выбора точки
  pointSelectionInterface.classList.remove('hidden');

  // Показываем метку на карте
  mapPin.classList.remove('hidden');
});

// Обработка нажатия на кнопку "Выбрать точку"
selectPointButton.addEventListener('click', () => {
  // Скрываем интерфейс выбора точки
  pointSelectionInterface.classList.add('hidden');

  // Скрываем метку на карте
  mapPin.classList.add('hidden');

  // Открываем всплывающее окно для создания точки
  togglePopup('popup');
});

// Обработка нажатия на кнопку "Назад"
backButton.addEventListener('click', () => {
  // Скрываем интерфейс выбора точки
  pointSelectionInterface.classList.add('hidden');

  // Скрываем метку на карте
  mapPin.classList.add('hidden');

  // Возвращаем панель управления
  controlPanel.classList.remove('hidden');
});