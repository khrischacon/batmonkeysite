#AO Resgistration click-through prototype
---
##a click-through prototype, build on Wintersmith

### Dependencies

* [Node and npm](http://nodejs.org/download/)
* [Wintersmith](http://jnordberg.github.com/wintersmith/)
* [rubygems](http://docs.rubygems.org/read/chapter/3)
* coffeescript ($ gem install coffee-script)

* SASS ($ gem install sass)

### How to work

	$ cd your/project/root
	$ ./develop.sh

this runs the wintersmith preview server, and compiles SASS and coffescript on the fly

### When you're ready to ship code

	$ cd your/project/root
	$ ./export.sh

this (re-)produces the build/ folder with the new static site assets, as well as a password protected zip in the project root.  (password: citi - this is strictly required to prevent assets from being stripped out by citi email servers)


## Staging Server [here](http://seetheworlddigital.com/bosz/razor/ao-prototype/index.html#)
