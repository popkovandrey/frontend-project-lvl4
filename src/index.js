/* eslint-disable */
import 'core-js/stable';
import 'regenerator-runtime/runtime';
import '../assets/applications.scss';
import i18nInit from './i18nInit';
import renderApp from './index.jsx';

console.log('gon', window.gon);

i18nInit().then(() => renderApp(window.gon));
