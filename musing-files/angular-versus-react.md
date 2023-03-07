---
slug: angular-vs-react
title: Angular versus React
description: TL;DR - It's down to commercial sites, like this one, and enterprise solutions.
seoTitle: Angular versus React
seoDescription: Another article weighing between Angular and React for your UI needs.
timestamp: 2023-03-07T18:13:59+0000
---

# Angular vs. React

It's probably safe to say that the whole "Angular vs React" debate has been talked to death. It may even be outdated. (As to why Vue doesn't figure into it, I assume it has to do with it having a bit of both, and we'll have to see how Svelte goes.) Nevertheless, I'll add my own thoughts. I'll keep it simple:

If you want to build a website, go with React.

If you want to build something data-heavy, like a complex series of forms or an analytics dashboard, go with Angular.

But, of course, the developer needs to weigh across all aspects of the problem before deciding. (This is where I would put an ambiguous smiley face.)

React is simply faster. By default. People will get lazy and toy around with Angular's change detection settings. When React detects change, it will literally ask you to create a new diff from scratch, which is a lot better for debuggability than Angular's state-based approach.

Then there is the issue of Angular cluttering the UI with meaningless host element tags which, granted, improves code clarity, but does not help for peformance or SEO (as sites can be penalized for particularly thorny DOM trees).

I also find the React eco-system, i.e React, Gatsy, is geared around website building, focused on building fast sites. There's some guarantee that someone else is aware of the problems you're running into with those solutions. Not that Angular lacks server-side/static rendering solutions, but, from my own personal experience, they're finicky. Part of the reason why is that Universal expects you to know how Node Express works, which is not a problem, but is rather frustrating that there's no real out-of-the-box solution. Furthermore, I'm not sure how many people use Universal (SSR) or, for that matter, prerender. Forums for Angular Universal are pretty quiet, which is unnerving.

However, the Angular eco-system is geared around working with data, particularly complex inputs. No wonder, given how complex (and kinda nice) the Google Cloud dashboard is.

The stateful approach works better for forms, in comparison to React's do-it-all-over-again philosophy (I should put that in quotes, given that hooks are one of their cheats). Out of the box, Angular's `@Input` and `@Output` decorators are extremely clear as to what they do and how they convey the component's inner state. We're not even talking about other stateful innovations, like the `@HostBinding` ... bindings. Furthermore, Angular 15 comes with a feature to associate Angular directives (probably one of the smaller pieces of code you'll write for Angular) to components, allowing for reusability. No, seriously, after six years of developing in Angular, this is a great feature and possibly better than the standalone components stuff.

Angular's `FormBuilder` API allows you to represent complex data in JS form. Data relationships can be represented through RxJS via streams. You can plug the models from the `FormBuilder` API into an Angular-registered input component and it all just...works. (Of course, you need to know and be aware of what you're doing, but, as engineers, that caveat comes with the job.)

RxJS is also straight-up great, though cumbersome size-wise and debugging-wise. For my own React projects I have attempted to replace RxJS with native JS Promises; I feel I have more-or-less succeeded, but only as a result of changing the code's architecture frequently. RxJS streams give you so much more control over when you want data to be consumed and when you want code ran. It also makes for a nicer event messaging system than anything I have seen JS offers natively.

RxJS and Angular singletons, which I am salivating for in React, make for a dream team, allowing you to move a lot of your JS code outside of your React components _without losing context_. There's nothing wrong with JS functions, but their external context comes from parameters (as they should!) or the loosey-goosey rules of JS function scopes, of which we could find a JS quirks forum describing some real head-scratchers. Angular allows you to combine various transforming services together without fear of duplication. Oh, and being able to provide everything you need through the constructor, via Angular's injection system, is a truly great convenience. You can't beat it.

So.

When making a website - and most websites, I think, are for branding, which means speed is an absolute requirement; sometimes you can shop in them - elegance and simplicity, which mean omission, are necessities. React is better. (Again, we'll have to see how Svelte pans out.)

A data-heavy form is not used for a small peek. You need to point out the complexity of various data relationships to your user. To a certain extent, speed can be sacrified for verbosity on the UI and readability/maintainability behind the scenes. And to emphasize, Angular isn't slow, unless you're doing something blatantly wrong (as I have done from time to time); you're negotating over milliseconds and kilobytes, though these seemingly small units of scale are certainly important. If you need a big toolbox for the Javascript side of your application, then Angular is better.

And, for goodness's sake, do not use Redux. (Smiley face.)
