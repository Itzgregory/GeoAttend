import { StyleSheet } from 'react-native';

export  const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    alignItems: 'center',
    width: '100%',
    height: "100%",
    backgroundColor: '#00544F',
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