import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, command }) => {
    if (!text) throw `✳️ Ejemplo: *${usedPrefix + command}* Lil Peep hate my life`;

    m.react('📀');
    let result = await yts(text);
    let ytres = result.videos;

    if (!ytres.length) throw "❌ No se encontraron resultados.";

    let listSections = ytres.slice(0, 5).map((v, index) => ({
        title: `${index + 1}┃ ${v.title}`,
        rows: [
            {
                title: "🎶 MP3",
                description: `⌚ *Duración:* ${v.timestamp}\n👀 *Vistas:* ${v.views}\n📌 *Título:* ${v.title}\n📆 *Publicado:* ${v.ago}`,
                rowId: `${usedPrefix}yta ${v.url}`
            },
            {
                title: "🎥 MP4",
                description: `⌚ *Duración:* ${v.timestamp}\n👀 *Vistas:* ${v.views}\n📌 *Título:* ${v.title}\n📆 *Publicado:* ${v.ago}`,
                rowId: `${usedPrefix}ytv ${v.url}`
            }
        ]
    }));

    await conn.sendList(
        m.chat,
        '≡ *YT-SEARCH MUSIC*🔎',
        `\n 📀 Resultados de: *${text}*\n\nKanBot by Stiiven`,
        'Click Aquí',
        ytres[0].thumbnail, // Asegúrate de usar `thumbnail` en lugar de `image`
        listSections,
        m
    );
};

handler.help = ['yts'];
handler.tags = ['search'];
handler.command = ['yts', 'ytsearch'];
handler.disabled = false;
handler.group = true;

export default handler;
