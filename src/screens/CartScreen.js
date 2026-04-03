import React from "react";
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  Alert,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useCart } from "../context/CartContext";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../config/theme";
import CartItem from "../components/CartItem";

const CartScreen = ({ navigation }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();

  const deliveryFee = cartItems.length > 0 ? 2.99 : 0;
  const subtotal = getCartTotal();
  const total = subtotal + deliveryFee;

  const handleClearCart = () => {
    Alert.alert(
      "Clear Cart",
      "Are you sure you want to remove all items?",
      [
        { text: "Cancel", style: "cancel" },
        { text: "Clear", style: "destructive", onPress: clearCart },
      ]
    );
  };

  /* ── Empty Cart ── */
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <View style={styles.emptyIconCircle}>
          <Ionicons name="cart-outline" size={64} color={COLORS.outlineVariant} />
        </View>
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtext}>
          Add some delicious food to get started!
        </Text>
        <TouchableOpacity
          style={styles.browseBtn}
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.85}
        >
          <Text style={styles.browseBtnText}>Browse Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      {/* ── Header ── */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="arrow-back" size={22} color={COLORS.onSurface} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>My Cart</Text>
        <TouchableOpacity
          onPress={handleClearCart}
          style={styles.clearBtn}
          activeOpacity={0.7}
        >
          <Ionicons name="trash-outline" size={20} color={COLORS.error} />
        </TouchableOpacity>
      </View>

      {/* ── Items count ── */}
      <Text style={styles.itemCount}>
        {cartItems.length} item{cartItems.length !== 1 ? "s" : ""} in cart
      </Text>

      {/* ── Cart Items ── */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <CartItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />

      {/* ── Floating Summary Bar ── */}
      <View style={styles.summaryBar}>
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>${subtotal.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>${deliveryFee.toFixed(2)}</Text>
          </View>
          {/* Whitespace separator instead of divider line per design system */}
          <View style={{ height: 12 }} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
          </View>

          <TouchableOpacity
            style={styles.checkoutBtn}
            onPress={() => navigation.navigate("OrderSummary")}
            activeOpacity={0.85}
          >
            <Text style={styles.checkoutBtnText}>Proceed to Checkout</Text>
            <Ionicons
              name="arrow-forward"
              size={20}
              color={COLORS.onPrimary}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },

  /* ── Header ── */
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: SPACING.lg,
    paddingTop: 56,
    paddingBottom: SPACING.sm,
  },
  backBtn: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLowest,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.soft,
  },
  headerTitle: {
    fontSize: 20,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
    letterSpacing: -0.5,
  },
  clearBtn: {
    width: 42,
    height: 42,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.errorContainer + "18",
    justifyContent: "center",
    alignItems: "center",
  },
  itemCount: {
    fontSize: 13,
    fontFamily: "BeVietnamPro-Medium",
    color: COLORS.onSurfaceVariant,
    paddingHorizontal: SPACING.lg,
    marginTop: 4,
    marginBottom: 8,
  },

  listContainer: {
    paddingBottom: 260,
  },

  /* ── Empty ── */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: SPACING.xl,
  },
  emptyIconCircle: {
    width: 120,
    height: 120,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLow,
    justifyContent: "center",
    alignItems: "center",
  },
  emptyTitle: {
    fontSize: 22,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
    marginTop: 24,
    letterSpacing: -0.5,
  },
  emptySubtext: {
    fontSize: 15,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
    marginTop: 8,
    textAlign: "center",
  },
  browseBtn: {
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: RADIUS.full,
    marginTop: 28,
    ...SHADOWS.ambient,
  },
  browseBtnText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontFamily: "BeVietnamPro-SemiBold",
  },

  /* ── Summary floating bar ── */
  summaryBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    paddingHorizontal: SPACING.lg,
    paddingBottom: 30,
    paddingTop: SPACING.DEFAULT,
    backgroundColor: COLORS.background + "F0", // semi-transparent glassmorphic
    ...SHADOWS.floating,
  },
  summaryCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    borderRadius: RADIUS.xl,
    padding: SPACING.lg,
    ...SHADOWS.ambient,
  },
  summaryRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
  },
  summaryValue: {
    fontSize: 14,
    fontFamily: "BeVietnamPro-Medium",
    color: COLORS.onSurface,
  },
  totalLabel: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
  },
  totalValue: {
    fontSize: 22,
    fontFamily: "PlusJakartaSans-ExtraBold",
    color: COLORS.primary,
    letterSpacing: -0.5,
  },
  checkoutBtn: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingVertical: 16,
    borderRadius: RADIUS.full,
    marginTop: 16,
    gap: 8,
    ...SHADOWS.ambient,
  },
  checkoutBtnText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default CartScreen;
