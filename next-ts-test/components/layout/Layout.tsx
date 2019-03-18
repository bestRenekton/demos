import Header from './Header'
import Footer from './Footer'
import { Layout } from 'antd';
import styles from './Layout.scss'


const { Content } = Layout;
const Layouts = (props: any) => (
    <Layout tagName="main" className={styles.main}>
        <Header title={props.title} />
        <Content tagName="section" className={styles.page}>
            {props.children}
        </Content>
        <Footer />
    </Layout>
)

export default Layouts