/*

#kiuu
github : https://github.com/kiuur
youtube : https://youtube.com/@kyuurzy
rest api : https://shinoa.us.kg

*/

require('../setting/config');

const fs = require('fs');
const axios = require('axios');
const chalk = require("chalk");
const util = require("util");
const moment = require("moment-timezone");
const { spawn, exec, execSync } = require('child_process');

const { default: baileys, proto, generateWAMessage, generateWAMessageFromContent, getContentType, prepareWAMessageMedia } = require("@whiskeysockets/baileys");

module.exports = client = async (client, m, chatUpdate, store) => {
try {
// Message type handling
const body = (
m.mtype === "conversation" ? m.message.conversation :
m.mtype === "imageMessage" ? m.message.imageMessage.caption :
m.mtype === "videoMessage" ? m.message.videoMessage.caption :
m.mtype === "extendedTextMessage" ? m.message.extendedTextMessage.text :
m.mtype === "buttonsResponseMessage" ? m.message.buttonsResponseMessage.selectedButtonId :
m.mtype === "listResponseMessage" ? m.message.listResponseMessage.singleSelectReply.selectedRowId :
m.mtype === "templateButtonReplyMessage" ? m.message.templateButtonReplyMessage.selectedId :
m.mtype === "interactiveResponseMessage" ? JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id :
m.mtype === "templateButtonReplyMessage" ? m.msg.selectedId :
m.mtype === "messageContextInfo" ? m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text : ""
);

const sender = m.key.fromMe
? client.user.id.split(":")[0] + "@s.whatsapp.net" || client.user.id
: m.key.participant || m.key.remoteJid;

const senderNumber = sender.split('@')[0];
const budy = (typeof m.text === 'string' ? m.text : '');
const prefa = ["", "!", ".", ",", "🐤", "🗿"];
const prefix = /^[°zZ#$@+,.?=''():√%!¢£¥€π¤ΠΦ&><™©®Δ^βα¦|/\\©^]/.test(body) ? body.match(/^[°zZ#$@+,.?=''():√%¢£¥€π¤ΠΦ&><!™©®Δ^βα¦|/\\©^]/gi) : '.';
const from = m.key.remoteJid;
const isGroup = from.endsWith("@g.us");

// Database
const kontributor = JSON.parse(fs.readFileSync('./start/lib/database/owner.json'));

const botNumber = await client.decodeJid(client.user.id);
const Access = [botNumber, ...kontributor, ...global.owner];
const isCmd = body.startsWith(prefix);
const command = body.slice(1).trim().split(/ +/).shift().toLowerCase();
const args = body.trim().split(/ +/).slice(1);
const pushname = m.pushName || "No Name";
const text = q = args.join(" ");
const quoted = m.quoted ? m.quoted : m;
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted);
const isMedia = /image|video|sticker|audio/.test(mime);

// Group function
const groupMetadata = isGroup ? await client.groupMetadata(m.chat).catch((e) => {}) : "";
const groupOwner = isGroup ? groupMetadata.owner : "";
const groupName = m.isGroup ? groupMetadata.subject : "";
const participants = isGroup ? await groupMetadata.participants : "";
const groupAdmins = isGroup ? await participants.filter((v) => v.admin !== null).map((v) => v.id) : "";
const groupMembers = isGroup ? groupMetadata.participants : "";
const isGroupAdmins = isGroup ? groupAdmins.includes(m.sender) : false;
const isBotGroupAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isBotAdmins = isGroup ? groupAdmins.includes(botNumber) : false;
const isAdmins = isGroup ? groupAdmins.includes(m.sender) : false;

// Function
const { smsg, sendGmail, formatSize, isUrl, generateMessageTag, getBuffer, getSizeMedia, runtime, fetchJson, sleep } = require('./lib/myfunction');
const { ytdl } = require('./lib/scrape/scrape-ytdl')

let Buttons = require("./lib/buttondoc");
let batten = new Buttons();

// Time
const time = moment.tz("Asia/Makassar").format("HH:mm:ss");

// Console log
if (m.message) {
console.log('\x1b[30m--------------------\x1b[0m');
console.log(chalk.bgHex("#e74c3c").bold(`▢ New Message`));
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Tanggal: ${new Date().toLocaleString()} \n` +
`   ⌬ Pesan: ${m.body || m.mtype} \n` +
`   ⌬ Pengirim: ${m.pushname} \n` +
`   ⌬ JID: ${senderNumber}`
)
);
if (m.isGroup) {
console.log(
chalk.bgHex("#00FF00").black(
`   ⌬ Grup: ${groupName} \n` +
`   ⌬ GroupJid: ${m.chat}`
)
);
}
console.log();
}

// Helper functions
const kiuu = (anu) => {
const {message, key} = generateWAMessageFromContent(m.chat, {
interactiveMessage: {
body: {text: anu},
footer: {text: `${global.footer}`},
nativeFlowMessage: {
buttons: [{text: "N-Kiuur ZcoderX"}
],
}
},
}, {quoted: { key: { participant: '0@s.whatsapp.net', remoteJid: "0@s.whatsapp.net" }, message: { conversation: `${body}`}}})
client.relayMessage(m.chat, {viewOnceMessage:{message}}, {messageId:key.id})
}

const reaction = async (jidss, emoji) => {
client.sendMessage(jidss, { react: { text: emoji, key: m.key }})}
  
// Command handler
switch (command) {

case 'menu':{
let wow = `hi ${pushname} 🪸, i am an automated system (WhatsApp bot) that can help to do something search and get data / information only through WhatsApp.

 ▢ Creator : N-Kiuur ZcoderX
 ▢ Library : WS-Baileys
 ▢ Mode : ${client.public ? 'Public' : 'Self'}

*N-Kiuur* is a WhatsApp bot developed using NodeJS and Baileys library. This bot was created to provide a better user experience in interacting on the platform.`
let buttons = new Buttons();   
buttons.setBody(wow)
buttons.addSelection("List Menu");
buttons.makeSections("#! - Show All Menu List!!", "");
buttons.makeRow(
    "#! - Show All Menu",
    "display all menu in the bot !!!",
    "you can see all the features in this bot",
    `${prefix}menuall`
);
buttons.makeSections("#! - Menu Selection", "");
buttons.makeRow(
    "#! - Menu AI",
    "AI (Artificial Intelligence)",
    "The abbreviation AI stands for Artificial Intelligence",
    `${prefix}menuai`
);
buttons.makeRow(
    "#! - Menu Download",
    "Download Menu for bot",
    "You can download some media From social media",
    `${prefix}menudown`
);
buttons.makeRow(
    "#! - Menu Owner",
    "This menu is for owners only, you must have owner access first to use it.",
    "Before using it, you must be aware first, are you the owner or not the owner?",
    `${prefix}menuowner`
);
buttons.makeRow(
    "#! - Menu Group",
    "You Can Use This Feature in Group Chat",
    "This feature is only used for groups and cannot be used in private chats.",
    `${prefix}menugrup`
);
buttons.makeRow(
    "#! - Menu Tools",
    "This tool may be useful for you",
    "These various tools may be of some use to you.",
    `${prefix}menutools`
);
buttons.makeSections("Contact Creator", "");
buttons.makeRow(
    "#! - Contact Script Owner",
    "Spam and Call Owner are prohibited!!!",
    "later you will be blocked by my owner",
    `${prefix}owner`
);
await buttons.run(m.chat, client, m);
}
break

case "play": {
if (!text) return m.reply(`*Example:* ${prefix + command} photograph`)
const yts = require('yt-search');
let search = await yts(text);
let telaso = search.all[0].url;
var response = await ytdl(telaso)
var puki = response.data.mp3
client.sendMessage(m.chat, { audio: { url: puki },
mimetype: "audio/mpeg",
fileName: "kiuu.mp3",
contextInfo: {
forwardingScore: 100,
isForwarded: true,
externalAdReply: {
showAdAttribution: true,
title: search.all[0].title,
sourceUrl: search.all[0].timestamp,
thumbnailUrl: search.all[0].thumbnail,
}}},{quoted:m})
}
break
        
case 'tovn': {
if (!/video/.test(mime) && !/audio/.test(mime)) return m.reply(`reply video/vn with caption ${prefix + command}`)
if (!quoted) return m.reply(`reply video/vn with caption ${prefix + command}`)
await reaction(m.chat, "🔒");
await sleep(5000)
let media = await quoted.download()
let { toAudio } = require('./lib/converter')
let audio = await toAudio(media, 'mp4')
await reaction(m.chat, "🔓");
client.sendMessage(m.chat, {audio, mimetype:'audio/mpeg', ptt: true}, { quoted : m })
}
break

default:
if (budy.startsWith('>')) {
if (!Access) return;
try {
let evaled = await eval(budy.slice(2));
if (typeof evaled !== 'string') evaled = require('util').inspect(evaled);
await m.reply(evaled);
} catch (err) {
m.reply(String(err));
}
}
        
if (budy.startsWith('<')) {
if (!Access) return
let kode = budy.trim().split(/ +/)[0]
let teks
try {
teks = await eval(`(async () => { ${kode == ">>" ? "return" : ""} ${q}})()`)
} catch (e) {
teks = e
} finally {
await m.reply(require('util').format(teks))
}
}
        
}
} catch (err) {
console.log(require("util").format(err));
}
};

let file = require.resolve(__filename);
require('fs').watchFile(file, () => {
require('fs').unwatchFile(file);
console.log('\x1b[0;32m' + __filename + ' \x1b[1;32mupdated!\x1b[0m');
delete require.cache[file];
require(file);
});
