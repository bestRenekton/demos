import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button
} from 'react-native';
import { NavigationActions } from 'react-navigation'
export default class OderPage extends Component {
    // static navigationOptions = {
    //     title: 'demos',
    //     tabBarLabel: 'demos',
    //     tabBarIcon: ({ tintColor }) => (
    //         <Image
    //             source={require('../images/cert0.png')}
    //             style={[styles.icon,{tintColor: tintColor} ]}
    //         />
    //     ),
    // };
    goToDetail() {
        const {dispatch} = this.props.navigation;
        const resetAction = NavigationActions.reset({
            index: 0,//指定显示数组内的路由
            actions: [
                NavigationActions.navigate({ routeName: 'Detail',params:{user: 'xiongtm'}}),
                //NavigationActions.navigate({ routeName: 'others',params:{user: 'xiongtm'}}),
            ]
        });
        dispatch(resetAction);
    }
    render() {
        return (
            <View style={styles.container}>
                <Button
                    onPress={() => this.goToDetail()}
                    title="跳转+传参+清空路由"
                />
            </View>
        );
    }
}
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