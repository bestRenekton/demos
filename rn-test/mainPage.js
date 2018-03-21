import React, {Component} from 'react';
import {
    StyleSheet,
    Image,
    Style,
    Text
} from 'react-native';
import {TabNavigator} from "react-navigation";

import HomePage from './views/HomePage';
import Articles from './views/Articles';
import Demos from './views/Demos';
import MinePage from './views/MinePage';


const mainPage = TabNavigator({
    Home: {
        screen: HomePage,
        //以下参数也可放置在MinePage.js页面
        navigationOptions: {
            header:null,
            headerTitle:'首页',
            headerStyle:{elevation: 0},//除去阴影
            headerTitleStyle: {alignSelf:'center'},
            // headerRight:(<Text >返回</Text>),
            // headerLeft:(<Text >返回</Text>),
            tabBarLabel: '首页1',
            tabBarIcon: ({ tintColor }) => (
                <Image
                 source={require('./images/home.png')}
                 style={[styles.icon,{tintColor: tintColor}]}// {tintColor: tintColor} 选中的图片和文字颜色
                />
            ),
        }
    },
    Article: {
        screen: Articles,
        navigationOptions: {
            headerTitle:'Articles',
            headerStyle:{elevation: 0},
            headerTitleStyle: {alignSelf:'center'},
            tabBarLabel: 'Articles',
            tabBarIcon: ({ tintColor }) => (
                <Image
                 source={require('./images/articles.png')}
                 style={[styles.icon,{tintColor: tintColor}]}
                />
            ),
        }
    },
    Demos: {
        screen: Demos,
        navigationOptions: {
            headerTitle: 'demos',
            headerStyle:{elevation: 0},
            headerTitleStyle: {alignSelf:'center'},
            tabBarLabel: 'demos',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./images/demos.png')}
                    style={[styles.icon,{tintColor: tintColor} ]}
                />
            ),
        }
    },
    Mine: {
        screen: MinePage,
        navigationOptions: {
            headerTitle: '我的',
            headerStyle:{elevation: 0},
            headerTitleStyle: {alignSelf:'center'},
            tabBarLabel: '我的',
            tabBarIcon: ({ tintColor }) => (
                <Image
                    source={require('./images/me.png')}
                    style={[styles.icon,{tintColor: tintColor} ]}
                />
            )
        }
    },
}, {
    animationEnabled: true, // 切换页面时不显示动画
    tabBarPosition: 'bottom', // 显示在底端，android 默认是显示在页面顶端的
    swipeEnabled: true, // 是否左右滑动,如果有DrawerNavigator,最好设置为false避免手势冲突
    backBehavior: 'none', // 按 back 键是否跳转到第一个 Tab， none 为不跳转
    lazy:true,
    tabBarOptions: {
        activeTintColor: '#45a4fc', // 文字和图片选中颜色
        inactiveTintColor: '#999', // 文字和图片默认颜色
        showIcon: true, // android 默认不显示 icon, 需要设置为 true 才会显示
        indicatorStyle: {height: 0}, // android 中TabBar下面会显示一条线，高度设为 0 后就不显示线了， 不知道还有没有其它方法隐藏？？？
        upperCaseLabel:false,//是否使标签大写，默认为true
        pressColor:'#45a4fc',//material涟漪效果的颜色（安卓版本需要大于5.0）。
        pressOpacity:0.5,//按压标签的透明度变化（安卓版本需要小于5.0）。
        style: {
            backgroundColor: '#f7f7f7', // TabBar 背景色
            height:50
        },
        labelStyle: {
            fontSize: 12, // 文字大小,
            marginTop: 0,
        },
        iconStyle:{
            // width:10
        }
    },
});
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    icon:{
        width:20,
        height:20
    }
});
module.exports = mainPage;