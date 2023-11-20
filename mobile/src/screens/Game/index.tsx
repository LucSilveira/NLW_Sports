import { useEffect, useState } from 'react'
import { useRoute, useNavigation } from '@react-navigation/native'

import { SafeAreaView } from 'react-native-safe-area-context'
import { TouchableOpacity, View, Image, FlatList, Text } from 'react-native'
import { Entypo } from '@expo/vector-icons'
import { styles } from './styles'

import { DuoMatch } from '../../components/DuoMatch'
import { Background } from '../../components/Background'
import { GameParams } from '../../@types/navigation';
import { THEME } from '../../theme'

import logo from '../../assets/logo-nlw-esports.png'
import { Header } from '../../components/Header'
import { DuoCard, DuoCardProps } from '../../components/DuoCard'

export function Game(){
  const [discordDuo, setDiscordDuo] = useState<string>("")
  const [duos, setDuos] = useState<DuoCardProps[]>([]);

  const route = useRoute();
  const navigation = useNavigation()
  const game = route.params as GameParams;

  function handleGoBack(){
    navigation.goBack()
  }

  useEffect(() => {
    fetch(`http://192.168.100.109:3333/games/${game.id}/ads`)
    .then(response => response.json())
    .then( data => (
      setDuos(data)
     ) )
    .catch( err => console.log(err) )
  }, [])

  async function getDiscordUser(adsId : string){
    fetch(`http://192.168.100.109:3333/ads/${adsId}/discord`)
    .then(response => response.json())
    .then( data => (
      setDiscordDuo( data.discord )
    ) )
    .catch( err => console.log(err) )
  }

  return (
    <Background>
      <SafeAreaView style={styles.container}>
        <View style={ styles.header }>

          <TouchableOpacity onPress={handleGoBack}>
            <Entypo name='chevron-thin-left' color={THEME.COLORS.CAPTION_300} size={20} />
          </TouchableOpacity>

          <Image source={logo}  style={ styles.logo }/>

          <View style={styles.empty}/>

        </View>

        {/* Corpo da tela */}
        <Image source={{ uri : game.bannerUrl }} style={ styles.banner } resizeMode='cover'/>

        <Header title={game.title} subtitle="Conecte-se e comece a jogar!" />

        <FlatList
          data={duos}
          keyExtractor={item => item.id}
          renderItem={({item}) => (
            <DuoCard data={item} onConnect={ () => getDiscordUser(item.id)} />
          )}

          horizontal
          style={styles.containerList}
          contentContainerStyle={ duos.length === 0 ? styles.emptyAd : styles.contentList}
          showsHorizontalScrollIndicator={false}
          ListEmptyComponent={() => (
            <Text style={styles.noAds}>
              Ainda não há anúncios publicados...
            </Text>
          )}
        />

        <DuoMatch
          visible={ discordDuo !== "" }
          discord={discordDuo}
          onRequestClose={() => { setDiscordDuo("") } }
        />
      </SafeAreaView>
    </Background>
  )
}