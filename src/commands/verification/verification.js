"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const Command_1 = require("../../lib/classes/Command");
const Embed_1 = require("../../lib/functions/Embed");
exports.default = new Command_1.Command({
    name: 'verification',
    description: 'Create verification panel',
    type: discord_js_1.ApplicationCommandType.ChatInput,
    options: [
        {
            name: 'button',
            description: 'Send a button captcha panel',
            type: discord_js_1.ApplicationCommandOptionType.Subcommand,
            options: [
                {
                    name: 'role',
                    description: 'Role',
                    type: discord_js_1.ApplicationCommandOptionType.Role,
                    required: true,
                },
            ],
        },
    ],
    ephemeral: false,
    run: async ({ client, interaction }) => {
        const subcmd = interaction.options.getSubcommand();
        const role = interaction.guild?.roles.cache.get(interaction.options.getRole('role')?.id);
        switch (subcmd) {
            case 'button':
                await interaction.followUp({
                    embeds: [
                        {
                            title: 'One click verification',
                            description: 'Click the button to verification.',
                            color: discord_js_1.Colors.Gold,
                            footer: (0, Embed_1.footer)(),
                        },
                    ],
                    components: [
                        new discord_js_1.ActionRowBuilder().addComponents(new discord_js_1.ButtonBuilder()
                            .setCustomId(`captcha_${role?.id}`)
                            .setLabel('Click to verify')
                            .setStyle(discord_js_1.ButtonStyle.Success)),
                    ],
                });
                break;
        }
    },
});
