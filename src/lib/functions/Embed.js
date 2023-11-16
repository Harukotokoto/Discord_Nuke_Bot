"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.footer = void 0;
const index_1 = require("../../index");
const footer = () => {
    return {
        text: index_1.client.user?.tag,
        icon_url: index_1.client.user?.avatarURL(),
    };
};
exports.footer = footer;
