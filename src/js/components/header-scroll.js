const headerHtml = document?.querySelector('.header'),
      headerHeight = headerHtml.offsetHeight;

window.onscroll = function() {
  if (window.scrollY > headerHeight / 1.5) {
    headerHtml.classList.add('--scroll')
  } else headerHtml.classList.remove('--scroll')
}
