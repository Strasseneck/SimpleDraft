# SimpleDraft

A simple brower based screenwriting app. Write Screenplays utlizing the Fountain syntax and keep tracking of drafts with SimpleDraft's lightweight version tracking system. 

# How To Run

* Clone the repo.
* From inside the server directory run ```'npm install'``` and then ```'npm start'```. This will install the required dependencies and run the server.
* From inside the client directory run ```'npm install'``` and then ```'npm run dev'```. This will install the required dependencies and launch the client in your browser.
* To get the db working you'll need to create a new PostgreSQL DB instance and then a ```.env file``` that looks like this -

```plaintext
{
 PASSWORD = '**yoursecretpassword**'
 DB = '**yourdatabasename**'
 USER = '**yourusername**'
}
```

* After that you should be all good to go, have fun writing with SimpleDraft!

# Fountain Syntax

To learn more about the Fountain Syntax and why it's a great way to write Screenplays check out - [Fountain](https://fountain.io/)

# Diff Match Patch

If you're interested in learning more about Diff/Match/Patch check out - [Google Diff/Match/Patch](https://github.com/google/diff-match-patch) and the typescript port - [TypeScript Diff/Match/Patch](https://github.com/nonoroazoro/diff-match-patch-typescript)

