import {getRandomInteger} from './util.js';
import {getRandomArrayElement} from './util.js';
import {createIdGenerator} from './util.js';


const PHOTO = 25;
const PHOTO_ID_COUNT = 25;
const PHOTO_URL_COUNT = 25;
const AVATR_COUNT = 6;
const NAMES = [
  'Иван',
  'Хуан',
  'Мария',
  'Кристоф',
  'Виктор',
  'Юлия'
];
const LIKE_COUNT = 200;
const DESCRIPTION = [
  'Покоряю горы на моей дистанции.',
  'Не достигайте пика.',
  'Иногда, чтобы совершить такой поход, нужно просто выйти на улицу.',
  'Я люблю походы. Это в палатках.',
  'Каблуки или Походные ботинки.',
  'Притормози! Разве ты не Эверест?',
  'Компания вдвоем, деревья , толпа.',
  'Гора молодости? Это пешие прогулки.',
  'Оставьте все свои заботы позадию.',
  'Походы с моими березами.',
  'Природа дешевле терапии.',
  'Главная-трансляция.',
  'Пройди холм или высокую воду.',
  'Покоряйте вершины, иначе этого не было.',
  'Компания вдвоем, деревья, толпа.',
  'Никогда не отправляйся в поход за гранитом.',
  'Давайте побродим там, где слабый Wi-Fi.',
  'Я не заблудился. Я исследую.',
  'Прическа для пеших прогулок, плевать.',
  'Потерял дар речи и дыхание.',
  'Netflix и прохлада? Больше похоже на смесь троп и холмов.',
  'Надеюсь, эта тропа куда-нибудь приведет.',
  'В лесу с моими березами.',
  'Просто потерял почву для размышлений.',
  'Мы уже на месте?'
];
const COMENT_COUNT = 30;
const COMENT_TEXT = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'
];

const generatePhotoId = createIdGenerator();
const generateCommentId = createIdGenerator();
const generateUrlId = createIdGenerator();

// Create a comment template:
const createComment = () => ({
  id: generateCommentId(),
  avatar: `img/avatar-${getRandomInteger(0, AVATR_COUNT)}.svg`,
  message: getRandomArrayElement(COMENT_TEXT),
  name: getRandomArrayElement(NAMES)
});

// Create a photo description template:
const createPhoto = () => ({
  id: generatePhotoId(0, PHOTO_ID_COUNT),
  url: `photos/${generateUrlId(0, PHOTO_URL_COUNT)}.jpg`,
  description: getRandomArrayElement(DESCRIPTION),
  likes: getRandomInteger(15, LIKE_COUNT),
  comments: Array.from({length: getRandomInteger(0, COMENT_COUNT)}, createComment)
});

// Creating an array of photos:
const similarPhotos = Array.from({length: PHOTO}, createPhoto);

// eslint-disable-next-line
console.log(
  similarPhotos
);
export {similarPhotos};
