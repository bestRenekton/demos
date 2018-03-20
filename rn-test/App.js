import React, { Component } from 'react';
import {View, Text ,Image,StyleSheet,AppRegistry,TextInput,ScrollView,FlatList,SectionList} from 'react-native';

class Blink extends Component{
  constructor(props){
    super(props);
    this.state={showText:true};
    // setInterval(() => {
    //   this.setState({
    //     showText:!this.state.showText
    //   })
    // }, 1000);
  }
  render(){
    let display=this.state.showText?this.props.text:'';
    return(
      <Text style={[styles.red]}>{display}</Text>
    )
  }
}

class Input extends Component{
  constructor(props){
    super(props);
    this.state={text:''}
  }
  render(){
    return(
      <View>
      <TextInput 
         onChangeText={(val)=>{this.setState({text:val})}}
        //  onSubmitEditing={alert(11)}
      />
      <Text>
        您的输入是：{this.state.text}
      </Text>
      </View>
    )
  }
}

 class FlatListBasics extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FlatList
          data={[
            {key: 'Devin'},
            {key: 'Jackson'},
            {key: 'James'},
            {key: 'Joel'},
            {key: 'John'},
            {key: 'Jillian'},
            {key: 'Jimmy'},
            {key: 'Julie'},
            
          ]}
          renderItem={({item}) => {
            return(
              <Text style={styles.item}>{item.key}1</Text>
            )
          }}
        />
      </View>
    );
  }
}
class SectionListBasics extends Component {
  _extraUniqueKey(item ,index){
    return "index"+index+item;
    console.log(1231)
  }  
  render() {
    return (
      <View style={styles.container}>
        <SectionList
          sections={[
            {title: 'D', data: ['Devin']},
            {title: 'J', data: ['Jackson', 'James', 'Jillian', 'Jimmy', 'Joel', 'John', 'Julie']},
          ]}
          renderItem={({item}) => <Text  style={styles.item}>{item}</Text>}
          renderSectionHeader={({section}) => <Text style={styles.sectionHeader}>{section.title}</Text>}
          keyExtractor = {this._extraUniqueKey}// 每个item的key

        />
      </View>
    );
  }
}
export default class APP extends Component{
  render(){
    return(
      <View style={[styles.body]}>
        <View style={[styles.box]}>
          <ScrollView style={[styles.blue_bc]}>
            <Blink text='type2'  />
            <Blink text='type3'  />
            <Blink text='type4'  />
            <Blink text='type5'  />
            <Blink text='typ6e'  />
            <Blink text='type7'  />
            <Blink text='type8'  />
          </ScrollView>
          <View style={[styles.flex,styles.green_bc]}>
            <Input />
          </View>
        </View>
          
        <View style={styles.container}>
          {/* <FlatListBasics /> */}
          <SectionListBasics />
        </View>
      </View>

    )
  }
}

const styles = StyleSheet.create({
  body:{
    flex:1,
    backgroundColor:'#666'
  },
  box:{
    height:300,
    flexDirection: 'row',
  },
  flex:{
    flex:1,
    justifyContent:'space-around',
    alignItems:'center'
  },
  blue_bc: {
    backgroundColor: 'blue'
  },
  green_bc: {
    backgroundColor: 'green'
  },
  red: {
    color: 'red',
  },
  container: {
    flex: 1,
    paddingTop: 22
   },
});

AppRegistry.registerComponent('LotsOfStyles', () => APP);

