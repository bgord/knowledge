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

**Being, behaving, becomming**

Being, what is it?

- what are its properties?
- how numerous is it?
- data structure
- nouns

Behaving, what is it doing?

- what is changing?
- how often does it change?
- who changes it?
- why do they change it?
- can we repeat the change?
- can we cancel/withdraw the change?

Becoming, what does change into?

- does it always change into this thing?
- how is the new thing different?

---

**Circuit breaker**

Circuit breaker is an object that is used to wrap an async function that can fail.
If it starts to fail too much, the circuit breaker no longer calls the function and plays dead.

You can trigger some monitoring alert when the circuit breaks.

https://github.com/nodeshift/opossum

---

**Conway's law**

Conway's law states that organization's system architecture is the copy of the organization's communication paths .

If the organization's communication is mess, the system will be messy too.

---

**Writing good documentation**

https://documentation.divio.com/

---

**DNS records**

DNS records map host names to to one or more IP addresses.

`A` - points a name to a specific IP address

```
blog.dnsimple.com.     A        185.31.17.133
```

`CNAME` - points a name to another name, and follows its redirects

```
blog.dnsimple.com.      CNAME   aetrion.github.io.
```

It's possible to define a wildcard DNS record (either A or CNAME), so it handles all subdomains you haven't covered yet.

`TXT` - allows to place a text associated with the host, can be used to verify ownership

---

**God class**

An anti-pattern, a class that does too much or knows too much.

Probably has low cohesion and high coupling.

---

**Inner platform effect**

It's an anti-pattern that can also be called overgeneralization.

Happens when a class or a function implements tries to handle so many use cases by different parameters, that it no longer provides any abstraction.

Examples:

- an input React component that has all the attributes/handlers defined/redefined as props
- a database query constructing function that takes field names, table name, and returned fields as parameters

[0](https://thedailywtf.com/articles/The_Inner-Platform_Effect)

---

**Dreyfus model of skill acquisition**

This model presents stages of competence in a particular field.

1. Novice

- you need someone to explain the task step by step
- you have no intuition
- you don't see the bigger picture

2. Advanced beginner

- you formulate basic rules
- you still can't see the bigger picture
- you still struggle with technical issues
- you still need someone to help you, fast!

To sum up, you need to be told how and what to do.

3. Competent

- you no longer struggle with technical issues
- you are able to see the goal
- you are able to plan steps towards that goal yourself
- you are able to create conceptual models of problems
- you make your own rules, follow, and verify them

We are able to get there by linear progress - by repetition.

4. Proficient

- high jump in terms of quality, you need to solve a different set of problems
- analogies
- goal in different contexts
- you are able to see the bigger picture, but it's kind of a shock - your small bubble is not everything

5. Expert

- you've gathered almost all the knowledge in a field lead by proficiency and curiosity
- you look for analogies from different domains (biology, architecture?)
- you develop intuition!

---

**Estimates**

Provide three estimates instead of one fixed point in time:

- optimistic (you're most probably won't be able to finish the task under this time)
- realistic (your gut feeling)
- pessimistic (the scenario in which everything goes wrong)

For example: 2h, 8h, 48h.

---

**Exponential backoff**

A strategy to retry an operation that can fail with exponential delays between attempts.

e.g: 1s, 2s, 4s, 8s, 16s

---

**Footer copyrights and all rights reserved**

They have no value.

---

**Image SEO**

Images should be relevant. If the content is about miners, the best image to include is an image of one of our ASIC miners. Do not include random, abstract images of skyscrapers or pickaxes. Remember that images must also clear legal.

**REMEMBER:**
It is EXTREMELY important to put Page Load Speeds and Core Web Vitals FIRST.

**EXAMPLE:**

- BAD: IMG123#$.png
- BETTER: kitten_with_blocks.jpeg
- BEST: best_cat_toys_kitten_blocks.jpeg

Using Alt Text:

- Descriptive Text
- Useful
- Keywords

Here’s what Google says:

> When choosing alt text, focus on creating useful, information-rich content that uses keywords appropriately and is in context of the content of the page. Avoid filling alt attributes with keywords (keyword stuffing) as it results in a negative user experience and may cause your site to be seen as spam.

**EXAMPLE:**

- BAD: Best cat toys on Amazon kitten blocks.
- BETTER: Kitten playing with blocks.
- BEST: Kitten playing with best cat toys from Amazon.

PRO TIP: The best way to decide what the alt tag should be is to finish this sentence:

“This is a(n) image/screenshot/photograph/drawing of...”

---

**Image optimisation**

https://imagecompressor.com/
https://tinypng.com/

---

**Keeping a bugfix log**

If a commit is bugfix-related, write a description of it.

Then, you can cluster the bugs, and figure out a way to improve the process or even never let it happen again.

---

**Optimistic locking**

It's a way to solve Concurrency problem to a database table.

1. Add a `version` table column.
2. Read a resource from the database.
3. While saving, in the transaction, check if the `version` has been changed.
4. Increment the `version` column associated to the resource.

---

**URL redirection vs rewrite**

Redirect

- client side
- let's the browser perform the URL change

Rewrite

- server side
- doesn't change the URL in the browser

Possible redirect codes:
301 – Permanent
302 – Found
303 – See Other
307 - Temporary

---

**Running node.js apps as systemd services**

Source: https://nodesource.com/blog/running-your-node-js-app-with-systemd-part-1/

Systemd is a service manager.

You can create a service by adding a `<name>.service` file under `/lib/systemd/system` directory.

Example service file for a Node.js application:

```
[Unit]
Description=Btcv Obituary Service
After=network-online.target remote-fs.target nss-lookup.target
Wants=network-online.target

[Service]
WorkingDirectory=/var/www/obituary-btcv.dev.cloudbest.it
User=php
Group=www
Type=simple
ExecStart=/bin/bash /var/www/obituary-btcv.dev.cloudbest.it/staging-server-start.sh
ExecReload=/bin/kill -s HUP $MAINPID
ExecStop=/bin/kill -s TERM $MAINPID
#Restart=on-failure
#RestartSec=5s

StandardOutput=append:/var/log/nginx/obituary-btcv.dev.cloudbest.it/node-server.log
StandardError=append:/var/log/nginx/obituary-btcv.dev.cloudbest.it/node-err.log

[Install]
WantedBy=multi-user.target
```

`After=network.target` - start the application after the network is available

`Environment=NODE_PORT=3001` - define a single environment variable
`EnvironmentFile=/var/www/.env` - define an environment file

`Type=simple` - app won't fork itself, it will just be fired off with a single command

Restart systemd to acknowledge the newly created service:

```
$ sudo systemctl daemon-reload
```

Now, you can execute `start`, `status`, `stop`, `enable`, `disable` services.

To view the logs:

```
$ journalctl -u service-name.service
```

---

**Scripts for each project task**

https://nicolasbouliane.com/blog/no-script-is-too-simple

---

**Running multiple service instances with systemd**

The service file should look like this: `<name>@.service` to indicate it can be run as multiple instances.

Now, we get the ability to pass a "variable" of sorts, so we can run e.g multiple Node.js apps on different ports.

Service file:

```
Environment=NODE_PORT=%i
```

Starting the service:

```bash
$ sudo systemctl start hello_env@3001
$ sudo systemctl start hello_env@3002
$ sudo systemctl start hello_env@3003
$ sudo systemctl start hello_env@3004
```

Or:

```bash
$ for port in $(seq 3001 3004); do sudo systemctl start hello_env@$port; done
```

---

**Przecinki**

W ten sposób Igancy Mościcki... (bez przecinka)

Co ciekawe, fakt ten był już przytoczony (przecinek, wyrażenie ekspresywne, które uwydatnia zmianę sytuacji, zbliżone do równoważnika)
Co więcej, fakt ten był już przytoczony (przecinek, wyrażenie ekspresywne, które uwydatnia zmianę sytuacji, zbliżone do równoważnika)
https://www.jezykowedylematy.pl/2013/03/czy-ponadto-poza-tym-oczywiscie-wedlug-mnie-oddzielamy-przecinkami/

Ponadto cały czas pracował za darmo... (bez przecinka)
Dodatkowo spotkał się z... (bez przecinka)
W dodatku spotkał się z... (bez przecinka)
Prócz tego spotkał się z... (bez przecinka)
https://www.jezykowedylematy.pl/2013/03/czy-ponadto-poza-tym-oczywiscie-wedlug-mnie-oddzielamy-przecinkami/

Ponadto, choć trudno w to uwierzyć, cały czas pracował za darmo. (przecinek)
https://www.jezykowedylematy.pl/2013/03/czy-ponadto-poza-tym-oczywiscie-wedlug-mnie-oddzielamy-przecinkami/

Znaleźli się zarówno członkowie wojsk lądowych, jak i dywizjonów lotniczych... (przecinek)
https://www.interpunkcja.pl/zasady-interpunkcji/przecinek-przed-jak-i

Zgodnie z danymi szacunkowymi nie była to ogromna liczba... (bez przecinka)
Według danych szacunkowych nie była to ogromna liczba... (bez przecinka)
https://sjp.pwn.pl/poradnia/haslo/Zgodnie-z;13215.html

Co do praktyki językowej, nie jestem przekonany... (przecinek/bez przecinka)
https://sjp.pwn.pl/poradnia/haslo/co-do;7350.html

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

**General refactoring path**

- Name the problem
- Locate the problem
- Prepare the refactoring plan
- Introduce the change
- Observce the effects

---

**Event Storming types**

Each of them should have a GOAL (map business process, introduce new people).

As is - current project with all challanges and quirks
To be - current project in the future, improved

- Big Picture
- Process Level
- Design Level

---

**Domain events**

- important changes in a business process
- not implementation oriented
- in past tense (item added to cart)
- connect the business language with code (WHAT with HOW)
- everyone involved in the project has to understand them
- avoid "updated", "changed" as they tend to hide complexity

---

**Hot spots**

Existing or potential project or business process problem,
Questions with no answers.
Doubts.
Risks.

---

**Big Picture Event Storming**

- high level overview of a project
- sequence of events over time
- starting with business-oriented events
- don't worry about repeating events
- map events to places in code (!)
- add external services
- add actors
- add hot spots

---

**Shotgun surgery**

Antipattern, occurs where a developer adding a feature needs to change the same logic in many places.

---

**DRY**
 
 Don't repeat yourself is about logic, not code.

---

**Utils - antipatterns**

- many clients
- many changes to the class, many implementations
- merge conflicts

---

**Session fixation**

- Bob enters an app, logged out
- attains an anonymous session id
- Bob copies the anonymous session id
- Alice logs in
- the anonymous session id is reused, now can be authenticated with
- Bob authenticates with the copied session id

Notice: physical access is needed.

---
