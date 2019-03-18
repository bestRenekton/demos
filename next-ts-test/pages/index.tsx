import React from 'react'
import { connect } from 'react-redux'
// import Link from 'next/link'
// import { Button, List, Avatar, Icon } from 'antd';
import { fetchUserListDataStart, fetchUserListData, fetchUserListDataSuccess } from '../redux/actions/home';
import { GetList } from '../redux/server/home'


import styles from './index.scss'
import CardList from '../components/UI/List/CardList'


class Index extends React.Component {
    props: any;
    constructor(props: any) {
        super(props)
        this.fetchList = this.fetchList.bind(this);
    }
    static async getInitialProps(props: any) {
        const { store, isServer } = props.ctx;
        const isInit = store.getState().home.list.dataSource.length > 0 ? false : true;//redux中有无数据

        if (isInit) {//第一次加载
            const { row, page } = store.getState().home.list;
            const json = await GetList({ row, page })
            const { status, result, total } = json;
            await store.dispatch(fetchUserListDataSuccess(result, total))
        }
    }
    async fetchList() {
        const { row, page } = this.props.home.list;
        await this.props.dispatch(fetchUserListDataStart());
        await this.props.dispatch(fetchUserListData({ row, page }));
    }
    render() {
        console.log('home', this.props)
        let { home } = this.props;
        let { list } = home;

        return (
            <div className={styles.home}>
                <CardList  {...list} fetchList={this.fetchList} />
            </div >
        )
    }
}



function mapStateToProps(state) {
    // debugger
    const { home } = state
    return { home }
}

export default connect(mapStateToProps)(Index)