# lemmy-reply-bot

A lemmy bot to reply with some text to comments that match RegEx

This project uses the [lemmy-bot](https://github.com/SleeplessOne1917/lemmy-bot) library  

There is currently a bug that makes the bot ignore the selected instance and community and listen on every community availible on the instance. This has been "fixed" by adding a second hardcoded community on my instance.

# How to use
enter project dir.
install NPM dependencies:
```
npm install
```

copy .env.example to .env
```
cp .env.example .env
```
there is a almost working example in .env.example_petrosian-bot

change the variables in .env to the ones for your bot user.

run:
```
npm start
```