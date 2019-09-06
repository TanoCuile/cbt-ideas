import { combineReducers } from 'redux';

import ideas from './ideas';
import ideasCreate from './ideasCreate';

export default combineReducers({
  ideas,
  ideasCreate,
});