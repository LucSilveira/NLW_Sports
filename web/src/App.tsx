import './styles/main.css';
import { useState, useEffect } from 'react'
import * as Dialog from '@radix-ui/react-dialog'

import logoImg from './assets/Logo.svg';
import { GameBanner } from './components/GameBanner';
import { CreateAdBanner } from './components/CreateAdBanner';
import { CreateAdModal } from './components/CreateAdModal';
import axios from 'axios';

export interface Game {
  id: string
  title : string
  bannerUrl : string
  _count : {
    ads : number
  }
}

// Terminar a aplicação colocando os elementos de
// Carousel, Validação, e responsivo

function App() {
  const [games, setGames] = useState<Game[]>([]);

  useEffect(() => {
    // Buscando os elementos dos jogos
    axios('http://localhost:3333/games')
    .then( response => {
      setGames( response.data )
    })
  }, [])

  return (
    <div className='max-w-[1344px] mx-auto flex items-center flex-col my-20'>
      <img className='max-w-[15vw]' src={logoImg} alt="" />

      <h1 className='text-5xl text-white font-black mt-20'>Seu <span className='bg-nlwGradient bg-clip-text text-transparent'>duo</span> está aqui.</h1>

      <div className='grid grid-cols-6 gap-6 mt-16'>
        {
          games.map( game => {
            return (
              <GameBanner key={game.id} bannerUrl={game.bannerUrl} title={game.title} adsCount={game._count.ads}/>
            )
          })
        }
      </div>

      {/* Importando a ferramenta do radix ui */}
      <Dialog.Root>
        <CreateAdBanner />

        <CreateAdModal games={games} />
      </Dialog.Root>
    </div>
  )
}

export default App
