import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../config/theme";

const CartItem = ({ item }) => {
  const { updateQuantity, removeFromCart } = useCart();

  return (
    <View style={styles.card}>
      <Image source={{ uri: item.image }} style={styles.image} />

      <View style={styles.info}>
        <Text style={styles.name} numberOfLines={1}>
          {item.name}
        </Text>
        <Text style={styles.price}>${item.price.toFixed(2)}</Text>

        <View style={styles.quantityRow}>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.id, item.quantity - 1)}
            activeOpacity={0.7}
          >
            <Ionicons name="remove-circle" size={26} color={COLORS.primary} />
          </TouchableOpacity>
          <Text style={styles.qtyText}>{item.quantity}</Text>
          <TouchableOpacity
            style={styles.qtyBtn}
            onPress={() => updateQuantity(item.id, item.quantity + 1)}
            activeOpacity={0.7}
          >
            <Ionicons name="add-circle" size={26} color={COLORS.primary} />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.rightSection}>
        <TouchableOpacity
          style={styles.deleteBtn}
          onPress={() => removeFromCart(item.id)}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={18} color={COLORS.error} />
        </TouchableOpacity>
        <Text style={styles.subtotal}>
          ${(item.price * item.quantity).toFixed(2)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flexDirection: "row",
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.lg,
    marginVertical: 6,
    padding: SPACING.DEFAULT,
    alignItems: "center",
    // No borders — tonal shift + shadow per design system
    ...SHADOWS.soft,
  },
  image: {
    width: 76,
    height: 76,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  info: {
    flex: 1,
    marginLeft: 14,
  },
  name: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans-SemiBold",
    color: COLORS.onSurface,
  },
  price: {
    fontSize: 14,
    fontFamily: "BeVietnamPro-SemiBold",
    color: COLORS.primary,
    marginTop: 2,
  },
  quantityRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 8,
  },
  qtyBtn: {
    padding: 2,
  },
  qtyText: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
    marginHorizontal: 12,
  },
  rightSection: {
    alignItems: "flex-end",
    justifyContent: "space-between",
    height: 76,
  },
  deleteBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.errorContainer + "15",
    justifyContent: "center",
    alignItems: "center",
  },
  subtotal: {
    fontSize: 17,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
  },
});

export default CartItem;
