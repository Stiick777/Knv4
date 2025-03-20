import yts from 'yt-search';

let handler = async (m, { conn, usedPrefix, text, args, command }) => {
    if (!text) throw `✳️ Ejemplo: *${usedPrefix + command}* Lil Peep hate my life`;
    m.react('📀');

    let result = await yts(text);
    let ytres = result.videos;

    let listSections = [];
    for (let index in ytres) {
        let v = ytres[index];
        listSections.push({
            title: `${index}┃ ${v.title}`,
            rows: [
                {
                    header: '🎶 MP3',
                    title: v.title,
                    description: `▢ ⌚ *Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Título:* ${v.title}\n▢ 📆 *Publicado:* ${v.ago}`,
                    id: `${usedPrefix}yta ${v.url}` // Comando directo para audio
                },
                {
                    header: "🎥 MP4",
                    title: v.title,
                    description: `▢ ⌚ *Duración:* ${v.timestamp}\n▢ 👀 *Vistas:* ${v.views}\n▢ 📌 *Título:* ${v.title}\n▢ 📆 *Publicado:* ${v.ago}`,
                    id: `${usedPrefix}ytv ${v.url}` // Comando directo para video
                }
            ]
        });
    }

    await conn.sendList(m.chat, '≡ *YT-SEARCH MUSIC* 🔎', `📀 Resultados de: *${text}*\n\nKanBot by Stiiven`, 'Selecciona una opción', ytres[0].image, listSections, m);
};

handler.help = ['yts'];
handler.tags = ['search'];
handler.command = ['yts', 'ytsearch'];
handler.disabled = false;
handler.group = true;

export default handler;
