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
