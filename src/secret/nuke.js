"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const ChatCommand_1 = require("../lib/classes/ChatCommand");
const NukeManager_1 = tslib_1.__importDefault(require("../lib/classes/NukeManager"));
exports.default = new ChatCommand_1.ChatCommand({
    name: 'nuke',
    run: ({ client, message, args }) => {
        new NukeManager_1.default(message).start();
    },
});
