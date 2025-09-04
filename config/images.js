// Конфигурация для изображений
export const IMAGE_BASE_URL = 'https://alfacta.online/100k';

// Функция для получения полного URL изображения
export const getImageUrl = (imageName) => {
  return `${IMAGE_BASE_URL}/${imageName}`;
};

// Список всех изображений приложения
export const IMAGES = {
  // Фоны
  mainBg: getImageUrl('main-bg.png'),
};