import 'package:flutter/material.dart';

class ScrollTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("scrollTest"),
      ),
      body: Column(
        children: <Widget>[
          ListTile(title: Text("商品列表")),
          Expanded(
            child:new ListViewTest(),
          ),
        ],
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

class ListViewTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    Widget divider1 = Divider(color: Colors.blue);
    Widget divider2 = Divider(color: Colors.red);
    return ListView.separated(
      itemCount: 20,
      itemBuilder: (BuildContext context, int index) {
        return ListTile(title: Text("$index"));
      },
      separatorBuilder: (BuildContext context, int index) {
        return index % 2 == 0 ? divider1 : divider2;
      },
    );
  }
}
