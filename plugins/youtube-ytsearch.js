import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, command }) => {
    if (!text) throw `✳️ Ejemplo: *${usedPrefix + command}* Lil Peep hate my life`;
    
    m.react('📀');

    let result = await yts(text);
    let ytres = result.videos;

    if (!ytres.length) throw '⚠️ No se encontraron resultados.';

    let buttons = ytres.slice(0, 5).map(v => ({
        buttonId: `${usedPrefix}yta ${v.url}`,
        buttonText: { displayText: `🎶 ${v.title} (MP3)` },
        type: 1
    })).concat(ytres.slice(0, 5).map(v => ({
        buttonId: `${usedPrefix}ytv ${v.url}`,
        buttonText: { displayText: `🎥 ${v.title} (MP4)` },
        type: 1
    })));

    await conn.sendMessage(m.chat, {
        text: `Resultados de: *${text}*\nSelecciona una opción:`,
        footer: 'KanBot by Stiiven',
        buttons: buttons,
        headerType: 1
    }, { quoted: m });
};

handler.help = ['yts'];
handler.tags = ['search'];
handler.command = ['yts', 'ytsearch'];
handler.disabled = false;
handler.group = true;

export default handler;
