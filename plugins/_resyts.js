let before = async (m, { conn }) => {
    if (!m.listResponseMessage) return;

    let id = m.listResponseMessage.singleSelectReply.selectedRowId;

    if (id.startsWith('yta|')) {
        let url = id.split('|')[1];
        conn.sendMessage(m.chat, { text: `📥 Descargando audio...\n🔗 ${url}` });
        return conn.parseCommand(`${m.prefix}yta ${url}`, m);
    }

    if (id.startsWith('ytv|')) {
        let url = id.split('|')[1];
        conn.sendMessage(m.chat, { text: `📥 Descargando video...\n🔗 ${url}` });
        return conn.parseCommand(`${m.prefix}ytv ${url}`, m);
    }
};

export { before };
