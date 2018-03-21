import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    ScrollView
} from 'react-native';
import {DrawerNavigator, DrawerItems} from 'react-navigation';
class MyHomeScreen extends Component {
    // static navigationOptions = {
    //     drawerLabel: 'Home',
    //     drawerIcon: ({tintColor}) => (
    //         <Image
    //             source={require('../images/cert0.png')}
    //             style={[styles.icon, {tintColor: tintColor}]}
    //         />
    //     ),
    //
    // };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this.props.navigation.navigate('Notifications')}
                    title="Go to notifications"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('DrawerOpen')}
                    title="DrawerOpen"
                />
                <Button
                    onPress={() => this.props.navigation.navigate('DrawerClose')}
                    title="DrawerClose"
                />
            </View>
        );
    }
}

class MyNotificationsScreen extends Component {
    // static navigationOptions = {
    //     drawerLabel: 'Notifications',
    //     drawerIcon: ({tintColor}) => (
    //         <Image
    //             source={require('../images/cert0.png')}
    //             style={[styles.icon, {tintColor: tintColor}]}
    //         />
    //     ),
    //
    // };

    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this.props.navigation.navigate('Home')}
                    title="Go back home"
                />
            </View>

        );
    }
}

const CustomDrawerContentComponent = (props) => (
    <ScrollView>
        {/*<DrawerItems {...props} />*/}
        <View>
            <Text>46645646546</Text>
        </View>
    </ScrollView>
);
const MyDraw = DrawerNavigator({
        Home: {
            screen: MyHomeScreen,
        },
        Notifications: {
            screen: MyNotificationsScreen,
        },
    },
    {
        //drawerWidth: 200, // 抽屉宽
        drawerPosition: 'left', // 抽屉在左边还是右边
        contentComponent: CustomDrawerContentComponent,  // 自定义抽屉组件
        // contentOptions: {
        //     initialRouteName: MyHomeScreen, // 默认页面组件
        //     activeTintColor: 'white',  // 选中文字颜色
        //     activeBackgroundColor: '#ff8500', // 选中背景颜色
        //     inactiveTintColor: '#666',  // 未选中文字颜色
        //     inactiveBackgroundColor: '#fff', // 未选中背景颜色
        //     style: {  // 样式
        //
        //     }
        // }
    });

module.exports = MyDraw;
const styles = StyleSheet.create({
    icon: {
        width: 24,
        height: 24,
    },
    container:{justifyContent: 'center', alignItems: 'center', flex: 1}
});