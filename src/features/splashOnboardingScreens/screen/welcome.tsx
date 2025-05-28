import React, { useEffect } from "react";
import { StyleSheet, StatusBar, Dimensions, TouchableOpacity, Text } from "react-native";
import { useRouter } from "expo-router";
import ContentSection from "./subComponents/ContentSection";
import ThemedView from "../../../constants/ui/themes/themedView";
import DynamicButton from "../../../constants/ui/actionButtons/button";
import AnimationSection from "../../../constants/ui/animations/AnimationSection";
import {DotPattern} from '../../../constants/ui/backgrounds/patternBg';


const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function Welcome() {
  const router = useRouter();

  useEffect(() => {
    StatusBar.setBackgroundColor("#FDFFF2");
    StatusBar.setBarStyle("dark-content");
  }, []);

  return (
    <ThemedView style={styles.container}>
      <DotPattern />

      <ContentSection 
            title="Welcome to GeoAttend.!!!"
            containerStyle={{ marginTop: 20, marginBottom: 10}} 
            textContainerStyle={{width: '100%' }}
            titleStyle={{ fontSize: 22 }}
        />

      <AnimationSection 
            animationSource={require("../../../../assets/welcomeScreen.json")} 
            animationStyle={{
              width: '100%',
              height: '100%',
            }}
            containerStyle={{
              width: '80%',  
              height: 250,   
              backgroundColor: 'rgb(188,207,188)', 
              borderRadius: 40, 
              marginTop: 10,
              alignSelf: 'center',
            }}
            loop={true}
         /> 

      <ContentSection 
            subtitle="Sign up to access personalized features and track your attendance seamlessly or Explore the app without an account. You can still create one later !"
            containerStyle={{ marginTop: 10, marginBottom: 10}} 
            textContainerStyle={{width: '100%' }}
            titleStyle={{ fontSize: 22 }}
            subtitleStyle={{  textAlign: "center", fontSize: 14}}

        />

      <DynamicButton
            isGreen={true}
            label="Create an Account"
            onPress={() => router.push("main/authentication/register")} 
            isDisabled={false}          
        />

      <DynamicButton
            isGreen={false}
            label="Continue as Guest"
            onPress={() => router.push("main/authentication/guest")}
            style={styles.button} 
            isDisabled={false}       
        />

        <TouchableOpacity
            onPress={() => router.push("main/authentication/login")}
            style={styles.skipButton}
            activeOpacity={0.7}
            >
            <Text style={styles.skipText}>
                Already have an account? 
                <Text style={styles.loginText}> Login</Text>
            </Text>
        </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 50,
    flex: 1,
    backgroundColor: "#FDFFF2",
    paddingTop: StatusBar.currentHeight || 44,
    padding: 30,
    width: screenWidth,
    height: screenHeight,
  },
  button:{
    backgroundColor: "#FDFFF2",
  },
  skipButton: {
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
  skipText: {
    color: "#72777A",
    fontSize: 16,
    fontFamily: "Lato",
    fontWeight: "500",
    justifyContent: 'center',
    alignSelf: 'center'
  },
  loginText: {
    color: "#00544F", 
    fontWeight: "600", 
  },
});
