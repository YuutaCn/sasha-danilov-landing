import './_vendor';
import vars from './_vars';
import './_functions';
import './_components';


import './components/language';
if (document.querySelector('.player')) {
  import('./components/player');
};
