
import ee

# Авторизация
ee.Authenticate()
ee.Initialize(project='gisit2025')

# Выбор коллекции спутниковых снимков
dataset = ee.ImageCollection('LANDSAT/LC08/C02/T1_TOA')

# Фильтрация по времени и области
filtered_dataset = dataset.filterDate('2023-01-01', '2023-12-31') \
                          .filterBounds(ee.Geometry.Rectangle([30, 50, 40, 60]))  # Пример координат

# Выбор среднего значения
image = filtered_dataset.mean()

# Нормализация значений
vis_params = {
    'min': 0,
    'max': 3000,
    'bands': ['B4', 'B3', 'B2']  # RGB
}

# Получение Map ID и Token
map_id = image.getMapId(vis_params)
print(map_id)
map_id['token'] = '1//047aZIlP9TD3_CgYIARAAGAQSNwF-L9IrJ3ULHUzodAd7NZEU8C0bCqvUjChuYH0SHxMeQPDemEUJz5E48-wHZkfZWaqqICaBo8Y'
# Вывод Map ID и Token
print(f"Map ID: {map_id['mapid']}")
print(f"Token: 1//047aZIlP9TD3_CgYIARAAGAQSNwF-L9IrJ3ULHUzodAd7NZEU8C0bCqvUjChuYH0SHxMeQPDemEUJz5E48-wHZkfZWaqqICaBo8Y")