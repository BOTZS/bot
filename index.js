const {
    WAConnection,
    MessageType,
    Presence,
    Mimetype,
    GroupSettingChange
} = require('@adiwajshing/baileys')
const { color, bgcolor } = require('./lib/color')
const { help } = require('./src/help')
const { gcpf } = require('./src/gcpf')
const { menu2 } = require('./src/menu2')

const { pornomenu } = require('./src/pornomenu')
const { wait, simih, getBuffer, h2k, generateMessageID, getGroupAdmins, getRandom, banner, start, info, success, close } = require('./lib/functions')
const { fetchJson } = require('./lib/fetcher')
const { recognize } = require('./lib/ocr')
const fs = require('fs')
const moment = require('moment-timezone')
const { exec } = require('child_process')
const kagApi = require('@kagchi/kag-api')
const fetch = require('node-fetch')
const bloqueado = require('./src/bloqueado.json')
const ffmpeg = require('fluent-ffmpeg')
const { removeBackgroundFromImageFile } = require('remove.bg')
const lolis = require('lolis.life')
const loli = new lolis()
const welkom = JSON.parse(fs.readFileSync('./src/welkom.json'))
const nsfw = JSON.parse(fs.readFileSync('./src/nsfw.json'))
const samih = JSON.parse(fs.readFileSync('./src/simi.json'))
const { TobzApi } = JSON.parse(fs.readFileSync('./database/json/apikey.json'))
const tobzkey = 'apitobz';

prefix = '.'
blocked = []
/*********** LOAD FILE ***********/
const antilink = JSON.parse(fs.readFileSync('./database/json/antilink.json'))
const block = JSON.parse(fs.readFileSync('./database/json/block.json'))
/*********** END LOAD ***********/
/******BEGIN OF JSON INPUT******/
const public = JSON.parse(fs.readFileSync('./src/public.json'))
const userP = JSON.parse(fs.readFileSync('./database/json/userP.json'))

const user = JSON.parse(fs.readFileSync('./database/json/user.json'))
const usergp = JSON.parse(fs.readFileSync('./database/json/user.json'))
const _leveling = JSON.parse(fs.readFileSync('./database/json/leveling.json'))
const _level = JSON.parse(fs.readFileSync('./database/json/level.json'))
/******END OF JSON INPUT******/
/******BEGIN OF FUNCTIONS INPUT******/
const getLevelingXp = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].xp
            }
        }

        const getLevelingLevel = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].level
            }
        }

        const getLevelingId = (userId) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                return _level[position].jid
            }
        }

        const addLevelingXp = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].xp += amount
                fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingLevel = (userId, amount) => {
            let position = false
            Object.keys(_level).forEach((i) => {
                if (_level[i].jid === userId) {
                    position = i
                }
            })
            if (position !== false) {
                _level[position].level += amount
                fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
            }
        }

        const addLevelingId = (userId) => {
            const obj = {jid: userId, xp: 1, level: 1}
            _level.push(obj)
            fs.writeFileSync('./database/json/level.json', JSON.stringify(_level))
        }
function kyun(seconds){
  function pad(s){
    return (s < 10 ? '0' : '') + s;
  }
  var hours = Math.floor(seconds / (60*60));
  var minutes = Math.floor(seconds % (60*60) / 60);
  var seconds = Math.floor(seconds % 60);

  //return pad(hours) + ':' + pad(minutes) + ':' + pad(seconds)
  return `${pad(hours)} Jam ${pad(minutes)} Menit ${pad(seconds)} Detik`
}

async function starts() {
	const client = new WAConnection()
	client.logger.level = 'warn'
	console.log(banner.string)
	client.on('qr', () => {
		console.log(color('[','white'), color('!','red'), color(']','white'), color(' Scan the qr code above'))
	})

	fs.existsSync('./BarBar.json') && client.loadAuthInfo('./BarBar.json')
	client.on('connecting', () => {
		start('2', '⌛AGUARDANDO....⌛')
	})
	client.on('open', () => {
		success('2', '🔰BOT CONECTADO COM SUCESSO🔰')
	})
	await client.connect({timeoutMs: 30*1000})
        fs.writeFileSync('./BarBar.json', JSON.stringify(client.base64EncodedAuthInfo(), null, '\t'))

	client.on('group-participants-update', async (anu) => {
		if (!welkom.includes(anu.jid)) return
		try {
			const mdata = await client.groupMetadata(anu.jid)
			console.log(anu)
			if (anu.action == 'add') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${anu.participants[0].split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `OPA IAE :@${num.split('@')[0]}\n 
BEM VINDO AO GRUPO:[${mdata.subject}]
EU SOU O BOT MELIODAS LEIA AS REGRAS 
PARA N SER REMOVIDO ESPERO QUE GOSTE DO GRUPO
PARA VER MEUS COMANDOS DIGITE .ajuda`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			} else if (anu.action == 'remove') {
				num = anu.participants[0]
				try {
					ppimg = await client.getProfilePicture(`${num.split('@')[0]}@c.us`)
				} catch {
					ppimg = 'https://i0.wp.com/www.gambarunik.id/wp-content/uploads/2019/06/Top-Gambar-Foto-Profil-Kosong-Lucu-Tergokil-.jpg'
				}
				teks = `MENOS UM GHOST FML VAI FAZER FALTA N @${num.split('@')[0]}👋`
				let buff = await getBuffer(ppimg)
				client.sendMessage(mdata.id, buff, MessageType.image, {caption: teks, contextInfo: {"mentionedJid": [num]}})
			}
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})

	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})
	
	client.on('CB:Blocklist', json => {
            if (blocked.length > 2) return
	    for (let i of json[1].blocklist) {
	    	blocked.push(i.replace('c.us','s.whatsapp.net'))
	    }
	})

	client.on('chat-update', async (mek) => {
		try {
                        if (!mek.hasNewMessage) return
                        mek = JSON.parse(JSON.stringify(mek)).messages[0]
			if (!mek.message) return
			if (mek.key && mek.key.remoteJid == 'status@broadcast') return
			if (mek.key.fromMe) return
			global.prefix
			global.blocked
			const content = JSON.stringify(mek.message)
	const speed = require('performance-now');
			const from = mek.key.remoteJid
			const type = Object.keys(mek.message)[0]
			const apiKey = 'Your-Api-Key'
			const { text, extendedText, contact, location, liveLocation, image, video, sticker, document, audio, product } = MessageType
			const time = moment.tz('Asia/Jakarta').format('DD/MM HH:mm:ss')
			body = (type === 'conversation' && mek.message.conversation.startsWith(prefix)) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption.startsWith(prefix) ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption.startsWith(prefix) ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text.startsWith(prefix) ? mek.message.extendedTextMessage.text : ''
			budy = (type === 'conversation') ? mek.message.conversation : (type === 'extendedTextMessage') ? mek.message.extendedTextMessage.text : ''
			var pes = (type === 'conversation' && mek.message.conversation) ? mek.message.conversation : (type == 'imageMessage') && mek.message.imageMessage.caption ? mek.message.imageMessage.caption : (type == 'videoMessage') && mek.message.videoMessage.caption ? mek.message.videoMessage.caption : (type == 'extendedTextMessage') && mek.message.extendedTextMessage.text ? mek.message.extendedTextMessage.text : ''
			const command = body.slice(1).trim().split(/ +/).shift().toLowerCase()
			const args = body.trim().split(/ +/).slice(1)
			
			const isCmd = body.startsWith(prefix)
				const messagesC = pes.slice(0).trim().split(/ +/).shift().toLowerCase()

			const date = moment.tz('Asia/Jakarta').format('DD,MM,YY')

			mess = {
				wait: '⌛TO PROCESSANDO AGUARDE...⌛',
				wait2: '🕐BUSCANDO A MÚSICA AGUARDE...',
				wait3: '🕐BUSCANDO O VIDEO AGUARDE...',
				grave: 'BLX DPS QUE PERDE O FONE RECLAMA N KKK',
				grave1: 'BLX ESSE FICA TOP',
				success: 'ENCONTREI🤩⚡',
				leveloff: ' ❬ X ❭  *desabilitar Level*',
				levelnoton: '❬ X ❭ *level não ativo*',
				levelnol: '*Pqp kskst level* 0 ',
				usergp: 'OIA KKKKK ESTE GRP NEM TEM ACESSO KKKKKKKK',
			
				error: {
					stick: 'ERRO NAO É POSSIVEL FAZER A FIGURINHA',
					Iv: 'MENSAGEM DE LINK INVÁLIDO'
				},
				only: {
					group: '❌ OPS, ESTE COMANDO SÓ FUNCIONA EM GRUPOS❌',
					ownerG: 'OXII I ALA KAKAKK MEMBRO COMUM ACHANDO QUE E ADEMAR',
					ownerB: '❌ ADRX? OXI A E N ENTT VAZA❌',
					admin: 'OXII I ALA KAKAKK MEMBRO COMUM ACHANDO QUE E ADEMAR❌',
					Badmin: '‼️N SOU ADM, IMPOSSÍVEL COMPLETAR ESTA AÇÃO ‼️',
					adrx1: `──「 Registre-se 」──\nOla mano !\nVoce não está registrado no banco de dados, \n\nPara c registra digite : ${prefix}adrx *nome*`,
					userB: 'bot off',
					userP:'vc n e usuario premiu',
					usergp: `──「 Registre-se 」──\nOla mano !\n Meu dono n registrou Este grupo no banco de dados,\nPeça para ele registra : @558197660171/wa.me/558197660171`,
					userP:'vc n e usuario premiu',
				}
			}

			const botNumber = client.user.jid
			const ownerNumber = ["558197660171@s.whatsapp.net"] // COLOQUE SEU NÚMERO AQUI SEM ESPAÇOS
			const isGroup = from.endsWith('@g.us')
			const sender = isGroup ? mek.participant : mek.key.remoteJid
			const groupMetadata = isGroup ? await client.groupMetadata(from) : ''
			const groupName = isGroup ? groupMetadata.subject : ''
			const groupId = isGroup ? groupMetadata.jid : ''
			const groupMembers = isGroup ? groupMetadata.participants : ''
			const groupDesc = isGroup ? groupMetadata.desc : ''
			const totalchat = await client.chats.all()
			const groupAdmins = isGroup ? getGroupAdmins(groupMembers) : ''
			const isBotGroupAdmins = groupAdmins.includes(botNumber) || false
			const isGroupAdmins = groupAdmins.includes(sender) || false
            const isAntiLink = isGroup ? antilink.includes(from) : false
			const isWelkom = isGroup ? welkom.includes(from) : false
			const isNsfw = isGroup ? nsfw.includes(from) : false
			const isSimi = isGroup ? samih.includes(from) : false
const isLevelingOn = isGroup ? _leveling.includes(groupId) : false
			const isOwner = ownerNumber.includes(sender)
			const isUser = user.includes(sender)
			const isUserP = userP.includes(sender)
			const isPublic = public.includes(sender)
			const isUsergp = usergp.includes(sender)
			const isUrl = (url) => {
			    return url.match(new RegExp(/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&/=]*)/, 'gi'))
			}
			const reply = (teks) => {
				client.sendMessage(from, teks, text, {quoted:mek})
			}
			const sendMess = (hehe, teks) => {
				client.sendMessage(hehe, teks, text)
			}
			const mentions = (teks, memberr, id) => {
				(id == null || id == undefined || id == false) ? client.sendMessage(from, teks.trim(), extendedText, {contextInfo: {"mentionedJid": memberr}}) : client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": memberr}})
			}
			
				if (messagesC.includes('corno')){
			client.updatePresence(from, Presence.composing)
			reply("vsfd seu merda")
	}
	if (messagesC.includes("bot")){
			client.updatePresence(from, Presence.composing)
			reply("fala man")
	}
	if (messagesC.includes("ola","oi")){
			client.updatePresence(from, Presence.composing)
			reply("ola mano comandos .ajuda")
	}
		if (messagesC.includes("fdp"," fdp")){
			client.updatePresence(from, Presence.composing)
			reply("teu pai")
	}
	if (messagesC.includes("://chat.whatsapp.com/")){
		if (!isGroup) return
		if (!isAntiLink) return
		if (isGroupAdmins) return reply('vc é admin, então n irei te dar ban por usar links, rlx 🙂')
		client.updatePresence(from, Presence.composing)
		if (messagesC.includes("#izinadmin")) return reply("#izinadmin diterima")
		var kic = `${sender.split("@")[0]}@s.whatsapp.net`
		reply(`link detectado ${sender.split("@")[0]} voce sera expulso deste grupo em 5 segundos`)
		setTimeout( () => {
			client.groupRemove(from, [kic]).catch((e)=>{reply(`*ERR:* ${e}`)})
		}, 5000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("5")
		}, 4000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("4")
		}, 3000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("3")
		}, 2000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("2")
		}, 1000)
		setTimeout( () => {
			client.updatePresence(from, Presence.composing)
			reply("1")
		}, 0)
	}
        //function leveling
            if (isGroup && isLevelingOn) {
            const currentLevel = getLevelingLevel(sender)
            const checkId = getLevelingId(sender)
            try {
                if (currentLevel === undefined && checkId === undefined) addLevelingId(sender)
                const amountXp = Math.floor(Math.random() * 10) + 500
                const requiredXp = 5000 * (Math.pow(2, currentLevel) - 1)
                const getLevel = getLevelingLevel(sender)
                addLevelingXp(sender, amountXp)
                if (requiredXp <= getLevelingXp(sender)) {
                    addLevelingLevel(sender, 1)
                    await reply(`*「 LEVEL UP 」*\n\n➸ *Nome*: ${sender}\n➸ *XP*: ${getLevelingXp(sender)}\n➸ *Level*: ${getLevel} -> ${getLevelingLevel(sender)}\n\nParabéns!! 🎉🎉`)
                }
            } catch (err) {
                console.error(err)
            }
        }
			colors = ['red','white','black','blue','yellow','green']
			const isMedia = (type === 'imageMessage' || type === 'videoMessage')
			const isQuotedImage = type === 'extendedTextMessage' && content.includes('imageMessage')
			const isQuotedVideo = type === 'extendedTextMessage' && content.includes('videoMessage')
			const isQuotedSticker = type === 'extendedTextMessage' && content.includes('stickerMessage')
			if (!isGroup && isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (!isGroup && !isCmd) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'args :', color(args.length))
			if (isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;32mEXEC\x1b[1;37m]', time, color(command), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			if (!isCmd && isGroup) console.log('\x1b[1;31m~\x1b[1;37m>', '[\x1b[1;31mRECV\x1b[1;37m]', time, color('Message'), 'from', color(sender.split('@')[0]), 'in', color(groupName), 'args :', color(args.length))
			
			switch(command) {
				case 'help':
				case 'menu':
				
					client.sendMessage(from, help(prefix), text)
					break
case 'kiss':
				    try {    
					
						res = await fetchJson(`https://tobz-api.herokuapp.com/api/kiss?apikey=BotWeA`, {method: 'get'})
						bufferv = await getBuffer(res.result)
						client.sendMessage(from, bufferv, image, {quoted: mek, caption: 'ezzzz'})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						sa = await getBuffer(`https://i.ibb.co/JcSjmNY/IMG-20210107-WA0052.jpg`)
						client.sendMessage(from, sa, image, {quoted: mek, caption: 'Erro como!!'})
						reply('❌ *ERRO* ❌')
					}
					break
	case 'nsfwloli':
					if (!isNsfw) return reply('*COMANDO SO FUNCIONA NO PV AMIGO.*')
					loli.getNSFWLoli(async (err, res) => {
						if (err) return reply('❌ *ERRO* ❌')
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
					})
					break
case 'lolih':
                                        gatauda = body.slice(6)
                                                            reply(mess.wait)
                                        anu = await fetchJson(`https://tobz-api.herokuapp.com/api/randomloli?apikey=BotWeA`, {method: 'get'})
                                        buffer = await getBuffer(anu.result)
                                        client.sendMessage(from, buffer, image, {quoted: mek})
                                        await limitAdd(sender)
                                        break
case 'text3d':
              	    if (args.length < 1) return reply('Onde está o texto, irmão??')
                    teks = `${body.slice(8)}`
                    if (teks.length > 50) return client.sendMessage(from, 'Teksnya kepanjangan, Maksimal 10 kalimat', text, {quoted: mek})
                    buff = await getBuffer(`https://docs-jojo.herokuapp.com/api/text3d?text=${teks}`, {method: 'get'})
                    client.sendMessage(from, buff, image, {quoted: mek, caption: `${teks}`})
			     	break
case 'pinterest':
                    tels = body.slice(11)
					client.updatePresence(from, Presence.composing) 
					data = await fetchJson(`https://api.fdci.se/rep.php?gambar=${tels}`, {method: 'get'})
					reply(mess.wait)
					n = JSON.parse(JSON.stringify(data));
					nimek =  n[Math.floor(Math.random() * n.length)];
					pok = await getBuffer(nimek)
					client.sendMessage(from, pok, image, { quoted: mek, caption: `*PINTEREST*\n\*Resultado da pesquisa* : *${tels}*`})
                    await limitAdd(sender)
					break
                    case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*Nome do bot* : ${me.name}\n*Número do bot* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*Contato de bloqueio total* : ${blocked.length}\n*O bot está ativo em* : ${kyun(uptime)}\n*Bate Papo Total* : `
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
					break
           case 'level':
                if (!isLevelingOn) return reply(mess.levelnoton)
                if (!isGroup) return reply(mess.only.group)
                const userLevel = getLevelingLevel(sender)
                const userXp = getLevelingXp(sender)
                if (userLevel === undefined && userXp === undefined) return reply(mess.levelnol)
                sem = sender.replace('@s.whatsapp.net','')
                resul = `◪ *LEVEL*\n  ├─ ❏ *Nome* : ${sem}\n  ├─ ❏ *User XP* : ${userXp}\n  └─ ❏ *User Level* : ${userLevel}`
               client.sendMessage(from, resul, text, { quoted: mek})
                .catch(async (err) => {
                        console.error(err)
                        await reply(`Error!\n${err}`)
                    })
            break
                   case 'chatlist':
					client.updatePresence(from, Presence.composing)  
					teks = 'This is list of chat number :\n'
					for (let all of totalchat) {
						teks += `~> @${all}\n`
					}
					teks += `Total : ${totalchat.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": totalchat}})
					break
case 'block':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `Pedidos recebidos, bloquear ${body.slice(8)}@c.us`, text)
					break
case 'leveling':
                if (!isGroup) return reply(mess.only.group)
                if (!isGroupAdmins) return reply(mess.only.admin)
                if (args.length < 1) return reply('Digite 1 para ativar o recurso')
                if (args[0] === '1') {
                    if (isLevelingOn) return reply('*o recurso de nível já estava ativo antes*')
                    _leveling.push(groupId)
                    fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
                     reply(mess.levelon)
                } else if (args[0] === '0') {
                    _leveling.splice(groupId, 1)
                    fs.writeFileSync('./database/json/leveling.json', JSON.stringify(_leveling))
                     reply(mess.leveloff)
                } else {
                    reply(` *Digite o comando 1 para ativar, 0 para desativar *\n * Exemplo: ${prefix}leveling 1*`)
                }
            break
case 'block':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(8)}@c.us`, "add")
					client.sendMessage(from, `Pedidos recebidos, bloquear ${body.slice(8)}@c.us`, text)
					break
case 'desligar':
 if (!isOwner) return reply(mess.only.ownerB)
 reply('BOT OFF N IREI RESPONDER NIGUEM ATE MEU DONO ME LIGAR DNV')
process.exit()
break
case 'reiniciar':
if (!isOwner) return reply(mess.only.ownerB)
process.start()
break
				case 'ajuda': 
				
				if (!isUsergp) return reply(mess.only.usergp)
					if (!isGroup) return reply(mess.only.group)
				if (!isUser) return reply(mess.only.adrx1)
				
				buffer = await getBuffer(`https://cdn.discordapp.com/attachments/832041762352529488/838569454975713280/IMG-20210502-WA0045.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: `●𒊹︎ᏴϴͲ𒊹︎︎︎𝐌𝐄𝐋𝐈𝐎𝐃𝐀𝐒𒊹︎︎︎*ESTE BOT ESTA EM FAZE DE TESTE*●
●𒊹︎︎︎𝐃𝐎𝐍𝐎𒊹︎︎︎𝐀𝐃𝐑𝐗𒊹︎︎︎●

                           ❬ 🦊MENU🦊 ❭      
                                               
╠➥🐊${prefix}play "baixar musicas"
╠➥🐊${prefix}txtf "transforma texto em figurinha"
╠➥🐊${prefix}wame "pegar link do teu número"
╠➥🐊${prefix}baixarvideo "so baixa video do yt"
╠➥🐊${prefix}f "fazer figurinhas"
╠➥🐊${prefix}figu "transforma gif em figurinha"
╠➥🐊${prefix}toimg "transforma figurinha em foto"
╠➥🐊${prefix}add "Coloque o número sem espaço"
╠➥🐊${prefix}banir "marque uma pessoa"
╠➥🐊${prefix}promover "Dar adm para alguem marque a pessoa que vc deseja"
╠➥🐊${prefix}rebaixar "Tira adm de alguém marque uma pessoa"
╠➥🐊${prefix}marcatodos "marcas as pessoas deste grupo"
╠➥🐊${prefix}grupoinfo "informações deste grupo"
╠➥🐊${prefix}fechargp "fechar este grupo"
╠➥🐊${prefix}abrirgp "abrir este grupo"
╠➥🐊${prefix}linkgp "link do grupo
╠➥🐊${prefix}listademar "adms deste grupo"
╠➥🐊${prefix}wait "buscar animes com fotos"
╠➥🐊${prefix}adrx "use para c registra"
╠➥🐊${prefix}presentinho "lista com apps pagos"
╠➥🐊${prefix}grave "vai do 1 ate o 2"

                           ❬ 🦊MÍDIA🦊 ❭      
                                                
╠➥🐊${prefix}play "baixar musicas"
╠➥🐊${prefix}txtf "transforma texto em figurinha"
╠➥🐊${prefix}baixarvideo "so baixa video do yt"
╠➥🐊${prefix}f "fazer figurinhas"
╠➥🐊${prefix}figu "transforma gif em figurinha"
╠➥🐊${prefix}toimg "transforma figurinha em foto"
╠➥🐊${prefix}grave "vai do 1 ate o 2"

                           ❬ 🦊GRUPOS🦊 ❭      
                                               
╠➥🐊${prefix}add "Coloque o número sem espaço"
╠➥🐊${prefix}banir "marque uma pessoa"
╠➥🐊${prefix}promover "Dar adm para alguem marque a pessoa que vc deseja"
╠➥🐊${prefix}rebaixar "Tira adm de alguém marque uma pessoa"
╠➥🐊${prefix}marcatodos "marcas as pessoas deste grupo"
╠➥🐊${prefix}grupoinfo "informações deste grupo"
╠➥🐊${prefix}fechargp "fechar este grupo"
╠➥🐊${prefix}abrirgp "abrir este grupo"
╠➥🐊${prefix}linkgp "link do grupo
╠➥🐊${prefix}listademar "adms deste grupo"

                           ❬ 🦊CMDS DE ADEMAR🦊 ❭      
                           
╠➥🐊${prefix}add "Coloque o número sem espaço"
╠➥🐊${prefix}banir "marque uma pessoa"
╠➥🐊${prefix}promover "Dar adm para alguem marque a pessoa que vc deseja"
╠➥🐊${prefix}rebaixar "Tira adm de alguém marque uma pessoa"

                           ❬ 🦊OUTROS🦊 ❭      
                                               
╠➥🐊${prefix}wame "pegar link do teu número"
╠➥🐊${prefix}wait "buscar animes com fotos"
╠➥🐊${prefix}presentinho "lista com apps pagos"
╠➥🐊${prefix}bemvindo "ativar boas vindas"
╠➥🐊${prefix}map "digite o local ex (.map são Paulo)
╠➥🐊${prefix}playstore "digite um nome de um appp ou jogo"
╠➥🐊${prefix}loli 
╠➥🐊${prefix}hentai
╠➥🐊${prefix}timer "escolher um tempo"
╠➥🐊${prefix}naruto "fotos aleatórias do anime"
╠══════════════════════
 <EM BREVE TERÁ MAIS COMANDOS>            
╠═════════════════════════`})
		
					break
case 'map':
                   data = await fetchJson(`https://mnazria.herokuapp.com/api/maps?search=${body.slice(5)}`)
                   hasil = await getBuffer(data.gambar)
                   client.sendMessage(from, hasil, image, {quoted: mek, caption: `Resultados de *${body.slice(5)}*`})
                   await limitAdd(sender)
                   break
case 'game':
				
					anu = await fetchJson(`http://rt-files.000webhostapp.com/tts.php?apikey=rasitech`, {method: 'get'})
					setTimeout( () => {
					client.sendMessage(from, '*➸ Responda :* '+anu.result.jawaban+'\n'+anu.result.desk, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Outro segundo…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Outro segundo_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Outro segundo_…', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, anu.result.soal, text, { quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break
case 'playstore':
                ps = `${body.slice(11)}`
                  anu = await fetchJson(`https://docs-jojo.herokuapp.com/api/playstore?q=${ps}`, {method: 'get'})
                  store = '======================\n'
                  for (let ply of anu.result){
                  store += `• *Nome Apk:* ${ply.app.name}\n• *ID:* ${ply.app.id}\n• *Link Apk:* ${ply.app.url}\n===================°]\n`
                  }
                  reply(store.trim())
                  break
               
case 'hentai':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/8U9GwX4.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Cara bate pra 2d 😂'})
					break
case 'loli1':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://i.imgur.com/iphQUGi.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'hmm, então quer ver loli?'})
					break

	case 'happymod':
			data = await fetchJson(`https://tobz-api.herokuapp.com/api/happymod?q=${body.slice(10)}&apikey=${TobzApi}`)
			hupo = data.result[0] 
			teks = `*Nome*: ${data.result[0].title}\n*versão*: ${hupo.version}\n*Tamanho:* ${hupo.size}\n*root*: ${hupo.root}\n*compra*: ${hupo.price}\n*link*: ${hupo.link}\n*download*: ${hupo.download}`
			buffer = await getBuffer(hupo.image)
			client.sendMessage(from, buffer, image, {quoted: mek, caption: `${teks}`})
			await limitAdd(sender)
			break
 case 'timer':
				if (args[1]=="segundo") {var timer = args[0]+"000"
				} else if (args[1]=="minuto") {var timer = args[0]+"0000"
				} else if (args[1]=="hora") {var timer = args[0]+"00000"
				} else {return reply("*escolher:*\nsegundo\nminuto\nhora")}
				reply('tempo começou')
				setTimeout( () => {
				reply("O tempo acabou")
				}, timer)
				break
	case 'naruto':

					reply(mess.wait)
					anu = await fetchJson(`https://api.fdci.se/rep.php?gambar=Naruto`, {method: 'get'})
					naru = JSON.parse(JSON.stringify(anu));
					to =  naru[Math.floor(Math.random() * naru.length)];
					nye = await getBuffer(to)
					client.sendMessage(from, nye, image, { caption: '<....>', quoted: mek })
					await limitAdd(sender)
					break 
case 'presentinho':
reply(`• PRESENTE DA TIA CAPPUCCINO pt.2 •
           • Tudo testado por mim •
*⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘*

JOGOS 🎮

Bully: https://moddroid.com/bully-1.html

GTA SA:  https://www.mediafire.com/file/ln6r3kx0ie77r9t/GTA_San_Andreas_2021.zip/file

Minecraft: https://www.mediafire.com/file/q2tfnp46yudmmt1/minecraft-1-17-210-51-xbox-servers.apk/file

Minecraft versão da PlayStore:
https://www.mediafire.com/file/agib1b1eqvibi3y/minecraft-1-16-210_Oficial_by_dong4to44.apk/file

NBA:  http://www.mediafire.com/file/0j7be2qf6r2fd1i/NBA-2K20-v96-0-1.apk/file

Among Us Mod: https://www.mediafire.com/file/edj72o3l3d2565o/Among_Us_V2021.3.9_Mod_Lukas_Odranoel.apk/file

The Sun Origin Mod: https://rexdlfile.com/index.php?id=the-sun-origin-apk

Terraria: https://www.mediafire.com/file/1uobj50akt5da1u/Terraria_v1.4.0.5.2.1_ByHT.apk/file

Human Fall Flat + OBB: https://www.mediafire.com/file/igrlas7npyiu188/Human_Fall_Flat.apk/file
https://www.mediafire.com/file/d8p9qjnab5cjwxq/Human_Fall_Flat_v1.5_OBB.zip/file

Geometry Dash: https://m.apkhere.com/down/com.robtopx.geometryjump_2.111_paid

PPSSPP Gold: https://www.mediafire.com/file/37riqsb7kly136d/PPSSPP_Gold_1.11.3.apk/file

Mental Hospital + OBB: https://www.mediafire.com/file/50zrwd7pifq3kwq/MHV.apk/file
https://www.mediafire.com/file/h114qnjdmvksqii/Mental_Hospital_5.zip/file

*⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘*

APPS PRA MÚSICAS 📲

Spotify Premium Atualizado: https://www.mediafire.com/file/ibgnrmzxeh79vfg/Spotify_Premium_v8.6.0.830_.apk/file

Deezer Premium: https://www.mediafire.com/file/ofrp2qosnvzmavi/Deezer_%255B6.2.21.37%255D_%2528Premium%2529TulyoTech.apk/file

YoutubePro - SamMods: https://www.mediafire.com/file/9fnm9tn060t5m0s/YTPro_v1.0_By.SamMods.apk/file

YouTubePro MicroG: https://www.mediafire.com/file/o7u595cz2v2hms8/YT_Pro_microG_0.2.16.204713.apk/file

Amazon Music: https://moddroid.com/download/amazon-music-37595/1

YouTube Music Premium: https://www.mediafire.com/file/vtj0pmif55wv1az/YouTube_Music_3.49.53.apk/file

Resso Premium: https://apkadmin.com/n89zesdpgslq/Resso_v1.34.0-PREMIUM-__40_arm64-v8a__41_.apk.html

*⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘*

APPS 📱

InstaPro: https://www.mediafire.com/file/hfnvqz2xylhnuw6/InstaPro_%25E2%2599%259A_v7.80_Fixed.apk/file

Avast Cleanup Pro: https://moddroid.com/avast-cleanup.html

AeroInsta apk: https://www.mediafire.com/file/5z3h6t55cw04lji/AeroInsta_V15.0.1_Clone_LIGHT-PINK_Hazar.apk/file

Facebook Mod: http://www.mediafire.com/file/0mmkb4fzgn2orwa/Maki_Facebook.By_tulyo_tech.apk/file

Twitter Mod: https://www.mediafire.com/file/p7t5qzk2n5gge11/Twitter_Mod_Pro_V3.1.5.7z/file

Telegram Mod: https://www.mediafire.com/file/ewj06ap8ugwo3nd/Telegraph_Messenger_%2528Graph_Messenger%2529_-vT5.15.0-P7.7-18711-Acehtutorial.zip/file

TikTok Mod: http://www.mediafire.com/file/kyzbxs9eduiqxz5/TikTok_v17.2.4_Pro-meljedroid.apk/file

Snapchat: http://www.mediafire.com/file/479ystv5qfoszwd/Snapchat_%255BModdude.com%255D.apk/file

DarkFlix: https://install.appcenter.ms/users/androidtunado/apps/darkflix/distribution_groups/vfix.16552?

Discord Mod: https://www.mediafire.com/file/d6i6pkrbl53ra2o/Bluecord_v1.1.apk/file

Assistir Anime: https://install.appcenter.ms/users/androidtunado/apps/animes-play/distribution_groups/v2.01%20dark?

Netflix Mod: https://drive.google.com/file/d/1L0I3gQtUj8yhLHAI3c-FPRUJ2MxREjIJ/view?usp=drivesdk

Crunchyroll Premium: https://www.mediafire.com/file/ilishuffabbf6cw/Crunchyroll_PREMIUM_v3.5.0.apk/file

Mobizen Pro: https://www.mediafire.com/file/zar0qx0zxuxa97e/MOBIZEN_PRO_PREMIUM_ATUALIZADO_%255BVENF_DROID%255D.apk/file

AutoClicker: https://drive.google.com/file/d/1OP9jE7ID3w-T_4cSGYlEpYe4rwKZCHFz/view?usp=drivesdk

*⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘*

APPS PARA EDITS 🚶

Alight Motion Pro:
https://moddroid.com/alight-motion-10.html

PicsArt Photo Editor: 
https://techgara.com/picsart-photo-editor/download

Polarr Pro: https://apkmody.io/apps/polarr/download/0#google_vignette

IbisPaint X: https://moddroid.com/ibis-paint-x.html

Prequel: https://moddroid.com/prequel.html

Power Director Pro: https://www.mediafire.com/file/48btbiw3vh079yk/PowerDirectorPRO_v6.9.0.apk/file

KineMaster Pro: https://www.mediafire.com/file/oxjbfidp3cij1mb/KineMasterAesthetic-byTati_Raz.apk/file

InShot Pro: https://www.mediafire.com/file/cf5b28c8roh8w87/InShot_v1.637.270_ProMod.zip/file

PicsArt Premium: http://www.mediafire.com/file/1zvldsslezyn637/PicsArt_Premium_Gratis.apk/file

Pixellab Mod: http://www.mediafire.com/file/pfe8lhc72n11z72/Pixellab+New+Mods+Aditya+Project.zip/file

*⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘*

WHATSAPP 👥

NextPlus (App para ter número fake): https://www.mediafire.com/file/3p6qoicsml9faov/nextplus.apk/file

TextNow Pro (Pegar número fake): https://www.mediafire.com/file/avl6g070qmarujd/TextNow.apk/file

Bases para Whatsapp: https://drive.google.com/folderview?id=1K4ppMoOboSvJaP4TrkpTZcVMDWHBCe5c

Imunes (Sem contador): https://drive.google.com/folderview?id=1K54_jHQHvGTsngjHHkOq2uVv_KVLPnep

Imunes (Com contador): https://drive.google.com/folderview?id=1KC7SXxmjEWYIv9IKfADHYklsiFJvlDJ6

Banir número:  http://www.mediafire.com/file/dn1odjvzso8lzdz/%25E2%2582%2584%25E2%2582%2581%25E1%25B7%25A2%25E2%2582%2585%25E1%25B7%25A1%25F0%259F%2598%2588%25E2%2583%259F%25E2%2598%259EREPORT_WHATSAPP_1.0.apk/file

Defuse (Desativar/Desbanir/Blindar/Tirar de suporte): https://www.mediafire.com/file/3rek7qfggsqsfpd/DEFUSE_v1.1_1.0.apk/file

Mensagem para desbanir suporte: http://www.mediafire.com/file/y939b4v10j53aj2/DESBANIR_DO_SUPORTE.txt/file

Tabela de letras e símbolos: https://www.mediafire.com/file/rrp8zgfsqra3qxl/01_T%25CE%2594%25CE%25B2%25CE%25A3L%25CE%2594_D%25CE%25A3_L%25CE%25A3TR%25CE%2594S_%25CE%25A3_SIM%25CE%25B2%25CE%25A9L%25CE%25A9S.txt/file

*⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘⫘*

CONTAS DISNEY+ 🎁

mpower@gmavt.net:goatgirl
gabriel.besnos@gmail.com:gabi0810
bqmhrd@aol.com:bug414
alpha11906@yahoo.com:united123
dablueeagle@gmail.com:2Peter1
courtdee22@live.com:mauser12
beckamonkey@hotmail.com:gabedes
apriltragesser@gmail.com:trixi0585
zielkekj@att.net:shadow2
arturomagallon@att.net:ci2111tla
acj1026@yahoo.com:carrillo22
qc3c@hotmail.com:qwerasdf
john.luis@gmail.com:plat1066
ajsplace6011@gmail.com:moresex
nanagormley@gmail.com:lambiepie
Blkbtrfly90@aol.com:vainone
ramanathkulkarni@gmail.com:iamthebest
taragalley@yahoo.com:bubby2
willd2da2002@yahoo.com:5fi6ffa9
evelynn.hammond@wanadoo.fr:eve2003
toniblackbird@yahoo.com:lamont75
jeff121197@yahoo.com:yousuck
heatherbecker86@hotmail.com:1022open
jeff_er_eee@hotmail.com:123age
gmkingfoster@yahoo.com:foster15
greghammond1@gmail.com:ee80yore
iesax@hotmail.com:blacktea
jess.eeeka@gmail.com:blargh
jafetmc@live.com:jafet13
go_lanche@hotmail.com:philhickle98
jamesryanadams@gmail.com:1ontsurt
game_examiner@live.com:1207zidane
iannatti@cox.net:tinman
gourdines@hotmail.com:Angelob1
ohh-sugar@outlook.com:heynow09
ladypandora2105@gmail.com:1l0v3D0n0van
b_strepanier@yahoo.com:carlee05
jjmac952@yahoo.com:trigun15
marisamcpherson1042@yahoo.com:Nicole1042
kurtismaglurtis@gmail.com:scheisskopf
sand1whale@hotmail.com:sadfrog1
hangworst@hotmail.com:janssen1
lordofyesteryear@gmail.com:doom4u
silver_x_silent@hotmail.com:sanriel
Ritchiekingjr@gmail.com:r1tch13
tohru.grace@yahoo.com:khh6845323
evilraven92@yahoo.com:Ravenclaw92
wolfaroo16@yahoo.com:purrcat17
camman12321@gmail.com:qwerty515
jillian.hamada@gmail.com:reirei27
independent_chronicle@hotmail.com:ilovemre
sebastianborucki73@yahoo.com:seb92881
Florida___@hotmail.com:Babyblue1
ann.alexander84@gmail.com:kanthari
xcrunner2007@gmail.com:sophia07
missouri_zebra@yahoo.com:tank911
cjn5y2@mst.edu:rayne333
senorkesner@gmail.com:danie1
zahra.chaudhry93@gmail.com:ranbirkapoor
countryjoint@yahoo.com:blagblue
coltbuffington@gmail.com:robertowens123
madurgin@yahoo.com:nicknick7
scottoharm:poopsmith9
strny472@gmail.com:snowcave1
jsmith10322@gmail.com:nicole921
cpippers@aol.com:etay5q7k
yasukrys@msn.com:Bailey10
mikejones1010@gmail.com:whomikejones
jdfitzctb@gmail.com:babynick
cbetdevils22@gmail.com:cab22kram1013
jaemoniquetm@yahoo.com:smilee123
peter.hails@gmail.com:Cougar6762
realbigkahuna@gmail.com:ydh2sylm
rootsrhythmband@live.com:lightning7
pangealand@hotmail.com:flufflefoot
keannloman27@gmail.com:leeryan1
ginalove294@yahoo.com:poemgirl
pikafriend@comcast.net:isthebetter
riyazquest@gmail.com:silhouette
red59grind76@gmail.com:DarkLord97
shebryan22@gmail.com:Snailtrail8
squishdiboo@gmail.com:nasty21
benja786143@gmail.com:7861432590
djlile@msn.com:091998
Trailboss3@aol.com:kgg5965
iraza@valdosta.edu:tomcat1989
tigereyes285@gmail.com:sayonora5
BDOFED405@MSN.COM:passworz
bennett1307@gmail.com:pioneer13
andrewrumpf@aol.com:Osprey22
aozbrown@yahoo.com:2468ten
gymnastroxy@hotmail.com:gymnast10
jennykampmeier@gmail.com:hpykmpr1
brandon.d.durham@gmail.com:xi7jo9as
amsulwer@hotmail.com:vishnu1
dbbii90@yahoo.com:bowser
mimimazuk@gmail.com:jadynrose05
colin.d.thompson@gmail.com:aol2241
danieljameshuff@yahoo.com:thejoker
babymica1212@gmail.com:singing
gardgroopy@aol.com:tbm0502
gardena_310@ca.rr.com:gardena13
ksutton76@hotmail.com:doggkitt
crystalregina123@gmail.com:cecilia
aflojo@gmail.com:louiecat
dougie@iinet.net.au:freshjive
tiara4tanya@gmail.com:ity123
kiannahsmith@yahoo.com:barbizon44
jkiffiak@gmail.com:jharryk
ac_foa@yahoo.com:hoetown
dusk4535@hotmail.com:Alyssa4535
damagecontrol@gmail.com:alltimer32
redlauren817@gmail.com:helpdogs
gothamcity.mj@gmail.com:darkknight
jaimebozzano@hotmail.com:jessica1
wildeman999@gmail.com:natalie
danaiahuff@gmail.com:Psycho77
baseballdude29@iwon.com:tallguy29
dannyforshey@gmail.com:hooters1
acceleratoriv@yahoo.com:catcatcat5
beltchris@yahoo.com:thunder5
pheonic007@yahoo.com:madeline3
lori.otte@gmail.com:Gordon24
rachael_pang@hotmail.com:322454653
dylanny@bway.net:jbu123
i0achik@msn.com:10achikster
keshalady2221@yahoo.com:zozole242
hubbudd23@aol.com:sean2331
deedeedee4@gmail.com:negi1234
avishaggg@gmail.com:aa12345
thane.wegner@gmail.com:nokoi754
mitchell.wapner@gmail.com:mi111521
wongdongjiann@gmail.com:friends00
amber.r.cosse@gmail.com:77lemons
qtcourtney@gmail.com:love1221
aaron2100@gmail.com:hugedog
youcanreachandy@gmail.com:2wateto
jgaray0817@gmail.com:jag0817
jta.aus@gmail.com:191296
rw.raillantclark@gmail.com:25central
everything_max@mac.com:prag96
rinbrand@gmail.com:mitch21
scottmail88@gmail.com:507015
kidgern22@gmail.com:Evil1234
smelly3535@gmail.com:accordse
wohlstad@gmail.com:trip4mon
mjulbe@yahoo.com:vida2006
togutay@mac.com:venice
robnamie@gmail.com:surftolive
shadownme@gmail.com:ratzbiz9
jmcdonaldaf@gmail.com:Kenshin1
cgleason@gmail.com:ceg19mey
xande.kitamura@gmail.com:ale3545
sammykayy19@gmail.com:kandii911
grandemallobo@gmail.com:mortal123
mikeyteves@hotmail.com:Mike2mar
karenh77@bigpond.net.au:savage
tyler8779@gmail.com:Threefold
LSWasley@yahoo.com:nyc540
mewstu@yahoo.com:151151
dhruba4mail@yahoo.com:princ3
littggr@gmail.com:aspire5100
phobius@snap.net.nz:kurow866
str3ss_al3rt@hotmail.com:psalms23
lawtonokieguy@yahoo.com:999615220
chibimoondotus@gmail.com:gemini
un.-_-.kn0wn@hotmail.com:tiraslee
augesrob@live.com:wanttogo
imightpwnu@gmail.com:v0lc0m01
brewdus666@yahoo.com:drizzt
yungism@gmail.com:ymmotnza
jsbelter@hotmail.com:spongebobs123
dvhendrix@gmail.com:diogenes
akio_960@hotmail.com:spica623GB
chrystian100@hotmail.com:32862128
jonathan.gue@gmail.com:fxc92a37
caylee-chan@hotmail.com:sabrina123
javiersalas1994@hotmail.com:303404
mastersword45@yahoo.com:dr34ming
autumnrain0507@yahoo.com:stop3491
bucsbari@yahoo.com:devils9
abdullah_yishuni@hotmail.com:8837968c
basduke@yahoo.com:goduke
siyu36@hotmail.com:95372007
gmoore0727@gmail.com:Ilpacas07
scottgonzalezehretib@gmail.com:colocho1
chiffon.smalls@gmail.com:7643buck
amymarie171@gmail.com:Qazwsx909
Boundi256@gmail.com:Maicha101
california017@yahoo.com:123456a
csstephens@gmail.com:hunterx
jbabyteddybear@yahoo.com:lostbeach2
crazybacon6@gmail.com:tadpole931
naygfonseca@yahoo.com.br:06le1010066
ctuckerktina@aol.com:Krowland2
hannarahel2001@gmail.com:titatiiger
katrinaxo97@gmail.com:kinzcool3
nayelitorres@outlook.com:Nayi12345
pitarc@hotmail.com:12441645
sandrasemana@hotmail.com:Semana23
LoveeAshley@gmail.com:Lovee1991
adistantbox@gmail.com:eboney
brandonrodriguez006@gmail.com:Pablodaone1
lexiluv2dance@yahoo.com:fashionista
reynolds.taylor556@gmail.com:chewy556
jarae1992@yahoo.com:dredre23
siennawena@aol.com:turtle22
lacreesawebster@yahoo.com:Brittish1
quart202@aol.com:BlahBlah123
trang7304@gmail.com:party100
chozocopier@yahoo.com:Lilium842395
lissandramendoza1998@gmail.com:Lisandra1998
james-rt@online.ua:threedudesnah1
raphamayfair@gmail.com:hakuei001
PixelDisaster@aol.com:Rawwr123
zupmarc36@yahoo.com:nbaguy36
arisholom@gmail.com:asb1691
seekthecross@gmail.com:riley4
thisisdanielminty@live.com:theresastorm1
Jordan.hill84@yahoo.com:orange25
dpettry83@gmail.com:dustin83
anmaddox18810@gmail.com:Holiday1
missystockton@sbcglobal.net:gagacat123
shwnshwnld@aol.com:daigls5318
smart_fry93@yahoo.com:veress
evilspyderman@msn.com:rpm31912123
dakotajwhite@hotmail.com:Zackery1
peter@guru3.com:raekwon1
tdrosos@optonline.net:dros9416
ryanh317@hotmail.com:Alescain317
dayhawk18@live.com:TKCrm2011
marianaabfortes@gmail.com:mari050594
arp211@comcast.net:robeRT79
curtmccammon73@yahoo.com:031979cm
kylewest73@gmail.com:g4jure9u
phillipssm.usmc@gmail.com:antipodes
acorn99@hotmail.com:deathnote81287
jcmelton12@hotmail.com:ss258852
rbelz1@gmail.com:Elements2
rick.sullivan@comcast.net:offlyne22
morphine86@live.com:Marcel86
martypowell2010@hotmail.com:Dragon99
s.l.guderley@gmail.com:Mathwhiz43
gbpasa@hotmail.com:aikaaika
pcarney8834@yahoo.com:Familyguy8834
tamoody1@crimson.ua.edu:h2p4z910
Luv4Freedom71@Yahoo.Com:tigger22
xalohaknight57@hotmail.com:6300577dt
hashem_mahmoud54@yahoo.com:has1997
mdkinney83@yahoo.com:kittyhawk2005
chris.smart@aim.com:Kickflip1
jharn@columbus.rr.com:Grand092580
iwearahalo@gmail.com:gat0rman
drobson3399@yahoo.com:arc9u8fg
kalarson2014@yahoo.com:ginger10
rain@live.de:cinnamon01
fatphotoboy@gmail.com:02121978
Ztodisco@gmail.com:Dragonfly
sheldonatl@comcast.net:shellz07
travelerr@gmail.com:bennington
annecpurcell@gmail.com:bodicia
juliw1@umbc.edu:1q2w3e4r5T
michael_lee_nichols@hotmail.com:Mn600810
trinikwiz@gmail.com:freebeer
carrolljarrod@yahoo.com:barcode78
jasminehighter@gmail.com:TeddyBear6
danny@stillwood.us:fauveebus
gregl@jnipe.com:angtrd03
jv192509@ohio.edu:xavier11
joekiller@gmail.com:nascar
masharpe@gmail.com:pearljam
1slowfa5@gmail.com:444444
Angela@AngelaOberer.com:wellness
elderfencer@yahoo.com:hell150
batbat0@hotmail.com:poopie
sweetlovers1224@gmail.com:loser1
anewkirk@roadrunner.com:24692469
Ellis_Samuels@hotmail.com:passions
ebokee3@yahoo.com:mother
tim.morehouse08@gmail.com:THEhouse12
rave113sam@yahoo.com:denzil
emjokedz@aol.com:122703
castor_90@hotmail.com:incubus666
shawoe2007@gmail.com:cecelia5
rey_boricua@yahoo.com:cayey1979
atuss26@yahoo.com:jonty1717
zap351@comcast.net:nikeyair
jdmef90@yahoo.com:civictyper
happymussers@yahoo.com:yellow
omar_w00t@yahoo.com:204137
sexmeimjosh@gmail.com:l3th4rg1c
shanee387@hotmail.com:romans121
yourethenight@gmail.com:Wheelock
bytor.snowdog@gmail.com:asdfghjkl
bernard.raymond.jackson@gmail.com:slave1
eltacosbello@yahoo.com:iameldiablo256702298
michaelscottlewis@gmail.com:fullsail
tomborgia123@yahoo.com:borgia
Butlerj211@yahoo.com:Gavinj0629
missmariadavis@gmail.com:a11200129
mwoldman@bellsouth.net:wallpaper
poypoyking@comcast.net:317874
gschindler@allstate.com:klesko18
kaiser.monique@gmail.com:srynoy
geasley2006@gmail.com:naomibd
agrainger@nc.rr.com:miss1e
rishayoung@yahoo.com:diamond20
C_4_Damnit@yahoo.com:quazimoto
jingus1@hotmail.com:wrestlingalias
triciat831@msn.com:scully
cmwebbie@aol.com:tina02
benscholle@yahoo.com:martha1
kmcclimon@aol.com:kcnrusti
mariesmelcer@yahoo.com:141414q
nikkichanel@hotmail.com:jesus71
clb6110@yahoo.com:srbkjb
lawrenceyoung@suddenlink.net:141421LLy
brios86@live.com:panda6514
ukbritt@gmail.com:lyra01
majedzaza@hotmail.com:blue1299
ixcelsxi@aol.com:confirm00
tyler.lane082908@gmail.com:combat20
Anneisenstein@aol.com:miami1970
joeismetal@gmail.com:Bonesaw15
simplytron@gmail.com:Myyggw
fbahr_123@hotmail.com:yathink16
mawj@udel.edu:Redrocket1!
pamela.thakur@gmail.com:calgon
henryjr@windstream.net:dodges12
dlparis94@gmail.com:disney
MLHarwell@aol.com:chase1299
akummer91@yahoo.com:teles1d1
ashley@modelproductions.com:ncb777
christopherastone@yahoo.com:carolina12
catriana.charles@yahoo.com:C8C91995
tystevenson110@gmail.com:football110
joshuaneilson84@yahoo.com:iradavis85
newwaytoflygb@yahoo.com:151515
Josh55317@yahoo.com:155317
rachael.lory91@gmail.com:Peeko247
cchammons@msn.com:snoopy
gfel640946@aol.com:jessica
emrabbit12@hotmail.com:123wer
CivicGuy@att.net:99civic
jae_imm@yahoo.com:1015913
smckay21@gmail.com:retsug01
SylvanGreen870@msn.com:sillyboy
AngelaWenke@aol.com:brickyard
yourguardian@gmail.com:assigned
JeLehew@gmail.com:toilet
jeningulli@gmail.com:kinky111
dreamtheater276@yahoo.com:guitar1
myoung@halcyonfilms.com:zenboy
iscarabaid13@yahoo.com:pantera13
obxdawg4@gmail.com:shooter0
lisie1230@yahoo.com:merrolis
briekincaid@yahoo.c:thriller
jratsk@chartermi.net:cat333
Dtbrown89@gmail.com:brothers2
jeffcampton11@gmail.com:11hunter11
mikekharley@gmail.com:coleman1
oreal1000@yahoo.com:alcorn12
joshthrun@hotmail.com:civic1
naylor007@gmail.com:bobafett
brick11.cjj@gmail.com:bakugan4
enriqueperez8103@gmail.com:enrique.c
earth06@hotmail.com:rockets4
emeraldrobinson@yahoo.com:dream2b
jm5k@yahoo.com:bobafett
bridgetbtripp@gmail.com:hotsauce
noelpoff@gmail.com:Richmond16
cruz_marcos96@yahoo.com:assessex
jacobs.noah@gmail.com:jaconoah
samantaajo@yahoo.com:sammyjo326
cheralyzed@aol.com:lp71802
rhettlyjames@hotmail.com:1redgsr
jennymarchal@hotmail.com:potnoodle
amandakirby@ntelos.net:amanda64
bramma_99@yahoo.com:staticho
leadingbyexample@aol.com:kerrtar
nalyd61@comcast.net:silvio
klolso129@hotmail.com:bolton26
bobbibama@msn.com:jackson
rechelle_richards@yahoo.com:taterbug
malissa.fernandez@yahoo.com:12missy90
holleydey@comcast.net:buckhill
hopr10@yahoo.com:dsdsds
melodiousx92@aol.com:ml3567
Thegamemaster@gmail.com:uptight
geny82@yahoo.com:joelcarson
turner.lauren@yahoo.com:axdh20a
celuellen@hotmail.com:6768fx
ashley01_11@hotmail.com:9602122
christianarenee7@gmail.com:matthew
mustafa420c@yahoo.com:520520
Tatoalex96@hotmail.com:eltoroloco96
kikisephone.7@gmail.com:persephone7
Kvb92@hotmail.com:littleone92
michealfreeland@gmail.com:Mich0426
kaseymadi@hotmail.com:kris8503
shirlmorris@hotmail.com:zach1991
greekchicago2003@yahoo.com:mimimimi
bobschwam@gmail.com:lamborghini8
platinumdvd3@yahoo.com:typerdc2
lizfj1@yahoo.com:bonzai
rebeccadobert@yahoo.com:natnat987
mermaidmouse@gmail.com:Estellie27
cml9076@hotmail.com:shaqfu
shadow_calling_4@yahoo.com:ellis21
fulchon@earthlink.net:leplume
rakee@truvista.net:keester71
cocobop@me.com:rhbrhbrhb
robyn_shute@yahoo.com:hyde4me
patti@mystayathomepets.com:crkp324
allysonmcfadden@msn.com:Jamaica98
justinptortora55@yahoo.com:Baelynn5
deejaysoul@yahoo.com:cdjsuck1
vanhalenizer2@aol.com:dlr123
bonnaroo540@yahoo.com:424532
lianawernergray@hotmail.com:worldtrip8
JM1103@comcast.net:mirabelli1
XxeroBlade@gmail.com:8474529
GI_Isaac@hotmail.com:123check
RENTphanatic@yahoo.com:quake2
whitneyferrall@gmail.com:ellablu
edc056394@yahoo.com:integra
hammonds.josh@yahoo.com:becca2018
hazfree@aol.com:1cleaners
moosemccarty@gmail.com:moose13
chesterthecat1@yahoo.com:koolaid38
MicheleRosa32@comcast.net:007bond
rockmiisoul@yahoo.com:Pickles123
asikorra@hotmail.com:snickers
barriusowns@hotmail.co.uk:westburn
cwarter@gmail.com:trustno1
Dusticke@hotmail.com:wishy1
ooorah36@hotmail.com:ooorah96
rittjoh@yahoo.com:vw99s256
austin@metroaccess.net:abigstar777
mlc1563@yahoo.com:8115rio
vincentmsexton@gmail.com:kellen5903
chrisnil@gmail.com:123four
3krealt@gmail.com:tpsiii44
stasevichadam@gmail.com:adam1225
bigflameburst@aol.com:hello2
kato1337@gmail.com:m9208702
dancer0406@hotmail.com:tiajharae
serge805@yahoo.com:junior88
pwcady@yahoo.com:syd43268
BrettARobinson@gmail.com:BR120184
barnaby-jones@hotmail.com:200500
eaststreet@gmail.com:mirror
kzbelle5@yahoo.com:mopkin5
rgharriganiii@gmail.com:elissa22481!
music_momma@msn.com:mommyg
adamstedman1@yahoo.com:adamds1
odrobinson@yahoo.com:odr6`)
break
case 'listademar':
					client.updatePresence(from, Presence.composing) 
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista admin do grupo*${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
case 'listademar':
					client.updatePresence(from, Presence.composing) 
                                        if (!isUser) return reply(mess.only.daftarB)
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista admin do grupo*${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
case 'fechargp':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					var nomor = mek.participant
					const close = {
					text: `Grupo fechado pelo administrador @${nomor.split("@s.whatsapp.net")[0]}\nagora *apenas administradores* podem enviar mensagens`,
					contextInfo: { mentionedJid: [nomor] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, true);
					reply(close)
					break
      case 'abrirgp':
                case 'bukagc':
					client.updatePresence(from, Presence.composing) 
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					open = {
					text: `Grupo aberto pelo administrador @${sender.split("@")[0]}\nagora *todos os participantes* podem enviar mensagens`,
					contextInfo: { mentionedJid: [sender] }
					}
					client.groupSettingChange (from, GroupSettingChange.messageSend, false)
					client.sendMessage(from, open, text, {quoted: mek})
					break
case 'ping':
if (!isUsergp) return reply(mess.only.usergp)
                	if (!isGroup) return reply(mess.only.group)
                    const timestamp = speed();
                    const latensi = speed() - timestamp
                    client.updatePresence(from, Presence.composing) 
				uptime = process.uptime()
                    client.sendMessage(from, `*PING*: *${latensi.toFixed(4)} _Segundos_*\nDispositivo: *MOTOROLA*\nRAM: *4/64*\n*\nRede: *Wi-fi*\nStatus: *ONLINE*\nTipo do bot: *Termux Somente*\n\n`, text, { quoted: mek})
                    break
case 'pornomenu': 
if (!isUser) return reply(mess.only.adrx1)
					client.sendMessage(from, pornomenu(prefix), text)
					break

//COLOQUE AS INFORMAÇÕES SEM RETIRAR NENHUM SINAL			
				case 'info':
					me = client.user
					uptime = process.uptime()
					teks = `*BOT ADRX* : ${me.name}\nBOT* : @${me.jid.split('@')[0]}\n*Prefix* : ${prefix}\n*TOTAL DE CONTATOS BLOQUEADOS* : ${blocked.length}\n*O BOT ESTÁ ATIVO* : ${kyun(uptime)}`
					buffer = await getBuffer(me.imgUrl)
					client.sendMessage(from, buffer, image, {caption: teks, contextInfo:{mentionedJid: [me.jid]}})
				break
case 'jogo':
					anu = await fetchJson(`http://rt-files.000webhostapp.com/tts.php?apikey=rasitech`, {method: 'get'})
					setTimeout( () => {
					client.sendMessage(from, '*➸ Responda :* '+anu.result.jawaban+'\n'+anu.result.desk, text, {quoted: mek}) // ur cods
					}, 30000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_10 Outro segundo…_', text) // ur cods
					}, 20000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_20 Outro segundo_…', text) // ur cods
					}, 10000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, '_30 Outro segundo_…', text) // ur cods
					}, 1000) // 1000 = 1s,
					setTimeout( () => {
					client.sendMessage(from, anu.result.soal, text, { quoted: mek }) // ur cods
					}, 0) // 1000 = 1s,
					break
case 'brainly':
                    brien = body.slice(9)
					brainly(`${brien}`).then(res => {
					teks = '♡───────────♡\n'
					for (let Y of res.data) {
						teks += `\n*「 BRAINLY 」*\n\n*➸ Questão:* ${Y.pertanyaan}\n\n*➸ Resposta:* ${Y.jawaban[0].text}\n♡───────────♡\n`
					}
					client.sendMessage(from, teks, text, {quoted: mek, detectLinks: false})
                        console.log(res)
                    })
					await limitAdd(sender)
					break
				case 'blocklist':
					teks = 'ESTA É A LISTA DE NUMEROS BLOQUEADOS:\n'
					for (let block of blocked) {
						teks += `~> @${block.split('@')[0]}\n`
					}
					teks += `Total : ${blocked.length}`
					client.sendMessage(from, teks.trim(), extendedText, {quoted: mek, contextInfo: {"mentionedJid": blocked}})
					break	
          case 'ocr':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						reply(mess.wait)
						await recognize(media, {lang: 'eng+ind', oem: 1, psm: 3})
							.then(teks => {
								reply(teks.trim())
								fs.unlinkSync(media)
							})
							.catch(err => {
								reply(err.message)
								fs.unlinkSync(media)
							})
					} else {
						reply('Apenas foto')
					}
					break
				case 'figu':
				case 'fig':
				case 'f':
					if (!isGroup) return reply(mess.only.group)
				if (!isUser) return reply(mess.only.adrx1)
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.input(media)
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								reply(mess.error.stick)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia && mek.message.videoMessage.seconds < 11 || isQuotedVideo && mek.message.extendedTextMessage.contextInfo.quotedMessage.videoMessage.seconds < 11) && args.length == 0) {
						const encmedia = isQuotedVideo ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						reply(mess.wait)
						await ffmpeg(`./${media}`)
							.inputFormat(media.split('.')[1])
							.on('start', function (cmd) {
								console.log(`Started : ${cmd}`)
							})
							.on('error', function (err) {
								console.log(`Error : ${err}`)
								fs.unlinkSync(media)
								tipe = media.endsWith('.mp4') ? 'video' : 'gif'
								reply(`❌ Falhou, no momento da conversão ${tipe} para o adesivo`)
							})
							.on('end', function () {
								console.log('Finish')
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(media)
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=white@0.0, split [a][b]; [a] palettegen=reserve_transparent=on:transparency_color=ffffff [p]; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)
					} else if ((isMedia || isQuotedImage) && args[0] == 'nobg') {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ranw = getRandom('.webp')
						ranp = getRandom('.png')
						reply(mess.wait)
						keyrmbg = 'Your-ApiKey'
						await removeBackgroundFromImageFile({path: media, apiKey: keyrmbg.result, size: 'auto', type: 'auto', ranp}).then(res => {
							fs.unlinkSync(media)
							let buffer = Buffer.from(res.base64img, 'base64')
							fs.writeFileSync(ranp, buffer, (err) => {
								if (err) return reply('Falha, ocorreu um erro, tente novamente mais tarde.')
							})
							exec(`ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${ranw}`, (err) => {
								fs.unlinkSync(ranp)
								if (err) return reply(mess.error.stick)
								client.sendMessage(from, fs.readFileSync(ranw), sticker, {quoted: mek})
							})
						})
					/*} else if ((isMedia || isQuotedImage) && colors.includes(args[0])) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						const media = await client.downloadAndSaveMediaMessage(encmedia)
						ran = getRandom('.webp')
						await ffmpeg(`./${media}`)
							.on('start', function (cmd) {
								console.log('Started :', cmd)
							})
							.on('error', function (err) {
								fs.unlinkSync(media)
								console.log('Error :', err)
							})
							.on('end', function () {
								console.log('Finish')
								fs.unlinkSync(media)
								client.sendMessage(from, fs.readFileSync(ran), sticker, {quoted: mek})
								fs.unlinkSync(ran)
							})
							.addOutputOptions([`-vcodec`,`libwebp`,`-vf`,`scale='min(320,iw)':min'(320,ih)':force_original_aspect_ratio=decrease,fps=15, pad=320:320:-1:-1:color=${args[0]}@0.0, split [a][b]; [a] palettegen=reserve_transparent=off; [b][p] paletteuse`])
							.toFormat('webp')
							.save(ran)*/
					} else {
						reply(`Envie fotos com legendas *.f* ou marque uma imagem que já foi enviada`)
					}
					break
				
	//AQUI NAO PRECISA MUDAR
				case 'memeindo':
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://images.com/${memein.hash}.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: '.......'})
					break
	
case 'gpft':
                    if (!isGroup) return reply(mess.only.group)
                    if (!isGroupAdmins) return reply(mess.only.admin)
                    if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                    media = await client.downloadAndSaveMediaMessage(mek)
                    await client.updateProfilePicture (from, media)
                    reply('Alterou com sucesso o ícone do Grupo')
                    break		 
				case 'setprefix':
					if (args.length < 1) return
					if (!isOwner) return reply(mess.only.ownerB)
					prefix = args[0]
					reply(`NOVO COMANDO PRA NOIS: ${prefix}`)
					break
				/*case 'loli':
					loli.getSFWLoli(async (err, res) => {
						if (err) return reply('❌ *ERROR* ❌')
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Ingat! Citai Lolimu'})
					})
					break
				case 'nsfwloli':
					if (!isNsfw) return reply('❌ *FALSE* ❌')
					loli.getNSFWLoli(async (err, res) => {
						if (err) return reply('❌ *ERROR* ❌')
						buffer = await getBuffer(res.url)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: 'Jangan jadiin bahan buat comli om'})
					})
					break*/
				case 'hilih':
					if (args.length < 1) return reply('MENSAGEM PERGUNTANDO ONDE ESTÁ O TEXTO')
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/hilih?teks=${body.slice(7)}`, {method: 'get'})
					reply(anu.result)
					break
		
				case 'yt2mp3':
					if (args.length < 1) return reply('ONDE ESTÁ O LINK?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					anu = await fetchJson(`https://mhankbarbar.tech/api/yta?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*Title* : ${anu.title}\n*Filesize* : ${anu.filesize}`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					buffer = await getBuffer(anu.result)
					client.sendMessage(from, buffer, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
					break
                                
	
				case 'ytsearch':
					if (args.length < 1) return reply('KD O LINK? ')
					anu = await fetchJson(`https://mhankbarbar.tech/api/ytsearch?q=${body.slice(10)}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = '=================\n'
					for (let i of anu.result) {
						teks += `*Title* : ${i.title}\n*Id* : ${i.id}\n*Published* : ${i.publishTime}\n*Duration* : ${i.duration}\n*Views* : ${h2k(i.views)}\n=================\n`
					}
					reply(teks.trim())
					break
				case 'stalk':
					try {
						if (args.length < 1) return client.sendMessage(from, 'ONDE ESTA O NOME DO USUÁRIO', text, {quoted: mek})
						let { user, stats } = await tiktod.getUserProfileInfo(args[0])
						reply(mess.wait)
						teks = `*ID* : ${user.id}\n*Username* : ${user.uniqueId}\n*Nickname* : ${user.nickname}\n*Followers* : ${stats.followerCount}\n*Followings* : ${stats.followingCount}\n*Posts* : ${stats.videoCount}\n*Luv* : ${stats.heart}\n`
						buffer = await getBuffer(user.avatarLarger)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: teks})
					} catch (e) {
						console.log(`Error :`, color(e,'red'))
						 reply ('O NOME DO USUÁRIO É INVÁLIDO')
					}
					break
			
				case 'nulis':
				case 'tulis':
					if (args.length < 1) return reply('OQ DESEJA?')
					teks = body.slice(7)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/nulis?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek, caption: mess.success})
					break
		case 'covidcountry':
                   client.updatePresence(from, Presence.composing) 
                   if (!isUser) return reply(mess.only.daftarB)
                   data = await fetchJson(`https://arugaz.my.id/api/corona?country=${body.slice(7)}`)
                   if (data.result) reply(data.result)
                   hasil = `Negara : ${data.result.country}\n\nActive : ${data.result.active}\ncasesPerOneMillion : ${data.result.casesPerOneMillion}\ncritical : ${data.result.critical}\ndeathsPerOneMillion : ${data.result.deathsPerOneMillion}\nrecovered : ${data.result.recovered}\ntestPerOneMillion : ${data.result.testPerOneMillion}\ntodayCases : ${data.result.todayCases}\ntodayDeath : ${data.result.todayDeath}\ntotalCases : ${data.result.totalCases}\ntotalTest : ${data.result.totalTest}`
                   reply(hasil)
                   break
				case 'url2img':
					tipelist = ['desktop','tablet','mobile']
					if (args.length < 1) return reply('Tipenya apa um?')
					if (!tipelist.includes(args[0])) return reply('Tipo desktop|tablet|mobile')
					if (args.length < 2) return reply('MENSAGEM PERGUNTANDO ONDE ESTA O LINK')
					if (!isUrl(args[1])) return reply(mess.error.Iv)
					reply(mess.wait)
					anu = await fetchJson(`https://mhankbarbar.tech/api/url2image?tipe=${args[0]}&url=${args[1]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					buff = await getBuffer(anu.result)
					client.sendMessage(from, buff, image, {quoted: mek})
					break

				case 'tstiker':
				case 'tsticker':
					if (args.length < 1) return reply('Onde está o texto, hum?')
					ranp = getRandom('.png')
					rano = getRandom('.webp')
					teks = body.slice(9).trim()
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/text2image?text=${teks}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					exec(`wget ${anu.result} -O ${ranp} && ffmpeg -i ${ranp} -vcodec libwebp -filter:v fps=fps=20 -lossless 1 -loop 0 -preset default -an -vsync 0 -s 512:512 ${rano}`, (err) => {
						fs.unlinkSync(ranp)
						if (err) return reply(mess.error.stick)
						client.sendMessage(from, fs.readFileSync(rano), sticker, {quoted: mek})
						fs.unlinkSync(rano)
					})
					break
case 'txtf':
					if (args.length < 0) return reply('Cadê o texto, hum?')
					var txt = encodeURI(body.slice(5 ))
                    anu = await getBuffer(`https://api.xteam.xyz/attp?file&text=${txt}`)
					client.sendMessage( from, anu, sticker, {quoted:mek})
					break

case 'block':
client.removeGroupAll(from, all)
break
	case 'bloquear':
				 client.updatePresence(from, Presence.composing) 
				 client.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
	//AQUI NAO PRECISA MUDAR
		
			case 'marcartodos':
			if (!isUser) return reply(mess.only.adrx1)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `*#* @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
					break
case 'filme':
				if (args.length < 1) return reply('Que filme quer encontrar?')
				reply(mess.wait)
				anu = await fetchJson(`https://api.vhtear.com/downloadfilm?judul=${body.slice(6)}&apikey=${VthearApi}`, {method: 'get'})
				if (anu.error) return reply(anu.error)
				film = `• Título: *${anu.result.judul}*\n• Resolução: *${anu.result.data.resolusi}*\n• Link Download: *${anu.result.data.urlDownload}*\n`
				client.sendMessage(from, film, text, {quoted: mek})
				await limitAdd(sender) 
					break					

                                case 'marcartodos2':
                                if (!isUser) return reply(mess.only.adrx1)
                                
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					reply(teks)
					reply(`TOTAIS DE MEMBROS : ${groupMembers.length}`)
					break
                                case 'marcartodos3':
                                if (!isUser) return reply(mess.only.adrx1)
					members_id = []
					teks = (args.length > 1) ? body.slice(8).trim() : ''
					teks += '\n\n'
					for (let mem of groupMembers) {
						teks += `╠➥ https://wa.me/${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					client.sendMessage(from, teks, text, {detectLinks: false, quoted: mek})
					break
			case 'bloquear':
				 client.updatePresence(from, Presence.composing) 
				 client.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
				case 'clearall':
					if (!isOwner) return reply('MENSAGEM PERGUNTANDO QUEM É A PESSOA QUE USOU O COMANDO') 
					anu = await client.chats.all()
					client.setMaxListeners(25)
					for (let _ of anu) {
						client.deleteChat(_.jid)
					}
					reply('CHAT LIMPINHO ⚡')
					break
case 'grave1':             
    	if (!isGroup) return reply(mess.only.group)
				reply(mess.grave1)
				
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=19 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
case 'grave2':                 
				reply(mess.grave)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.mp3')
					exec(`ffmpeg -i ${media} -af equalizer=f=94:width_type=o:width=2:g=29 ${ran}`, (err, stderr, stdout) => {
						fs.unlinkSync(media)
						if (err) return reply('Error!')
						hah = fs.readFileSync(ran)
						client.sendMessage(from, hah, audio, {mimetype: 'audio/mp4', ptt:true, quoted: mek})
						fs.unlinkSync(ran)
					})
				break
		case 'grupoinfo':
                    client.updatePresence(from, Presence.composing)
                    if (!isGroup) return reply(mess.only.group)

		            
		            teks = `𝗗𝗘𝗦𝗖 : ${groupDesc} 
𝗡𝗢𝗠𝗘 : ${groupName} 
𝗟𝗜𝗦𝗧𝗔 𝗗𝗘 𝗠𝗘𝗠𝗕𝗥𝗢𝗦 \n𝗧𝗢𝗧𝗔𝗟 : :${groupMembers.length}\n\n`
members_id = []
					no = 0
					for (let mem of groupMembers) {
						no += 1
						teks += `<${no.toString()}> @${mem.jid.split('@')[0]}\n`
						members_id.push(mem.jid)
					}
					mentions(teks, members_id, true)
                    break
	case 'mudarfoto':
	reply(mess.wait)
				client.updatePresence(from, Presence.composing) 
				if (!isQuotedImage) return reply(`Envie fotos com legendas ${prefix}setbotpp ou tags de imagem que já foram enviadas`)
					if (!isOwner) return reply(mess.only.ownerB)
					enmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(enmedia)
					await client.updateProfilePicture(botNumber, media)
					reply('Obrigado pelo novo perfil😗')
					break
case 'setdesc':
			    	 if (!isGroup) return reply(mess.only.group)
				     if (!isGroupAdmins) return reply(mess.only.admin)
			   	     if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				     client.groupUpdateDescription(from, `${body.slice(9)}`)
				     client.sendMessage(from, 'Descrição alterada com sucesso', text, {quoted: mek})
				     break
 
	case 'antishit':
               if (!isGroup) return reply(mess.only.group);
               if (!isGroupAdmins) return reply(mess.only.admin);
               if (args.length < 1) return reply('On para ativar,Off para desativar');
               if (args[0] === 'on') {
                  if (isAntiShit) return reply('antishit já ativo burro');
                  antishit.push(from);
                  fs.writeFileSync('./database/json/antishit.json', JSON.stringify(antishit));
                  reply(`Antishit ativado`);
               } else if (args[0] === 'off') {
                  if (!isAntiShit) return reply('antishit já ta off burro');
                  antishit.splice(from, 1);
                  fs.writeFileSync('./database/json/antishit.json', JSON.stringify(antishit));
                  reply(`Antishit desativado`);
               } else {
                  reply(ind.satukos());
               }
               break
           case 'addshit':
               if (!isOwner) return reply(mess.only.ownerB);
               if (args.length < 1) return reply(`Kirim perintah ${prefix}addbadword [kata kasar]. contoh ${prefix}addbadword bego`);
               const bw = body.slice(9);
               bad.push(bw);
               fs.writeFileSync('./database/json/bad.json', JSON.stringify(bad));
               reply('Success Menambahkan Bad Word!');
               break;
           case 'delshit':
               if (!isOwner) return reply(mess.only.ownerB);
               if (args.length < 1) return reply(`Kirim perintah ${prefix}delbadword [kata kasar]. contoh ${prefix}delbadword bego`);
               let dbw = body.slice(9);
               bad.splice(dbw);
               fs.writeFileSync('./database/json/bad.json', JSON.stringify(bad));
               reply('Success Menghapus BAD WORD!');
               break
           case 'shitlist':
               let lbw = `Lista de palavras proibidas\nTotal : ${bad.length}\n`;
               for (let i of bad) {
                  lbw += `➸ ${i.replace(bad)}\n`;
               }
               await reply(lbw);
               break
case 'bloquear':
				 client.updatePresence(from, Presence.composing) 
				 client.chatRead (from)
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
					client.blockUser (`${body.slice(7)}@c.us`, "add")
					client.sendMessage(from, `perintah Diterima, memblokir ${body.slice(7)}@c.us`, text)
					break
                  case 'desbloquear':
					if (!isGroup) return reply(mess.only.group)
					if (!isOwner) return reply(mess.only.ownerB)
				    client.blockUser (`${body.slice(9)}@c.us`, "remove")
					client.sendMessage(from, `perintah Diterima, membuka blokir ${body.slice(9)}@c.us`, text)
		break
				case 'btoff':
	
					if (!isPublic) return reply(mess.only.userB)
					if (!isOwner) return reply('HANYA OWNER YANG DAPAT MENGGUNAKAN NYA BAKA')
					if (args.length < 1) return reply('Pilih 1(Aktif) atau 2(Nonaktif) Sayang!')
					if (Number(args[0]) === 1) {
						if (isPublic) return reply('Sudah Aktif')
						public.push(from)
						fs.writeFileSync('./scr/public.json', JSON.stringify(public))
						reply('Sekarang semua anggota dapat mengirim perintah✔️')
					} else if (Number(args[0]) === 0) {
						public.splice(from, 1)
						fs.writeFileSync('./scr/public.json', JSON.stringify(public))
						reply('Sekarang hanya owner dapat mengirim perintah✔️')
					} else {
						reply('Pilih 1(Aktif) atau 2(Nonaktif) Sayang!')
					}
					break
				case 'bc':
					if (!isOwner) return reply('QUEM E TU!???') 
					if (args.length < 1) return reply('.......')
					anu = await client.chats.all()
					if (isMedia && !mek.message.videoMessage || isQuotedImage) {
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						buff = await client.downloadMediaMessage(encmedia)
						for (let _ of anu) {
							client.sendMessage(_.jid, buff, image, {caption: `[ Ini Broadcast ]\n\n${body.slice(4)}`})
						}
						reply('Suksess broadcast')
					} else {
						for (let _ of anu) {
							sendMess(_.jid, `[ Ini Broadcast ]\n\n${body.slice(4)}`)
						}
						reply('Suksess broadcast')
					}
					break
                      
                                case 'promover':
                                if (!isUser) return reply(mess.only.adrx1)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'RLX TROPA ESSE AI PAGO O TRAVECO DOS ADMS\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(from, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`ESSE AKI PAGO O TRAVECO DOS ADEMAR AG O @${mentioned[0].split('@')[0]} E ADEMAR DO GRUPO`, mentioned, true)
						client.groupMakeAdmin(from, mentioned)
					}
					break
				case 'rebaixar':
				if (!isUser) return reply(mess.only.adrx1)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'ESSE AKI PAGO O TRAVECO N😡😡😡😡😡\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`REBAIXOU @${mentioned[0].split('@')[0]} NUM QUIS PAGA O TRAVECO FICA SEM ADM MERMO😡`, mentioned, true)
						client.groupDemoteAdmin(from, mentioned)
					}
					break
		
				case 'add':
				if (!isUser) return reply(mess.only.adrx1)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('QUEM DESEJA ADICIONAR? COLOQUE O NUMER SEM ESPAÇO') 
					if (args[0].startsWith('08')) return reply('NUMERO INCORRETO')
					try {
						num = `${args[0].replace(/ /g, '')}@s.whatsapp.net`
						client.groupAdd(from, [num])
					} catch (e) {
						console.log('Error :', e)
						reply('NAO FOI POSSÍVEL ADICIONAR POR QUE O NÚMERO É PRIVADO' )
					}
					break
		case 'blokk':
				if (!isUser) return reply(mess.only.adrx1)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('MARQUE ALGUÉM PARA EU MANDA PRA RUA')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'ENT E ISSO FLW MANN:\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.Blocked(from, mentioned)
					} else {
						mentions(`ALVO REMOVIDO COM SUCESSO: @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.Blocked(from, mentioned)
					}
					break
				case 'banir':
				if (!isUser) return reply(mess.only.adrx1)
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('MARQUE ALGUÉM PARA EU MANDA PRA RUA')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid
					if (mentioned.length > 1) {
						teks = 'ENT E ISSO FLW MANN:\n'
						for (let _ of mentioned) {
							teks += `@${_.split('@')[0]}\n`
						}
						mentions(teks, mentioned, true)
						client.groupRemove(from, mentioned)
					} else {
						mentions(`ALVO REMOVIDO COM SUCESSO: @${mentioned[0].split('@')[0]}`, mentioned, true)
						client.groupRemove(from, mentioned)
					}
					break
//AQUI NAO PRECISA MUDAR		
				case 'listademar':
					if (!isGroup) return reply(mess.only.group)
					teks = `Lista de adms *${groupMetadata.subject}*\nTotal : ${groupAdmins.length}\n\n`
					no = 0
					for (let admon of groupAdmins) {
						no += 1
						teks += `[${no.toString()}] @${admon.split('@')[0]}\n`
					}
					mentions(teks, groupAdmins, true)
					break
//AQUI NAO PRECISA MUDAR
                                case 'linkgp':
                                if (!isUser) return reply(mess.only.adrx1)
                                        if (!isGroup) return reply(mess.only.group)
                                        if (!isGroupAdmins) return reply(mess.only.admin)
                                        if (!isBotGroupAdmins) return reply(mess.only.Badmin)
                                        linkgc = await client.groupInviteCode(from)
                                     reply(mess.wait)  
                                     buffer = await getBuffer(`https://cdn.discordapp.com/attachments/832041762352529488/838569454975713280/IMG-20210502-WA0045.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'OPA AKI ESTA O LINK DESSE BELO GRP https://chat.whatsapp.com/'+linkgc})
                                     
                                        break
                                case 'imunitxt':
                                        if (!isGroup) return reply(mess.only.group)
                                        	if (!isOwner) return reply(mess.only.ownerB)
                                        reply('TOTURIAL EM VÍDEO: https://youtu.be/wdscZ1rMEOY')
                                       break
                                  case 'metodoprivado':
                                	    if (!isGroup) return reply(mess.only.group)
                                        reply('TROLAGI KKKK..')
                                        break
case 'ghost':
if (!isUser) return reply(mess.only.adrx1)
tujuh = fs.readFileSync('./modder/AUD-20210411-WA0242.mp3');
client.sendMessage(from, tujuh, MessageType.audio, {quoted: mek, mimetype: 'audio/mp4', ptt:true})
break
case 'botoes':
reply('ta na pasta do teu zap salvo como file')
tujuh = fs.readFileSync('./modder/botoes.zip');
client.sendMessage(from, tujuh, MessageType.document, {quoted: mek, mimetype: 'document/pdf', ptt:true}) 
break
case 'porno':
if (!isUser) return reply(mess.only.adrx1)
if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    reply(mess.wait)
					memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdU0UmT8RigE3Hbr80gmigjb2AdnPJklcQ3A&usqp=CAU`)
					buffer = await getBuffer(`https://cdn.discordapp.com/attachments/831740701557391360/831743923885441044/IMG-20201129-WA0417.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'i ala kkk'})
					buffer = await getBuffer(`https://cdn.discordapp.com/attachments/831740701557391360/831744561524244491/IMG-20201219-WA0189.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'i ala kkk'})
					buffer = await getBuffer(`https://cdn.discordapp.com/attachments/831740701557391360/831744562103451703/IMG-20201129-WA0420.jpg`)
					client.sendMessage(from, buffer, image, {quoted: mek, caption: 'i ala kkk'})
					break
case 'vdporno':
if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    reply(mess.wait3)
				    	memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdU0UmT8RigE3Hbr80gmigjb2AdnPJklcQ3A&usqp=CAU`)
					buffer = await getBuffer(`https://cdn.discordapp.com/attachments/831740701557391360/832019489376829450/VID-20201129-WA0355.mp4`)
					client.sendMessage(from, buffer, video, {quoted: mek, caption: 'i ala kkk'})
					break
case 'vdsiriricas1':
if (!isGroup) return reply(mess.only.group)
if (!isUser) return reply(mess.only.adrx1)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    reply(mess.wait3)
				    	memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdU0UmT8RigE3Hbr80gmigjb2AdnPJklcQ3A&usqp=CAU`)
					buffer = await getBuffer(`https://cdn.discordapp.com/attachments/831740701557391360/832024445518086215/Video_16-6-19_3_11_11_a._m..mp4`)
					client.sendMessage(from, buffer, video, {quoted: mek, caption: 'i ala kkk'})
					break
case 'vdsiriricas2':
if (!isUser) return reply(mess.only.adrx1)
if (!isUser) return reply(mess.only.adrx1)
if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (!isBotGroupAdmins) return reply(mess.only.Badmin)
				    reply(mess.wait3)
				    	memein = await kagApi.memeindo()
					buffer = await getBuffer(`https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRdU0UmT8RigE3Hbr80gmigjb2AdnPJklcQ3A&usqp=CAU`)
					buffer = await getBuffer(`https://cdn.discordapp.com/attachments/832043884045008916/832051883899224064/VID-20201205-WA0878.mp4`)
					client.sendMessage(from, buffer, video, {quoted: mek, caption: '1 estou enviando o segundo'})
						buffer = await getBuffer(`https://cdn.discordapp.com/attachments/832043884045008916/832051883446763560/video0-4.mp4`)
					client.sendMessage(from, buffer, video, {quoted: mek, caption: '2 acaba aki'})
					break
                         case 'play':   
                         	if (!isGroup) return reply(mess.only.group)
                                  if (!isUser) return reply(mess.only.adrx1)
	            if (args.length < 1) return reply('NOME DA MUSICA ANTA')
                reply(mess.wait2)
                
                play = body.slice(5)
                anu = await fetchJson(`https://api.zeks.xyz/api/ytplaymp3?q=${play}&apikey=apivinz`)
               if (anu.error) return reply(anu.error)
                 infomp3 = `*MUSICA ENCONTRADA!!!*\nNOME : ${anu.result.title}\nURL : ${anu.result.source}\n TAMANHO : ${anu.result.size}\n\n*ESTOU ENVIANDO A MSC *`
                buffer = await getBuffer(anu.result.thumbnail)
                lagu = await getBuffer(anu.result.url_audio)
                client.sendMessage(from, buffer, image, {quoted: mek, caption: infomp3})
                client.sendMessage(from, lagu, audio, {mimetype: 'audio/mp4', filename: `${anu.title}.mp3`, quoted: mek})
                break
	case 'baixarvideo':
		if (!isGroup) return reply(mess.only.group)
	if (!isUser) return reply(mess.only.adrx1)
	if (args.length < 1) return reply('Onde esta o url ?')
					if(!isUrl(args[0]) && !args[0].includes('youtu')) return reply(mess.error.Iv)
					reply(mess.wait3)
					
					anu = await fetchJson(`https://st4rz.herokuapp.com/api/ytv2?url=${args[0]}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*❏ Titulo* : ${anu.title}\n\nO VIDEO ESTA ENVIANDO, FICA DANDO SPAM N FDP*`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					reply('VIDEO ENCONTRADO ✅')
					reply('ENVIADO INFORMAÇÕES....')
					buffer = await getBuffer(anu.result)
					reply('ENVIANDO O VÍDEO AGUARDE....')
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					
					break
	case 'videoxxx':
	if (!isUser) return reply(mess.only.adrx1)
	if (args.length < 1) return reply('Onde esta o url ?')
					if(!isUrl(args[0]) && !args[0].includes('www.')) return reply(mess.error.Iv)
					reply(mess.wait3)
					
					anu = await fetchJson(`https://mhankbarbars.herokuapp.com/api/xvideos?url=${args[0]}&apiKey=${apiKey}`, {method: 'get'})
					if (anu.error) return reply(anu.error)
					teks = `*❏ Titulo* : ${anu.title}\n\nO VIDEO ESTA ENVIANDO, FICA DANDO SPAM N FDP*`
					thumb = await getBuffer(anu.thumb)
					client.sendMessage(from, thumb, image, {quoted: mek, caption: teks})
					reply('VIDEO ENCONTRADO ✅')
					reply('ENVIADO INFORMAÇÕES....')
					buffer = await getBuffer(anu.result)
					reply('ENVIANDO O VÍDEO AGUARDE....')
					client.sendMessage(from, buffer, video, {mimetype: 'video/mp4', filename: `${anu.title}.mp4`, quoted: mek})
					
					break

case 'adrx':
	if (!isGroup) return reply(mess.only.group)
					client.updatePresence(from, Presence.composing)
					if (isUser) return reply('VC JA ESTA REGISTRADO')
					if (args.length < 1) return reply(`Parametro Errado\n Digite .adrx *nome*`)
					var reg = body.slice(8)
					var jeneng = reg.split("|")[0];
					var umure = reg.split("|")[1];
						user.push(sender)
						fs.writeFileSync('./database/json/user.json', JSON.stringify(user))
						client.sendMessage(from, `[COMANDOS LIBERADOS PARA O USUÁRIO: wa.me/${sender.split("@")[0]}✓✓
TOTAL DE USUARIOS [${user.length}]
PARA VER MEUS COMANDOS BASTA USAR .ajuda QUE IREI LE RESPONDER]`, text, {quoted: mek})
					break

case 'regrp':
	if (!isGroup) return reply(mess.only.group)
					client.updatePresence(from, Presence.composing)
					if (isUsergp) return reply('VC JA ESTA REGISTRADO')
					if (args.length < 1) return reply(`Parametro Errado\n Digite .adrx *link do grp*`)
					var reg = body.slice(8)
					var jeneng = reg.split("|")[0];
					var umure = reg.split("|")[1];
						usergp.push(sender)
						fs.writeFileSync('./database/json/usergp.json', JSON.stringify(usergp))
						client.sendMessage(from, `[COMANDOS LIBERADOS PARA O GRUPO : ${groupName}✓
TOTAL DE GRUPOS REGISTRADOS [${usergp.length}]
PARA VER MEUS COMANDOS BASTA USAR .ajuda QUE IREI LE RESPONDER]`, text, {quoted: mek})
break
case 'wame':
	if (!isGroup) return reply(mess.only.group)
if (!isUser) return reply(mess.only.adrx1)
  client.updatePresence(from, Presence.composing) 
      options = {
          text: `「 *AUTO WHATSAPP* 」\n\n*Solicitado por* : *@${sender.split("@s.whatsapp.net")[0]}\n\n*Seu link de WhatsApp* : *https://wa.me/${sender.split("@s.whatsapp.net")[0]}*\n*Ou ( / )*\n*https://api.whatsapp.com/send?phone=${sender.split("@")[0]}*`,
          contextInfo: { mentionedJid: [sender] }
    }
    client.sendMessage(from, options, text, { quoted: mek } )
				break
case 'lista':
  if (!isGroup) return reply(mess.only.group)
reply('ksksksk')
break


			
case 'antilink':
                    if (!isGroup) return reply(mess.only.group)
					if (!isUser) return reply(mess.only.adrx1)
                   	if (!isBotGroupAdmins) return reply(mess.only.Badmin)
					if (args.length < 1) return reply('digite 1 para ativar ')
					if (Number(args[0]) === 1) {
						if (isAntiLink) return reply('o anti-link está ativo')
						antilink.push(from)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('Grupo anti-link ativado com sucesso neste grupo ✔️')
						client.sendMessage(from,`Atencao a todos os membros ativos deste grupo anti-link. ee você enviar um link de grupo, voce sera expulso daqui  grupo`, text)
					} else if (Number(args[0]) === 0) {
						if (!isantilink) return reply('O modo de grupo anti-link foi desabilitado ')
						var ini = anti.clientOf(from)
						antilink.splice(ini, 1)
						fs.writeFileSync('./src/antilink.json', JSON.stringify(antilink))
						reply('Desativar grupo anti-link com sucesso neste grupo ✔️')
					} else {
						reply('1 para ativar, 0 para desativar ')
					}
					break




			
//AQUI NAO PRECISA MUDAR                   
                                case 'leave':
                                        if (!isGroup) return reply(mess.only.group)
                                        if (isGroupAdmins || isOwner) {
                                            client.groupLeave(from)
                                        } else {
                                            reply(mess.only.admin)
                                        }
                                        break
	
				case 'toimg':
					if (!isGroup) return reply(mess.only.group)
				if (!isUser) return reply(mess.only.adrx1)
					if (!isQuotedSticker) return reply('❌ MARCA A FIGURINHA AE❌')
					reply(mess.wait)
					encmedia = JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo
					media = await client.downloadAndSaveMediaMessage(encmedia)
					ran = getRandom('.png')
					exec(`ffmpeg -i ${media} ${ran}`, (err) => {
						fs.unlinkSync(media)
						if (err) return reply('MENSAGEM DE FALHA AO COMVERTER FIGURINHA EM IMAGEM')
						buffer = fs.readFileSync(ran)
						client.sendMessage(from, buffer, image, {quoted: mek, caption: '>//<'})
						fs.unlinkSync(ran)
					})
					break
//NAO FUNCIONA MAIS		
				
				case 'simih':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isSimi) return reply('O modo Simi está ativado')
						samih.push(from)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Ativado com sucesso o modo simi neste grupo ✔️')
					} else if (Number(args[0]) === 0) {
						samih.splice(from, 1)
						fs.writeFileSync('./src/simi.json', JSON.stringify(samih))
						reply('Desativando o modo simi com sucesso neste grupo ✔️')
					} else {
						reply('1 para ativar, 0 para desativar')
					}
					break

				case 'bemvindo':
					if (!isGroup) return reply(mess.only.group)
					if (!isGroupAdmins) return reply(mess.only.admin)
					if (args.length < 1) return reply('Hmmmm')
					if (Number(args[0]) === 1) {
						if (isWelkom) return reply('JA TA ATIVADO JA MEN')
						welkom.push(from)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('Ativou com sucesso o recurso de boas-vindas neste grupo ✔️️')
					} else if (Number(args[0]) === 0) {
						welkom.splice(from, 1)
						fs.writeFileSync('./src/welkom.json', JSON.stringify(welkom))
						reply('BOAS VINDAS ATIVADA COM SUCESSO')
					} else {
						reply('Digite welcome 1 para ativar')
					}
                                      break
	//AQUI NAO PRECISA MUDAR
			case 'trocaprfl':	
					if (!isGroup) return reply(mess.only.group)
				
					if (args.length < 1) return reply('Tag target yang ingin di clone')
					if (mek.message.extendedTextMessage === undefined || mek.message.extendedTextMessage === null) return reply('Tag cvk')
					mentioned = mek.message.extendedTextMessage.contextInfo.mentionedJid[0]
					let { jid, id, notify } = groupMembers.find(x => x.jid === mentioned)
					try {
						pp = await client.getProfilePicture(id)
						buffer = await getBuffer(pp)
						client.updateProfilePicture(botNumber, buffer)
						mentions(`Foto de perfil atualizada para @${id.split('@')[0]}`, [jid], true)
					} catch (e) {
						reply('Gagal om')
					}
					break

				case 'wait':
					if ((isMedia && !mek.message.videoMessage || isQuotedImage) && args.length == 0) {
						reply(mess.wait)
						const encmedia = isQuotedImage ? JSON.parse(JSON.stringify(mek).replace('quotedM','m')).message.extendedTextMessage.contextInfo : mek
						media = await client.downloadMediaMessage(encmedia)
						await wait(media).then(res => {
							client.sendMessage(from, res.video, video, {quoted: mek, caption: res.teks.trim()})
						}).catch(err => {
							reply(err)
						})
					} else {
						reply('SO FOTOS FDP')
					}
					break

			
                           }
		} catch (e) {
			console.log('Error : %s', color(e, 'red'))
		}
	})
}

starts()


		
