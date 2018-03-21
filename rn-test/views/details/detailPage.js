import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,

} from 'react-native';
import { StackNavigator} from 'react-navigation';
export default class detailPage  extends Component {
    static navigationOptions = {
        title: 'Welcome1111',
    };
    render() {
        const { state } = this.props.navigation;
        return (
            <View style={styles.container}>
                <Text>{state.params.user}</Text>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#F5FCFF',
    },
    welcome: {
        fontSize: 20,
        textAlign: 'center',
        margin: 10,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});