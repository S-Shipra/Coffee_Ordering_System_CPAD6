// screens/ConfirmScreen.js
import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { useCart } from '../context/CartContext';

const STAGES = [
  { emoji: '🧾', title: 'Order received', sub: 'We got your order' },
  { emoji: '☕', title: 'Brewing', sub: 'Our barista is on it' },
  { emoji: '🧁', title: 'Almost ready', sub: 'Adding the finishing touches' },
  { emoji: '✅', title: 'Ready for pickup!', sub: 'Collect it at the counter' },
];

export default function ConfirmScreen({ route, navigation }) {
  const { total, itemCount } = route.params;
  const { clearCart } = useCart();

  const [stage, setStage] = useState(0);
  // Random order number, generated once (the function form runs only on first render)
  const [orderNo] = useState(() => Math.floor(1000 + Math.random() * 9000));

  // Empty the cart once, when this screen first appears
  useEffect(() => {
    clearCart();
  }, []);

  // Timer: move to the next stage every 2.5 seconds
  useEffect(() => {
    if (stage >= STAGES.length - 1) {
      Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);
      return; // last stage reached, no more timer needed
    }
    const timer = setTimeout(() => setStage((s) => s + 1), 2500);
    return () => clearTimeout(timer); // cleanup if the screen closes early
  }, [stage]);

  const current = STAGES[stage];
  const done = stage === STAGES.length - 1;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.center}>
        <View style={[styles.circle, done && styles.circleDone]}>
          <Text style={styles.emoji}>{current.emoji}</Text>
        </View>
        <Text style={styles.title}>{current.title}</Text>
        <Text style={styles.sub}>{current.sub}</Text>

        {/* Progress dots */}
        <View style={styles.dots}>
          {STAGES.map((_, i) => (
            <View key={i} style={[styles.dot, i <= stage && styles.dotActive]} />
          ))}
        </View>

        {/* Order summary card */}
        <View style={styles.card}>
          <View style={styles.row}>
            <Text style={styles.label}>Order number</Text>
            <Text style={styles.value}>#{orderNo}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Items</Text>
            <Text style={styles.value}>{itemCount}</Text>
          </View>
          <View style={styles.row}>
            <Text style={styles.label}>Total paid</Text>
            <Text style={styles.value}>₹{total}</Text>
          </View>
        </View>
      </View>

      <TouchableOpacity
        style={[styles.btn, !done && styles.btnDisabled]}
        disabled={!done}
        onPress={() => navigation.navigate('Menu')}
        activeOpacity={0.85}
      >
        <Ionicons name="cafe" size={20} color="#FFFFFF" />
        <Text style={styles.btnText}>{done ? 'Back to menu' : 'Preparing...'}</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6EFE6', padding: 20 },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center' },
  circle: {
    width: 140,
    height: 140,
    borderRadius: 70,
    backgroundColor: '#F1E3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleDone: { backgroundColor: '#DDF1E3' },
  emoji: { fontSize: 64 },
  title: { fontSize: 26, fontWeight: '800', color: '#3B2A20', marginTop: 24 },
  sub: { fontSize: 14, color: '#8C7B6E', marginTop: 6 },
  dots: { flexDirection: 'row', marginTop: 24 },
  dot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#EADBC8',
    marginHorizontal: 5,
  },
  dotActive: { backgroundColor: '#C68B59' },
  card: {
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 16,
    marginTop: 32,
  },
  row: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 6 },
  label: { fontSize: 14, color: '#8C7B6E' },
  value: { fontSize: 14, fontWeight: '700', color: '#3B2A20' },
  btn: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#3B2A20',
    paddingVertical: 16,
    borderRadius: 18,
  },
  btnDisabled: { backgroundColor: '#B5A597' },
  btnText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginLeft: 8 },
});