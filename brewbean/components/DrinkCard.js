// components/DrinkCard.js
import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

// Props: drink (data object) and onPress (function from the parent)
export default function DrinkCard({ drink, onPress }) {
  return (
    <TouchableOpacity style={styles.card} onPress={onPress} activeOpacity={0.8}>
      <View style={styles.imageBox}>
        {drink.image ? (
          <Image source={drink.image} style={styles.image} resizeMode="cover" />
        ) : (
          <Text style={styles.emoji}>{drink.emoji}</Text>
        )}
      </View>

      <View style={styles.info}>
        <Text style={styles.name}>{drink.name}</Text>
        <Text style={styles.desc} numberOfLines={2}>
          {drink.description}
        </Text>

        <View style={styles.bottomRow}>
          <Text style={styles.price}>₹{drink.basePrice}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={14} color="#C68B59" />
            <Text style={styles.ratingText}>{drink.rating}</Text>
          </View>
        </View>
      </View>

      <View style={styles.addBtn}>
        <Ionicons name="add" size={22} color="#FFFFFF" />
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 12,
    marginBottom: 16,
    alignItems: 'center',
    shadowColor: '#3B2A20',
    shadowOpacity: 0.08,
    shadowRadius: 12,
    shadowOffset: { width: 0, height: 4 },
    elevation: 3,
  },
  imageBox: {
    width: 84,
    height: 84,
    borderRadius: 16,
    backgroundColor: '#F1E3D3',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  emoji: { fontSize: 40 },
  info: { flex: 1, marginLeft: 12 },
  name: { fontSize: 17, fontWeight: '700', color: '#3B2A20' },
  desc: { fontSize: 12, color: '#8C7B6E', marginTop: 4 },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 8,
    paddingRight: 8,
  },
  price: { fontSize: 16, fontWeight: '700', color: '#3B2A20' },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 4, fontSize: 12, color: '#8C7B6E' },
  addBtn: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: '#C68B59',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 4,
  },
});