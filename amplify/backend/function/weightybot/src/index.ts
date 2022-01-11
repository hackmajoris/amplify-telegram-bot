import { Markup, Telegraf } from 'telegraf';
import { configureHears } from './bot-brain/hears';
import { configureActions } from './bot-brain/actions';
import { configureCommands } from './bot-brain/commands';
import { configureListeners } from './bot-brain/listeners';
require('dotenv').config();

const bot = new Telegraf(process.env.BOT_TOKEN);
console.info('Bot initialized', bot);

console.info('Configure bot start command', bot);
const keyboard = Markup.keyboard([
  Markup.button.pollRequest('Create poll', 'regular'),
  Markup.button.pollRequest('Create quiz', 'quiz'),
]);

bot.start((ctx) => ctx.reply('supported commands: /poll /quiz', keyboard));

console.info('Configuring bot hears', bot);
configureHears(bot);
console.info('Configuring bot actions', bot);
configureActions(bot);
console.info('Configuring bot commands', bot);
configureCommands(bot);
console.info('Configuring bot listeners', bot);
configureListeners(bot);

exports.handler = async (event: any) => {
  console.log('Received event: ', event);

  const body = JSON.parse(event.body || '{}');
  await bot.handleUpdate(body);

  return {
    statusCode: 200,
    body: 'Triggered with success!',
  };
};
