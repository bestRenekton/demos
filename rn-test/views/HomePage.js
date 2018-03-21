import React, {Component} from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    Image,
    Button,
    FlatList
} from 'react-native';
// import DrawPage from './DrawPage'

class List extends Component{
    constructor(props){
        super(props);
        this.state={
            arr:[]
        }
    }
    _extraUniqueKey(item ,index){
        return "index"+index+item;
      }  
    componentDidMount(){
        fetch('https://yangyuetao.cn:8888/api/articleList', {
            method: 'POST',
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
            //   firstParam: 'yourValue',
            //   secondParam: 'yourOtherValue',
            })
          })
          .then((res)=> res.json()).then((resData) => {
            this.setState({arr:resData})
        })
        //   .then((res)=>{this.setState({txt:JSON.stringify(res)})})
    }
    render(){
        const  navigate  = this.props.navigation;

        return(
            <View>
                <FlatList
                    data={this.state.arr}
                    keyExtractor = {this._extraUniqueKey}// 每个item的key,没有会报错
                    renderItem={({item}) => {        //注意是｛item｝
                        return(
                            <View style={[styles.card]} >
                                <Text style={[styles.title]} onPress={() => navigate('Detail', { user: 'Lucy' })}>{item.title}</Text>
                                <Text style={[styles.gist]}>{item.gist.slice(0,80)}</Text>
                                <Text style={[styles.date]}>{item.date}</Text>
                            </View>
                        )
                    }}
                />
               
            </View>
        )
    }
}

export default class HomePage extends Component {
    render() {
        const { navigate } = this.props.navigation;

        return(
            <View style={styles.page}>
                <List navigation={navigate} />
            </View>
        )
    }
}


const styles = StyleSheet.create({
    page:{
        flex:1,
        backgroundColor:'#ebebeb'
    },
    card:{
        backgroundColor:'#fff',
        padding:10,
        borderBottomWidth:1,
        borderBottomColor:'#bebebe',
        marginBottom:8,
        // elevation: 1,
        // shadowOffset: {width: 0, height: 0},
        // shadowColor: '#bebebe',
        // shadowOpacity: 1,
        // shadowRadius: 1
    },
    title:{
        fontSize:18,
        fontWeight:'600',
        color:'#0085a1'
    },
    gist:{
        marginVertical:5,
        color:'#444'
    },
    date:{
        color:'#999'
    },
    icon:{
        width:20,
        height:20
    },

});