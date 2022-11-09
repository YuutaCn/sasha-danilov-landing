import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';


import './components/language';
import './components/page-checker';
import './components/header-scroll';
if (document.querySelector('.player')) {
  import('./components/player');
};
