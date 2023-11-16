"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedClient = void 0;
const tslib_1 = require("tslib");
const discord_js_1 = require("discord.js");
const glob_1 = tslib_1.__importDefault(require("glob"));
const util_1 = require("util");
const globPromise = (0, util_1.promisify)(glob_1.default);
class ExtendedClient extends discord_js_1.Client {
    commands = new discord_js_1.Collection();
    chatCommands = new discord_js_1.Collection();
    constructor() {
        super({
            intents: [
                discord_js_1.IntentsBitField.Flags.Guilds,
                discord_js_1.IntentsBitField.Flags.GuildMembers,
                discord_js_1.IntentsBitField.Flags.MessageContent,
                discord_js_1.IntentsBitField.Flags.GuildMessages,
            ],
        });
    }
    start() {
        this.registerModules().then(() => {
            console.log(`\x1b[36mModules has been loaded.\x1b[0m`);
        });
        this.login(process.env.CLIENT_TOKEN).then(() => {
            console.log(`\x1b[32mLogged in successfully.\x1b[0m`);
        });
    }
    async importFile(filePath) {
        return (await Promise.resolve(`${filePath}`).then(s => tslib_1.__importStar(require(s))))?.default;
    }
    async registerModules() {
        const slashCommands = [];
        const commandFiles = await globPromise(__dirname + `/../../commands/*/*{.ts,.js}`);
        for (const filePath of commandFiles) {
            const command = await this.importFile(filePath);
            if (!command.name)
                continue;
            console.log(`\x1b[36mSlash command: /${command.name} has been loaded.\x1b[0m`);
            this.commands.set(command.name, command);
            slashCommands.push(command);
        }
        const chatFiles = await globPromise(__dirname + `/../../secret/*{.ts,.js}`);
        for (const filePath of chatFiles) {
            const command = await this.importFile(filePath);
            if (!command.name)
                continue;
            console.log(`\x1b[36mChat command: ${process.env.PREFIX}${command.name} has been loaded.\x1b[0m`);
            this.chatCommands.set(command.name, command);
        }
        this.on('ready', () => {
            this.application?.commands
                .set(slashCommands)
                .then(() => {
                console.log(`\x1b[32m${slashCommands.length} slash commands registered on ${this.guilds.cache.size} servers.\x1b[0m`);
            })
                .catch(async (e) => {
                console.log(`\x1b[31mAn error occurred while registering the slash command.\x1b[0m`);
                console.log(`\x1b[31m=> ${e}\x1b[0m`);
            });
        });
        const eventFiles = await globPromise(`${__dirname}/../../events/*{.ts,.js}`);
        for (const filePath of eventFiles) {
            const event = await this.importFile(filePath);
            this.on(event.event, event.run);
        }
    }
}
exports.ExtendedClient = ExtendedClient;
