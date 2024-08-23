---
slug: oberserver-pattern
title: The Observer Pattern
description: Taking a stab at writing about the Observer Pattern, from the Gang of Four's (in)famous Design Patterns.
seoTitle: The Observer Pattern
seoDescription: Taking a stab at writing about the Observer Pattern, from the Gang of Four's (in)famous Design Patterns.
timestamp: 2024-08-23T16:05:16+0000
---

I wrote this as a thought experiment on how to rewrite the Gang of Four's articles. Observer is one of my favorites and is a favorite of the web's, and fairly simple to wrap one's head around.

---

Given:

```
interface Subscriber {
    onNotify(event: any): void;
}

class Observer {
    subscribers: Array<Subscriber> = [];

    add(subscriber: Subscriber): void {
        this.subscribers = this.subscribers.concat(subscriber);
    }

    remove(subscriber: Subscriber): void {
        this.subscribers = this.subscribers.filter(sub => sub !== subscriber);
    }

    notify(event: any): void {
        this.subscribers.forEach(sub => sub.onNotify(event));
    }
}

class SubscriberA implements Subscriber {
    onNotify(event) {
        console.log(`${event} A!`);
    }
}

class SubscriberB implements Subscriber {
    onNotify(event) {
        console.log(`${event} B!`);
    }
}

const observer = new Observer();

observer.add(new SubscriberA());
observer.add(new SubscriberB());

observer.notify('Hello');
```

We observe printed to the console:

```
Hello A!
Hello B!
```

A real-life example:

```
class SubscriberC implements Subscriber {
    constructor(private element: Element, private greeting: string) {
    }

    onNotify(event) {
        this.render(event);
    }

    render(text: any) {
        this.element.textContent = `${this.greeting}, ${text}!`;
    }
}

// Given an existing document where our script is located...
const observer = new Observer();

observer.add(new SubscriberC(document.getElementById('example1'), 'Hello'));
observer.add(new SubscriberC(document.getElementById('example2'), 'Howdy'));

observer.onNotify('world');
```

We observe that the text in two locations on our page has changed to 'Hello, world!' and 'Howdy, world!' This is essentially how popular frameworks as Angular and React work.

```
class TastyObserver extends Observer {
    notify(event) {
        if (typeof event === 'string' && event.includes('tasty')) {
            super.notify(event);
        }
    }
}

class HungrySubscriber implements Subscriber {
    onNotify(event): void {
        if (typeof event === 'string' && !event.includes('tasty')) {
            throw new Error('I only want to eat tasty things.');
        } else {
            console.log('Yum!');
        }
    }
}

const observer = new TastyObserver();
observer.add(new HungryObserver());

observer.notify('tasty sandwich');
observer.notify('nasty pasta');
observer.notify('A ROCK');
```

Observe the console printing:

```
Yum!
```

only once.

Furthermore, the code above will not halt the main program flow. This concept is useful for subscribers who require specific data and observers who filter data. (That being said, you should always validate/assert data.) Indeed, this is crucial to the popular global storage package, Redux.

Weaknesses:

```
class SubscriberD implements Subscriber {
    constructor(private observer: Observer) {}

    onNotify(event) {
        const newEvent = `${event} D!`;
        console.log(newEvent);
        this.observer.onNotify(newEvent);
    }
}

const observer = new Observer();
observer.add(new SubscriberD(observer));

observer.onNotify('Hello');
```

We observe the above will cause a stack overflow error. Note this becomes more pernicious based on the complexity of the `onNotify` method.

```
class Person {
    pointingAtFeet: boolean;

    pointAtOurFoot(): void {
        this.pointingAtFeet = true;
    }
    shoot(): void {
        if (this.pointingAtFeet) {
            throw new Error('You have shot your own foot.');
        }
    }
}

class SubscriberE implements Subscriber {
    constructor(private person: Person) {}

    onNotify() {
        this.person.pointAtOurFoot();
    }
}

class SubscriberF implements Subscriber {
    constructor(private person: Person) {}

    onNotify() {
        this.person.shoot();
    }
}

const observer = new Observer();

const person = new Person();
observer.add(new SubscriberE(person));
observer.add(new SubscriberF(person));

observer.onNotify();
```

Because our observers are called sequentially, we observe that, as a result of `SubscriberE` being called before `SubscriberF` (and this is always the case), we have shot our own foot.

```
class Human {
    currentMeal: string;

    constructor(private satisfyingMeal: string) { }

    isSatisfied(): boolean {
        return this.currentMeal === this.satisfyingMeal;
    }
}

class BurgerHuman extends Human {
    constructor() {
        super('burger');
    }
}

class PizzaHuman extends Human {
    constructor() {
        super('pizza');
    }
}

class SubscriberG implements Subscriber {
    constructor(private humans: Array<Human>) {
    }

    onNotify(event) {
        this.humans.forEach(human => human.currentMeal = event);
    }
}

const observer = new Observer();
observer.add(new SubscriberG([ new BurgerHuman(), new PizzaHuman() ]));

// PizzaHuman is not happy.
observer.notify('burger);
// BurgerHuman is not happy.
observer.notify('pizza');
```

The observers do not care who they are serving. Therefore, they do not understand the needs of the people subscribing to them. There is no way to make the entire system happy and a better design is needed.

Do not attempt to use concurrency to solve this problem, by attempting to put each observer "on an equal footing". This will cause much, much worse issues.

Observers should work with systems closed from one another. Hence, encapsulation is a hard requirement.

My (personal) thoughts:

I do not advise using the Observer pattern for doing work at the highest level possible i.e. at the very root of a program. By this I mean, if we can imagine a program as a tree of components, with components at the root of the tree being used directly by the client and every leaf used by a higher level component, the Observer pattern should only be used at the lowest levels possible.

The pattern is aptly named, in the sense that we observe the sun is setting or, upon entering the door, the house smelling nice. These are _observations_. We can change what we are doing (as in the case for night time, I may call delivery) or we can do nothing (the house smelling nice denotes a nice-tasting dinner, which dinner I would have eaten regardless of nice-tasting-ness or not).

It is not wise to make observers observe exceptional events, for exceptional events should be handled exceptionally. I do not observe a bear in my house, for example, because the time I take observing may cost me dearly.

Let's use Amazon as an example. Amazon tracks everything you do on a page. If it sees you linger on an item, it will update its user interface to recommend you more things like that item. This is more-or-less the Observer pattern. This user interface, in the grander scheme of things, is unimportant. It can error out by 1) not updating, 2) showing the wrong product, or 3) not showing anything at all. At its worst, this error may cost Amazon a potential sale.

It would be extremely unwise if product recommendations affected the cart - users being able to see their cart, check out, give Amazon money, etc. That's real, not potential, money being lost. If product recommendations are truly necessary, there needs to be a reconciliation mechanism built that should _not_ be incorporated into an Observer pattern. The Observer pattern should not fix itself by throwing more, quote-unquote "correct", events. Amusingly, I have seen many carts implemented this way.

It's fine to build an emergency mechanism, to warn the observer of its bad data, so long as it is truly for emergencies. The entire system should halt and work on reconciling the emergency rather than moving along while the emergency is being worked through. Then again, the programmer should not throw emergency-causing data into the observer. That is the rub.
