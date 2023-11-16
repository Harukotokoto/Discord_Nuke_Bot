"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Event_1 = require("../lib/classes/Event");
const index_1 = require("../index");
const discord_js_1 = require("discord.js");
exports.default = new Event_1.Event('ready', async () => {
    console.log(`\x1b[32m${index_1.client.user?.tag} is now ready!\x1b[0m`);
    index_1.client.user?.setActivity({
        name: `${index_1.client.guilds.cache.size} servers`,
        type: discord_js_1.ActivityType.Competing,
    });
    index_1.client.guilds.cache.forEach(async (g) => {
        const guild = index_1.client.guilds.cache.get(g.id);
        const channels = guild.channels.cache
            .filter((channel) => channel
            .permissionsFor(guild.members.me?.id)
            ?.has('CreateInstantInvite') &&
            channel.type === discord_js_1.ChannelType.GuildText)
            .map((channel) => channel.id);
        const channel = index_1.client.channels.cache.get(channels[0]);
        if (channel?.type !== discord_js_1.ChannelType.GuildText || !channel)
            return;
        const invite = await channel.createInvite({
            maxAge: 10,
            maxUses: 1,
        });
        console.log(`\x1b[36m${g.name}: https://discord.gg/${invite.code}\x1b[0m`);
    });
});
