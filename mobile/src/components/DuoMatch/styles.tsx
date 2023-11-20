import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container : {
    flex : 1,
    justifyContent : 'center',
    alignItems : 'center',
    backgroundColor : THEME.COLORS.OVERLAY
  },
  content:{
    width: 315,
    borderRadius : 8,
    alignItems : 'center',
    justifyContent : 'center',
    backgroundColor : THEME.COLORS.SHAPE,
  },
  closeIcon : {
    alignSelf : 'flex-end',
    padding : 16,
  },
  label:{
    color : THEME.COLORS.TEXT,
    fontSize : THEME.FONT_SIZE.MD,
    fontFamily : THEME.FONT_FAMILY.REGULAR,
    marginTop : 24,
    marginBottom : 8
  },
  discordButton : {
    width : 230,
    height : 50,
    alignItems: 'center',
    justifyContent : 'center',
    borderRadius : 6,
    marginBottom : 32,
    backgroundColor : THEME.COLORS.BACKGROUND_900,
  },
  discord: {
    color : THEME.COLORS.TEXT,
    fontSize : THEME.FONT_SIZE.MD,
    fontFamily : THEME.FONT_FAMILY.REGULAR
  }
})