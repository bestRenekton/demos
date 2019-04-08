import 'dart:convert' show json;

import 'package:flutter/material.dart';

class AssetsTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(
        title: new Text('Assets'),
      ),
      body: new JsonView(),
    );
  }
}

class JsonView extends StatefulWidget {
  @override
  State<StatefulWidget> createState() {
    return new _JsonViewState();
  }
}

class _JsonViewState extends State<JsonView> {
  @override
  Widget build(BuildContext context) {
    return new FutureBuilder(
      future: DefaultAssetBundle.of(context).loadString("assets/json/test.json"),
      builder: (context, snapshot) {
        print(snapshot);
        if (snapshot.hasData) {
          List<dynamic> data = json.decode(snapshot.data.toString());

          return new ListView.builder(
            itemCount: data.length,
            itemBuilder: (BuildContext context, int index) {
              return new Card(
                child: new Column(
                  crossAxisAlignment: CrossAxisAlignment.stretch,
                  children: <Widget>[
                    new Text("Name: ${data[index]["name"]}"),
                    new Text("Age: ${data[index]["age"]}"),
                    new Text("Height: ${data[index]["height"]}"),
                    new Text("Gender: ${data[index]["gender"]}"),
                    new Image.asset("assets/images/avatar.png")
                  ],
                ),
              );
            },
          );
        }
        return new CircularProgressIndicator();
      },
    );
  }
}
