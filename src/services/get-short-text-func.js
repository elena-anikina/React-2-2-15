const getShortText = (string, maxLen) => {
  let newString = string.split(' ').slice(0, maxLen);
  for (let i = newString.length - 1; i > Math.floor(maxLen / 2); i--) {
    if (newString[i].endsWith('.') || newString[i].endsWith(',')) {
      newString = newString.slice(0, i + 1);
    }
  }
  newString = newString.join(' ');
  if (newString.endsWith(',') || newString.endsWith('.')) {
    newString = `${newString.slice(0, -1)}.`;
  } else {
    newString += '.';
  }
  return newString;
};

export default getShortText;
