"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Event_1 = require("../lib/classes/Event");
const Embed_1 = require("../lib/functions/Embed");
exports.default = new Event_1.Event('interactionCreate', async (interaction) => {
    if (interaction.isButton()) {
        if (interaction.customId.startsWith('captcha_')) {
            const role = interaction.guild?.roles.cache.get(interaction.customId.split('_')[1]);
            if (!role) {
                return await interaction.reply({
                    embeds: [
                        {
                            title: 'An unexpected error has occurred',
                            color: discord_js_1.Colors.Red,
                            footer: (0, Embed_1.footer)(),
                        },
                    ],
                    ephemeral: true,
                });
            }
            const member = interaction.guild?.members.cache.get(interaction.user.id);
            if (member?.roles.cache.has(role.id)) {
                return await interaction.reply({
                    embeds: [
                        {
                            title: 'Verification failed.',
                            description: 'You has already verified.',
                            color: discord_js_1.Colors.Red,
                            footer: (0, Embed_1.footer)(),
                        },
                    ],
                    ephemeral: true,
                });
            }
            await member?.roles
                .add(role?.id)
                .then(async () => {
                return await interaction.reply({
                    embeds: [
                        {
                            title: 'Success!',
                            description: 'Verification completed.',
                            color: discord_js_1.Colors.Aqua,
                            footer: (0, Embed_1.footer)(),
                        },
                    ],
                    ephemeral: true,
                });
            })
                .catch(async () => {
                return await interaction.reply({
                    embeds: [
                        {
                            title: 'An unexpected error has occurred',
                            color: discord_js_1.Colors.Red,
                            footer: (0, Embed_1.footer)(),
                        },
                    ],
                    ephemeral: true,
                });
            });
        }
    }
});
