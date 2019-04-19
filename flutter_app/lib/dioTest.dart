import 'package:flutter/material.dart';
import 'package:dio/dio.dart';
// import 'dart:convert';

class DioTest extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text("dio"),
      ),
      body: new DioTestBody(),
    );
  }
}

class DioTestBody extends StatefulWidget {
  _DioTestBody createState() => new _DioTestBody();
}

class _DioTestBody extends State<DioTestBody> {
  var arr;
  var arr2 = {"address": 12313};
  @override
  void initState() {
    super.initState();
    fetch();
  }

  void fetch() async {
    try {
      Response response = await Dio().post(
          "https://www.easy-mock.com/mock/5c831ff8e0e0f75c246236fd/GetList",
          data: {"row": 1});
      setState(() {
        arr = response.data["result"];
      });
    } catch (e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return ListView.builder(
        itemCount: arr.length,
        itemBuilder: (context, index) {
          return new ListItem(data: arr[index]);
        });
  }
}

class ListItem extends StatelessWidget {
  const ListItem({Key key, this.data}) : super(key: key);
  final data;
  @override
  Widget build(BuildContext context) {
    return Text("${data["csentence"]}");
  }
}

class ListType {
  final String image;
  final String csentence;

  ListType({
    this.image,
    this.csentence,
  });

  factory ListType.fromJson(Map<String, dynamic> json) {
    return ListType(
      image: json['image'] as String,
      csentence: json['csentence'] as String,
    );
  }
}
