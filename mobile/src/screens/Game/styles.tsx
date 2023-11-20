import { StyleSheet } from "react-native";
import { THEME } from "../../theme";

export const styles = StyleSheet.create({
  container : {
    flex: 1,
    alignItems : 'center'
  },
  header : {
    width : '100%',
    flexDirection : 'row',
    alignItems : 'center',
    justifyContent : 'space-between',
    paddingHorizontal : 32,
    marginTop: 28
  },
  logo : {
    width : 80,
    height : 45
  },
  empty : {
    width : 20,
    right : 20
  },
  banner : {
    width : 315,
    height : 160,
    borderRadius : 8,
    marginTop : 32
  },
  containerList : {
    width : '100%'
  },
  contentList : {
    paddingLeft: 32,
    paddingRight : 64,
    alignItems : 'flex-start'
  },
  noAds : {
    color : THEME.COLORS.CAPTION_300,
    fontSize : THEME.FONT_SIZE.SM,
    fontFamily : THEME.FONT_FAMILY.REGULAR,
    textAlign : 'center'
  },
  emptyAd : {
    flex : 1,
    alignItems : 'center',
    justifyContent : 'center'
  }
})