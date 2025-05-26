// import { View, Text, StyleSheet } from "react-native";
// import { Link } from "expo-router";
// import React, { useState, useEffect } from "react";
// import { styles } from "../stylesheet";
// import { styled } from "nativewind";
// import ThemedView from "../src/constants/ui/themedView";
// import SplashScreenComponent from "../src/features/splashOnboardingScreens/screen/splashScreen";
// import * as ExpoSplashScreen from "expo-splash-screen";

// const StyledView = styled(View);

// export default function Home() {
//   const [isLoaded, setIsLoaded] = useState(false);

//   useEffect(() => {
//     async function prepare() {
//       await ExpoSplashScreen.preventAutoHideAsync();
//       setTimeout(() => {
//         ExpoSplashScreen.hideAsync();
//         setIsLoaded(true);
//       }, 5000);
//     }
//     prepare();
//   }, []);

//   return isLoaded ? (
//     <ThemedView style={styles.container}>
//       <View style={styles.main}>
//         <Text style={styles.title}>Welcome</Text>
//         <Text style={styles.subtitle}>Testing</Text>
//         <StyledView tw="flex-row w-full">
//           <View tw="flex-1">
//             <Link href="/register">Register</Link>
//           </View>
//           <View tw="flex-1 items-end">
//             <Link href="/login">Login</Link>
//           </View>
//         </StyledView>
//       </View>
//     </ThemedView>
//   ) : (
//     <SplashScreenComponent onFinish={() => setIsLoaded(true)}/>
//   );
// }
