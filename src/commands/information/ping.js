"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../lib/classes/Command");
const Embed_1 = require("../../lib/functions/Embed");
exports.default = new Command_1.Command({
    name: 'ping',
    description: "Displays the bot's ping value.",
    type: discord_js_1.ApplicationCommandType.ChatInput,
    ephemeral: false,
    run: async ({ client, interaction }) => {
        await interaction.followUp({
            embeds: [
                {
                    title: '🏓 Pinging...',
                    color: discord_js_1.Colors.Red,
                    footer: (0, Embed_1.footer)(),
                },
            ],
        });
        const ratency = new Date().getTime() - interaction.createdTimestamp;
        await interaction.editReply({
            embeds: [
                {
                    title: '🏓 Pong!',
                    description: `Client ratency: ${client.ws.ping}ms\nMessage Edit ratency: ${ratency}ms`,
                    color: discord_js_1.Colors.Aqua,
                    footer: (0, Embed_1.footer)(),
                },
            ],
        });
    },
});
