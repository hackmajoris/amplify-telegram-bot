# Telegram Bot using AWS Amplify and Telegraf
Create a telegram bot in seconds!

## Usage   
 * Create a Telegram bot using https://t.me/BotFather bot and copy the bot token.
 * Clone the repository using `git clone https://github.com/hackmajoris/amplify-telegram-bot.git`
 * Create a .env file at the `amplify/backend/function/weightybot/src` with the environment variables name `BOT_TOKEN=YOUR_BOT_TOKEN`
 * Run `amplify push`
 * At the end of the process, Amplify will return the API Gateway URL. Copy the URL and call the Telegram hook registration API for your bot:

   `curl --request POST --url https://api.telegram.org/bot<BOT_TOKEN>/setWebhook --header 'content-type: application/json' --data '{"url": "<API_GATEWAY_API>"}'`
 




