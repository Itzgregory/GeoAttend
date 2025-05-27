import { Modal, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import DynamicButton from "../actionButtons/button";
import { useState } from "react";
import React from "react";

interface MessageModalProps {
  visible: boolean;
  message: string;
  type: "success" | "error"; 
  onClose: () => void;
  onConfirm?: () => void;
  confirmLabel?: string;  
}

export type MessageModalType = "success" | "error";

export default function MessageModal({ visible, message, type, onClose, onConfirm, confirmLabel = type === "success" ? "Proceed" : "Retry" }: MessageModalProps) {
  const getModalStyles = () => {
    return type === "success"
      ? styles.successModalContent
      : styles.errorModalContent;
  };

  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={visible}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <View style={[styles.modalContent, getModalStyles()]}>
          <Text style={styles.modalTitle}>
            {type === "success" ? "Success!" : "Error!"}
          </Text>
          <Text style={styles.modalMessage}>{message}</Text>
          <View style={styles.buttonContainer}>
            <DynamicButton
                isGreen={type === "success"}
                label={confirmLabel}
                onPress={() => {
                    onClose();
                    if (onConfirm) onConfirm();
                } }
                style={{ marginTop: 20 }} 
                isDisabled={false}            
            />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>Close</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContent: {
    padding: 20,
    borderRadius: 10,
    width: "80%",
    alignItems: "center",
  },
  successModalContent: {
    backgroundColor: "#e6ffe6", 
  },
  errorModalContent: {
    backgroundColor: "#ffe6e6",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold" as const,
    marginBottom: 10,
  },
  modalMessage: {
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
  },
  buttonContainer: {
    width: "100%",
  },
  closeButton: {
    marginTop: 10,
    alignItems: "center",
  },
  closeText: {
    color: "#00544F",
    fontSize: 16,
    textDecorationLine: "underline",
  },
});