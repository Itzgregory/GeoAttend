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
import useRegisterForm from "../../hooks/useRegistrationForm";
import { KeyboardAvoidingView, Platform } from "react-native";
import MessageModal from "../../../../constants/ui/modals/successModal";
import { JSX, useEffect } from "react";
import React from "react";

const { width: screenWidth, height: screenHeight } = Dimensions.get("window");

export default function RegisterScreen() {
  const router = useRouter();
  const {
    email,
    setEmail,
    firstName,
    setFirstName,
    lastName,
    setLastName,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    setShowPassword,
    showConfirmedPassword,
    setShowConfirmedPassword,
    acceptedTerms,
    setAcceptedTerms,
    error,
    successMessage,
    loading,
    allInputFilled,
    onSubmit,
    modalVisible,
    setModalVisible,
    modalType,
    handleModalConfirm,
  } = useRegisterForm();

  const handleBack = () => {
    router.replace('/main/welcome');
  };

  const renderActionButton = (): JSX.Element => {
    return (
      <DynamicButton
        isGreen={true}
        label="Create a Free Account"
        onPress={onSubmit}
        style={{ marginTop: 20, marginBottom: 20 }}
        isDisabled={!allInputFilled || loading}
      />
    );
  };

  useEffect(() => {
    return () => {
      setEmail("");
      setFirstName("");
      setLastName("");
      setPassword("");
      setConfirmPassword("");
      setShowPassword(false);
      setShowConfirmedPassword(false);
      setAcceptedTerms(false);
      setModalVisible(false);
    };
  }, [setEmail, setFirstName, setLastName, setPassword, setConfirmPassword, setShowPassword, setShowConfirmedPassword, setAcceptedTerms, setModalVisible]);

  return (
    <ThemedView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={styles.keyboardAvoidingView}
        keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 20}
      >
        <ScrollView 
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
        >
          <BackButton onPress={handleBack}/>
          <DotPattern /> 
          
          
          <ContentSection 
            title="Let's get started 🎉"
            subtitle="Create an account to continue with GeoAttend"
            containerStyle={{ marginTop: 20, marginBottom: 20}} 
            textContainerStyle={{width: '100%' }}
            titleStyle={{ fontSize: 22, alignSelf:'flex-start' }}
            subtitleStyle={{justifyContent:'center' }}
          />

          <AnimationSection 
            animationSource={require("../../../../assets/welcomeScreen.json")} 
            animationStyle={{
              width: '100%',
              height: '100%',
            }}
            containerStyle={{
              width: '80%',  
              height: 100,   
              borderRadius: 40,
              alignSelf: 'center',
            }}
            loop={true}
          />

          {error && <Text style={styles.errorText}>{error}</Text>}

          <InputField
            label="First Name"
            placeholder="Enter First Name"
            icon={<User size={20} color="#6B7280" />}
            iconPosition="left"
            value={firstName}
            onChangeText={setFirstName}
            style={{marginTop: 20}}
          />

          <InputField
            label="Last Name"
            placeholder="Enter Last Name"
            icon={<User size={20} color="#6B7280" />}
            iconPosition="left"
            value={lastName} 
            onChangeText={setLastName}
          />

          <InputField
            label="Email"
            placeholder="Enter your email"
            icon={<Mail size={20} color="#6B7280" />}
            iconPosition="left"
            value={email}
            onChangeText={setEmail}
            keyboardType="email-address"
            autoCapitalize="none"
          />

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

          <InputField
            label="Confirm Password"
            placeholder="Confirm your password"
            icon={showConfirmedPassword ? <EyeOff size={20} color="#6B7280" /> : <Eye size={20} color="#6B7280" />}
            iconPosition="right"
            secureTextEntry={!showConfirmedPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
            onIconPress={() => setShowConfirmedPassword(!showConfirmedPassword)}
          />

          <TouchableOpacity 
            style={styles.checkboxContainer} 
            onPress={() => setAcceptedTerms(!acceptedTerms)}
            activeOpacity={0.7}
          >
            <View style={[styles.checkbox, acceptedTerms && styles.checkboxChecked]}>
              {acceptedTerms && <Check size={16} color="#FFFFFF" />}
            </View>
            <View style={styles.termsTextContainer}>
              <Text style={styles.termsText}>
                I agree to the{' '}
                <Text 
                  style={styles.termsLink}
                  onPress={() => console.log("Navigate to Terms & Conditions")}
                >
                  Terms & Conditions
                </Text>
                {' '}and{' '}
                <Text 
                  style={styles.termsLink}
                  onPress={() => console.log("Navigate to Privacy Policy")}
                >
                  Privacy Policy
                </Text>
              </Text>
            </View>
          </TouchableOpacity>

          {renderActionButton()}
        </ScrollView>
      </KeyboardAvoidingView>
      <MessageModal
        visible={modalVisible}
        message={successMessage || error || "An unexpected error occurred"}
        type={modalType || "error"}
        onClose={() => setModalVisible(false)}
        onConfirm={handleModalConfirm}
      />
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FDFFF2",
  },
  keyboardAvoidingView: {
    flex: 1,
  },
  scrollContent: {
    paddingVertical: 20,
    paddingHorizontal: 20,
    paddingBottom: 40,
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginVertical: 15,
    paddingHorizontal: 4,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: "#00544F",
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
    marginTop: 2,
  },
  checkboxChecked: {
    backgroundColor: "#00544F",
  },
  termsTextContainer: {
    flex: 1,
  },
  termsText: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 20,
    fontFamily: "Lato",
  },
  termsLink: {
    color: "#00544F",
    fontWeight: "600",
    textDecorationLine: "underline",
  },
  errorText: {
    color: "red",
    textAlign: "center",
    marginVertical: 10,
  },
});