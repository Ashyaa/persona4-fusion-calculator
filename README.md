### Persona 4 Fusion Calculator

---

An AngularJS app to compute how to make a precise persona.

Vastly inspired by the work of arantius, all credits for the original idea and concept goes to him.
Check his stuff on https://github.com/arantius/persona-fusion-calculator
or view it live on http://arantius.github.io/persona-fusion-calculator/


I know there is no price yet, I don't know how to compute it precisely. It also depends on your compendium completion percentage, so I don't know how to procede. Any help will be appreciated !

Here is a live version of this application:
    http://heimdall409.github.io

---

### About Persona 5

---

So now that Persona 5 is out, I gathered enough data for a beta version. 
It seems that only normal fusion is relevant now, since triangle fusion seems to only use preset recipes.

I got all the recipes and a list of all the Personae that you can fuse in the game (I think), but I still lack some infos:

* The rank of certain personae (Attis, Ardha) is missing, thus I have to remove these personae from the data. 
* The recipes for these special fusions: how to actually craft Shiva, Satan etc. For now, the classic algorithm is used for them and the results are of course wrong.
* I don't know to what extend Satanael is relevant in this calculator since I do not have finished the game yet and I try to avoid getting spoiled.

If you have any info on these, do contact me on my twitter (@heimdall409), and I'll update the tool as quickly as possible!

---

### Getting up and running (for developpers)

---

1. Install NodeJS with NPM [https://nodejs.org](https://nodejs.org)
2. Install global npm packages: `npm install -g bower` `npm install -g gulp` (you may need to sudo them)
3. Clone this repo from `https://github.com/Heimdall409/persona4-fusion-calculator.git`
2. Run `npm install` from the root directory (you may need to sudo it)
2. Run `bower install` from the root directory
3. Run `gulp dev`
4. Dev server url is `http://localhost:5000`

---

### Using it as a local application

---

Just download the latest release, extract it, and double-click "index.html" in the root folder!
That's it!

