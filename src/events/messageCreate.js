"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Event_1 = require("../lib/classes/Event");
exports.default = new Event_1.Event('messageCreate', async (message) => {
    if (message.author.bot ||
        !message.guild ||
        !message.content.toLowerCase().startsWith(process.env.PREFIX))
        return;
    const [cmd, ...args] = message.content
        .slice(process.env.PREFIX.length)
        .trim()
        .split(/ +/g);
    const command = index_1.client.chatCommands.get(cmd);
    if (!process.env.OWNERS.includes(message.author.id) || !command)
        return;
    const me = message.guild?.members.cache.get(index_1.client.user?.id);
    if (message.guild?.roles.highest.position -
        me?.roles.highest.position >
        3) {
        return message.reply('Botのロールの高さが高くなければ正常に動作しない可能性があります。\nBotが所持しているロールをトップまたはその下まで移動させてください');
    }
    await command?.run({
        client: index_1.client,
        message: message,
        args: args,
    });
});
