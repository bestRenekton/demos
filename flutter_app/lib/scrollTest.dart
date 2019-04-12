import 'package:flutter/material.dart';

class ScrollTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("scrollTest"),
      ),
      body: ListView(
        children: <Widget>[new SingleChildScrollViewTest()],
      ),
    );
  }
}

class SingleChildScrollViewTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    String str = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

    return Scrollbar(
      child: SingleChildScrollView(
        scrollDirection: Axis.vertical, //默认垂直
        reverse: false, //初始位置：头还是尾,水平才有效果
        padding: EdgeInsets.all(16.0),
        child: Center(
          child: Column(
            //动态创建一个List<Widget>
            children: str
                .split("")
                //每一个字母都用一个Text显示,字体为原来的两倍
                .map((c) => Text(
                      c,
                      textScaleFactor: 2.0,
                    ))
                .toList(),
          ),
        ),
      ),
    );
  }
}
