import dva from 'dva';
import './public/css/normalize.css'
import './public/font/iconfont.css'
// import 'antd/dist/antd.css';
// import '@ionic/core/css/core.css';
// import '@ionic/core/css/ionic.bundle.css';

// 1. Initialize
const app = dva();

// 2. Plugins
// app.use({});

// 3. Model
// app.model(require('./models/example').default);

// 4. Router
app.router(require('./router').default);

// 5. Start
app.start('#root');
