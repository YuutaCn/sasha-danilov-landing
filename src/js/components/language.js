// function change language
function changeLanguage(lang) {
  document.querySelectorAll('.ru').forEach(e => e.style.display = 'none');
  document.querySelectorAll('.en').forEach(e => e.style.display = 'none');
  document.querySelectorAll('.de').forEach(e => e.style.display = 'none');
  document.querySelectorAll(`.${lang}`).forEach(e => e.style.display = '');
  document.getElementById('language').value = `${lang}`
};

// select change
document.getElementById('language').addEventListener('change', function(el) {
  localStorage.setItem('language', `${el.target.value}`)
  changeLanguage(`${el.target.value}`);
});

// selecting a language from memory
if (localStorage.getItem('language') === null) {
  localStorage.setItem('language', 'de');
}
changeLanguage(`${localStorage.getItem('language')}`);



