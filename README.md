### Persona Fusion Calculator

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
The recipes using rare personae are still to be implemented but I got all the theory I need to do it, so it should be ready soon!
If you notice inconsistencies, please take this into account:
* I added all DLC personae, and if you don't own them, or only part of them, some recipe may vary
* Check if you have maxed according Coop if needed, else the recipe will give another result

For rare personae fusion: the CURRENT LEVEL is used. I couldn't find a way to implement it cleanly, so I just use base level (like triangle fusion for P3 / P4).

If you have still have any question or if you have spotted an error somewhere, do contact me on my twitter (@heimdall409), and I'll update the tool as quickly as possible!

You can see all the data I gathered, especially about rare personae and how to know the result of their fusion, on this google drive:

    https://docs.google.com/spreadsheets/d/1u90EPuHVS1XWGv-c61Q0Xvt7H_LACzExQ-rM8edOtHg/edit#gid=559063658

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
