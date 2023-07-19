/* @refresh reload */
import {render} from 'solid-js/web';
import 'highlight.js/styles/stackoverflow-dark.css';

import './index.css';
import App from './App';

render(() => <App />, document.getElementById('root') as HTMLElement);
