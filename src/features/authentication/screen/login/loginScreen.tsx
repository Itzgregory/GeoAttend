import { Dimensions, StyleSheet, ScrollView, View, Text, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { User, Mail, Eye, EyeOff, Check } from "lucide-react-native"; 
import { DotPattern } from "../../../../constants/ui/backgrounds/patternBg";
import InputField from "../../../../constants/ui/inputs/inputField";
import ThemedView from "../../../../constants/ui/themes/themedView";
import ContentSection from "../../../splashOnboardingScreens/screen/subComponents/ContentSection";
import BackButton from "../../../../constants/ui/navigation/BackButton";
import AnimationSection from "../../../../constants/ui/animations/AnimationSection";
import DynamicButton from "../../../../constants/ui/actionButtons/button";
import { KeyboardAvoidingView, Platform } from "react-native";
import MessageModal from "../../../../constants/ui/modals/successModal";
import { JSX, useEffect, useState } from "react";
import React from "react";
import useLoginForm from "../../hooks/useLoginForm";
import { validateEmail } from "../../../../utils/helper/validateEmail";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");


export default function LoginScreen() {
  const router = useRouter();
  const {
    email,
    setEmail,
    password,
    setPassword,
    showPassword,
    setShowPassword,
    error,
    successMessage,
    loading,
    onSubmit,
    modalVisible,
    setModalVisible,
    modalType,
    handleModalConfirm,
  } = useLoginForm();

  const [showPasswordField, setShowPasswordField] = useState(false);
  const [emailValid, setEmailValid] = useState(false);

  const handleBack = () => router.replace('/main/welcome');

  useEffect(() => {
    setEmailValid(validateEmail(email));
  }, [email]);

  const handleNext = () => {
    if (emailValid && !showPasswordField) {
      setShowPasswordField(true);
    } else {
      onSubmit();
    }
  };

  const renderActionButton = () => {
    const buttonLabel = showPasswordField ? "Login" : "Next";
    const isDisabled = showPasswordField 
      ? !password || loading 
      : !emailValid || loading;

    return (
      <DynamicButton
        isGreen={true}
        label={buttonLabel}
        onPress={handleNext}
        style={{ marginTop: 20, marginBottom: 20 }}
        isDisabled={isDisabled}
      />
    );
  };

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
      >
        
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <DotPattern />
          <BackButton onPress={handleBack}/>
          
          <ContentSection 
            title="Welcome Back"
            subtitle={showPasswordField ? "Enter your password" : "Enter your email to continue"}
            containerStyle={{ marginTop: 20, marginBottom: 20 }} 
            titleStyle={{ fontSize: 22, alignSelf: 'flex-start' }}
          />

          <AnimationSection 
            animationSource={require("../../../../../assets/login.json")} 
            animationStyle={{ width: '100%', height: '100%' }}
            containerStyle={styles.animationContainer}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={<Mail size={20} color="#6B7280" />}
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

          {showPasswordField && (
            <InputField
              label="Password"
              placeholder="Enter password"
              icon={showPassword ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
              iconPosition="right"
              secureTextEntry={!showPassword}
              value={password}
              onChangeText={setPassword}
              onIconPress={() => setShowPassword(!showPassword)}
            />
          )}

          {renderActionButton()}
          
          <View style={styles.bottomRow}>
            {showPasswordField && (
              <TouchableOpacity onPress={() => router.replace("main/authentication/passwordResetEmail")}>
                <Text style={styles.linkText}>
                  Forgot password? <Text style={styles.linkHighlight}>Reset</Text>
                </Text>
              </TouchableOpacity>
            )}

            <TouchableOpacity onPress={() => router.replace("main/authentication/register")}>
              <Text style={styles.linkText}>
                No account? <Text style={styles.linkHighlight}>Register</Text>
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>

      <MessageModal
        visible={modalVisible}
        message={successMessage || error || ""}
        type={modalType ?? "error"}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm}
      />
    </ThemedView>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingBottom: 40,
  },
  animationContainer: {
    width: '80%',
    height: 100,
    alignSelf: 'center',
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 10,
    marginTop: 20,
    gap: 20,
  },
  linkText: {
    color: "#72777A",
    fontSize: screenWidth > 400 ? 12 : 11,
  },
  linkHighlight: {
    color: "#00544F", 
    fontWeight: "400", 
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});