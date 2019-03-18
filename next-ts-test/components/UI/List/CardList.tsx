import React from 'react'
import { List, Avatar, Button } from 'antd';
import Link from 'next/link'


interface IProps {
    dataSource: Array<Object>,
    loading: boolean,
    more: boolean,
    fetchList: () => void,
}
const CardList: React.SFC<IProps> = React.memo((props) => {
    console.log('cardList', props);
    let { dataSource, more, loading } = props;
    const fetchList = () => {
        props.fetchList();
    }
    return (
        <>
            <List
                itemLayout="vertical"
                size="large"
                dataSource={dataSource}
                renderItem={item => (
                    <Link prefetch href={`/detail?id=${item.user_id}`} as={`/p/${item.user_id}`}>
                        <a>
                            <List.Item key={item.user_id} extra={<img width={272} alt="logo" src={item.image} />}>
                                <List.Item.Meta
                                    avatar={<Avatar src={item.image} />}
                                    title={item.user_name}
                                    description={item.csentence}
                                />
                                {`${item.cparagraph}${item.cparagraph}`}
                            </List.Item>
                        </a>
                    </Link>
                )}
            />
            <div style={{ textAlign: 'center' }}>
                {
                    more ?
                        <Button size="large" type="primary" onClick={() => { fetchList() }} loading={loading ? true : false}>加载更多</Button>
                        : <p>没有更多了</p>
                }
            </div>
        </>
    )
})


export default CardList