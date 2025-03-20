import yts from 'yt-search';
import fetch from 'node-fetch';
let limit = 320;
let confirmation = {};

let handler = async (m, { conn, command, text, args, usedPrefix }) => {
    if (!text) throw `✳️ Ejemplo: *${usedPrefix + command}* Lil Peep hate my life`;

    let res = await yts(text);
    let vid = res.videos[0];
    if (!vid) throw `✳️ Vídeo/Audio no encontrado`;

    let { title, description, thumbnail, videoId, timestamp, views, ago, url } = vid;

    let who = m.quoted ? m.quoted.sender : m.mentionedJid && m.mentionedJid[0] ? m.mentionedJid[0] : m.fromMe ? conn.user.jid : m.sender;

    let chat = global.db.data.chats[m.chat];

    m.react('🎧');

    let playMessage = `
≡ *YOUTUBE MUSIC*
┌──────────────
▢ 📌 *Título:* ${vid.title}
▢ 📆 *Subido hace:* ${vid.ago}
▢ ⌚ *Duración:* ${vid.timestamp}
▢ 👀 *Vistas:* ${vid.views.toLocaleString()}
└──────────────`;

        conn.sendButton(m.chat, playMessage, "Instagram: @tuusuario", thumbnail, [
            ['🎶 MP3', `${usedPrefix}yta ${url}`],
            ['🎥 MP4', `${usedPrefix}ytv ${url}`]
        ], m);
    }
};

handler.help = ['play'];
handler.tags = ['dl'];
handler.command = ['play', 'play2'];
handler.disabled = false;
handler.group = true;

export default handler;

handler.before = async m => {
    if (!(m.sender in confirmation)) return; // Solo continuar si hay confirmación pendiente

    let { sender, timeout, url, chat } = confirmation[m.sender];
    if (m.text.trim() === '1') {
        clearTimeout(timeout);
        delete confirmation[m.sender];

        let res = await fetch(global.API('fgmods', '/api/downloader/ytmp3', { url: url }, 'apikey'));
        let data = await res.json();

        let { title, dl_url, size } = data.result;
        conn.sendFile(m.chat, dl_url, title + '.mp3', `≡  *KAN YTDL*\n\n▢ *📌 Título:* ${title}`, m, false, { mimetype: 'audio/mpeg', asDocument: chat.useDocument });
        m.react('✅');
    } else if (m.text.trim() === '2') {
        clearTimeout(timeout);
        delete confirmation[m.sender];

        let res = await fetch(global.API('fgmods', '/api/downloader/ytmp4', { url: url }, 'apikey'));
        let data = await res.json();

        let { title, dl_url, size, sizeB } = data.result;
        let isLimit = limit * 1024 < sizeB;

        await conn.loadingMsg(m.chat, '📥 Descargando', `${isLimit ? `≡  *KAN YTDL*\n\n▢ *⚖️ Tamaño:* ${size}\n\n▢ _Límite de descarga:_ *+${limit} MB*` : '✅ Descarga Completada'}`, ["▬▭▭▭▭▭", "▬▬▭▭▭▭", "▬▬▬▭▭▭", "▬▬▬▬▭▭", "▬▬▬▬▬▭", "▬▬▬▬▬▬"], m);

        if (!isLimit) conn.sendFile(m.chat, dl_url, title + '.mp4', `≡  *KAN YTDL*\n*📌 Título:* ${title}\n*⚖️ Tamaño:* ${size}`, m, false, { asDocument: chat.useDocument });
        m.react('✅');
    }
};
