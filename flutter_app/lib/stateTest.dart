import 'package:flutter/material.dart';

class StateTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
        appBar: AppBar(
          title: Text("ABOUT"),
        ),
        // body: Center(
        //   child: Text("about"),
        // ),
        body: new Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          children: <Widget>[new BoxA(), new BoxB(), new LifecCycle()],
        ));
  }
}

//自身管理自己的状态
class BoxA extends StatefulWidget {
  @override
  //Flutter中定义Stateful类必须返回一个State类的对象，
  _BoxAState createState() => new _BoxAState();
}

class _BoxAState extends State<BoxA> {
  bool _show = false;
  void _changeShow() => {
        setState(() {
          _show = !_show;
        })
      };

  @override
  Widget build(BuildContext context) {
    return new GestureDetector(
        onTap: _changeShow,
        child: new Container(
          alignment: Alignment.center,
          width: 200.0,
          height: 200.0,
          child: new Text(
            _show ? 'StatefulWidget_show' : 'StatefulWidget_hide',
            style: new TextStyle(fontSize: 20.0, color: Colors.white),
          ),
          decoration:
              new BoxDecoration(color: _show ? Colors.green[400] : Colors.grey),
        ));
  }
}

//由父控件管理子控件的状态
//子控件自身是无状态的控件，但是父控件会在子控件发生变化以后得知这一更新，
//并进行状态的更新以及控件的重绘。
class BoxB extends StatefulWidget {
  @override
  _BoxBState createState() => new _BoxBState();
}

class _BoxBState extends State<BoxB> {
  bool _show = false;
  void _changeShow() => {
        setState(() {
          _show = !_show;
        })
      };
  @override
  Widget build(BuildContext context) {
    return new Son(
      show: _show,
      onChanged: _changeShow,
    );
  }
}

//没有自己的状态，只继承父级状态
class Son extends StatelessWidget {
  const Son({Key key, this.show: false, @required this.onChanged})
      : super(key: key);
  final show; //被声明为final，防止被意外改变。
  final onChanged;

  @override
  Widget build(BuildContext context) {
    return new GestureDetector(
        onTap: onChanged,
        child: new Container(
          alignment: Alignment.center,
          width: 200.0,
          height: 200.0,
          child: new Text(
            show ? 'StatelessWidget_show' : 'StatelessWidget_hide',
            style: new TextStyle(fontSize: 20.0, color: Colors.white),
          ),
          decoration:
              new BoxDecoration(color: show ? Colors.green[400] : Colors.grey),
        ));
  }
}




//生命周期
class LifecCycle extends StatefulWidget {
  const LifecCycle({Key key, this.initValue: 0});
  final int initValue;

  @override
  _LifecCycleState createState() => new _LifecCycleState();
}

class _LifecCycleState extends State<LifecCycle> {
  int _counter;

  @override
  void initState() {
    super.initState();
    //初始化状态
    _counter = widget.initValue;
    print("initState");
  }

  @override
  Widget build(BuildContext context) {
    print("build");
    return Center(
      child: FlatButton(
        child: Text('$_counter'),
        //点击后计数器自增
        onPressed: () => setState(() => ++_counter),
      ),
    );
  }

  @override
  void didUpdateWidget(LifecCycle oldWidget) {
    super.didUpdateWidget(oldWidget);
    print("didUpdateWidget");
  }

  @override
  void deactivate() {
    super.deactivate();
    print("deactive");
  }

  @override
  void dispose() {
    super.dispose();
    print("dispose");
  }

  @override
  void reassemble() {
    super.reassemble();
    print("reassemble");
  }

  @override
  void didChangeDependencies() {
    super.didChangeDependencies();
    print("didChangeDependencies");
  }
}
