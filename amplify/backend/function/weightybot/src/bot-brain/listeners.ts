import { Telegraf } from 'telegraf';

export const configureListeners = (bot: Telegraf) => {
  bot.on('poll', (ctx) => console.log('Poll update', ctx.poll));
  bot.on('poll_answer', (ctx) => console.log('Poll answer', ctx.pollAnswer));
  bot.on('text', (ctx) => {
    return ctx.reply('Hello from Lambda');
  });
};
