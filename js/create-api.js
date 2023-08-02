const BASE_URL = 'https://29.javascript.pages.academy/kekstagram';
const Route = {
  GET_DATA: '/data',
  SEND_DATA: '/',
};
const ALERT_SHOW_TIME = 7000;

const ERROR_GET = 'Не удаётся загрузить данные. Проверьте подключение к сети !';
const ERROR_SEND = 'Не удаётся отправить форму. Проверьте подключение к сети';

const serverRequest = (route, errorText, method = 'GET', body = null) =>
  fetch(`${BASE_URL}${route}`, {method, body})
    .then((response) => {
      if (!response.ok) {
        throw new Error();
      }
      return response.json();
    })
    .catch(() => {
      throw new Error(errorText);
    });


const getData = () => serverRequest(Route.GET_DATA, ERROR_GET, 'GET');


const sendData = (body) => serverRequest(Route.SEND_DATA, ERROR_SEND, 'POST', body);


const showAlert = (message) => {
  const alert = document.createElement('div');
  alert.style.position = 'absolute';
  alert.style.left = '0';
  alert.style.top = '0';
  alert.style.right = '0';
  alert.style.padding = '10px 3px';
  alert.style.fontSize = '20px';
  alert.style.textAlign = 'center';
  alert.style.background = '#df4115';
  alert.textContent = message;
  document.body.append(alert);
  setTimeout(() => {
    alert.remove();
  }, ALERT_SHOW_TIME);
};

export {getData, sendData, showAlert};
