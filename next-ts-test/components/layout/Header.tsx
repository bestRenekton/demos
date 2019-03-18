import React from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { Layout } from 'antd';
const { Header } = Layout;



interface IExampleProps {
    title?: string,
}
const CommonHeader: React.SFC<IExampleProps> = React.memo(
    (props) => {
        // console.log('header', props)
        return (
            <>
                <Head>
                    <meta name="viewport" content="initial-scale=1.2, width=device-width" key="viewport" />
                    {/* css */}
                    <link rel='stylesheet' href='static/css/normalize.css' />
                    <link rel='stylesheet' href='https://cdn.bootcss.com/antd/3.15.0/antd.min.css' />
                    <link rel='stylesheet' href='static/css/main.css' />
                    <title>{props.title}</title>
                </Head>
                <Header tagName="header">
                    <Link prefetch as={`/`} href={`/`}><a>Home</a></Link>
                    <Link prefetch as={`/about`} href={`/about`}><a>about</a></Link>
                </Header>
            </>
        )
    }
)


export default CommonHeader