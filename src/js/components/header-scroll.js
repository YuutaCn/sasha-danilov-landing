const headerHtml = document?.querySelector('.header'),
      headerHeight = headerHtml.offsetHeight;

window.onscroll = () => (window.scrollY > headerHeight / 1.5) ? headerHtml.classList.add('--scroll') : headerHtml.classList.remove('--scroll');
