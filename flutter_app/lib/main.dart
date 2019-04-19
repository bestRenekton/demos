import 'package:flutter/material.dart';

import './star.dart';
import './about.dart';
import './timer.dart';
import './assetsTest.dart';
import './stateTest.dart';
import './basicWidget.dart';
import './layoutWidget.dart';
import './containerWidget.dart';
import './scaffold.dart';
import './scrollTest.dart';
import './customScrollTest.dart';
import './scrollControllerTest.dart';
import './willPopScopeTest.dart';
import './themeTest.dart';
import './pointerEventTest.dart';
import './gestureDetectorTest.dart';
import './dioTest.dart';

void main() => runApp(new MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new MaterialApp(
      title: 'Flutter Demo',
      theme: new ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: new MyHomePage(title: 'Flutter Demo Home Page'),
      //注册路由表
      routes: {
        "about": (context) => About(),
        "star": (context) => Star(),
        "timer": (context) => Timer(),
        "assetsTest": (context) => AssetsTest(),
        "stateTest": (context) => StateTest(),
        "basicWidget": (context) => BasicWidget(),
        "layoutWidget": (context) => LayoutWidget(),
        "containerWidget": (context) => ContainerWidget(),
        "scaffoldTest": (context) => ScaffoldTest(),
        "scrollTest": (context) => ScrollTest(),
        "customScrollTest": (context) => CustomScrollTest(),
        "scrollControllerTest": (context) => ScrollControllerTest(),
        "willPopScopeTest": (context) => WillPopScopeTest(),
        "themeTest": (context) => ThemeTest(),
        "pointerEventTest": (context) => PointerEventTest(),
        "gestureDetectorTest": (context) => GestureDetectorTest(),
        "dioTest": (context) => DioTest(),
      },
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);
  final String title;

  @override
  _MyHomePageState createState() => new _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  var arr = [
    {"text": "关于", "url": "about"},
    {"text": "标星star", "url": "star"},
    {"text": "计时器timer", "url": "timer"},
    {"text": "静态文件assetsTest", "url": "assetsTest"},
    {"text": "生命周期stateTest", "url": "stateTest"},
    {"text": "基础部件basicWidget", "url": "basicWidget"},
    {"text": "布局部件layoutWidget", "url": "layoutWidget"},
    {"text": "容器部件containerWidget", "url": "containerWidget"},
    {"text": "导航scaffoldTest", "url": "scaffoldTest"},
    {"text": "滚动scrollTest", "url": "scrollTest"},
    {"text": "滚动胶水CustomScrollTest", "url": "customScrollTest"},
    {"text": "可滚动部件scrollControllerTest", "url": "scrollControllerTest"},
    {"text": "返回拦截willPopScopeTest", "url": "willPopScopeTest"},
    {"text": "主题ThemeTest", "url": "themeTest"},
    {"text": "原始指针pointerEventTest", "url": "pointerEventTest"},
    {"text": "手势gestureDetectorTest", "url": "gestureDetectorTest"},
    {"text": "网络请求dioTest", "url": "dioTest"},
    {"text": "计时器timer", "url": "timer"},
    {"text": "计时器timer", "url": "timer"},
    {"text": "计时器timer", "url": "timer"},
    {"text": "计时器timer", "url": "timer"},
    {"text": "计时器timer", "url": "timer"},
  ];
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
        appBar: new AppBar(
          title: new Text(widget.title),
        ),
        body: ListView.builder(
          itemCount: arr.length,
          itemBuilder: (context, index) {
            return FlatButton(
              child: Text("${arr[index]["text"]}"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, "${arr[index]["url"]}");
              },
            );
          },
        )
        // body: new Center(
        //   child: new Column(
        //     mainAxisAlignment: MainAxisAlignment.center,
        //     children: <Widget>[
        //       FlatButton(
        //         child: Text("标星star"),
        //         textColor: Colors.blue,
        //         onPressed: () {
        //           Navigator.pushNamed(context, 'star');
        //           //导航到新路由
        //           // Navigator.push(context,
        //           //     new MaterialPageRoute(builder: (context) {
        //           //   return new Star();
        //           // }));
        //         },
        //       ),
        //       FlatButton(
        //         child: Text("网络请求dioTest"),
        //         textColor: Colors.blue,
        //         onPressed: () {
        //           Navigator.pushNamed(context, 'dioTest');
        //         },
        //       ),
        //     ],
        //   ),
        // ),
        );
  }
}
