import dva from 'dva';
import { browserHistory } from 'dva/router';
import './index.css';
import createLoading from 'dva-loading';


// 1. Initialize
//const app = dva();
const app = dva({
  initialState: {},
  history: browserHistory,
  onError(e, dispatch) {
    console.log(e)
  },
});
app.use(createLoading());
// 2. Plugins
// app.use({});

// 3. Model
//app.model(require('./models/Login'));
//app.model(require('./models/Main/Main'));
// app.model(require('./models/Users/User'))
// 4. Router
app.router(require('./router'));

// 5. Start
app.start('#root');
