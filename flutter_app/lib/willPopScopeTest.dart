import 'package:flutter/material.dart';

class WillPopScopeTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("WillPopScopeTest"),
      ),
      body: new WillPopScopeBody(),
    );
  }
}

class WillPopScopeBody extends StatefulWidget {
  @override
  _WillPopScopeBody createState() {
    return new _WillPopScopeBody();
  }
}

class _WillPopScopeBody extends State<WillPopScopeBody> {
  DateTime _lastPressedAt; //上次点击时间

  @override
  Widget build(BuildContext context) {
    return new WillPopScope(
      onWillPop: () async {
        if (_lastPressedAt == null ||
            DateTime.now().difference(_lastPressedAt) > Duration(seconds: 1)) {
          //两次点击间隔超过1秒则重新计时
          _lastPressedAt = DateTime.now();
          return false;//不返回
        }
        return true;//返回
      },
      child: Container(
        child: Text("1秒内2次返回才成功～～"),
      ),
    );
  }
}
