import * as Dialog from '@radix-ui/react-dialog'
import * as Checkbox from '@radix-ui/react-checkbox'
import * as Select from '@radix-ui/react-select';
import * as Toggle from '@radix-ui/react-toggle-group';

import { Check, GameController } from 'phosphor-react';
import { Input } from './Form/index';
import { Game } from '../App';
import { useState, FormEvent } from 'react';
import axios from 'axios';

interface ListGames{
  games : Game[]  
}

export function CreateAdModal({ games } : ListGames){
  const [weekDays, SetWeekDays] = useState<string[]>([])
  const [useVoiceChannel, setUseVoiceChannel] = useState(false)

  async function handleCreateAd(event : FormEvent){
    event.preventDefault();

    const formData = new FormData(event.target as HTMLFormElement)
    const data = Object.fromEntries(formData)
    
    try{
      axios.post(`http://localhost:3333/games/${data.game}/ads`,
      {
        name : data.name,
        yearsPlaying : Number(data.yearsPlaying),
        discord : data.discord,
        weekDays : weekDays.map(Number),
        hourStart : data.hourStart,
        hourEnd : data.hourEnd,
        useVoiceChannel : useVoiceChannel
      })

      alert('Anúncio criado com sucesso')
      
    } catch(error){
      alert("Erro na criação do anuncio")
      console.log(error)
    }
  }

  return (
    <Dialog.Portal>
      <Dialog.Overlay className='bg-black/60 inset-0 fixed'>
        <Dialog.Content className='fixed bg-[#2a2634] py-8 px-10 text-white top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-lg w-[480px] shadow-lg shadow-black/25'>
          <Dialog.Title className='text-3xl font-black'>Publique um anúncio</Dialog.Title>

          <form onSubmit={handleCreateAd} className='mt-8 flex flex-col gap-4'>
            <div className='flex flex-col gap-2'>

              <label htmlFor="game">Selecione o Jogo</label>

              <Select.Root defaultValue='empty' name='game'>
                <Select.Trigger className="h-10 bg-zinc-900 text-zinc-500 rounded  flex justify-between items-center py-3 px-4 gap-3 cursor-pointer text-sm">
                  <Select.Value />
                  <Select.Icon asChild>
                    <GameController size={20} className="text-white" />
                  </Select.Icon>
                </Select.Trigger>

                <Select.Portal>
                  {/* bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500 */}
                  <Select.Content className="bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500">
                    <Select.Viewport className="p-2 text-white py-4 px-4">

                      <Select.Item value="empty" disabled>
                        <Select.ItemText className="bg-zinc-900 text-white flex gap-2 h-12 py-3 px-4 justify-between cursor-pointer items-center text-sm">
                          Selecione o game que deseja jogar
                        </Select.ItemText>
                      </Select.Item>

                      {
                        games.map((item) => (
                          <Select.Item key={item.id} value={item.id}>
                            <Select.ItemText className="bg-zinc-900 text-white flex gap-2 h-12 py-3 px-4 justify-between cursor-pointer items-center text-sm">
                              {item.title}
                            </Select.ItemText>
                          </Select.Item>
                        ))
                      }
                    </Select.Viewport>
                  </Select.Content>
                </Select.Portal>
              </Select.Root>
              
              {/* <select name="nome"
                className='bg-zinc-900 py-3 px-4 rounded text-sm placeholder:text-zinc-500'>
                  <option disabled selected value=''>Selecione um jogo</option>
                  {
                    games.map( games => {
                      return(
                        <option key={games.id} value={games.id}>{games.title}</option>
                      )
                    })
                  }
              </select> */}
            </div>

            <div className='flex flex-col gap-2'>
              <label htmlFor="name">Seu nome (nickname)</label>
              <Input name='name' type="text" placeholder="Como se chama dentro do game?"/>
            </div>

            <div className='grid grid-cols-2 gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="yearsPlaying">Joga há quantos anos?</label>
                <Input name='yearsPlaying' type="text" placeholder="Tudo bem ser ZERO"/>
              </div>

              <div className='flex flex-col gap-2'>
                <label htmlFor="discord">Qual seu Discord?</label>
                <Input name='discord' type="text" placeholder="Usuario#0000"/>
              </div>
            </div>

            <div className='flex gap-6'>
              <div className='flex flex-col gap-2'>
                <label htmlFor="tempo">Quando costuma jogar?</label>

                <Toggle.Root type='multiple' className='grid grid-cols-4 gap-3' onValueChange={SetWeekDays}>
                  <Toggle.Item value='0' className={`w-8 h-8 rounded ${weekDays.includes('0') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Domingo">D</Toggle.Item>
                  <Toggle.Item value='1' className={`w-8 h-8 rounded ${weekDays.includes('1') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Segunda">S</Toggle.Item>
                  <Toggle.Item value='2' className={`w-8 h-8 rounded ${weekDays.includes('2') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Terça">T</Toggle.Item>
                  <Toggle.Item value='3' className={`w-8 h-8 rounded ${weekDays.includes('3') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quarta">Q</Toggle.Item>
                  <Toggle.Item value='4' className={`w-8 h-8 rounded ${weekDays.includes('4') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Quinta">Q</Toggle.Item>
                  <Toggle.Item value='5' className={`w-8 h-8 rounded ${weekDays.includes('5') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sexta">S</Toggle.Item>
                  <Toggle.Item value='6' className={`w-8 h-8 rounded ${weekDays.includes('6') ? 'bg-violet-500' : 'bg-zinc-900'}`} title="Sábado">S</Toggle.Item>
                </Toggle.Root>
              </div>

              <div className='flex flex-col gap-2 flex-1'>
                <label htmlFor="discord">Qual horário do dia?</label>
                <div className='grid grid-cols-2 gap-1'>
                  <Input name="hourStart" type="time" placeholder='De'/>
                  <Input name="hourEnd" type="time" placeholder='Até'/>
                </div>
              </div>
            </div>

            <label className='flex gap-2 mt-2 flex items-center text-sm text-white'>
              {/* Component de checkbox do Radix */}
              <Checkbox.Root 
                className='w-6 h-6 p-1 rounded bg-zinc-900'

                checked={useVoiceChannel}
                onCheckedChange={(checked) => { 
                    checked === true ? setUseVoiceChannel(true) : setUseVoiceChannel(false)
                }}
              >
                <Checkbox.Indicator >
                  <Check className='w-4 h-4 text-emerald-400'/>
                </Checkbox.Indicator>
              </Checkbox.Root>
              Costumo me conectar ao chat de voz
            </label>

            <footer className='mt-4 flex justify-end gap-4'>
              <Dialog.Close className='bg-zinc-500 px-5 h-12 rounded-md font-semibold hover:bg-zinc-600'>Cancelar</Dialog.Close>

              <button className='bg-violet-500 px-5 h-12 rounded-md font-semibold flex items-center gap-3 hover:bg-violet-600' type="submit">
                <GameController className='w-6 h-6' />
                Encontrar duo
              </button>
            </footer>
          </form>
        </Dialog.Content>
      </Dialog.Overlay>
    </Dialog.Portal>
  )
}