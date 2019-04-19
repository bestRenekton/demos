import 'package:flutter/material.dart';

class GestureDetectorTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("pointerEventTest"),
      ),
      body: new GestureDetectorTestBody(),
    );
  }
}

class GestureDetectorTestBody extends StatefulWidget {
  _GestureDetectorTestBody createState() => new _GestureDetectorTestBody();
}

class _GestureDetectorTestBody extends State<GestureDetectorTestBody> {
  String _operation = "No Gesture detected!"; //保存事件名
  void updateText(String text) {
    //更新显示的事件名
    setState(() {
      _operation = text;
    });
  }

  Widget build(BuildContext context) {
    return Center(
      child: GestureDetector(
        child: Container(
          alignment: Alignment.center,
          color: Colors.blue,
          width: 200.0,
          height: 100.0,
          child: Text(
            _operation,
            style: TextStyle(color: Colors.white),
          ),
        ),
        onTap: () => updateText("Tap"), //点击
        onDoubleTap: () => updateText("DoubleTap"), //双击
        onLongPress: () => updateText("LongPress"), //长按
        //当同时监听onTap和onDoubleTap事件时，当用户触发tap事件时，会有200毫秒左右的延时，这是因为当用户点击完之后很可能会再次点击以触发双击事件，所以GestureDetector会等一断时间来确定是否为双击事件。如果用户只监听了onTap（没有监听onDoubleTap）事件时，则没有延时。

        onPanDown: (DragDownDetails e) {
          //打印手指按下的位置(相对于屏幕)
          print("按下：${e.globalPosition}");
        },
        //手指滑动时会触发此回调
        onPanUpdate: (DragUpdateDetails e) {
          //用户手指滑动时，更新偏移，重新构建
          print("滑动：${e.delta}");
        },
        onPanEnd: (DragEndDetails e) {
          //打印滑动结束时在x、y轴上的速度
          print("滑动结束：${e.velocity}");
        },
        // onScaleUpdate: (ScaleUpdateDetails details) {
        //   setState(() {
        //     //缩放倍数在0.8到10倍之间
        //     _width=200*details.scale.clamp(.8, 10.0);
        //   });
        // },
      ),
    );
  }
}
