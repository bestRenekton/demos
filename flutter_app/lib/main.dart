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
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text(widget.title),
      ),
      body: new Center(
        child: new Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            FlatButton(
              child: Text("star"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, 'star');
                //导航到新路由
                // Navigator.push(context,
                //     new MaterialPageRoute(builder: (context) {
                //   return new Star();
                // }));
              },
            ),
            FlatButton(
              child: Text("timer"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, 'timer');
              },
            ),
            FlatButton(
              child: Text("about"),
              textColor: Colors.blue,
              onPressed: () {
                // debugDumpApp();
                // print('111');
                Navigator.pushNamed(context, 'about');
              },
            ),
            FlatButton(
              child: Text("assetsTest"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, 'assetsTest');
              },
            ),
            FlatButton(
              child: Text("stateTest"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, 'stateTest');
              },
            ),
            FlatButton(
              child: Text("basicWidget"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, 'basicWidget');
              },
            ),
            FlatButton(
              child: Text("layoutWidget"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, 'layoutWidget');
              },
            ),
            FlatButton(
              child: Text("containerWidget"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, 'containerWidget');
              },
            ),
            FlatButton(
              child: Text("scaffoldTest"),
              textColor: Colors.blue,
              onPressed: () {
                Navigator.pushNamed(context, 'scaffoldTest');
              },
            ),
          ],
        ),
      ),
    );
  }
}
