// function change language
function changeLanguage(lang) {
  document.querySelectorAll('.ru').forEach(e => e.style.display = 'none');
  document.querySelectorAll('.en').forEach(e => e.style.display = 'none');
  document.querySelectorAll('.de').forEach(e => e.style.display = 'none');
  document.querySelectorAll(`.${lang}`).forEach(e => e.style.display = '');
};

// select change
document.getElementById('language').addEventListener('change', function(el) {
  changeLanguage(`${el.target.value}`);
});

// selecting a language from memory
if (localStorage.getItem('language') === null) {
  localStorage.setItem('language', 'de');
}
changeLanguage(`${localStorage.getItem('language')}`);



