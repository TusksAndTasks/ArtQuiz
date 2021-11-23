import Router from './router.js';



const pageRouter = new Router();
pageRouter.init();
console.log(`Если есть возможность, проверьте 25-го числа в режиме инкогнито браузера. Или оставьте контакты для связи.
В любом случае, чтобы Вам было проще, самопроверка:
- 1. Стартовая страница и навигация (15/20)
-[±] вёрстка, дизайн, UI стартовой страницы приложения. Пока отсутсвует адаптивность верстки и подсвечивание интерактивных элементов за пределами изменения курсора. Основное разрешение - 1920px (5/10)
-[x] реализована навигация по страницам приложения (10)
- 2. Настройки (0/40)
-[ ] настройки пока не реализованы
- 3. Страница категорий  (25/30)
-[±] вёрстка, дизайн, UI страницы категории. Пока отсутсвует адаптивность верстки и подсвечивание интерактивных элементов за пределами изменения курсора (5/10)
-[x] карточка сыгранной категории внешне отличается от карточки категории, которая ещё не игралась (10)
-[x] на карточке сыгранной категории отображается результат прохождения раунда - количество вопросов, на которые был дан правильный ответ (10)
- 4. Страница с вопросами(45/50)
-[±] вёрстка, дизайн, UI страницы с вопросами. Пока отсутсвует адаптивность верстки и подсвечивание интерактивных элементов за пределами изменения курсора. (5/10)
-[x] варианты ответов на вопросы генерируются случайным образом (10)
-[x] правильным и неправильным ответам пользователя соответствуют индикаторы разного цвета (10)
-[x] после того, как ответ выбран, появляется модальное окно с правильным ответом на вопрос и кнопкой "Продолжить". При клике по кнопке "Продолжить" пользователь переходит к следующему вопросу категории (10)
-[x]после окончания раунда выводится уведомление об окончании раунда и его результат - количество вопросов, на которые был дан правильный ответ. (10)
- 5. Страница с результатами (45/50)
-[±] вёрстка, дизайн, UI страницы с результатами. Пока отсутсвует адаптивность верстки и подсвечивание интерактивных элементов. (5/10)
-[x] страница с результатами содержит превью всех картин категории (10)
-[x] картины, на вопросы про которые или про их авторов был дан правильный ответ, цветные; картины, на вопросы про которые или про их авторов был дан неправильный ответ, черно-белые (10)
-[x] при клике по правильно угаданной картине выводится информация о ней - название, автор, год создания (10)
-[x] если раунд переигрывался, и результаты изменились, эти изменения отображаются на странице с результатами (10)
-6. Плавная смена изображений (0/10)
-7. Реализована анимация отдельных деталей интерфейса (0/20)
-8. Дополнительный функционал (0/20) `)
