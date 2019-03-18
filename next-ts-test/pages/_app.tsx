import App, { Container } from 'next/app';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import createStore from '../redux/store';
import Layouts from '../components/layout/Layout';
import { RouterTitle } from '../constant/constant';

class MyApp extends App {
  props: any;
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {};

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps({ ctx });
    }

    return { pageProps };
  }
  render() {
    const { Component, pageProps, store, router } = this.props;

    return (
      <Container>
        <Provider store={store}>
          <Layouts title={RouterTitle[router.pathname]}>
            <Component {...pageProps} router={router} />
          </Layouts>
        </Provider>
      </Container>
    )
  }
}

export default withRedux(createStore)(withReduxSaga(MyApp))




