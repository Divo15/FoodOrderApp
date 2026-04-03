import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { COLORS, RADIUS, SHADOWS } from "../config/theme";

const ErrorView = ({ message = "Something went wrong", onRetry }) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconCircle}>
        <Ionicons name="alert-circle-outline" size={56} color={COLORS.error} />
      </View>
      <Text style={styles.title}>Oops!</Text>
      <Text style={styles.message}>{message}</Text>
      {onRetry && (
        <TouchableOpacity
          style={styles.retryButton}
          onPress={onRetry}
          activeOpacity={0.85}
        >
          <Ionicons name="refresh" size={18} color={COLORS.onPrimary} />
          <Text style={styles.retryText}>Try Again</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 24,
  },
  iconCircle: {
    width: 96,
    height: 96,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.errorContainer + "18",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 26,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
    marginTop: 20,
    letterSpacing: -0.5,
  },
  message: {
    fontSize: 15,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
    marginTop: 8,
    lineHeight: 23,
  },
  retryButton: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 14,
    borderRadius: RADIUS.full,
    marginTop: 28,
    gap: 8,
    ...SHADOWS.ambient,
  },
  retryText: {
    color: COLORS.onPrimary,
    fontSize: 15,
    fontFamily: "BeVietnamPro-SemiBold",
  },
});

export default ErrorView;
