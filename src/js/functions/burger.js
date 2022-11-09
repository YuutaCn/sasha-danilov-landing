// import { disableScroll } from '../functions/disable-scroll';
// import { enableScroll } from '../functions/enable-scroll';

let burgeMenuStatus = false;
let timeout = 100;
(function () {
  const burger = document?.querySelector('[data-burger]');
  const menu = document?.querySelector('[data-menu]');
  const menuItems = document?.querySelectorAll('[data-menu-item]');
  const overlay = document?.querySelector('[data-menu-overlay]');

  function openMenu() {
    burger?.classList.toggle('burger--active');
    menu?.classList.toggle('menu--active');
    // setTimeout(() => {
    //   menuItems[0].classList.toggle('menu--active');
    //   menuItems[1].classList.toggle('menu--active');
    //   menuItems[2].classList.toggle('menu--active');
    //   setTimeout(() => {
    //     menuItems[3].classList.toggle('menu--active');
    //     menuItems[4].classList.toggle('menu--active');
    //     menuItems[5].classList.toggle('menu--active');
    //     setTimeout(() => {
    //       menuItems[6].classList.toggle('menu--active');
    //       menuItems[7].classList.toggle('menu--active');
    //       menuItems[8].classList.toggle('menu--active');
    //     }, timeout);
    //   }, timeout);
    // }, timeout);
    burgeMenuStatus = true;

    if (menu?.classList.contains('menu--active')) {
      burger?.setAttribute('aria-expanded', 'true');
      burger?.setAttribute('aria-label', 'Закрыть меню');
      setTimeout(() => {
        menuItems[0].classList.toggle('menu--active');
        menuItems[1].classList.toggle('menu--active');
        menuItems[2].classList.toggle('menu--active');
        setTimeout(() => {
          menuItems[3].classList.toggle('menu--active');
          menuItems[4].classList.toggle('menu--active');
          menuItems[5].classList.toggle('menu--active');
          setTimeout(() => {
            menuItems[6].classList.toggle('menu--active');
            menuItems[7].classList.toggle('menu--active');
            menuItems[8].classList.toggle('menu--active');
          }, timeout);
        }, timeout);
      }, timeout);
      // disableScroll();
      burgeMenuStatus = true;
    } else {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      setTimeout(() => {
        menuItems[6].classList.remove('menu--active');
        menuItems[7].classList.remove('menu--active');
        menuItems[8].classList.remove('menu--active');
        setTimeout(() => {
          menuItems[3].classList.remove('menu--active');
          menuItems[4].classList.remove('menu--active');
          menuItems[5].classList.remove('menu--active');
          setTimeout(() => {
            menuItems[0].classList.remove('menu--active');
            menuItems[1].classList.remove('menu--active');
            menuItems[2].classList.remove('menu--active');
          }, timeout);
        }, timeout);
      }, 0);
      // enableScroll();
      burgeMenuStatus = false;
    }
  }

  function closeMenu() {
    burger?.setAttribute('aria-expanded', 'false');
    burger?.setAttribute('aria-label', 'Открыть меню');
    burger.classList.remove('burger--active');
    menu.classList.remove('menu--active');
    setTimeout(() => {
      menuItems[6].classList.remove('menu--active');
      menuItems[7].classList.remove('menu--active');
      menuItems[8].classList.remove('menu--active');
      setTimeout(() => {
        menuItems[3].classList.remove('menu--active');
        menuItems[4].classList.remove('menu--active');
        menuItems[5].classList.remove('menu--active');
        setTimeout(() => {
          menuItems[0].classList.remove('menu--active');
          menuItems[1].classList.remove('menu--active');
          menuItems[2].classList.remove('menu--active');
        }, timeout);
      }, timeout);
    }, 0);
    // enableScroll();
    burgeMenuStatus = false;
  }

  burger?.addEventListener('click', (e) => {
    openMenu();
  });

  overlay?.addEventListener('click', () => {
    closeMenu()
  });

  menuItems?.forEach(el => {
    el.addEventListener('click', () => {
      burger?.setAttribute('aria-expanded', 'false');
      burger?.setAttribute('aria-label', 'Открыть меню');
      burger.classList.remove('burger--active');
      menu.classList.remove('menu--active');
      menuItems?.forEach(el => el.classList.remove('menu--active'));
      // enableScroll();
      burgeMenuStatus = false;
    });
  });

  document.addEventListener('touchstart', handleTouchStart, false);
  document.addEventListener('touchmove', handleTouchMove, false);
  var xDown = null;
  var yDown = null;
  function getTouches(evt) {
    return evt.touches ||             // browser API
      evt.originalEvent.touches; // jQuery
  }
  function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };
  function handleTouchMove(evt) {
    if (!xDown || !yDown) {
      return;
    }
    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;
    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;
    if (Math.abs(xDiff) > Math.abs(yDiff)) {/*most significant*/
      if (xDiff > 0) {
        /* right swipe */
        if (burgeMenuStatus === true) {
          closeMenu()
        }
      } else {
        /* left swipe */
        if (burgeMenuStatus === false) {
          openMenu()
        }
      }
    } else {
      if (yDiff > 0) {
        /* down swipe */
        if (burgeMenuStatus === true) {
          closeMenu()
        }
      } else {
        /* up swipe */
        if (burgeMenuStatus === true) {
          closeMenu()
        }
      }
    }
    /* reset values */
    xDown = null;
    yDown = null;
  };
})();
