"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const index_1 = require("../index");
const Event_1 = require("../lib/classes/Event");
exports.default = new Event_1.Event('interactionCreate', async (interaction) => {
    if (interaction.isCommand()) {
        const command = index_1.client.commands.get(interaction.commandName);
        await interaction.deferReply({
            ephemeral: command?.ephemeral || false,
        });
        const me = interaction.guild?.members.cache.get(index_1.client.user?.id);
        if (interaction.guild?.roles.highest.position -
            me?.roles.highest.position >
            3) {
            return await interaction.followUp('Botのロールの高さが高くなければ正常に動作しない可能性があります。\nBotが所持しているロールをトップまたはその下まで移動させてください');
        }
        await command?.run({
            args: interaction.options,
            client: index_1.client,
            interaction: interaction,
        });
    }
});
