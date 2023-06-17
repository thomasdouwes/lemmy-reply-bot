# lemmy-reply-bot

A lemmy bot to reply with some text to comments that match RegEx

This is the code used for [@PetrosianBot@lemmy.douwes.co.uk](https://lemmy.douwes.co.uk/u/PetrosianBot)

This project uses the [lemmy-bot](https://github.com/SleeplessOne1917/lemmy-bot) library  

There is currently a bug that makes the bot ignore the selected instance and community and listen on every community availible on the instance. This has been "fixed" by adding a second hardcoded community on my instance.

The github repo is a mirror of [https://gitea.douwes.co.uk/thomas/lemmy-reply-bot](https://gitea.douwes.co.uk/thomas/lemmy-reply-bot)

# How to use
## NOTE
There is a bug in the bot library used that seems to appear in lemmy version 0.17.2 and maybe 0.17.3. Make sure the instance you are using is running 0.17.4 or newer or the bot will reply in every community

## docker install
Super janky right now  

enter project dir.

Build generic node runner using Dockerfile  
```
docker build . -t thomas/node-runner
```

Install NPM dependencies:  
```
docker run -it --rm --name=lemmy-flagwaver-bot -v /path/to/lemmy-flagwaver-bot:/app thomas/node-runner npm install
```

copy .env.example to .env  
```
cp .env.example .env
```

there is a almost working example in .env.example_petrosian-bot

change the variables in .env to the ones for your bot user.

The configuration of what communities to use is a little more complex due to a library bug. You need to edit some variables need the top of bot.ts

run:  
```
docker run -d --name=lemmy-flagwaver-bot -v /path/to/lemmy-flagwaver-bot:/app thomas/node-runner
```

I know this is not a good way to use docker.

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
