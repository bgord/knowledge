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
- how to do it differently?
- how to plug-in the new solution in the place of the old one?

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
- Observe the effects

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

**Cache busting**

A way out of a situation we tell browser that a file is immutable, and want to change it.

style.css -> style.eag8e991.css

---

**Cache control**

Header that can accept more directives.

- public/private
- `no-cache`, always hits network to check if used the cached version (304), good for dynaic HTML with no sensitive data
- immutable
- `must-revalidate` is for enforcing a timeout after which to revalidate
- `stale-while-validate` is for allowing browser use a stale content up to max-age while checking for a new version

Max age in seconds.

---

**E-tag**

Response header, identifier for a specific version of a resource.
Server does not need to resend a full response if the content was not changed.

Strong (a globally unique value) and weak (with the W/ prefix, unique only in a particular context) versions.

---

**Default MIME type**

```
*/*
```

---

**Error messages**

What happened?
What went wrong?
How can a user fix it?

Don'ts:

- use inaapropriate tone
- use use technical jargon
- pass the blame
- be generic

Dos:

- say what happened and why
- provide reassurance: what was NOT affected by the error
- be empathetc
- help them fix it

---

**Introducing value objects to a system**

1. Find all occurences.
2. Find all impacted areas.
3. Don't modify a value object, return a new one.
4. Remember about the base type.
5. If an area is not that important or ready for change, cast from the value object to the base type.
6. Remember about the safety - test observable effects first, even if they aren't correct.
7. Don't be afraid of falling early - apply the new value object in the most challanging place.
8. Work out a stable interface - look for all affected places.
9. Simulate a real change to the resulting value object.

---

**Extract method**

A simple refactoring technique of moving a piece of code outside a method to another methohd.

---

**vcard**

It's a digital business card, can be used by all sorts of software, such as outlook, calendar, contacts.

The best npm package is called `vcard-js`.

The format is known as `vcf`, which is just a text with BEGIN VCARD, some properties, and END VCARD.

**Base64**

Converts binary to ASCII text using `a-zA-Z0-9+/` characters.

Group the binary into blocks of 3 bytes (24 bits), e.g 10101010 10101010 10101010, if not divisible by 3, padding is added.

Padding is represented by `=` characters at the end, maximum of 2, for each missing byte block.

Group the 24 bits to 4 6 bit groups (2^6 = 64, there are 64 to choose from), e.g 10101010 10101010 1010101010 -> 101010 101010 101010 101010

Each 6 bit group is assigned a character 101010 -> 42 -> q

---

**Aggregate factory method**

Use a ` static async build(id: VO.IdType): Aggregate` method with `private constructor(data: VO.DataType) {}` to avoid null checks inside aggregate method.

---

**Migration events in event sourcing**

Switching from CRUD to event sourcing is tricky.
We have to import the data from the old approach to the new one.

1. Read the data from the legacy approach and produce a regualar "entry" event from the ES approach (BANK_ACCOUNT_OPENED)
2. Read the data from the legacy approach and produce a Migration Event event from the ES approach (LEGACY_BANK_ACCOUNT_IMPORTED)

It allows to distinguish between the imported bank accounts and the ones created after the migration.

After the initial migration remove the import method so it won't be used later on.

[0](https://blog.arkency.com/the-final-trick-when-moving-from-crud-to-event-sourcing/)

---

**Throwing errors when rebuilding the current state from events**

When a compensating action can be performed - don't throw, continue.
If early stage of development - throw and fix.

Offer user a chance to fix their errors.

---

**Versioning events**

- Data migration
- Weakening the event schema and making consumers more defensive (adding a new optional field, making a field optional)
- Upcasting - a middleware that runs and transforms event data during deserialisation
- Adding a new event schema with a changed name or namespace (e.g. the version field)
- Publishing the event in both schemas. Then, listeners who need the old one will continue working until they switch to the new version

---

**Summary event**

A snapshot event of the current state of the aggregate/events stream.
We can treat it as the checkpoint, or a new starting point of our stream.
We are publishing a new snapshot, so from now on, all events are published using the new schema.
We could even archive the old ones.

It's helpful when another module or service needs a snapshot of our data and then doesn't need to build the state on their own.
It can be considered an external event [1].

If the summary event is just a snapshot, then it won’t have all the business information.
If we were to archive the old events, we might have problems rebuilding the projection.

[0](https://event-driven.io/en/how_to_do_event_versioning/)
[1](https://event-driven.io/en/internal_external_events)

---

**Event vs command**

Command

- intention (pass me the salt)
- targetted to specific audience
- may be rejeceted
- may throw an exception
- sync

Event

- fact that happened in the past
- no targetted audience, broadcasted
- async

---

**Can command return a value?**

It should not, but it can, for example when an id or status is needed for later.

---

**Optimistic concurrency**

We assume more than one person editing the same resoucre is rare.

- return the entity's current version while reading
- make the changes and send the command with the unchanged version from the read
- check if the sent version matches the actual version from the database
- if matches: apply the change, if does not match: throw an error

---

**Pesimistic concurrency**

We assume more than one person editing the same resoucre is not rare.
We don't even allow for reads as opposed to optimistic concurrency.

---

**Event storming aggregate boundaries**

Map commands/events to class fields they use to a) change data, b) read data.
After that you can extract specific events that work with a subset of fields, so the cohesion is high.

---

**Business rules**

Invariants - have to be checked against the fresh data.

- e.g. the subscription can be canceled only if active.
- slower performance
- may require pessimistic/optimistic locking
- long-lived

Relaxed rules - do not have to be checked against the fresh data.

- more performant
- e.g. regular users can have no more than 5 projects
- may not require pessimistic/optimistic locking

Validation rules - usually a pure function, only checks user's input

- e.g. the provided date of birth should be in YYYY/MM/DD format
- short-lived

Computations

- e.g for the X subscription service the price for VIPs should be always 5% higher, and for everyone on Fridays it is 5 EUR cheaper

---

**Parallel models**

When a system we are refactoring is complex, and we're afraid to try out the new solution, we can create a parallel model.
It means both the old code and the new code is running, and we can switch off either of them, and compare the results they produce.

Clients of the old/new code should not be aware about these two models, deleting would be harder.

Feature flags can be used/day or night, AB tests.

We can measure the differences between old/new.

- Run the old model.
- Run the old model, and the new model, and compare the results
- Run the new model under the feature flag
- Run the new model, and delete the old model

---

**Eventually consistent multiple data models in CQRS**

If there's a database table that grows in size indefinitely, and we want to perform calculations on it, a separate data model, for example a table, can be needed.

The second data model can be added:

- synchronously
- asynchronously, in memory - event handler
- asynchronously, message in a job queue - event handler

---

**Metaprograms - similarities vs differences**

When we encounter something new, we tend to categorize it.
Some people find similarities to things they know, some focus on the differences.

Similarities:

- focus on the things they can match in their head
- don't like changes (new is unknown)
- emphasize analogies and similarities (just like as..., the same as...)

Differences:

- focus on differences
- like changes
- negative selection (I don't like it, I don't like this neither)
- agreement basing on lack of differences (I can't not agree)

These two can be combined.

IT is mostly differences.
Business is mostly similarities.

---

**Metaprograms - generalist vs detailist**

When we encounter something new, we tend to categorize it.
Some people overload their cognitive abilities and focus on details, some focus on the bigger picture.

Generalist:

- general assumptions
- the order does not matter
- tend to get lost in details
- generally it's...
- you never! you always!

Detalists:

- focus on implementation details
- phases and sequences
- linear order
- sometimes one may seem entangled in details
- there is a case...

These two can be combined.
There may be a config where one person speaks on the level of details, and the other - the agent of change - speaks on the general terms.
Then it is advised to go down into the details, talk on this level, and go up to the general terms.

IT is mostly detailists.
Business is mostly generalists.

---

**Metaprograms - external vs internal authority source**

When we encounter something new, we tend to categorize it.
Some people tend to focus on themselves, and some reference authority figures more.

External:

- rely on opinions
- props are feedback
- focus on majority ("Everybody does that")

Internal:

- retrospective
- feeling that "I know"
- a need to check out something themselves ("I need to check", "I will know when I check")
- personal decisions
- props build status, not sense of acceptance

If somebody has external authority source - give examples of important figures saying something.

If somebody has internal authority source

- given them an experiment to check themselves.
- ask how they would solve a problem

Both IT and business have mostly internal authority source.

---

**Metaprograms - problems vs goals**

Some people tend to focus on problems, and some focus on goals.

Problems:

- filter out problems and dangers
- lack of problems means it is good enough
- problems distract from the goal
- know what not to do

Goals:

- filter out goals and gains
- it always can be better
- do not see problems getting to the goal

IT is mostly focused on problems.
Business is mostly focused on goals.

---

**Metaprograms - reactive vs proactive**

Some people tend to wait for an external trigger and some do not need it.

Reactive:

- waits for an external trigger (e.g. negative feedback)
- mostly problem-oriented
- surprised that other people have an initiative if there's no problem
- learned helplessness
- wait for the other people to start something

Proactive:

- has an internal initiative
- sometimes too impulsive
- "I choose", "I can"...
- can spell manipulative people

If someone is proactive, you can ask question whether you go in the right direction.
If someone is reactive, you should find a trigger to start working (a goal or a problem).

IT is mostly reactive.
Business is mostly proactive.

---

**Metaprograms - must vs can**

Some people convince themselves to work by following rules, and some by chasing opportunities.

Must:

- rules and procedures
- there has to be a rule

Can:

- occasions and chances
- they do not really follow the rules themselves
- may be overthinking

IT is mostly must.
Business is mostly can.

---

**Metaprograms - I vs they**

Some people focus on their comfort first, and the other people focus on the comfort of the rest of the team.

I:

- think and care about themselves first
- my feelings and experiences first

They:

- think and care about the others first
- reactions and signals from the others
- emphatetic

If you speak with an "I" person, you can look for the benefits for them.
If you speak with a "they" person, you can tell them to have a rest so they can continue helping others.

IT is mostly "I".
Business is mostly "they".

Leaders should eat last, and be focused on "they".

---

**Dreyfus competence model**

- Unconscious incompetence
- Unconscious incompetence
- Conscious competence
- Unconscious competence

---

**Kolb cycle**

Experience -> Reflection (what happened?) -> Conceptualisation (what does it mean?) -> Applying (what to change?)

Does not have a starting point.

---

**Expand/contract deployment strategy**

When performing a deployment with a breaking change (e.g. chaning a database structure), we can go with the expand/contract strategy.

Alternative to a big bang deployment, which requires stopping the app and doing everything at once.

- temporarily shut down access to the system
- migrate the database - updating the schema and backfilling the pub_state field for all existing records based on their is_published field
- deploy new versions of both the reader and the writer service
- restore access to the system

In expand/contract:

- each stage is backwards compatible with the previous stage
- allows flexible rollouts, permitting different parts of the system to be at varying release stages without requiring synchronized deployment

Let's consider we change is_published article column to an enum pub_state column.

1. Expand - the service to write to the old and the new schema (dual write). We add the new pub_state column alongside the old one.
2. Backfill - basing on the old is_published field, fill the pub_state for the old records.
3. Migrate - the readers to use the new pub_state column.
4. Contract - remove the dual write, and drop the published_at column.

[0](https://blog.thepete.net/blog/2023/12/05/expand/contract-making-a-breaking-change-without-a-big-bang/)

---

**Outbox pattern**

Let's say we have a scenario we have a request we want to send to an external API via HTTP.

1. Sync processing

- immediate consistency
- small implementation effort
- slower processing time
- explicit error messages
- no retry mechanism

Process business information -> POST request -> POST response -> Commit db transaction

Long processing? Side effects like sending an email? How to rollback? Lost response? Timeout?

2. Naive async processing

- eventual consistency
- more complex implementation effort
- same processing time but split into steps
- reconciliation needed to handle errors
- simpler retry mechanism depending on tools

Process business information -> Put on queue -> Ack -> Receive response from queue -> Commit db transaction

Long processing? Side effects like sending an email? How to rollback? Lost response? Timeout?

3. Outbox

- eventual consistency
- complex implementation effort
- same processing time but split into steps
- reconciliation needed to handle errors
- for free, in outbox scheduler

Process business information -> Store in outbox -> Commit db transaction
Process outbox (in interval) -> POST request -> POST response -> Delete from outbox

The problem not present in this solution is the distributed transaction like in previous two examples.
Another example of distributed transaction is database save and sending email in a single transaction.
The initial database commit does not need to wait for the request to be finished in any way.

Outbox is a table in a database, near the production data.

4. Outbox with queue

- eventual consistency
- complex implementation effort
- same processing time but split into steps
- reconciliation needed to handle errors
- for free, in outbox scheduler

Process business information -> Store in outbox -> Commit db transaction
Process outbox (in interval) -> Put on queue -> ACK -> Delete from outbox
Queue handler (in interval) -> POST request -> POST response -> Delete from queue

Queue retries are for free.
Queue failed deliveries are for free - the queue will not delete the message unless ACKed.

Queue can deduplicate the message in a specified period of time.

At least once delivery - deduplication, single-threaded outbox processing suggested.
If a queue message handler receives an obvious error, the message can be routed directly to DLQ.
DLQ should be taken care of manually.

Suggested SQS queue config:

- FIFO per message group
- content based deduplication within 5 mins
- visibility timeout 60s
- max receive count 10 times
- DLQ

[0](https://www.youtube.com/watch?v=NWyiP1EGKcQ&list=WL&index=7)

The opposite can be considered - inbox pattern.

---

**Specification pattern**

Is a design pattern that can be considered an extended and reusable if statement.
May be combined with other specifications using bool logic.
Has origin in DDD.
Returns a boolean.

```ts
export interface ISpecification {
  isSatisfiedBy(candidate: unknown): boolean;
  and(other: ISpecification): ISpecification;
  andNot(other: ISpecification): ISpecification;
  or(other: ISpecification): ISpecification;
  orNot(other: ISpecification): ISpecification;
  not(): ISpecification;
}
```

[0](https://en.wikipedia.org/wiki/Specification_pattern)
[1](https://medium.com/c-sharp-progarmming/specification-design-pattern-c814649be0ef)

---

**Saga design pattern**

A design pattern helping to manage distributed transactions.

A Saga is a sequence of local transactions coordinated to ensure a global outcome. It can be executed in two distinct ways.

- Orchestration: Guided by a central orchestrator.

```ts
class OrderSaga {
  start(orderId: string) {
    try {
      this.createOrder(orderId);
      this.reserveStock(orderId);
      this.processPayment(orderId);
      this.shipOrder(orderId);
      console.log("Order processed successfully");
    } catch (error) {
      this.compensateOrder(orderId, error);
    }
  }
  // ... Rest of the methods
}
const saga = new OrderSaga();
saga.start("12345");
```

- Choreography: Decentralized, with each transaction triggering the next.

```ts
import { EventEmitter } from "events";
const sagaEvents = new EventEmitter();
// Function definitions
function createOrder(orderId: string) {
  /*...*/
}
function reserveStock(orderId: string) {
  /*...*/
}
function processPayment(orderId: string) {
  /*...*/
}
function shipOrder(orderId: string) {
  /*...*/
}
function compensateOrder(orderId: string) {
  /*...*/
}
// Event handling
sagaEvents.on("OrderCreated", reserveStock);
sagaEvents.on("StockReserved", processPayment);
sagaEvents.on("PaymentProcessed", shipOrder);
sagaEvents.on("OrderFailed", compensateOrder);
// Start the saga
createOrder("12345");
```

Failure Handling: if a step falls, we need to compensate for all the previous steps by a compensating action.
Complexity Management: utilize orchestration or tools like state machines.
Idempotency: make operations idempotent to prevent repeated effects.

```ts
interface SagaStep {
  execute(): Promise<void>;
  compensate(): Promise<void>;
}

class SagaOrchestrator {
  private steps: SagaStep[] = [];

  addStep(step: SagaStep) {
    this.steps.push(step);
  }

  async execute() {
    for (const step of this.steps) {
      try {
        await step.execute();
      } catch (error) {
        await this.compensate();
        throw error;
      }
    }
  }

  private async compensate() {
    for (const step of this.steps.reverse()) {
      await step.compensate();
    }
  }
}

class OrderCreationStep implements SagaStep {
  async execute() {
    // Logic for creating the order
  }
  async compensate() {
    // Logic for rolling back the order creation
  }
}

class PaymentProcessingStep implements SagaStep {
  async execute() {
    // Logic for processing the payment
  }
  async compensate() {
    // Logic for refunding or canceling the payment
  }
}

const saga = new SagaOrchestrator();

saga.addStep(new OrderCreationStep());
saga.addStep(new PaymentProcessingStep());

saga
  .execute()
  .then(() => console.log("Saga executed successfully"))
  .catch((error) => console.log(`Saga execution failed: ${error}`));
```

[0](https://kisztof.medium.com/the-saga-pattern-unleashed-a-deep-dive-into-distributed-transactions-with-typescript-f7ee55d53e2d)

---

**Process manager design pattern**

A design pattern helping to manage distributed transactions.

The difference between process manager and saga is that process manager has a state.
Process manager can be modeled as a state machine.

[0](https://event-driven.io/en/saga_process_manager_distributed_transactions/)

---

**Delivery guarantees in distributed systems**

- At-most once - the simplest guarantee., with in-memory/in-process messaging, When we send a message and processing fails then the message will be lost and not handled. The advantage of this is that we do not have to deal with idempotence, but the downside is that we have no guarantee of message delivery.
- At-least once - we are sure that sent message will always be delivered, not sure how many times it will be handled. We can achieve that by re-publishing messages on the producer’s side (e.g. with an outbox pattern) or re-handling on the consumer side (e.g. with an inbox pattern). The disadvantage is that the message can be handled several times. We have to defend ourselves through correct idempotency handling. If we don’t do that, we may end up with corrupted data (e.g. we will issue an invoice several times). For example, this can happen when the invoice was saved to the database, but operation timed out. If we retry processing without proper verification if such an invoice already exists, we may duplicate it.
- Exactly-once - this semantic guarantee that sent a message will be handled exactly once. It is very difficult (sometimes even impossible) to achieve, as processing may fail on the multiple stages. If we want to have such guarantee then besides the retries we need to have correct idempotency support. We need to make sure that operation performed several times won’t cause side effects.

[0](https://event-driven.io/en/outbox_inbox_patterns_and_delivery_guarantees_explained/)

---

**JSON schema**

Can be used to describe JSON properties in a generic way.
TypeScript type to JSON schema tools, and validators exist.

```json
{
  "$schema": "https://json-schema.org/draft/2020-12/schema",
  "$id": "https://example.com/product.schema.json",
  "title": "Product",
  "description": "A product from Acme's catalog",
  "type": "object",
  "properties": {
    "productId": {
      "description": "The unique identifier for a product",
      "type": "integer"
    },
    "productName": {
      "description": "Name of the product",
      "type": "string"
    },
    "price": {
      "description": "The price of the product",
      "type": "number",
      "exclusiveMinimum": 0
    },
    "tags": {
      "description": "Tags for the product",
      "type": "array",
      "items": {
        "type": "string"
      },
      "minItems": 1,
      "uniqueItems": true
    },
    "dimensions": {
      "type": "object",
      "properties": {
        "length": {
          "type": "number"
        },
        "width": {
          "type": "number"
        },
        "height": {
          "type": "number"
        }
      },
      "required": ["length", "width", "height"]
    },
    "warehouseLocation": {
      "description": "Coordinates of the warehouse where the product is located.",
      "$ref": "https://example.com/geographical-location.schema.json"
    }
  },
  "required": ["productId", "productName", "price"]
}
```

Can be used for config files.

[0](https://json-schema.org/learn/getting-started-step-by-step)

---

**Availability pattern**

Let's consider an e-scooter service.

- an e-scooter may be already occupied
- an e-scooter may be in the maintenance mode
- an e-scooter may be remotely disabled

Instead of performing many checks if a resource is in any of those modes in every method,
we could create an e-scooter availability module that locks and unlocks the e-scooter's availability.
The reason does not matter.

We decouple other services using the e-scooter concept to perform some changes.

Introducing availability improves:

- testability
- cognitive load (no need to visit many places to get to know if the e-scooter is available)
- coupling
- information hiding

Events:

RESOURCE_LOCKED
RESOURCE_UNLOCKED

Service:
ResourceAvailability->take(id, until)
ResourceAvailability->isTaken
ResourceAvailability->release(id)

[0](https://www.youtube.com/watch?v=qOYu5dk5H_A)

---

**Upstream/downstream**

Given the example above, first we have the availability model look into the maintenance, demand, and reservation models.
Now, we have the maintenance, demand, and reservation models look into the availability model.

---

**application/ld+json**

JSON for Linked Data.

Used for embedding JSON within an HTML document.
Allows website owners to provide search engines with additional information about the content on their pages
Information about a book using the schema.org vocabulary. Search engines can use this data to enhance search results related to the book, displaying additional details such as the book's name, author, publication date, ISBN, and more.

```json
{
  "@context": "http://schema.org",
  "@type": "Book",
  "name": "Internat",
  "isbn": "9788380498136",
  "datePublished": "2019-02-20",
  "genre": "https://lubimyczytac.pl/ksiazki/k/39/literatura-piekna",
  "inLanguage": "polski",
  "numberOfPages": "288",
  "image": "https://s.lubimyczytac.pl/upload/books/4871000/4871173/721964-352x500.jpg",
  "author": {
    "@type": "Person",
    "name": "Serhij \u017hadan",
    "url": "https:\/\/lubimyczytac.pl\/autor\/23970\/serhij-zadan"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "worstRating": 1,
    "bestRating": 10,
    "ratingValue": "7,5",
    "ratingCount": 904
  }
}
```

---

**Standard deviation population vs sample**

Population Standard Deviation (σ):

- Used when you have data for the entire population.
- Gives a measure of how spread out the values are in the entire group.
- Calculated using a formula that divides by the total number of data points in the population.

Sample Standard Deviation (s):

- Used when you have data for only a part (sample) of the population.
- Also measures the spread of values but includes a correction for estimating the population standard deviation from a sample.
- Calculated using a similar formula but divides by the number of data points minus one (degrees of freedom).

---

**Early server hints**

103 HTTP status code that is returned ahead of a final response that indicates what resources will be preloaded.
Helps the browser take advantage of such "server think-time" by doing some work in advance, thereby speeding up page loads.

[0](https://developer.chrome.com/docs/web-platform/early-hints)

---

**Canon TDD**

- Write a list of the test scenarios you want to cover
- Turn exactly one item on the list into an actual, concrete, runnable test
- Change the code to make the test (& all previous tests) pass (adding items to the list as you discover them)
- Optionally refactor to improve the implementation design
- Until the list is empty, go back to #2

[0](https://tidyfirst.substack.com/p/canon-tdd)

---

**Promise theory**

A conceptual framework developed by Mark Burgess that provides a way of understanding and modeling interactions in systems, especially distributed and decentralized systems.
It is often applied in the field of computer science, particularly in the design and management of computer networks and systems. Here's a short overview:

---
