**What type of language is Elixir?**

- functional
- built on top of Erlang VM which has been used for over 30 years in production of telecoms
- Ruby inspired in terms of syntax
- pattern matching
- metaprogramming
- concurrency
- dynamic

---

**What's Elixir REPL?**

`$ iex`

---

**How to use "inspect" in iex?**

`i 2+2`

---

**How to make large numbers more readable**

- `1000000000` is equivalent of `1_000_000_000`

---

**What's an upper limit for integers?**

In Elixir there's no upper limit for integers, the only limit is the OS memory.

---

**What are atoms?**

It's a constant variable where its name is also its value.

The regular syntax is colon and atom name e.g: `:ok`.
Atoms can also include whitespace `:"name and surname"`
Memory efficient, since they are stored in "atoms table".
Actually there are no booleans in Elixir, there are boolean atoms.

---

**What does returning an :ok atom means?**

When a function returns `:ok` atom, it means that operation has been successful. It used for pattern matching.

---

**What are falsy values?**

Only `false`, `:false` and `:nil` atoms.

---

**What's encoding of strings?**

`UTF-8` which means that Elixir supports UNICODE.

---

**How to get a length of a string?**

`String.lengt("xxx")`

---

**How to concatenate strings?**

`"x" <> "y" // "xy"` 

---

**How to handle string interpolation?**

```
handle = "@xbgord"

"My Twitter handle is #{handle}"
```

---

**What's a tuple?**

Tuple is an ordered collection (preferably up to 3/4 elements)

```
book = {"The shining", "Stephen King", 25.0}
{title, author, price} = book

title // "The shining"
```

It allows multiple data types.

---

**How to get n-th value from a tuple?**

```
book = {"The shining", "Stephen King", 25.0}
elem(tuple, 2) // 25.0
```

Ordered from 0.

---

**How to update a value in a tuple?**

```
book = {"The shining", "Stephen King", 25.0}
put_elem(book, 2, 20.0) // the price is 20.0 now
```

`put_elem` doesn't mutate the book tuple, it creates a new one.

---

**How to skip a value in a tuple?**

```
book = {"The shining", "Stephen King", 25.0}
{title, _, price}
```

---
