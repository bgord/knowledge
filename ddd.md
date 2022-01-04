**Policy**

It's a clear piece of code, usually a class that encapsulates a business rule.
Show not be hidden inside an if statement.

---

**Ubiquitous language**

Includes names of classes, prominent operations, policies, etc.
Every person in a project should speak it, model using it, etc, so ambiguity is avoided.
Should be strictly connected to the Model.

Techniques:

- try speaking about a requirement so that the way you describe it sound consise.
  It may improve the model, because we can spot complexity in spoken language.

---

**Layered architecture**

UI
|
Application (defines a job for domain objects, coordinates them)
|
Domain (represents the business concepts)
|
Infrastructure (persistence, handling messages, low-level)

It's often the case that e.g domain model contains db queries, UI code, and other support code.

Any element of layer can depend on an element from the same layer or a layer "beneath" it.
Communication "upwards" must be through an indirect mechanism (?).

"Classes from the same layer must speak a language with similar vocabulary and its specificity".

---
