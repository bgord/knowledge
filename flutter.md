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

**Automatic code formatting**

Right click on the code area -> Reformat code with dartfmt

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

**Flutter package repository**

[source](https://pub.dev/flutter)

---

**Dependency installation**

Open `pubspec.yaml` file.
Find the `dependencies` section.
Add the proper version.
Run the `$ flutter pub get` command.

---

**Importing a dependency**

```dart
import 'package:<package_name>/<dart_entry_filename>';
```

---

**Dart final/const keywords**

Dart doesn't allow modifying the values declared by both of them.

`const` if a variable is known at compile time (used on a collection makes the entire collection const).

`final` used on variables at run time (used on a collection doesn't make the entire collection final).

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
