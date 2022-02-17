**How to correctly namespace things?**

1. Make names easy to sort and digest while listing:

```
uploads_mlekolandia
uploads_maslolandia
uploads_jogurtolandia
```

instead of

```
mlekolandia_uploads
maslolandia_uploads
jogurtolandia_uploads
```

2. The date format that makes the most sense (the same two benefits as above):

```
2019-08-01
2019-08-02
2019-08-02
```

The rule is: general first, specific last.

---

**How to correctly remove data in between seeds**

Seeders should only be there to seed and nothing else.

```bash
$ adonis migration:refresh # rollbacks all migrations to the 0 batch and reruns them
$ adonis seed
```

[source](https://forum.adonisjs.com/t/cannot-truncate-a-table-referenced-in-a-foreign-key-constraint/497/2)

---

**How to correctly model controllers to be "cruddy"?**

Never write custom actions. (max 7 standard CRUD actions).

Figuring names: after an actions happens, what do we have that we didn't have before?

1. Remodel a custom action on a nested resource to a CRUD action of some (maybe new) controller.
2. Editing an attribute idependently from the rest? New controller.
3. Touches pivot records? New controller, and probably a new model.
4. Transitioning state? New controller.

[source](https://www.youtube.com/watch?v=MF0jFKvS4SI&list=WL&index=16&t=0s)

---

**Backend and frontend code containers**

There's nothing wrong in keeping both backend and frontend code in on container.
Although it's a good idea to start only backend in the container entrypoint.
Frontend dev server can be run via docker-compose exec or docker run command.
It also allows running an nginx to serve the static frontend files in production.

---

**E2E best practices**

1. Click submit buttons in your tests instead of artificially submitting forms (e.g `.submitForm("formName")`). It helps when e.g a submit button doesn't have `type="submit"` and clicking it won't submit a form.

---

**Comments about making scripts executable**

If you use git, there's no need to add comments about making scripts executable.
Git remembers fs permissions.

---

**JWT**

It's a stateless authentication mechanism.

It all starts with a secret that you sign your JWTs with.
The first part of JWT is header which consists of algorithm name, type, or expiration date.
The second part is a payload you want to transfer.
The last part is a signature.

Then, it's base64'd to a string token.

It should typically be transfered by `Authorization=Bearer <token>` in HTTP requests.

The main caveat is you cannot revoke a token in a canonical way.
It's possible to set short expiration dates or store a list of expired tokens (which seems like an overkill).

---

**Folder structures**

Flat structure with long and descriptive names > deep folder structure.
Optimize for discoverability: finding the right file/moving files around.

[1](https://twitter.com/dan_abramov/status/1145354949871767552)

---

**Email change flow**

1. Sending a verification message to the old account. (won't work because the account may be compromised)
2. Sending a verification message to the new account. (an intruder may grab somebody's device and set a email to their own address).
3. Sending a verification messages to both accounts. (won't work because of #1)

The best approach is the #2 but forcing user to input a passoword before the change.

[1](https://ux.stackexchange.com/a/58553)

---

**401 vs 403 HTTP status**

401 - invalid credentials (unauthorized)

403 - valid credentials but not enough permissions (forbidden)

---

**Making servers secure**

1. Frequently run `apt-get update && apt-get upgrade`.

---

**Are cookies port specific?**

Yes.

---

**What's the difference between 127.0.0.1 and 0.0.0.0?**

127.0.0.1 means "here", the address of the local computer.

0.0.0.0 is not really an address, it means "\*".

A server on a machine/container has to be running on 0.0.0.0 to allows outside connections.
If run on 127.0.0.1, will allow only local connections.

---

**Why avoid "Click here" links**

It's troublesome for some users that use screan readers.
They have an ability to announce all links troughout the page, and "Click here" isn't really meaningful.

One way out of this is to change the text.

Use an `aria-label`:

```html
<a href="/training" aria-label="We can train your team">Learn more</a>
```

Be careful though, and don't duplicate aria-label with the text because some screen readers may announce it twice.

Use an `aria-labelledby`:

```html
<div id="hooks-heading">
  <h2>React Hooks</h2>
  <div>New On-Demand Course</div>
</div>
<div>
  <!-- the rest of the content -->
</div>
<a aria-labelledby="hooks-heading" href="...">Learn More</a>
```

---

**Facade - design pattern**

It's a structural pattern which is a shield (a facade) from the complex code.

Instead:
Your system -> complex system(s)

You do:
Your system -> facade (with a nice API) -> complex system(s)

Benefits:

- API more specific to your problem
- a good starting point for refactoring
- better readability

---

**Strategy design pattern**

Strategy is a behavioral deisn pattern.

It means that it allows to dynamically set interchangeable strategies with dealing with a problem.

## Problem

Let's say you have a navigation app, and you want to autogenerate routes from point A to B.
In the initial version, you allow building routes over roads.

But! In the next releases, you add more and more options: public transport, bikes, walking etc.

If you keep extending the initial algorithm to implement other options, it obvioiusly keeps growing.
Moreover, it becomes more complex, and addition/fix to one algorithm may interfere with others.

## Solution

The key is to create strategies as separate classes/functions:
The important thing is that they have the same interface.

```js
class SomeStrategy {
  execute(sth) {
    return sth;
  }
}

class AnotherStrategy {
  execute(sth) {
    // ...
    return sth_else;
  }
}
```

And a separate class/function that is a "proxy" and fires the selected strategy, called `Context`.

```js
class Context {
  setStrategy(strategy) {
    this.strategy = strategy;
  }
  execute() {
    this.strategy.execute();
  }
}
```

Source: [0](https://refactoring.guru/design-patterns/strategy)

---

**Law of Demeter**

It's a "only talk to your immediate friends" rule that given object should assume as little as possible about the structure or properties of anything else.

E.g (don't use properties that are far away: `this.Parent().Children().first().color`).

Given object should only communicate with/read from: itself, a param passed to it, an object created by it

Principle of Least Knowledge.

---

**UTC**

A time standard meaning COORDINATED UNIVERSAL TIME.

It's designed to coordinate clocks.

Points to the time at 0 degrees longitude.

---

**ISO dates**

ISO 8601 is an official format of date and time representation.

It's based on the Gregorian calendar with 24 hours.

It can have an optional UTC offset, both positive and negative integers.

`14:45:15Z` means `14:45:15` in UTC.

`14:45:15Z` means `18:45:15+04`.

`2014`, `2014-04`, `2014-04-03` - all of these dates are correct ISO dates.

To add time info:
`2014-04-03T23:04Z` (in UTC)
`2014-04-03T21:04+3:00` the moment as above

It's recommended to save ISO dates to the databases!

[0](https://dev.to/corykeane/3-simple-rules-for-effectively-handling-dates-and-timezones-1pe0)

---

**Picking color range**

[0](https://twitter.com/siddharthkp/status/1277620589512048641/photo/1)
[1](https://hihayk.github.io/scale/#4/6/50/80/0/0/20/50/C71E68/199/30/104/white)

---

**Y10K problem**

It's a problem that most date representations handle only 4 digit years,
and a 5 digit year can cause an issue.

---

**Retry-After HTTP header**

It's useful to send it along with the `503` (service unavailable) response to indicate the downtime.

It can be either a delay in seconds, or a date.

---

**Conventional commits linter and autogenerated changelog setup**

[0](https://www.mokkapps.de/blog/how-to-automatically-generate-a-helpful-changelog-from-your-git-commit-messages)

---

**Favicon size**

The most common is 16x16 px, but some browsers may also display 32x32 px.

---

**DNS records**

`CNAME` points to another domain instead of an IP:

```
blog.dnsimple.com.      CNAME   aetrion.github.io.
```

`A` points to a specific IP address:

```
blog.dnsimple.com.     A        185.31.17.133
```

[source](https://support.dnsimple.com/articles/differences-a-cname-records/)

---

**Perceived brightness of a color**

R, G, B are decimal components of a hexadecimal color

```js
Math.sqrt(
  0.299 * Math.pow(R, 2) + 0.587 * Math.pow(G, 2) + 0.114 * Math.pow(B, 2)
) / 255;
```

---

**Technical debt**

Faster implementation of a feature with lower code quality.

Mortgage metaphor - own a house before you have all the money.

---

**Refactoring**

Change of an internal structure without changing observable behaviour.

Think separately about:
- what the function does (observable behaviour)
- how the function does it (implementation details)

---

**Writing tests in a project where there are no tests**

Find a method/function that has STABLE observable behaviour and test the behaviour - not the implementation details.
Go through all method/function clients.

---

**Alpinist's refactoring rule**

Either
- add a new test case without changing implementation
- change the implementation without changing test cases

Don't do both these things at the same time, so the refactoring remains stable.

---

**Refactoring return of investment**

If a function is stable - doesn't change often - it may not be the best investment to refactor it.

How long refactoring would take?
When will the investment be worthwile?

---
