import { combineReducers } from 'redux';

import ideas from './ideas';
import idea from './idea';
import comments from './comments';
import ideasCreate from './ideasCreate';

export default combineReducers({
  ideas,
  idea,
  ideasCreate,
  comments
});