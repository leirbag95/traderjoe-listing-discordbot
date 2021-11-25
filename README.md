# traderjoe-listing-discordbot
TraderJoe Discord Bot Lisiting

## Add bot to your discord channel

### Fork project
Start by `fork` ⑂  the github repo.

<img width="408" alt="Fork button" src="https://user-images.githubusercontent.com/17054452/143475478-dce3f845-11a9-4389-8d51-6bc6956f6745.png">

## Set secrets

Go to `Settings` > `Secrets` and click on `New Repository secret`

<img width="800" alt="New Repo Button" src="https://user-images.githubusercontent.com/17054452/143475782-826d0499-eaa6-41bb-b244-4b0858386d44.png">

All secrets variables are on .env.example, copy them into  `Secrets`

### Discord webhook

- Click on discord channel settings > Integrations > Webhooks and create a new one 

<img width="235" alt="Discord" src="https://user-images.githubusercontent.com/17054452/143476935-ac1022ab-0c82-4204-b5a1-b018ff9d63ce.png">

### Aleph running

To save the last processed block, we use aleph.

You are free to change the code and use the method you think is best.


## Run locally

### Start by cloning the repo 


```
git clone https://github.com/leirbag95/traderjoe-listing-discordbot.git
```

### Install packages

```
npm install
```

### Set .env file

Duplicate and rename `.env.example` to `.env`

```
cp .env.example .env
```

then put your own env. variables


### Start the bot

For running it once

```
node app.js
``` 

For calling it every seconds set your own crontab.
