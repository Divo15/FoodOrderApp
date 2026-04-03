import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  RefreshControl,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../config/firebase";
import { useCart } from "../context/CartContext";
import { COLORS, RADIUS, SHADOWS, SPACING } from "../config/theme";
import FoodItem from "../components/FoodItem";
import LoadingSpinner from "../components/LoadingSpinner";
import ErrorView from "../components/ErrorView";

const CATEGORIES = ["All", "Pizza", "Burger", "Sushi", "Dessert", "Drinks"];

const HomeScreen = ({ navigation }) => {
  const [menuItems, setMenuItems] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const { getCartCount } = useCart();

  const fetchMenuItems = () => {
    setError(null);
    setLoading(true);

    // Real-time Firestore listener
    const unsubscribe = onSnapshot(
      collection(db, "menuItems"),
      (snapshot) => {
        const items = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setMenuItems(items);
        setFilteredItems(items);
        setLoading(false);
        setRefreshing(false);
      },
      (err) => {
        console.error("Error fetching menu items:", err);
        setError("Failed to load menu. Please check your connection.");
        setLoading(false);
        setRefreshing(false);
      }
    );

    return unsubscribe;
  };

  useEffect(() => {
    const unsubscribe = fetchMenuItems();
    return () => {
      if (unsubscribe) unsubscribe();
    };
  }, []);

  useEffect(() => {
    let items = menuItems;

    if (selectedCategory !== "All") {
      items = items.filter(
        (item) =>
          item.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    if (searchQuery.trim()) {
      items = items.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredItems(items);
  }, [selectedCategory, searchQuery, menuItems]);

  const onRefresh = () => {
    setRefreshing(true);
    fetchMenuItems();
  };

  if (loading) return <LoadingSpinner message="Loading delicious food..." />;
  if (error) return <ErrorView message={error} onRetry={fetchMenuItems} />;

  const cartCount = getCartCount();

  return (
    <View style={styles.container}>
      {/* ── Header ────────────────────────────────── */}
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello! 👋</Text>
          <Text style={styles.title}>What would you{"\n"}like to eat?</Text>
        </View>
        <TouchableOpacity
          style={styles.cartButton}
          onPress={() => navigation.navigate("Cart")}
          activeOpacity={0.85}
        >
          <Ionicons name="cart" size={24} color={COLORS.primary} />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* ── Search Bar (glassmorphic style) ────────── */}
      <View style={styles.searchWrapper}>
        <Ionicons name="search" size={20} color={COLORS.outline} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search food..."
          placeholderTextColor={COLORS.outline}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity onPress={() => setSearchQuery("")}>
            <Ionicons name="close-circle" size={20} color={COLORS.outline} />
          </TouchableOpacity>
        )}
      </View>

      {/* ── Category Chips ────────────────────────── */}
      <FlatList
        data={CATEGORIES}
        horizontal
        showsHorizontalScrollIndicator={false}
        keyExtractor={(item) => item}
        contentContainerStyle={styles.categoriesContainer}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.categoryChip,
              selectedCategory === item && styles.categoryChipActive,
            ]}
            onPress={() => setSelectedCategory(item)}
            activeOpacity={0.85}
          >
            <Text
              style={[
                styles.categoryText,
                selectedCategory === item && styles.categoryTextActive,
              ]}
            >
              {item}
            </Text>
          </TouchableOpacity>
        )}
      />

      {/* ── Food Items ────────────────────────────── */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <FoodItem item={item} />}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.primary]}
            tintColor={COLORS.primary}
          />
        }
        ListEmptyComponent={
          <View style={styles.emptyContainer}>
            <Ionicons
              name="restaurant-outline"
              size={64}
              color={COLORS.outlineVariant}
            />
            <Text style={styles.emptyText}>No items found</Text>
            <Text style={styles.emptySubtext}>
              Try a different category or search term
            </Text>
          </View>
        }
      />
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
    alignItems: "flex-start",
    paddingHorizontal: SPACING.lg,
    paddingTop: 56,
    paddingBottom: SPACING.sm,
  },
  greeting: {
    fontSize: 14,
    fontFamily: "BeVietnamPro-Medium",
    color: COLORS.onSurfaceVariant,
  },
  title: {
    fontSize: 26,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurface,
    marginTop: 4,
    letterSpacing: -0.8,
    lineHeight: 34,
  },
  cartButton: {
    width: 50,
    height: 50,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLowest,
    justifyContent: "center",
    alignItems: "center",
    ...SHADOWS.ambient,
  },
  badge: {
    position: "absolute",
    top: -3,
    right: -3,
    backgroundColor: COLORS.error,
    borderRadius: RADIUS.full,
    minWidth: 22,
    height: 22,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 6,
  },
  badgeText: {
    color: COLORS.onError,
    fontSize: 11,
    fontFamily: "BeVietnamPro-Bold",
  },

  /* ── Search ── */
  searchWrapper: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: COLORS.surfaceContainerLowest,
    marginHorizontal: SPACING.lg,
    marginTop: SPACING.DEFAULT,
    paddingHorizontal: SPACING.DEFAULT,
    borderRadius: RADIUS.full,
    height: 50,
    ...SHADOWS.soft,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 15,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.onSurface,
  },

  /* ── Categories ── */
  categoriesContainer: {
    paddingHorizontal: SPACING.lg,
    paddingVertical: SPACING.DEFAULT,
    gap: 10,
  },
  categoryChip: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: RADIUS.full,
    backgroundColor: COLORS.surfaceContainerLowest,
    ...SHADOWS.soft,
  },
  categoryChipActive: {
    backgroundColor: COLORS.primary,
  },
  categoryText: {
    fontSize: 14,
    fontFamily: "BeVietnamPro-SemiBold",
    color: COLORS.onSurfaceVariant,
  },
  categoryTextActive: {
    color: COLORS.onPrimary,
  },

  /* ── List ── */
  listContainer: {
    paddingBottom: 24,
  },

  /* ── Empty state ── */
  emptyContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingTop: 80,
  },
  emptyText: {
    fontSize: 18,
    fontFamily: "PlusJakartaSans-Bold",
    color: COLORS.onSurfaceVariant,
    marginTop: 16,
  },
  emptySubtext: {
    fontSize: 14,
    fontFamily: "BeVietnamPro-Regular",
    color: COLORS.outline,
    marginTop: 4,
  },
});

export default HomeScreen;
