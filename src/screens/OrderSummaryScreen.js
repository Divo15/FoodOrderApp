import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  Image,
  ScrollView,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { db } from "../config/firebase";
import { useCart } from "../context/CartContext";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../config/theme";

const OrderSummaryScreen = ({ navigation }) => {
  const { cartItems, getCartTotal, clearCart } = useCart();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const deliveryFee = 2.99;
  const subtotal = getCartTotal();
  const tax = subtotal * 0.08;
  const total = subtotal + deliveryFee + tax;

  const handleSubmitOrder = async () => {
    if (isSubmitting) return;

    Alert.alert(
      "Confirm Order",
      `Place your order for $${total.toFixed(2)}?`,
      [
        { text: "Cancel", style: "cancel" },
        {
          text: "Confirm",
          onPress: async () => {
            setIsSubmitting(true);
            try {
              const orderData = {
                items: cartItems.map((item) => ({
                  id: item.id,
                  name: item.name,
                  price: item.price,
                  quantity: item.quantity,
                  image: item.image,
                })),
                subtotal,
                deliveryFee,
                tax,
                total,
                status: "confirmed",
                createdAt: serverTimestamp(),
              };

              const docRef = await addDoc(collection(db, "orders"), orderData);
              setOrderId(docRef.id);
              setOrderPlaced(true);
              clearCart();
            } catch (err) {
              console.error("Error placing order:", err);
              Alert.alert(
                "Order Failed",
                "Could not place your order. Please try again."
              );
            } finally {
              setIsSubmitting(false);
            }
          },
        },
      ]
    );
  };

  /* ═══════════════════════════════════════════════
   *  ORDER SUCCESS SCREEN
   * ═══════════════════════════════════════════════ */
  if (orderPlaced) {
    return (
      <View style={styles.successContainer}>
        {/* Decorative background circle */}
        <View style={styles.successBgCircle} />

        <View style={styles.successIconOuter}>
          <View style={styles.successIconInner}>
            <Ionicons name="checkmark" size={48} color={COLORS.onTertiary} />
          </View>
        </View>

        <Text style={styles.successTitle}>Order Placed!</Text>
        <Text style={styles.successEmoji}>🎉</Text>
        <Text style={styles.successSubtext}>
          Your order has been successfully placed{"\n"}and is being prepared with care.
        </Text>

        <View style={styles.orderIdCard}>
          <Text style={styles.orderIdLabel}>Order ID</Text>
          <Text style={styles.orderIdText}>
            #{orderId?.slice(-8).toUpperCase()}
          </Text>
        </View>

        <View style={styles.estimateRow}>
          <Ionicons name="time-outline" size={18} color={COLORS.primary} />
          <Text style={styles.estimateText}>Estimated delivery: 25-35 min</Text>
        </View>

        <TouchableOpacity
          style={styles.backHomeBtn}
          onPress={() => navigation.navigate("Home")}
          activeOpacity={0.85}
        >
          <Ionicons name="home-outline" size={20} color={COLORS.onPrimary} />
          <Text style={styles.backHomeBtnText}>Back to Menu</Text>
        </TouchableOpacity>
      </View>
    );
  }

  /* ═══════════════════════════════════════════════
   *  ORDER SUMMARY SCREEN
   * ═══════════════════════════════════════════════ */
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
        <Text style={styles.headerTitle}>Order Summary</Text>
        <View style={{ width: 42 }} />
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* ── Delivery Address ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconCircle}>
              <Ionicons name="location" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.sectionTitle}>Delivery Address</Text>
          </View>
          <View style={styles.infoCard}>
            <Text style={styles.addressText}>123 Main Street, Apt 4B</Text>
            <Text style={styles.addressSubtext}>New York, NY 10001</Text>
          </View>
        </View>

        {/* ── Order Items ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconCircle}>
              <Ionicons name="receipt" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.sectionTitle}>
              Order Items ({cartItems.length})
            </Text>
          </View>
          {cartItems.map((item) => (
            <View key={item.id} style={styles.orderItem}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemInfo}>
                <Text style={styles.itemName} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.itemQty}>Qty: {item.quantity}</Text>
              </View>
              <Text style={styles.itemTotal}>
                ${(item.price * item.quantity).toFixed(2)}
              </Text>
            </View>
          ))}
        </View>

        {/* ── Payment Method ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconCircle}>
              <Ionicons name="card" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.sectionTitle}>Payment Method</Text>
          </View>
          <View style={[styles.infoCard, styles.paymentRow]}>
            <View style={styles.paymentIconBg}>
              <Ionicons name="card" size={22} color="#4A90D9" />
            </View>
            <View style={styles.paymentInfo}>
              <Text style={styles.paymentType}>Credit Card</Text>
              <Text style={styles.paymentNumber}>•••• •••• •••• 4242</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color={COLORS.outlineVariant} />
          </View>
        </View>

        {/* ── Price Details ── */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <View style={styles.sectionIconCircle}>
              <Ionicons name="pricetags" size={16} color={COLORS.primary} />
            </View>
            <Text style={styles.sectionTitle}>Price Details</Text>
          </View>
          <View style={styles.infoCard}>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Subtotal</Text>
              <Text style={styles.priceValue}>${subtotal.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Delivery Fee</Text>
              <Text style={styles.priceValue}>${deliveryFee.toFixed(2)}</Text>
            </View>
            <View style={styles.priceRow}>
              <Text style={styles.priceLabel}>Tax (8%)</Text>
              <Text style={styles.priceValue}>${tax.toFixed(2)}</Text>
            </View>
            {/* Whitespace divider per design system (no lines!) */}
            <View style={{ height: 14 }} />
            <View style={styles.priceRow}>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>${total.toFixed(2)}</Text>
            </View>
          </View>
        </View>
      </ScrollView>

      {/* ── Floating Place Order Bar ── */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.bottomLabel}>Total</Text>
          <Text style={styles.bottomTotal}>${total.toFixed(2)}</Text>
        </View>
        <TouchableOpacity
          style={[styles.placeOrderBtn, isSubmitting && styles.disabledBtn]}
          onPress={handleSubmitOrder}
          disabled={isSubmitting}
          activeOpacity={0.85}
        >
          <Text style={styles.placeOrderText}>
            {isSubmitting ? "Placing..." : "Place Order"}
          </Text>
          {!isSubmitting && (
            <Ionicons
              name="checkmark-circle"
              size={22}
              color={COLORS.onPrimary}
            />
          )}
        </TouchableOpacity>
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
  scrollContent: {
    paddingBottom: 120,
  },

  /* ── Sections ── */
  section: {
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.lg,
  },
  sectionHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 10,
    marginBottom: 12,
  },
  sectionIconCircle: {
    width: 32,
    height: 32,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.primaryContainer + "30",
    justifyContent: "center",
    alignItems: "center",
  },
  sectionTitle: {
    fontSize: 16,
    fontFamily: "PlusJakartaSans-SemiBold",
    color: COLORS.onSurface,
    letterSpacing: -0.3,
  },

  /* ── Info Cards (no borders, tonal bg) ── */
  infoCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: SPACING.lg,
    borderRadius: RADIUS.lg,
    ...SHADOWS.soft,
  },
  addressText: {
    fontSize: 15,
    fontFamily: "BeVietnamPro-SemiBold",
    color: COLORS.onSurface,
  },
  addressSubtext: {
    fontSize: 13,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
    marginTop: 4,
  },

  /* ── Order Items ── */
  orderItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    padding: 14,
    borderRadius: RADIUS.md,
    marginBottom: SPACING.sm,
    ...SHADOWS.soft,
  },
  itemImage: {
    width: 52,
    height: 52,
    borderRadius: RADIUS.sm,
    backgroundColor: COLORS.surfaceContainerLow,
  },
  itemInfo: {
    flex: 1,
    marginLeft: 12,
  },
  itemName: {
    fontSize: 14,
    fontFamily: "PlusJakartaSans-SemiBold",
    color: COLORS.onSurface,
  },
  itemQty: {
    fontSize: 12,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },
  itemTotal: {
    fontSize: 15,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
  },

  /* ── Payment ── */
  paymentRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  paymentIconBg: {
    width: 44,
    height: 44,
    borderRadius: RADIUS.md,
    backgroundColor: COLORS.surfaceContainerLow,
    justifyContent: "center",
    alignItems: "center",
  },
  paymentInfo: {
    flex: 1,
    marginLeft: 14,
  },
  paymentType: {
    fontSize: 14,
    fontFamily: "BeVietnamPro-SemiBold",
    color: COLORS.onSurface,
  },
  paymentNumber: {
    fontSize: 12,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
    marginTop: 2,
  },

  /* ── Prices ── */
  priceRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  priceLabel: {
    fontSize: 14,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
  },
  priceValue: {
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
    fontSize: 20,
    fontFamily: "PlusJakartaSans-ExtraBold",
    color: COLORS.primary,
    letterSpacing: -0.5,
  },

  /* ── Floating Bottom Bar ── */
  bottomBar: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest + "F5",
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.lg,
    paddingBottom: 34,
    borderTopLeftRadius: RADIUS.xl,
    borderTopRightRadius: RADIUS.xl,
    ...SHADOWS.floating,
  },
  bottomLabel: {
    fontSize: 12,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
  },
  bottomTotal: {
    fontSize: 24,
    fontFamily: "PlusJakartaSans-ExtraBold",
    color: COLORS.onSurface,
    letterSpacing: -0.8,
  },
  placeOrderBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 28,
    paddingVertical: 16,
    borderRadius: RADIUS.full,
    gap: 8,
    ...SHADOWS.ambient,
  },
  disabledBtn: {
    opacity: 0.65,
  },
  placeOrderText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
  },

  /* ═══════════════════════════════════════════════
   *  SUCCESS SCREEN
   * ═══════════════════════════════════════════════ */
  successContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: COLORS.background,
    padding: 32,
  },
  successBgCircle: {
    position: "absolute",
    top: -100,
    width: 500,
    height: 500,
    borderRadius: 250,
    backgroundColor: COLORS.tertiaryContainer + "20",
  },
  successIconOuter: {
    width: 110,
    height: 110,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.tertiaryContainer + "40",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 8,
  },
  successIconInner: {
    width: 80,
    height: 80,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.tertiary,
    justifyContent: "center",
    alignItems: "center",
  },
  successTitle: {
    fontSize: 30,
    fontFamily: "PlusJakartaSans-ExtraBold",
    color: COLORS.onSurface,
    marginTop: 20,
    letterSpacing: -1,
  },
  successEmoji: {
    fontSize: 36,
    marginTop: 4,
  },
  successSubtext: {
    fontSize: 15,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurfaceVariant,
    textAlign: "center",
    marginTop: 12,
    lineHeight: 24,
  },
  orderIdCard: {
    backgroundColor: COLORS.surfaceContainerLowest,
    paddingHorizontal: 28,
    paddingVertical: 18,
    borderRadius: RADIUS.lg,
    marginTop: 28,
    alignItems: "center",
    ...SHADOWS.ambient,
  },
  orderIdLabel: {
    fontSize: 12,
    fontFamily: "BeVietnamPro-Medium",
    color: COLORS.onSurfaceVariant,
    textTransform: "uppercase",
    letterSpacing: 1,
  },
  orderIdText: {
    fontSize: 22,
    fontFamily: "PlusJakartaSans-ExtraBold",
    color: COLORS.primary,
    marginTop: 4,
  },
  estimateRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    marginTop: 20,
    backgroundColor: COLORS.surfaceContainerLow,
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
  },
  estimateText: {
    fontSize: 13,
    fontFamily: "BeVietnamPro-Medium",
    color: COLORS.onSurface,
  },
  backHomeBtn: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.primary,
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: RADIUS.full,
    marginTop: 32,
    gap: 10,
    ...SHADOWS.ambient,
  },
  backHomeBtnText: {
    color: COLORS.onPrimary,
    fontSize: 16,
    fontFamily: "PlusJakartaSans-Bold",
  },
});

export default OrderSummaryScreen;
