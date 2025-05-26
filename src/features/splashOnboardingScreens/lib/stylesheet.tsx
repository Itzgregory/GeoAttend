import { Dimensions, StatusBar, StyleSheet } from 'react-native';
const { width: screenWidth, height: screenHeight } = Dimensions.get("window");


export  const styles = StyleSheet.create({
  container: {
     flex: 1,
     backgroundColor: "#FDFFF2",
     paddingTop: StatusBar.currentHeight || 44,
     padding: 5,
     width: screenWidth,
     height: screenHeight,
   },
  main: {
    flex: 1,
    justifyContent: "center",
    maxWidth: 960,
    marginHorizontal: "auto",
    paddingHorizontal: '5%',
  },
  title: {
    fontSize: 64,
    fontWeight: "bold",
  },
  subtitle: {
    fontSize: 36,
    color: "#38434D",
  },
  inlineLinks: {
    flexDirection: "row", 
    justifyContent: "center", 
    gap: 10,
  },
});