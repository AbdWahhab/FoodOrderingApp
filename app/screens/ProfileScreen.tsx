import { View, Text, Image, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useState } from 'react';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import CustomAlert from '../components/CustomAlert';

type RootStackParamList = {
  Login: undefined;
  Tabs: undefined;
  FoodList: { categoryId: string; categoryName: string };
};

type NavigationProp = NativeStackNavigationProp<RootStackParamList>;

const user = {
  name: 'Johnny Depp',
  email: 'johnnydepp@email.com',
  phone: '+94 77 123 4567',
  location: 'Negombo, Sri Lanka',
  avatar: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQTT9mx-b7S0UQ2pISV8TJ78IYrttoJiQ9PgA&s',
};

const menuItems = [
  { icon: 'person-outline', label: 'Edit Profile', color: '#e67e22' },
  { icon: 'location-outline', label: 'Delivery Address', color: '#3498db' },
  { icon: 'card-outline', label: 'Payment Methods', color: '#2ecc71' },
  { icon: 'receipt-outline', label: 'Order History', color: '#9b59b6' },
  { icon: 'notifications-outline', label: 'Notifications', color: '#e74c3c' },
  { icon: 'help-circle-outline', label: 'Help & Support', color: '#1abc9c' },
];

export default function ProfileScreen() {
  const navigation = useNavigation<NavigationProp>();

  const [alertConfig, setAlertConfig] = useState({
    visible: false,
    title: '',
    message: '',
    buttons: [] as { text: string; onPress?: () => void; style?: 'default' | 'cancel' | 'destructive' }[],
  });

  const showAlert = (title: string, message: string, buttons: typeof alertConfig.buttons) => {
    setAlertConfig({ visible: true, title, message, buttons });
  };

  const handleLogout = () => {
    showAlert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => navigation.replace('Login'),
        },
      ]
    );
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>

      {/* Header */}
      <LinearGradient colors={['#e67e22', '#f39c12']} style={styles.header}>
        <View style={styles.avatarContainer}>
          <Image source={{ uri: user.avatar }} style={styles.avatar} />
          <View style={styles.editBadge}>
            <Ionicons name="camera" size={12} color="#fff" />
          </View>
        </View>
        <Text style={styles.name}>{user.name}</Text>
        <Text style={styles.email}>{user.email}</Text>
      </LinearGradient>

      {/* Stats Row */}
      <View style={styles.statsRow}>
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>12</Text>
          <Text style={styles.statLabel}>Orders</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>3</Text>
          <Text style={styles.statLabel}>Favourites</Text>
        </View>
        <View style={styles.statDivider} />
        <View style={styles.statItem}>
          <Text style={styles.statNumber}>2</Text>
          <Text style={styles.statLabel}>Addresses</Text>
        </View>
      </View>

      {/* Info Card */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Personal Info</Text>
        <View style={styles.infoCard}>
          <View style={styles.infoRow}>
            <View style={styles.infoIconCircle}>
              <Ionicons name="call-outline" size={16} color="#e67e22" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Phone</Text>
              <Text style={styles.infoValue}>{user.phone}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIconCircle}>
              <Ionicons name="mail-outline" size={16} color="#e67e22" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Email</Text>
              <Text style={styles.infoValue}>{user.email}</Text>
            </View>
          </View>
          <View style={styles.divider} />
          <View style={styles.infoRow}>
            <View style={styles.infoIconCircle}>
              <Ionicons name="location-outline" size={16} color="#e67e22" />
            </View>
            <View>
              <Text style={styles.infoLabel}>Location</Text>
              <Text style={styles.infoValue}>{user.location}</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Menu Items */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.menuCard}>
          {menuItems.map((item, index) => (
            <View key={item.label}>
              <TouchableOpacity style={styles.menuRow}>
                <View style={[styles.menuIconCircle, { backgroundColor: item.color + '20' }]}>
                  <Ionicons name={item.icon as any} size={18} color={item.color} />
                </View>
                <Text style={styles.menuLabel}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#ccc" />
              </TouchableOpacity>
              {index < menuItems.length - 1 && <View style={styles.divider} />}
            </View>
          ))}
        </View>
      </View>

      {/* Logout Button */}
      <View style={styles.section}>
        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={20} color="#e74c3c" />
          <Text style={styles.logoutText}>Logout</Text>
        </TouchableOpacity>
      </View>

      <View style={{ height: 30 }} />

      <CustomAlert
        visible={alertConfig.visible}
        title={alertConfig.title}
        message={alertConfig.message}
        buttons={alertConfig.buttons}
        onClose={() => setAlertConfig(prev => ({ ...prev, visible: false }))}
      />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    paddingTop: 70,
    paddingBottom: 30,
    alignItems: 'center',
    borderBottomLeftRadius: 28,
    borderBottomRightRadius: 28,
  },
  avatarContainer: {
    marginBottom: 12,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.6)',
  },
  editBadge: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#e67e22',
    width: 26,
    height: 26,
    borderRadius: 13,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff',
  },
  name: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  email: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.85)',
  },
  statsRow: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    marginHorizontal: 16,
    marginTop: -20,
    borderRadius: 16,
    padding: 16,
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  statItem: {
    alignItems: 'center',
    flex: 1,
  },
  statNumber: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#e67e22',
    marginBottom: 2,
  },
  statLabel: {
    fontSize: 12,
    color: '#999',
  },
  statDivider: {
    width: 1,
    height: 30,
    backgroundColor: '#eee',
  },
  section: {
    paddingHorizontal: 16,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  infoCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
    gap: 14,
  },
  infoIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#fef0e6',
    justifyContent: 'center',
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 12,
    color: '#999',
    marginBottom: 2,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
  },
  menuCard: {
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingHorizontal: 16,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  menuRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    gap: 14,
  },
  menuIconCircle: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuLabel: {
    flex: 1,
    fontSize: 15,
    color: '#333',
    fontWeight: '500',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    borderRadius: 16,
    paddingVertical: 16,
    gap: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.06,
    shadowRadius: 4,
  },
  logoutText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#e74c3c',
  },
});