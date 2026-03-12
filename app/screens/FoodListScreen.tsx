import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { foodItems } from '../data/foodData';
import { useCart } from '../context/CartContext';

export default function FoodListScreen() {
  const route = useRoute<any>();
  const { categoryId, categoryName } = route.params;
  const { addToCart, cartItems } = useCart();

  const filteredItems = foodItems.filter(
    (item) => item.categoryId === categoryId
  );

  const handleAddToCart = (item: typeof foodItems[0]) => {
    addToCart({
      id: item.id,
      name: item.name,
      price: item.price,
      image: item.image,
    });
    Alert.alert('Added! 🛒', `${item.name} added to cart`);
  };

  const getCartQuantity = (itemId: string) => {
    const cartItem = cartItems.find(i => i.id === itemId);
    return cartItem ? cartItem.quantity : 0;
  };

  return (
    <View style={styles.container}>

      {/* Header */}
      <LinearGradient colors={['#e67e22', '#f39c12']} style={styles.header}>
        <Text style={styles.headerTitle}>{categoryName}</Text>
        <Text style={styles.headerSubtitle}>
          {filteredItems.length} items available
        </Text>
      </LinearGradient>

      {/* Food Items */}
      <FlatList
        data={filteredItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => {
          const quantity = getCartQuantity(item.id);
          return (
            <View style={styles.card}>
              <Image source={{ uri: item.image }} style={styles.image} />
              <View style={styles.info}>

                <View>
                  <Text style={styles.name}>{item.name}</Text>
                  <Text style={styles.portion}>{item.portion}</Text>
                  <View style={styles.priceRow}>
                    <Text style={styles.price}>LKR {item.price.toFixed(2)}</Text>
                    {quantity > 0 && (
                      <View style={styles.quantityBadge}>
                        <Text style={styles.quantityBadgeText}>
                          {quantity} in cart
                        </Text>
                      </View>
                    )}
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.addButton}
                  onPress={() => handleAddToCart(item)}
                >
                  <LinearGradient
                    colors={['#e67e22', '#f39c12']}
                    style={styles.addButtonGradient}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                  >
                    <Ionicons name="add" size={18} color="#fff" />
                    <Text style={styles.addButtonText}>Add to Cart</Text>
                  </LinearGradient>
                </TouchableOpacity>

              </View>
            </View>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  listContent: {
    padding: 16,
  },
  card: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 16,
    marginBottom: 16,
    overflow: 'hidden',
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  image: {
    width: 110,
    height: 130,
  },
  info: {
    flex: 1,
    padding: 14,
    justifyContent: 'space-between',
  },
  name: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 6,
  },
  priceRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  price: {
    fontSize: 16,
    color: '#e67e22',
    fontWeight: 'bold',
  },
  quantityBadge: {
    backgroundColor: '#fef0e6',
    paddingHorizontal: 8,
    paddingVertical: 3,
    borderRadius: 20,
  },
  quantityBadgeText: {
    fontSize: 11,
    color: '#e67e22',
    fontWeight: '600',
  },
  addButton: {
    borderRadius: 10,
    overflow: 'hidden',
  },
  addButtonGradient: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 10,
    gap: 6,
  },
  addButtonText: {
    color: '#fff',
    fontWeight: '600',
    fontSize: 14,
  },

  portion: {
    fontSize: 12,
    color: '#999',
    marginBottom: 6,
  },
});