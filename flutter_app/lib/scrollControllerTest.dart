import 'package:flutter/material.dart';

class ScrollControllerTest extends StatefulWidget {
  @override
  ScrollControllerTestRouteState createState() {
    return new ScrollControllerTestRouteState();
  }
}

class ScrollControllerTestRouteState extends State<ScrollControllerTest> {
  ScrollController _controller = new ScrollController();
  bool showToTopBtn = false; //是否显示“返回到顶部”按钮
  String _progress = "0%"; //保存进度百分比

  @override
  void initState() {
    //监听滚动事件，打印滚动位置
    _controller.addListener(() {
      // print(_controller.offset); //打印滚动位置
      if (_controller.offset < 100 && showToTopBtn) {
        setState(() {
          showToTopBtn = false;
        });
      } else if (_controller.offset >= 100 && showToTopBtn == false) {
        setState(() {
          showToTopBtn = true;
        });
      }
    });
  }

  @override
  void dispose() {
    //为了避免内存泄露，需要调用_controller.dispose
    _controller.dispose();
    super.dispose();
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(title: Text("滚动控制test")),
      body: Scrollbar(
        // child: ListView.builder(
        //     key: new PageStorageKey(1),//用于保存页面(路由)相关数据的Widge,如果ScrollController.keepScrollOffset为false，则滚动位置将不会被存储，
        //     itemCount: 100,
        //     itemExtent: 50.0, //列表项高度固定时，显式指定高度是一个好习惯(性能消耗小)
        //     controller: _controller,
        //     itemBuilder: (context, index) {
        //       return ListTile(
        //         title: Text("$index"),
        //       );
        //     }),
        child: NotificationListener<ScrollNotification>(
            //类型
            onNotification: (ScrollNotification notification) {
              //它包括一个metrics属性，它的类型是ScrollMetrics，该属性包含当前ViewPort及滚动位置等信息：
              //pixels：当前滚动位置。
              //maxScrollExtent：最大可滚动长度。
              //extentBefore：滑出ViewPort顶部的长度；此示例中相当于顶部滑出屏幕上方的列表长度。
              //extentInside：ViewPort内部长度；此示例中屏幕显示的列表部分的长度。
              //extentAfter：列表中未滑入ViewPort部分的长度；此示例中列表底部未显示到屏幕范围部分的长度。
              //atEdge：是否滑到了Scrollable Widget的边界（此示例中相当于列表顶或底部）
              double progress = notification.metrics.pixels /
                  notification.metrics.maxScrollExtent;
              //重新构建
              setState(() {
                _progress = "${(progress * 100).toInt()}%";
              });
              print("_progress: ${(progress * 100).toInt()}%");
            },
            child: Stack(
              children: <Widget>[
                ListView.builder(
                    key: new PageStorageKey(
                        1), //用于保存页面(路由)相关数据的Widge,如果ScrollController.keepScrollOffset为false，则滚动位置将不会被存储，
                    itemCount: 100,
                    itemExtent: 50.0, //列表项高度固定时，显式指定高度是一个好习惯(性能消耗小)
                    controller: _controller,
                    itemBuilder: (context, index) {
                      return ListTile(
                        title: Text("$index"),
                      );
                    }),
                CircleAvatar(
                  //显示进度百分比
                  radius: 30.0,
                  child: Text(_progress),
                  backgroundColor: Colors.black54,
                )
              ],
            )),
      ),
      floatingActionButton: !showToTopBtn
          ? null
          : FloatingActionButton(
              child: Icon(Icons.arrow_upward),
              onPressed: () {
                //返回到顶部时执行动画
                _controller.animateTo(.0,
                    duration: Duration(milliseconds: 200), curve: Curves.ease);
              }),
    );
  }
}
