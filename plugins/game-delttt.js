import { default as makeWASocket } from '@whiskeysockets/baileys';

const handler = async (m, { conn, usedPrefix, command }) => {
  const room = Object.values(conn.game).find((room) => 
    room.id.startsWith('tictactoe') && 
    [room.game.playerX, room.game.playerO].includes(m.sender)
  );

  if (room == undefined) {
    return m.reply(`*[❗] 𝙽𝙾 𝙴𝚂𝚃𝙰𝚂 𝙴𝙽 𝙽𝙸𝙽𝙶𝚄𝙽𝙰 𝙿𝙰𝚁𝚃𝙸𝙳𝙰 𝙳𝙴 𝚃𝚁𝙴𝚂 𝙴𝙽 𝚁𝙰𝚈𝙰*\n\n*—◉ 𝙿𝚄𝙴𝙳𝙴𝚂 𝙸𝙽𝙸𝙲𝙸𝙰𝚁 𝚄𝙽𝙰 𝙽𝚄𝙴𝚅𝙰 𝚂𝙰𝙻𝙰 𝙲𝙾𝙽:* ${usedPrefix}ttt partida nueva`);
  }

  delete conn.game[room.id];
  await m.reply('*[✔] 𝚂𝙴 𝙴𝙻𝙸𝙼𝙸𝙽𝙾 𝙻𝙰 𝚂𝙰𝙻𝙰 𝙳𝙴 𝙹𝚄𝙴𝙶𝙾 𝙳𝙴 𝚃𝚁𝙴𝚂 𝙴𝙽 𝚁𝙰𝚈𝙰*');
};

handler.help = ['delttt <txt>'];
handler.tags = ['game'];
handler.command = /^(delttt|deltt|delxo|deltictactoe)$/i;
handler.group = true;
handler.fail = null;
export default handler;