import React, { useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../config/theme";

const FoodItem = ({ item }) => {
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();

  const handleAddToCart = () => {
    addToCart(item, quantity);
    setQuantity(1);
  };

  return (
    <View style={styles.card}>
      {/* Edge-to-edge image at top per design system */}
      <Image source={{ uri: item.image }} style={styles.image} />

      {/* Content with generous internal padding */}
      <View style={styles.content}>
        {/* Title row */}
        <View style={styles.titleRow}>
          <Text style={styles.name} numberOfLines={1}>
            {item.name}
          </Text>
          <View style={styles.ratingBadge}>
            <Ionicons name="star" size={12} color={COLORS.star} />
            <Text style={styles.ratingText}>{item.rating || "4.5"}</Text>
          </View>
        </View>

        {/* Description */}
        <Text style={styles.description} numberOfLines={2}>
          {item.description}
        </Text>

        {/* Category chip */}
        {item.category && (
          <View style={styles.categoryChip}>
            <Text style={styles.categoryText}>{item.category}</Text>
          </View>
        )}

        {/* Footer: price + quantity + add */}
        <View style={styles.footer}>
          <Text style={styles.price}>${item.price.toFixed(2)}</Text>

          <View style={styles.quantityPill}>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(Math.max(1, quantity - 1))}
              activeOpacity={0.7}
            >
              <Ionicons name="remove" size={16} color={COLORS.primary} />
            </TouchableOpacity>
            <Text style={styles.qtyText}>{quantity}</Text>
            <TouchableOpacity
              style={styles.qtyBtn}
              onPress={() => setQuantity(quantity + 1)}
              activeOpacity={0.7}
            >
              <Ionicons name="add" size={16} color={COLORS.primary} />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={styles.addBtn}
            onPress={handleAddToCart}
            activeOpacity={0.85}
          >
            <Ionicons name="cart-outline" size={16} color={COLORS.onPrimary} />
            <Text style={styles.addBtnText}>Add</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.lg,
    marginHorizontal: SPACING.lg,
    marginVertical: SPACING.sm,
    overflow: "hidden",
    // No border! Use tonal shift + ambient shadow per design system
    ...SHADOWS.ambient,
  },
  image: {
    width: "100%",
    height: 190,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  content: {
    padding: SPACING.lg,
  },
  titleRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
    flex: 1,
    letterSpacing: -0.3,
  },
  ratingBadge: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: RADIUS.full,
    gap: 4,
    marginLeft: 8,
  },
  ratingText: {
    fontSize: 12,
    fontFamily: "BeVietnamPro-SemiBold",
    color: COLORS.onSurface,
  },
  description: {
    fontSize: 13,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
    marginTop: 8,
    lineHeight: 20,
  },
  categoryChip: {
    alignSelf: "flex-start",
    backgroundColor: COLORS.tertiaryContainer,
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: RADIUS.full,
    marginTop: 10,
  },
  categoryText: {
    fontSize: 11,
    fontFamily: "BeVietnamPro-SemiBold",
    color: COLORS.onTertiaryContainer,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 16,
  },
  price: {
    fontSize: 22,
    fontFamily: "PlusJakartaSans-ExtraBold",
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  quantityPill: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLow,
    borderRadius: RADIUS.full,
    paddingHorizontal: 4,
  },
  qtyBtn: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    justifyContent: "center",
    alignItems: "center",
  },
  qtyText: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
    marginHorizontal: 10,
  },
  addBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    gap: 6,
    ...SHADOWS.soft,
  },
  addBtnText: {
    color: COLORS.onPrimary,
    fontSize: 14,
    fontFamily: "BeVietnamPro-SemiBold",
  },
});

export default FoodItem;
