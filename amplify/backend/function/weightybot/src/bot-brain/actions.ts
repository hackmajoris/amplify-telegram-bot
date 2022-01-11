import { Markup, Telegraf } from 'telegraf';

export const configureActions = (bot: Telegraf) => {
  bot.action('Dr Pepper', (ctx, next) => {
    return ctx.reply('👍').then(() => next());
  });

  bot.action('plain', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageCaption(
      'Caption',
      Markup.inlineKeyboard([
        Markup.button.callback('Plain', 'plain'),
        Markup.button.callback('Italic', 'italic'),
      ])
    );
  });

  bot.action('italic', async (ctx) => {
    await ctx.answerCbQuery();
    await ctx.editMessageCaption('_Caption_', {
      parse_mode: 'Markdown',
      ...Markup.inlineKeyboard([
        Markup.button.callback('Plain', 'plain'),
        Markup.button.callback('* Italic *', 'italic'),
      ]),
    });
  });

  bot.action(/.+/, (ctx) => {
    return ctx.answerCbQuery(`Oh, ${ctx.match[0]}! Great choice`);
  });
};
