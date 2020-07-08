document.documentElement.classList.remove('no-js');

var STORAGE_KEY = 'user-color-scheme';
var COLOR_MODE_KEY = '--color-mode';

var modeToggleButton = document.querySelector('.js-mode-toggle');
var modeStatusElement = document.querySelector('.js-mode-status');

function getCSSCustomProp(propKey) {
  var response = getComputedStyle(document.documentElement).getPropertyValue(propKey);

  if (response.length) {
    response = response.replace(/\"/g, '').trim();
  }

  return response;
}

function applySetting(passedSetting) {
  var currentSetting = passedSetting || localStorage.getItem(STORAGE_KEY);

  if (currentSetting) {
    document.documentElement.setAttribute('data-user-color-scheme', currentSetting);
    modeStatusElement.innerText = 'Color mode is now "' + currentSetting + '"';
  } else {
    modeStatusElement.innerText = 'Color mode is now "' + getCSSCustomProp(COLOR_MODE_KEY) + '"';
  }
}

function toggleSetting() {
  var currentSetting = localStorage.getItem(STORAGE_KEY);

  switch (currentSetting) {
    case null:
      currentSetting = getCSSCustomProp(COLOR_MODE_KEY) === 'dark' ? 'light' : 'dark';
      break;
    case 'light':
      currentSetting = 'dark';
      break;
    case 'dark':
      currentSetting = 'light';
      break;
  }

  localStorage.setItem(STORAGE_KEY, currentSetting);

  return currentSetting;
}

modeToggleButton.addEventListener('click', function(evt) {
  evt.preventDefault();

  applySetting(toggleSetting());
});

applySetting();
