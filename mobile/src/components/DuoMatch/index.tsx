import { useState } from 'react'
import { View, Modal, ModalProps, Text, TouchableOpacity, Alert, ActivityIndicator } from 'react-native'
import * as Clipboard from 'expo-clipboard'

import { styles } from './styles'
import { THEME } from '../../theme'
import { MaterialIcons } from '@expo/vector-icons'
import { CheckCircle } from 'phosphor-react-native'
import { Header } from '../Header'

interface Props extends ModalProps {
  discord : string;
  // onClose : () => void
}
export function DuoMatch( { discord, ...rest} : Props ){
  const [isCopping, setIsCopping] = useState(false)

  async function handleCopyDiscordUser(){
    setIsCopping(true);
    await Clipboard.setStringAsync(discord)

    Alert.alert('Copiado', 'Codigo do discord foi copiado para área de transferência');
    setIsCopping(false)
  }

  return (
    <Modal {...rest} transparent statusBarTranslucent
      animationType='fade'   
    >
      <View style={styles.container}>

        <View style={styles.content}>
          <TouchableOpacity style={styles.closeIcon}>
            <MaterialIcons name='close' size={22} color={THEME.COLORS.CAPTION_500}/>
          </TouchableOpacity>

          <CheckCircle size={64} color={THEME.COLORS.SUCCESS} weight='bold'/>

          <Header title='Let´s play' subtitle='Agora é só começar a jogar!' style={{ alignItems : 'center', marginTop: 15, marginBottom : 30 }}/>

          <Text style={styles.label}>
            Adicione no Discord
          </Text>

          <TouchableOpacity style={styles.discordButton} onPress={handleCopyDiscordUser}
            disabled={isCopping}
          >
            <Text style={styles.discord}>
              { isCopping ? <ActivityIndicator color={THEME.COLORS.PRIMARY} /> : discord}
            </Text>
          </TouchableOpacity>
        </View>

      </View>
    </Modal>
  )
}