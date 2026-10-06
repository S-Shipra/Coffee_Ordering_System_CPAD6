// components/CartItem.js
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Props: item, onIncrease, onDecrease, onRemove
export default function CartItem({ item, onIncrease, onDecrease, onRemove }) {
  const details = [item.size, ...item.extras].filter(Boolean).join(' · ');

  return (
    <View style={styles.card}>
      <View style={styles.imageBox}>
        <Text style={styles.emoji}>{item.drink.emoji}</Text>
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{item.drink.name}</Text>
        {details.length > 0 && <Text style={styles.details}>{details}</Text>}
        <Text style={styles.price}>₹{item.unitPrice * item.quantity}</Text>
      </View>

      <View style={styles.right}>
        <TouchableOpacity onPress={onRemove}>
          <Ionicons name="trash-outline" size={20} color="#D64545" />
        </TouchableOpacity>
        <View style={styles.stepper}>
          <TouchableOpacity style={styles.stepBtn} onPress={onDecrease}>
            <Ionicons name="remove" size={16} color="#3B2A20" />
          </TouchableOpacity>
          <Text style={styles.qty}>{item.quantity}</Text>
          <TouchableOpacity style={styles.stepBtn} onPress={onIncrease}>
            <Ionicons name="add" size={16} color="#3B2A20" />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 12,
  },
  imageBox: {
    width: 64,
    height: 64,
    borderRadius: 14,
    backgroundColor: '#F1E3D3',
    alignItems: 'center',
    justifyContent: 'center',
  },
  emoji: { fontSize: 30 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 16, fontWeight: '700', color: '#3B2A20' },
  details: { fontSize: 12, color: '#8C7B6E', marginTop: 2 },
  price: { fontSize: 15, fontWeight: '700', color: '#C68B59', marginTop: 6 },
  right: { alignItems: 'flex-end', justifyContent: 'space-between', height: 64 },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepBtn: {
    width: 26,
    height: 26,
    borderRadius: 13,
    backgroundColor: '#F6EFE6',
    alignItems: 'center',
    justifyContent: 'center',
  },
  qty: { marginHorizontal: 10, fontSize: 15, fontWeight: '700', color: '#3B2A20' },
});