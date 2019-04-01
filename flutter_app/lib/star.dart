import 'package:flutter/material.dart';
import 'package:english_words/english_words.dart';

// void main() => runApp(new Star());

class Star extends StatelessWidget {
  @override
  // Widget build(BuildContext context) {
  //   // final wordPair = new WordPair.random();
  //   return new MaterialApp(
  //     title: 'Startup Name Generator',
  //     home: new RandomWords(),
  //     theme: new ThemeData(
  //       primaryColor: Colors.white,
  //     ),
  //   );
  // }
  Widget build(BuildContext context) {
    return new RandomWords();
    // return Scaffold(
    //   appBar: AppBar(
    //     title: Text("New route"),
    //   ),
    //   body: new RandomWords()
    // );
  }
}

class RandomWords extends StatefulWidget {
  @override
  createState() => new RandomWordsState();
}

class RandomWordsState extends State<RandomWords> {
  final _suggestions = <WordPair>[];
  final _saved = new Set<WordPair>();
  final TextStyle _biggerFont = new TextStyle(fontSize: 16.0);
  void _pushSaved() {
    Navigator.of(context).push(new MaterialPageRoute(builder: (context) {
      final tiles = _saved.map((pair) {
        return new ListTile(
            title: new Text(
          pair.asPascalCase,
          style: _biggerFont,
        ));
      });
      final divided = ListTile.divideTiles(
        context: context,
        tiles: tiles,
      ).toList();

      return new Scaffold(
          appBar: new AppBar(title: new Text('saved suggestions')),
          body: new ListView(children: divided));
    }));
  }

  @override
  Widget build(BuildContext context) {
    return new Scaffold(
      appBar: new AppBar(title: new Text('测试一下'), actions: <Widget>[
        new IconButton(
          icon: new Icon(Icons.list),
          onPressed: _pushSaved,
        )
      ]),
      body: _buildSuggestions(),
    );
  }

  Widget _buildSuggestions() {
    return new ListView.builder(
      padding: const EdgeInsets.all(16.0),
      itemBuilder: (context, i) {
        if (i.isOdd) {
          return new Divider();
        }
        final index = i ~/ 2;
        if (index >= _suggestions.length) {
          _suggestions.addAll(generateWordPairs().take(10));
        }
        return _buildRow(_suggestions[index]);
      },
    );
  }

  Widget _buildRow(WordPair pair) {
    final alreadySaved = _saved.contains(pair);
    return new ListTile(
      title: new Text(
        pair.asPascalCase,
        style: _biggerFont,
      ),
      trailing: new Icon(
        alreadySaved ? Icons.favorite : Icons.favorite_border,
        color: alreadySaved ? Colors.red : null,
      ),
      onTap: () {
        setState(() {
          if (alreadySaved) {
            _saved.remove(pair);
          } else {
            _saved.add(pair);
          }
        });
      },
    );
  }
}
