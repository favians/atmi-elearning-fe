// import { isEmpty } from 'lodash-es';

function toCapitalize(s) {
  return s ? s[0].toUpperCase() + s.slice(1).toLowerCase() : '';
}
function toCapitalizeEachWord(s) {
  const str = s.replace('-', ' & ');
  const arr = str.split(' ');
  for (var i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2 = arr.join(' ');
  return str2;
}

function phoneNumber(value) {
  const number = value.replace(/^0+/, '');
  var zero = value.substring(0, 1);
  var twonumber = number.substring(0, 2);
  var numberIndo;
  if (zero === '0') {
    numberIndo = '+62' + number;
  } else if (twonumber === '62') {
    numberIndo = '+' + number;
  } else {
    numberIndo = '+62' + number;
  }
  return numberIndo;
}
const trunc = (text, length) => {
  if (text?.length > length) {
    text = text?.substring(0, length - 1) + `... `;
  }
  return text;
};
const truncNext = (text, length) => {
  if (text?.length > length) {
    text = text?.substring(0, length - 1) + `... `;
  }
  const isUpdate = text?.length > length ? true : false;
  return { text, isUpdate };
};

const formatLink = (text) => {
  return text.replace(' ', '-')?.toLowerCase();
};

function formatSizeUnits(bytes) {
  if (bytes >= 1073741824) {
    bytes = (bytes / 1073741824).toFixed(2) + 'gb';
  } else if (bytes >= 1048576) {
    bytes = (bytes / 1048576).toFixed(2) + 'mb';
  } else if (bytes >= 1024) {
    bytes = (bytes / 1024).toFixed(2) + 'kb';
  } else if (bytes > 1) {
    bytes = bytes + ' bytes';
  } else if (bytes == 1) {
    bytes = bytes + ' byte';
  } else {
    bytes = '0 bytes';
  }
  return bytes;
}

export { toCapitalize, toCapitalizeEachWord, trunc, truncNext, formatLink, formatSizeUnits, phoneNumber };
