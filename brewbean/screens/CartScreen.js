// screens/CartScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import CartItem from '../components/CartItem';
import { useCart } from '../context/CartContext';

const PROMO_CODE = 'COFFEE10'; // gives 10% off
const TAX_RATE = 0.05; // 5% tax

export default function CartScreen({ navigation }) {
  const { items, updateQuantity, removeItem, clearCart } = useCart();

  // State
  const [promoInput, setPromoInput] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');

  // Totals are derived from items + promoApplied on every render
  const subtotal = items.reduce((sum, i) => sum + i.unitPrice * i.quantity, 0);
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const tax = Math.round((subtotal - discount) * TAX_RATE);
  const total = subtotal - discount + tax;

  const applyPromo = () => {
    if (promoInput.trim().toUpperCase() === PROMO_CODE) {
      setPromoApplied(true);
      setPromoError('');
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    } else {
      setPromoApplied(false);
      setPromoError('Invalid promo code');
    }
  };

  const placeOrder = () => {
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
    const itemCount = items.reduce((sum, i) => sum + i.quantity, 0);
    navigation.replace('Confirm', { total, itemCount });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Top bar */}
      <View style={styles.topBar}>
        <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.goBack()}>
          <Ionicons name="chevron-back" size={22} color="#3B2A20" />
        </TouchableOpacity>
        <Text style={styles.title}>My Cart</Text>
        {items.length > 0 ? (
          <TouchableOpacity onPress={clearCart}>
            <Text style={styles.clear}>Clear</Text>
          </TouchableOpacity>
        ) : (
          <View style={{ width: 42 }} />
        )}
      </View>

      {items.length === 0 ? (
        // Empty state
        <View style={styles.empty}>
          <Text style={styles.emptyEmoji}>🛒</Text>
          <Text style={styles.emptyTitle}>Your cart is empty</Text>
          <Text style={styles.emptySub}>Add something tasty from the menu</Text>
          <TouchableOpacity style={styles.browseBtn} onPress={() => navigation.goBack()}>
            <Text style={styles.browseText}>Browse menu</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.key}
            renderItem={({ item }) => (
              <CartItem
                item={item}
                onIncrease={() => updateQuantity(item.key, 1)}
                onDecrease={() => updateQuantity(item.key, -1)}
                onRemove={() => removeItem(item.key)}
              />
            )}
            contentContainerStyle={styles.list}
            showsVerticalScrollIndicator={false}
            ListFooterComponent={
              <View>
                {/* Promo code */}
                <View style={styles.promoRow}>
                  <TextInput
                    style={styles.promoInput}
                    placeholder="Promo code (try COFFEE10)"
                    placeholderTextColor="#B5A597"
                    value={promoInput}
                    onChangeText={setPromoInput}
                    autoCapitalize="characters"
                  />
                  <TouchableOpacity style={styles.applyBtn} onPress={applyPromo}>
                    <Text style={styles.applyText}>Apply</Text>
                  </TouchableOpacity>
                </View>
                {promoError.length > 0 && <Text style={styles.error}>{promoError}</Text>}
                {promoApplied && <Text style={styles.success}>Promo applied: 10% off 🎉</Text>}

                {/* Summary */}
                <View style={styles.summary}>
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Subtotal</Text>
                    <Text style={styles.summaryValue}>₹{subtotal}</Text>
                  </View>
                  {promoApplied && (
                    <View style={styles.summaryRow}>
                      <Text style={styles.summaryLabel}>Discount (10%)</Text>
                      <Text style={[styles.summaryValue, { color: '#3C9A5F' }]}>-₹{discount}</Text>
                    </View>
                  )}
                  <View style={styles.summaryRow}>
                    <Text style={styles.summaryLabel}>Tax (5%)</Text>
                    <Text style={styles.summaryValue}>₹{tax}</Text>
                  </View>
                </View>
              </View>
            }
          />

          {/* Bottom bar */}
          <View style={styles.bottomBar}>
            <View>
              <Text style={styles.totalLabel}>Total</Text>
              <Text style={styles.totalValue}>₹{total}</Text>
            </View>
            <TouchableOpacity style={styles.orderBtn} onPress={placeOrder} activeOpacity={0.85}>
              <Text style={styles.orderText}>Place order</Text>
            </TouchableOpacity>
          </View>
        </>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6EFE6' },
  topBar: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: 12,
  },
  roundBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: { fontSize: 20, fontWeight: '800', color: '#3B2A20' },
  clear: { fontSize: 14, fontWeight: '600', color: '#D64545', width: 42, textAlign: 'right' },
  list: { padding: 20, paddingBottom: 120 },

  promoRow: { flexDirection: 'row', marginTop: 8 },
  promoInput: {
    flex: 1,
    height: 48,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 14,
    fontSize: 14,
    color: '#3B2A20',
    borderWidth: 1,
    borderColor: '#EADBC8',
  },
  applyBtn: {
    marginLeft: 10,
    paddingHorizontal: 20,
    borderRadius: 16,
    backgroundColor: '#3B2A20',
    alignItems: 'center',
    justifyContent: 'center',
  },
  applyText: { color: '#FFFFFF', fontWeight: '700' },
  error: { color: '#D64545', fontSize: 12, marginTop: 6, marginLeft: 4 },
  success: { color: '#3C9A5F', fontSize: 12, marginTop: 6, marginLeft: 4 },

  summary: { marginTop: 20, backgroundColor: '#FFFFFF', borderRadius: 20, padding: 16 },
  summaryRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  summaryLabel: { fontSize: 14, color: '#8C7B6E' },
  summaryValue: { fontSize: 14, fontWeight: '600', color: '#3B2A20' },

  bottomBar: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
  },
  totalLabel: { fontSize: 12, color: '#8C7B6E' },
  totalValue: { fontSize: 24, fontWeight: '800', color: '#3B2A20' },
  orderBtn: {
    backgroundColor: '#C68B59',
    paddingHorizontal: 32,
    paddingVertical: 14,
    borderRadius: 18,
  },
  orderText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700' },

  empty: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  emptyEmoji: { fontSize: 60 },
  emptyTitle: { fontSize: 20, fontWeight: '800', color: '#3B2A20', marginTop: 12 },
  emptySub: { fontSize: 14, color: '#8C7B6E', marginTop: 4 },
  browseBtn: {
    marginTop: 20,
    backgroundColor: '#3B2A20',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 16,
  },
  browseText: { color: '#FFFFFF', fontWeight: '700' },
});