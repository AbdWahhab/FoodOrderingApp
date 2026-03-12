import { View, Text, FlatList, TouchableOpacity, Image, StyleSheet, Alert } from 'react-native';
import { useCart } from '../context/CartContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  FoodList: { categoryId: string; categoryName: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

export default function CartScreen() {
  const { cartItems, increaseQuantity, decreaseQuantity, totalAmount } = useCart();
  const navigation = useNavigation<NavigationProp>();

  const handlePlaceOrder = () => {
    Alert.alert(
      'Confirm Order 🛒',
      `Your total is LKR ${(totalAmount + 150).toFixed(2)}. Place order?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Place Order',
          onPress: () =>
            Alert.alert(
              'Order Placed! 🎉',
              'Your order has been placed successfully! It will arrive in 30-45 minutes.',
              [{ text: 'OK' }]
            ),
        },
      ]
    );
  };

  // Empty cart state
  if (cartItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <LinearGradient colors={['#e67e22', '#f39c12']} style={styles.emptyHeader}>
          <Text style={styles.headerTitle}>Your Cart 🛒</Text>
        </LinearGradient>
        <View style={styles.emptyBody}>
          <Text style={styles.emptyIcon}>🛒</Text>
          <Text style={styles.emptyText}>Your cart is empty</Text>
          <Text style={styles.emptySubText}>
            Go add some delicious food!
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Tabs')}
          >
            <LinearGradient
              colors={['#e67e22', '#f39c12']}
              style={styles.browseButton}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
            >
              <Text style={styles.browseButtonText}>Browse Menu</Text>
              <Ionicons name="arrow-forward" size={18} color="#fff" />
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </View>
    );
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <LinearGradient colors={['#e67e22', '#f39c12']} style={styles.header}>
        <Text style={styles.headerTitle}>Your Cart 🛒</Text>
        <Text style={styles.headerSubtitle}>
          {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
        </Text>
      </LinearGradient>

      {/* Cart Items */}
      <FlatList
        data={cartItems}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.image} />
            <View style={styles.info}>

              <Text style={styles.name}>{item.name}</Text>
              <Text style={styles.subtotal}>
                LKR {(item.price * item.quantity).toFixed(2)}
              </Text>

              {/* Quantity Controls */}
              <View style={styles.quantityRow}>
                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => decreaseQuantity(item.id)}
                >
                  <Ionicons name="remove" size={16} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.quantity}>{item.quantity}</Text>

                <TouchableOpacity
                  style={styles.qtyButton}
                  onPress={() => increaseQuantity(item.id)}
                >
                  <Ionicons name="add" size={16} color="#fff" />
                </TouchableOpacity>

                <Text style={styles.unitPrice}>
                  LKR {item.price.toFixed(2)} each
                </Text>
              </View>

            </View>
          </View>
        )}
      />

      {/* Footer */}
      <View style={styles.footer}>

        {/* Order Summary */}
        <View style={styles.summaryCard}>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Subtotal</Text>
            <Text style={styles.summaryValue}>LKR {totalAmount.toFixed(2)}</Text>
          </View>
          <View style={styles.summaryRow}>
            <Text style={styles.summaryLabel}>Delivery Fee</Text>
            <Text style={styles.summaryValue}>LKR 150.00</Text>
          </View>
          <View style={styles.divider} />
          <View style={styles.summaryRow}>
            <Text style={styles.totalLabel}>Total</Text>
            <Text style={styles.totalAmount}>
              LKR {(totalAmount + 150).toFixed(2)}
            </Text>
          </View>
        </View>

        {/* Place Order Button */}
        <TouchableOpacity onPress={handlePlaceOrder}>
          <LinearGradient
            colors={['#e67e22', '#f39c12']}
            style={styles.orderButton}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
          >
            <Text style={styles.orderButtonText}>Place Order</Text>
            <Ionicons name="checkmark-circle" size={22} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

      </View>
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
    paddingBottom: 8,
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
    width: 100,
    height: 120,
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
  },
  subtotal: {
    fontSize: 15,
    color: '#e67e22',
    fontWeight: 'bold',
  },
  quantityRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  qtyButton: {
    backgroundColor: '#e67e22',
    width: 28,
    height: 28,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  quantity: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    minWidth: 20,
    textAlign: 'center',
  },
  unitPrice: {
    fontSize: 11,
    color: '#999',
    flex: 1,
  },
  footer: {
    backgroundColor: '#fff',
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: 24,
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    elevation: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.08,
    shadowRadius: 6,
  },
  summaryCard: {
    marginBottom: 16,
  },
  summaryRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#999',
  },
  summaryValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#eee',
    marginVertical: 8,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
  },
  totalAmount: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#e67e22',
  },
  orderButton: {
    flexDirection: 'row',
    paddingVertical: 16,
    borderRadius: 14,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    elevation: 4,
    shadowColor: '#e67e22',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
  },
  orderButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  emptyContainer: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  emptyHeader: {
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 24,
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  emptyBody: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
  },
  emptyIcon: {
    fontSize: 72,
    marginBottom: 16,
  },
  emptyText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  emptySubText: {
    fontSize: 15,
    color: '#999',
    marginBottom: 28,
  },
  browseButton: {
    flexDirection: 'row',
    paddingVertical: 14,
    paddingHorizontal: 28,
    borderRadius: 14,
    alignItems: 'center',
    gap: 8,
  },
  browseButtonText: {
    color: '#fff',
    fontSize: 15,
    fontWeight: 'bold',
  },
});