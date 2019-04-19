import 'package:flutter/material.dart';

class PointerEventTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("pointerEventTest"),
      ),
      body: new PointerEventTestBody(),
    );
  }
}

class PointerEventTestBody extends StatefulWidget {
  _PointerEventTestBody createState() => new _PointerEventTestBody();
}

class _PointerEventTestBody extends State<PointerEventTestBody> {
  PointerEvent _event; //定义一个状态，保存当前指针位置

  Widget build(BuildContext context) {
    return Listener(
      child: ConstrainedBox(
        constraints: BoxConstraints.tight(Size(300.0, 150.0)),
        child: Center(child: Text("Box A")),
      ),
      behavior:
          HitTestBehavior.opaque, //当前Widget的整个区域都是点击区域。 即使是透明的，注释后，文字才是点击区域
      //behavior: HitTestBehavior.translucent, //可以对自身边界内及底部可视区域都进行命中测试
      //deferToChild：子widget会一个接一个的进行命中测试，如果子Widget中有测试通过的，则当前Widget通过，这就意味着，如果指针事件作用于子Widget上时，其父(祖先)Widget也肯定可以收到该事件。
      onPointerDown: (PointerDownEvent event) {
        print("down A");
        setState(() => _event = event);
      },
      onPointerMove: (PointerMoveEvent event) => setState(() => _event = event),
      onPointerUp: (PointerUpEvent event) => setState(() => _event = event),
    );
  }
}
