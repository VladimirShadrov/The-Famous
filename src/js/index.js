import '../styles/styles.scss';
import '../styles/header.scss';
import '../styles/footer.scss';
import '../styles/pictures.scss';

require('isomorphic-fetch');

const buttons = Array.from(document.querySelectorAll('.pictures__item-btn'));

//Перенос фотографий в папку dist
require.context('../images', true, /\.(png|jpg|svg|gif)$/);

// Создать лоадер
function createLoader(item) {
  item.innerHTML = '';
  let loader = document.createElement('div');
  loader.classList.add('pictures__buy-loader');
  item.insertAdjacentElement('beforeend', loader);
}

// Добавить в корзину
function addToShoppingCart(item) {
  item.innerHTML = '';
  item.textContent = 'В корзине';
  item.style.transition = '0s';
  item.classList.add('pictures__item-btn_in-shopping-cart');
  setTimeout(() => item.style.transition = '0.3s', 100)
}

// Запрос на сервер
async function setRequest(item) {
  const url = 'https://jsonplaceholder.typicode.com/posts/1';
  createLoader(item);
  const response = await fetch(url);
  
  if (await response) {
    addToShoppingCart(item);
  }

}

// Логика работы приложения при клике по кнопке
let activeButtons = JSON.parse(sessionStorage.getItem('pictures')) || [];
buttons.forEach(item => {
  item.addEventListener('click', (event) => {
    const target = event.target.dataset.name;
    const button = activeButtons.find(item => item === target);
    
    if (button) {
        return
      } else {
      activeButtons.push(target);
      sessionStorage.setItem('pictures', JSON.stringify(activeButtons));
    }

    setRequest(item);
  })
})


// Обновление состояния кнопок после перезагрузки страницы
function setStatusForButton() {
  const activeButtons = JSON.parse(sessionStorage.getItem('pictures')) || [];

  activeButtons.forEach(item => {
    let button = buttons.find(button => button.dataset.name === item);
    addToShoppingCart(button);
  })
};

setStatusForButton();

