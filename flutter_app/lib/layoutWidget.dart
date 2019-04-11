import 'package:flutter/material.dart';

class LayoutWidget extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("layoutWidget"),
        ),
        body: ListView(
          children: <Widget>[
            new RowColumnTest(),
            new FlexTest(),
            new WrapTest(),
            new StackTest()
          ],
        ));
  }
}

/**
 * 线性布局row,column
 */
class RowColumnTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      //测试Row对齐方式，排除Column默认居中对齐的干扰
      crossAxisAlignment: CrossAxisAlignment.start,
      children: <Widget>[
        Row(
          mainAxisSize: MainAxisSize.max, //最大宽度，min时对齐方式无效
          mainAxisAlignment: MainAxisAlignment.center, //水平：对齐方式，
          textDirection: TextDirection.rtl, //水平：方向
          verticalDirection: VerticalDirection.down, //垂直：方向
          crossAxisAlignment: CrossAxisAlignment.end, //垂直:对齐方式
          children: <Widget>[
            Text(" 1111 "),
            Text(" 22222 "),
            Text(
              " 333333 ",
              style: TextStyle(fontSize: 30.0),
            ),
          ],
        ),
      ],
    );
  }
}

/**
 * 弹性布局 flex
 */
class FlexTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        //Flex的两个子widget按1：2来占据水平空间
        Flex(
          direction: Axis.horizontal,
          children: <Widget>[
            Expanded(
              flex: 1,
              child: Container(
                height: 30.0,
                color: Colors.red,
              ),
            ),
            Expanded(
              flex: 2,
              child: Container(
                height: 60.0,
                color: Colors.green,
              ),
            ),
          ],
        ),
        Padding(
          padding: const EdgeInsets.only(top: 10.0),
          child: Container(
            height: 120.0,
            //Flex的三个子widget，在垂直方向按2：1：1来占用100像素的空间
            child: Flex(
              direction: Axis.vertical,
              children: <Widget>[
                Expanded(
                  flex: 2,
                  child: Container(
                    height: 30.0,
                    color: Colors.red,
                  ),
                ),
                Spacer(
                  flex: 1, //Spacer等价于下面
                ),
                // Expanded(
                //   flex: 1,
                //   child: const SizedBox(
                //     height: 0.0,
                //     width: 0.0,
                //   ),
                // ),
                Expanded(
                  flex: 1,
                  child: Container(
                    height: 30.0,
                    color: Colors.green,
                  ),
                ),
              ],
            ),
          ),
        ),
      ],
    );
  }
}

/**
 * 流式布局 wrap flow
 */
class WrapTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Wrap(
      spacing: 8.0, // 主轴(水平)方向间距
      runSpacing: 4.0, // 纵轴（垂直）方向间距
      alignment: WrapAlignment.center, //沿主轴方向居中
      children: <Widget>[
        new Chip(
          avatar:
              new CircleAvatar(backgroundColor: Colors.blue, child: Text('A')),
          label: new Text('Hamilton'),
        ),
        new Chip(
          avatar:
              new CircleAvatar(backgroundColor: Colors.blue, child: Text('M')),
          label: new Text('Lafayette'),
        ),
        new Chip(
          avatar:
              new CircleAvatar(backgroundColor: Colors.blue, child: Text('H')),
          label: new Text('Mulligan'),
        ),
        new Chip(
          avatar:
              new CircleAvatar(backgroundColor: Colors.blue, child: Text('J')),
          label: new Text('Laurens'),
        ),
      ],
    );
  }
}

/**
 * 层叠布局 Stack和Positioned
 */
class StackTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      height: 300,
      child: Stack(
        alignment: Alignment.center, //指定未定位或部分定位widget的对齐方式
        fit: StackFit.expand,//未定位widget占满Stack整个空间
        children: <Widget>[
          Container(
            child: Text("Hello world", style: TextStyle(color: Colors.white)),
            color: Colors.red,
          ),
          Positioned(
            left: 18.0,
            child: Text("I am Jack"),
          ),
          Positioned(
            top: 18.0,
            child: Text("Your friend"),
          )
        ],
      ),
    );
  }
}
