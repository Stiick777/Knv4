const handler = async (m, { conn, args, usedPrefix }) => {
    const ownerNumber = '5216645011701'; // Reemplázalo con tu número sin @s.whatsapp.net

    if (m.sender.replace(/@s\.whatsapp\.net$/, '') !== ownerNumber) {
        return conn.reply(m.chat, '⚠️ *No tienes permisos para usar este comando.*', m);
    }

    let db = global.db.data.users;
    let user;

    function cleanNumber(number) {
        return number.replace(/\s/g, '').replace(/([@+-])/g, '');
    }

    if (m.quoted?.sender) {
        user = m.quoted.sender;
    } else if (args.length >= 1) {
        const input = cleanNumber(args[0]);
        user = isNaN(input) ? input.split`@`[1] + '@s.whatsapp.net' : input + '@s.whatsapp.net';
    } else if (m.mentionedJid?.[0]) {
        user = m.mentionedJid[0];
    } else {
        return conn.reply(m.chat, `⚡ *Etiqueta, responde al mensaje o escribe el número del usuario que deseas desbanear.*\n\nEjemplo:\n- *${usedPrefix}unbanuser @usuario*\n- *${usedPrefix}unbanuser +573223336363*`, m);
    }

    if (!user) return conn.reply(m.chat, `❌ No se pudo determinar el usuario.`, m);

    let foundUser = Object.keys(db).find(jid => jid.includes(user.replace('@s.whatsapp.net', '')));

    if (!foundUser) return conn.reply(m.chat, `🔰 El usuario no está registrado en la base de datos.`, m);
    
    if (!db[foundUser].banned) {
        return conn.reply(m.chat, `🌥️ El usuario ya está desbaneado.`, m);
    }

    db[foundUser].banned = false;
    db[foundUser].BannedReason = '';
    db[foundUser].Banneduser = false;
    db[foundUser].banRazon = '';
    db[foundUser].antispam = 0;

    const nametag = await conn.getName(foundUser);
    conn.reply(m.chat, `✅️ El usuario *${nametag || foundUser.split('@')[0]}* ha sido desbaneado y puede volver a usar el bot.`, m, { mentions: [foundUser] });
};

handler.help = ['unbanuser <@tag|número>'];
handler.command = ['unbanuser'];
handler.tags = ['owner'];
handler.rowner = true;

export default handler;
