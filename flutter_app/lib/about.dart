import 'package:flutter/material.dart';


class About extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("ABOUT"),
      ),
      body: Center(
        child: Text("about"),
      ),
    );
  }
}

// import 'dart:async' show Future;
// import 'package:flutter/services.dart' show rootBundle;

// Future<String> loadAsset() async {
//   return await rootBundle.loadString('assets/config.json');
// }