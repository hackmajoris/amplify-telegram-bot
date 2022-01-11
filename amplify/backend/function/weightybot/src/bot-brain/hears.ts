import { Telegraf, Markup } from 'telegraf';

export const configureHears = (bot: Telegraf) => {
  bot.hears('hi', (ctx) => ctx.reply('Hello from bot'));
  bot.hears('🔍 Search', (ctx) => ctx.reply('Yay!'));
  bot.hears('📢 Ads', (ctx) => ctx.reply('Free hugs. Call now!'));
  bot.hears(/\/wrap (\d+)/, (ctx) => {
    return ctx.reply(
      'Keyboard wrap',
      Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
        columns: parseInt(ctx.match[1]),
      })
    );
  });
};
