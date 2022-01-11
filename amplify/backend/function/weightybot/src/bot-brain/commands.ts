import { Markup, Telegraf } from 'telegraf';
import * as fs from 'fs';

export const configureCommands = (bot: Telegraf) => {
  const AnimationUrl1 = 'https://media.giphy.com/media/ya4eevXU490Iw/giphy.gif';

  bot.command('local', (ctx) =>
    ctx.replyWithPhoto({ source: '/cats/cat1.jpeg' })
  );
  bot.command('stream', (ctx) =>
    ctx.replyWithPhoto({ source: fs.createReadStream('/cats/cat2.jpeg') })
  );
  bot.command('buffer', (ctx) =>
    ctx.replyWithPhoto({ source: fs.readFileSync('/cats/cat3.jpeg') })
  );
  bot.command('pipe', (ctx) =>
    ctx.replyWithPhoto({ url: 'https://picsum.photos/200/300/?random' })
  );
  bot.command('url', (ctx) =>
    ctx.replyWithPhoto('https://picsum.photos/200/300/?random')
  );
  bot.command('animation', (ctx) => ctx.replyWithAnimation(AnimationUrl1));
  bot.command('pipe_animation', (ctx) =>
    ctx.replyWithAnimation({ url: AnimationUrl1 })
  );

  bot.command('caption', (ctx) =>
    ctx.replyWithPhoto('https://picsum.photos/200/300/?random', {
      caption: 'Caption *text*',
      parse_mode: 'Markdown',
    })
  );

  bot.command('album', (ctx) => {
    ctx.replyWithMediaGroup([
      {
        media: 'AgADBAADXME4GxQXZAc6zcjjVhXkE9FAuxkABAIQ3xv265UJKGYEAAEC',
        caption: 'From file_id',
        type: 'photo',
      },
      {
        media: 'https://picsum.photos/200/500/',
        caption: 'From URL',
        type: 'photo',
      },
      {
        media: { url: 'https://picsum.photos/200/300/?random' },
        caption: 'Piped from URL',
        type: 'photo',
      },
    ]);
  });

  bot.command('edit_media', (ctx) =>
    ctx.replyWithAnimation(
      AnimationUrl1,
      Markup.inlineKeyboard([
        Markup.button.callback('Change media', 'swap_media'),
      ])
    )
  );

  bot.command('onetime', (ctx) =>
    ctx.reply(
      'One time keyboard',
      Markup.keyboard(['/simple', '/inline', '/pyramid']).oneTime().resize()
    )
  );

  bot.command('custom', async (ctx) => {
    return await ctx.reply(
      'Custom buttons keyboard',
      Markup.keyboard([
        ['🔍 Search', '😎 Popular'], // Row1 with 2 buttons
        ['☸ Setting', '📞 Feedback'], // Row2 with 2 buttons
        ['📢 Ads', '⭐️ Rate us', '👥 Share'], // Row3 with 3 buttons
      ])
        .oneTime()
        .resize()
    );
  });

  bot.command('special', (ctx) => {
    return ctx.reply(
      'Special buttons keyboard',
      Markup.keyboard([
        Markup.button.contactRequest('Send contact'),
        Markup.button.locationRequest('Send location'),
      ]).resize()
    );
  });

  bot.command('pyramid', (ctx) => {
    return ctx.reply(
      'Keyboard wrap',
      Markup.keyboard(['one', 'two', 'three', 'four', 'five', 'six'], {
        wrap: (btn, index, currentRow) => currentRow.length >= (index + 1) / 2,
      })
    );
  });

  bot.command('simple', (ctx) => {
    return ctx.replyWithHTML(
      '<b>Coke</b> or <i>Pepsi?</i>',
      Markup.keyboard(['Coke', 'Pepsi'])
    );
  });

  bot.command('inline', (ctx) => {
    return ctx.reply('<b>Coke</b> or <i>Pepsi?</i>', {
      parse_mode: 'HTML',
      ...Markup.inlineKeyboard([
        Markup.button.callback('Coke', 'Coke'),
        Markup.button.callback('Pepsi', 'Pepsi'),
      ]),
    });
  });

  bot.command('random', (ctx) => {
    return ctx.reply(
      'random example',
      Markup.inlineKeyboard([
        Markup.button.callback('Coke', 'Coke'),
        Markup.button.callback('Dr Pepper', 'Dr Pepper', Math.random() > 0.5),
        Markup.button.callback('Pepsi', 'Pepsi'),
      ])
    );
  });

  bot.command('caption', (ctx) => {
    return ctx.replyWithPhoto(
      { url: 'https://picsum.photos/200/300/?random' },
      {
        caption: 'Caption',
        parse_mode: 'Markdown',
        ...Markup.inlineKeyboard([
          Markup.button.callback('Plain', 'plain'),
          Markup.button.callback('Italic', 'italic'),
        ]),
      }
    );
  });

  bot.command('poll', (ctx) =>
    ctx.replyWithPoll(
      'Your favorite math constant',
      ['x', 'e', 'π', 'φ', 'γ'],
      { is_anonymous: false }
    )
  );
  bot.command('quiz', (ctx) =>
    ctx.replyWithQuiz('2b|!2b', ['True', 'False'], { correct_option_id: 0 })
  );
};
