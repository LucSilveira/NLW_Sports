import { styles } from './styles';
import { useEffect, useState } from 'react';
import { Image, FlatList } from 'react-native'
import { useNavigation  } from '@react-navigation/native';
import { SafeAreaView } from 'react-native-safe-area-context'

import logoImg from '../../assets/logo-nlw-esports.png'
import { Header } from '../../components/Header';
import { GameCard, GameCardProps } from '../../components/GameCard';
import { Background } from '../../components/Background';
import { Loading } from '../../components/Loading';

export function Home() {
  const navigation = useNavigation()
  const [loading, setLoading] = useState(true)
  const [games, setGames] = useState<GameCardProps[]>([])

  useEffect(() => {
    fetch('http://192.168.100.109:3333/games')
    .then(response => response.json())
    .then( data => (
      setGames(data),
      setLoading(false)
     ) )
    .catch( err => console.log(err) )
  }, [])

  // const navigation = useNavigation();
  function handleOpenGaming({ id, title, bannerUrl }: GameCardProps) {
    navigation.navigate('game', { id, title, bannerUrl });
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <Image source={logoImg} style={styles.logo}/>

        <Header 
          title="Encontre o seu duo"
          subtitle="Selecione o game que deseja jogar..."
        />
        
        {
          loading ? 
            <Loading /> 
            : (
                <FlatList 
                  data={games}
                  keyExtractor={item => item.id}
                  renderItem={({ item }) => (
                    
                    <GameCard data={item} onPress={() => handleOpenGaming(item)} />

                  )}
                  showsHorizontalScrollIndicator={false}
                  horizontal

                  contentContainerStyle={styles.contentList}
                />
              )
        }

        
      </SafeAreaView>
    </Background>
  )
}