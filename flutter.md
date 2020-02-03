**Supported Android/iOS versions**

Android Jelly Bean 4.1.x and iOS 8+.

---

**Flutter installation**

[source](https://flutter.dev/docs/get-started/install/linux)

After you are able to execute `flutter` command, run `flutter doctor` until it passes.

---

**Build a Flutter APK**

`flutter build apk --release`

---

**An example non Material Design app**

[source](https://stackoverflow.com/questions/47984598/starting-with-plain-non-material-ui-canvas-in-flutter)

```dart
import 'package:flutter/widgets.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Container(
      padding: EdgeInsets.all(25.0),
      child: Directionality(
      textDirection: TextDirection.ltr,
      child:Text("hello world",
        style: TextStyle(
          color: Color.fromRGBO(255, 255, 255, 1)
        ),
      )));
  }
}
```

---

**Developing a Flutter app in VIM**

Install ['thosakwe/vim-flutter'](https://github.com/thosakwe/vim-flutter) VIM plugin.

```bash
$ flutter emulators # to check for currently running emulators
$ flutter emulators --launch Pixel_2_API_28 # (or any other available emulator)
```

```vim
:FlutterRun # it allows on-save hot reloading
```

---

**Dependency installation**

Open `pubspec.yaml` file.
Find the `dependencies` section.
Add the proper version.
Run the `$ flutter pub get` command.

---

**Basic widgets**

Text, Row, Column, Container, Directionality.

---

**Directionality**

Two possibilities: lrt/rtl.

```dart
Directionality(
  textDirection: TextDirection.lrt,
  child: Text(
    "HAHAHAH"
  )
)
```

---

**What's a widget?**

In Flutter almost everything is a widget: the app's root, padding, margin, alignment, layout, etc.

---

**Create an RGBA color variable**

```
const blue = const Color(0xff2980b9));
```

---

**Set a container background color**

```
const blue = const Color(0xff2980b9));

Container(
   color: blue,
)
```

---

**Update Flutter version**

```bash
$ flutter upgrade
```

---

**Text widget styles**

```dart
Text(
  "Some text",
  textAlign: TextAlign.center,
  style: TextStyle(
    color: colors["white"],
    fontSize: 25.0,
    fontWeight: FontWeight.bold,
    decoration: TextDecoration.underline,
  )
)
```

---

**Add padding to a Container**

```
Container(
  padding: EdgeInsets.only(top: 25.0, left: 75.0),
  child: Text("HEHEHE")
)
```

---

**Black/White colors**

```
Color(0xFFFFFFFF) // white constructor
Color(0xFF000000) // black constructor

Color.fromRGBO(255, 255, 255, 1.0) // white
Color.fromRGBO(0, 0, 0, 1.0) // black
```

---

**Row usage**

```
- [ xxx yyy ] ----- main axis
-
-
cross axis
```


```dart
Row(
  mainAxisAlignment: MainAxisAlignment.spaceBetween,
  crossAxisAlignment: crossAxisAlignment.start,
  children: <Widget> [
     Text("xxx"),
     Text("yyy"),
  ]
)
```

---

**Add Padding to any widget**

```dart
Padding(
  padding: EdgeInsets.only(left: 25.0),
  child: Text(
    "xxx"
  )
)
```

---

**Automatically wrap widgets with helpers in Android Studio**

Put cursor on the widget you want to modify and press `Alt + Enter`.

---

**Add Border to a Container**

```dart
Container(
  decoration: BoxDecoration(
    border: Border.all(width: 2.0, color: colors["green"]),
  )
)
```

---

**Add an elliptical BorderRadius to a Container**

```dart
Container(
  decoration: BoxDecoration(
    border: Border.all(width: 2.0, color: colors["green"]),
    borderRadius: BorderRadius.all(Radius.elliptical(10, 10)),
  )
)
```

---

**Create a widget**

```dart
class RegularText extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return Text(
      'SOME TEXT',
      style: TextStyle(fontSize: 16.0)
    )
  }
}
```

---

**Pass a prop to a widget**

```
class RegularText extends StatelessWidget {
  final String content;

  RegularText({this.content})

  @override
  Widget build(BuildContext context) {
    return Text(
      this.content,
      style: TextStyle(fontSize: 16.0)
    )
  }
}
```

---

**Cannot change RaisedButton color**

Ensure `onPressed` handler is passed.

---

**Change RaisedButton size**

Wrap it with SizedBox.

```dart
SizedBox(
  width: 300.0,
  height: 300.0,
  child: RaisedButton(
    child: Text(
      "xxx"
    )
  )
)
```

---

**Safe area**

It's a utility widget that when passed a child, ensures sufficient padding is present in order to avoid content distortion.

---

**Custom button**

```dart
GestureDetector(
  onTap: () {
    print("tapped");
  }
  child: Container(
    decoration: BoxDecoration(
      border: Border.all(width: 2.0)
    ),
    child: Padding(
      padding: EdgeInsets.all(25.0),
      child: Text(
        "xxx"
      )
    )
  )
)
```

---

**Websockets example**

[source](https://flutter.dev/docs/cookbook/networking/web-sockets)

---

**Form example**

```dart
class User {
  String email = '';
  String password = '';
}

class RegisterForm extends StatefulWidget {
  @override
  _RegisterForm createState() => _RegisterForm();
}

class _RegisterForm extends State<RegisterForm> {
  final _formKey = GlobalKey<FormState>();

  final _user = User();

  @override
  Widget build(BuildContext context) {
    return Form(
        key: this._formKey,
        child: Column(
          children: <Widget>[
            FancyInput(
              child: TextFormField(
                onSaved: (val) => setState(() => _user.email = val),
                validator: (value) {
                  return value.isEmpty ? "Wpisz email..." : null;
                },
                keyboardType: TextInputType.emailAddress,
                obscureText: false,
                decoration: InputDecoration(
                    hintText: "E-mail",
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(
                        horizontal: 25.0, vertical: 15.0)),
              ),
            ),
            FancyInput(
              child: TextFormField(
                obscureText: true,
                onSaved: (val) => setState(() => _user.password = val),
                validator: (value) {
                  return value.isEmpty ? "Wpisz hasło..." : null;
                },
                decoration: InputDecoration(
                    hintText: "Hasło",
                    border: InputBorder.none,
                    contentPadding: EdgeInsets.symmetric(
                        horizontal: 25.0, vertical: 15.0)),
              ),
            ),
            BigButton(
                content: "Zaloguj się",
                onPressed: () {
                  final form = this._formKey.currentState;
                  if (form.validate()) {
                    form.save();
                    print(_user.password);
                    print(_user.email);
                  }
                }
            )
          ],
        ),
      );
  }
}
```

---

**QR code scanner example**

```
import 'package:flutter/material.dart';
import 'package:barcode_scan/barcode_scan.dart';
import 'package:flutter/services.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'QR CODE',
      theme: ThemeData(
        primarySwatch: Colors.blue,
      ),
      home: MyHomePage(title: 'QR CODE SCANNER'),
    );
  }
}

class MyHomePage extends StatefulWidget {
  MyHomePage({Key key, this.title}) : super(key: key);

  final String title;

  @override
  _MyHomePageState createState() => _MyHomePageState();
}

class _MyHomePageState extends State<MyHomePage> {
  Future _handleScan() async {
    try {
      String  qrResult = await BarcodeScanner.scan();
      print(qrResult);
    }
    catch(e) {
      print(e);
    }
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text(widget.title),
      ),
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
          ],
        ),
      ),
      floatingActionButton: FloatingActionButton(
        onPressed: _handleScan,
        tooltip: 'Scan',
        child: Text("Scan"),
      ), // This trailing comma makes auto-formatting nicer for build methods.
    );
  }
}
```

---

**Develop an app on device without USB connection**

1. Download adb (Android Debug Bridge).
2. Connect your phone via USB.
3. Check if the phone is present in the `adb devices` output.
4. Run `adb tcpip 5555`.
5. Disconnect the phone from USB.
6. Check your phone's IP, Settings -> About Phone.
7. Run `adb connect <ip>:5555`.
8. Check if your a wireless connection to your phone is present in `adb devices` output.

---

**Run a shell command on a device**

```bash
$ adb shel echo "xxxx"
```

---

**Example carousel in Flutter**

```dart
import 'package:carousel_slider/carousel_slider.dart';

CarouselSlider(
  height: 200.0,
  enableInfiniteScroll: false,
  items: Iterable<int>.generate(10).toList().map((i) {
    return Builder(
      builder: (BuildContext context) {
        return Container(
            width: MediaQuery.of(context).size.width,
            margin: EdgeInsets.symmetric(horizontal: 10.0),
            decoration: BoxDecoration(color: Colors.blueAccent),
            child: Text(
              'text $i',
              style: TextStyle(fontSize: 16.0),
            ));
      },
    );
  }).toList(),
);
```

[source](https://pub.dev/packages/carousel_slider)

---

**Set clipboard data**

```dart
FlatButton(
  onPressed: () {
    Clipboard.setData(ClipboardData(text: "hello from clipboard!"))
  }
  child: Text("Copy some text")
)
```

---

**Flutter scoped_model model declaration and usage**

```dart
import 'package:scoped_model/scoped_model.dart';

class CounterModel extends Model {
  int _counter = 0;

  int get counter => _counter;

  void increment() {
    _counter++;

    notifyListeners();
  }

  void boost(int step) {
    _counter = _counter +5;

    notifyListeners();
  }
}

new ScopedModel<CounterModel>(
  model: new CounterModel(),
  child: Column(
    children: <Widget>[
      Text("EXAMPLE"),
      new ScopedModelDescendant<CounterModel>(
        builder: (context, child, model) => Text("Current counter: ${model.counter}"),
      )
    ]
  )
);
```

---

**Generate icons for iOS app**

[0](https://alligator.io/flutter/app-icons/)

---

**Change iOS app name in Flutter**

[0](https://www.woolha.com/tutorials/flutter-change-app-launcher-icon-name-android-ios)

---
