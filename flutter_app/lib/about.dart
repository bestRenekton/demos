import 'package:flutter/material.dart';

class About extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("ABOUT"),
      ),
      body: ListView(
        children: <Widget>[Text('about')],
      ),
    );
  }
}
