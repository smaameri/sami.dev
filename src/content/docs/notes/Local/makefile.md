---
title: Makefile
description: Why I always add a Makefile in my project roots.
---

I usually (always?) work on web applications.

And web applications always need booting up. i.e kicking off the development server.

It happened, once about upon a time, where I was between a rails, JS and python project,
all at the same time, and each with different commands to boot up their dev servers.

That mental struggle of needing to remember the command each time, finally got the better of me
(that brainpower could be used for coding stuff!).

For JS projects, its easy enough right?

```shell
npm run dev
```

If only life was that simple. `pnpm run dev` anyone?

And those are the simpler ones. Rails and python ones get more involved. And then are all the other
languages.

So now, whenever I kick off a new project, I add a `Makefile` in project root, so that I can run

````shell
make dev
````

and get everything started. So nice, and so easy.

This is what a basic Makefile looks like to get that working.

```Makefile
.PHONY: dev

dev:
	npm run dev
```

And that's it.

It also starts to become really useful as an alias file for other commands you run often in the project.
For example,

- booting up service workers
- seeding data
- booting up docker containers

Basically any command you find yourself needing to run often as part of the project.

Kind of similar to how `package.json` scripts often get used, but those are most useful in JS projects,
and not as language agnostic as a Makefile.



