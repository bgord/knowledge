**Automatic code formatting**

Right click on the code area -> Reformat code with dartfmt

---

**Dart package repository**

[source](https://pub.dev)

---

**Import a dependency**

```dart
import 'package:<package_name>/<dart_entry_filename>';
```

---

**Final/const keywords**

Dart doesn't allow modifying the values declared by both of them.

`const` if a variable is known at compile time (used on a collection makes the entire collection const).

`final` used on variables at run time (used on a collection doesn't make the entire collection final).

---

**Create a map**

```dart
var colors = {
  "white":
}
```

---

**Access a value from a map**

```dart
var colors = {
  "white":
}

colors["white"];
```

---

**String interpolation**

```dart
var response = "HELLO";

print("RESPONSE: ${response}."):
```

---

**Callback function**

```
StreamBuilder(
  builder: (context, snapshot) {
    print(snapshot);
  }
)
```

---

**Generate n item array in Dart**

```dart
Iterable<int>.generate(10).toList().map((i) {
  print(i);
})
```

---

**Dart class property getter**

```dart
int get counter => _counter;
```

---

**Dart method definition**

```
void increment() {
  _counter++;
}
```

---

**Create a class with some properties**

```dart
class GithubUser {
  final String name;
  final String avatar_url;

  GithubUser({this.name, this.avatar_url});
}
```

---
