import cors from 'cors'
import express from "express";
import { PrismaClient } from '@prisma/client'
import { convertHourToMinutes } from "./utils/convert-hour-to-minuts";
import { convertMinutesToHour } from "./utils/convert-minuts-to-hours";

const app = express();
app.use(express.json())

app.use(cors())

const prisma = new PrismaClient({
  log : ['query']
})

app.get('/games', async (request, response) => {
  const games = await prisma.game.findMany({
    include : {
      _count : {
        select : {
          ads : true
        }
      }
    }
  })

  return response.json(games)
})

// Listando os anuncios por jogos
app.get('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const ads = await prisma.ad.findMany({
    select : {
      id :true,
      gameId :true,
      name :true,
      yearsPlaying :true,
      discord :false,
      weekDays :true,
      hourStart :true,
      hourEnd :true,
      useVoiceChannel :true
    },
    where : {
      gameId : gameId
    },
    orderBy : {
      createdAt : 'desc'
    }
  })

  return response.json(ads.map(ad => {
    return {
      ...ad,
      weekDays : ad.weekDays.split(','),
      hourStart : convertMinutesToHour( ad.hourStart ),
      hourEnd : convertMinutesToHour( ad.hourEnd ),
    }
  }))
})

// Buscando o discord por anuncio
app.get('/ads/:id/discord', async (request, response) => {
  const adId = request.params.id;

  const ad = await prisma.ad.findUniqueOrThrow({
    select : {
      discord : true
    },
    where : {
      id : adId
    }
  })

  return response.json({ discord : ad.discord})
})

// Criando um novo anuncio
app.post('/games/:id/ads', async (request, response) => {
  const gameId = request.params.id
  const body = request.body

  const ad = await prisma.ad.create({
    data : {
      gameId,
      name: body.name,
      discord : body.discord,
      yearsPlaying: body.yearsPlaying,
      weekDays: body.weekDays.join(','),
      hourStart: convertHourToMinutes( body.hourStart ),
      hourEnd: convertHourToMinutes( body.hourEnd ),
      useVoiceChannel: body.useVoiceChannel
    }
  })

  return response.status(201).json(ad)
});

app.listen(3333)