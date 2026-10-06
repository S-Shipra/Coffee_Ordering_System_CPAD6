// screens/DetailScreen.js
import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import * as Haptics from 'expo-haptics';
import { SIZE_PRICES } from '../data/drinks';
import { useCart } from '../context/CartContext';

const EXTRAS = [
  { id: 'shot', label: 'Extra shot', price: 30 },
  { id: 'oat', label: 'Oat milk', price: 40 },
  { id: 'caramel', label: 'Caramel drizzle', price: 20 },
];

export default function DetailScreen({ route, navigation }) {
  const { drink } = route.params; // data passed from the Menu screen
  const { addToCart } = useCart();
  const isDessert = drink.category === 'Dessert';

  // State
  const [size, setSize] = useState('S');
  const [extras, setExtras] = useState([]); // array of selected extra ids
  const [quantity, setQuantity] = useState(1);
  const [liked, setLiked] = useState(false);

  // Price calculation (re-runs on every render, so it is always up to date)
  const extrasTotal = EXTRAS.filter((e) => extras.includes(e.id)).reduce(
    (sum, e) => sum + e.price,
    0
  );
  const unitPrice = drink.basePrice + (isDessert ? 0 : SIZE_PRICES[size]) + extrasTotal;
  const total = unitPrice * quantity;

  const toggleExtra = (id) => {
    setExtras((prev) =>
      prev.includes(id) ? prev.filter((e) => e !== id) : [...prev, id]
    );
  };

  const handleAdd = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    addToCart({
      key: `${drink.id}-${size}-${extras.slice().sort().join(',')}`,
      drink,
      size: isDessert ? null : size,
      extras: EXTRAS.filter((e) => extras.includes(e.id)).map((e) => e.label),
      quantity,
      unitPrice,
    });
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.scroll}>
        {/* Top bar */}
        <View style={styles.topBar}>
          <TouchableOpacity style={styles.roundBtn} onPress={() => navigation.goBack()}>
            <Ionicons name="chevron-back" size={22} color="#3B2A20" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.roundBtn} onPress={() => setLiked(!liked)}>
            <Ionicons
              name={liked ? 'heart' : 'heart-outline'}
              size={22}
              color={liked ? '#D64545' : '#3B2A20'}
            />
          </TouchableOpacity>
        </View>

        {/* Drink photo (emoji fallback if no image) */}
        <View style={styles.imageBox}>
          {drink.image ? (
            <Image source={drink.image} style={styles.image} resizeMode="cover" />
          ) : (
            <Text style={styles.emoji}>{drink.emoji}</Text>
          )}
        </View>

        {/* Name, rating, description */}
        <View style={styles.nameRow}>
          <Text style={styles.name}>{drink.name}</Text>
          <View style={styles.rating}>
            <Ionicons name="star" size={16} color="#C68B59" />
            <Text style={styles.ratingText}>{drink.rating}</Text>
          </View>
        </View>
        <Text style={styles.desc}>{drink.description}</Text>

        {/* Size selector (not for desserts) */}
        {!isDessert && (
          <>
            <Text style={styles.sectionTitle}>Size</Text>
            <View style={styles.row}>
              {['S', 'M', 'L'].map((s) => (
                <TouchableOpacity
                  key={s}
                  style={[styles.sizeBtn, size === s && styles.sizeBtnActive]}
                  onPress={() => setSize(s)}
                >
                  <Text style={[styles.sizeText, size === s && styles.sizeTextActive]}>{s}</Text>
                  <Text style={[styles.sizeSub, size === s && styles.sizeTextActive]}>
                    {SIZE_PRICES[s] === 0 ? 'Base' : `+₹${SIZE_PRICES[s]}`}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>

            {/* Extras */}
            <Text style={styles.sectionTitle}>Extras</Text>
            <View style={styles.wrapRow}>
              {EXTRAS.map((e) => {
                const active = extras.includes(e.id);
                return (
                  <TouchableOpacity
                    key={e.id}
                    style={[styles.extraChip, active && styles.extraChipActive]}
                    onPress={() => toggleExtra(e.id)}
                  >
                    <Text style={[styles.extraText, active && styles.extraTextActive]}>
                      {e.label} · +₹{e.price}
                    </Text>
                  </TouchableOpacity>
                );
              })}
            </View>
          </>
        )}

        {/* Quantity stepper */}
        <Text style={styles.sectionTitle}>Quantity</Text>
        <View style={styles.stepper}>
          <TouchableOpacity
            style={styles.stepBtn}
            onPress={() => setQuantity(Math.max(1, quantity - 1))}
          >
            <Ionicons name="remove" size={20} color="#3B2A20" />
          </TouchableOpacity>
          <Text style={styles.qty}>{quantity}</Text>
          <TouchableOpacity style={styles.stepBtn} onPress={() => setQuantity(quantity + 1)}>
            <Ionicons name="add" size={20} color="#3B2A20" />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* Bottom bar with live total */}
      <View style={styles.bottomBar}>
        <View>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalValue}>₹{total}</Text>
        </View>
        <TouchableOpacity style={styles.addBtn} onPress={handleAdd} activeOpacity={0.85}>
          <Ionicons name="cart" size={20} color="#FFFFFF" />
          <Text style={styles.addText}>Add to cart</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6EFE6' },
  scroll: { padding: 20, paddingBottom: 120 },
  topBar: { flexDirection: 'row', justifyContent: 'space-between' },
  roundBtn: {
    width: 42,
    height: 42,
    borderRadius: 21,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageBox: {
    height: 220,
    borderRadius: 28,
    backgroundColor: '#F1E3D3',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 16,
    overflow: 'hidden',
  },
  image: { width: '100%', height: '100%' },
  emoji: { fontSize: 100 },
  nameRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
  },
  name: { fontSize: 26, fontWeight: '800', color: '#3B2A20', flex: 1 },
  rating: { flexDirection: 'row', alignItems: 'center' },
  ratingText: { marginLeft: 4, fontSize: 15, fontWeight: '600', color: '#3B2A20' },
  desc: { fontSize: 14, color: '#8C7B6E', marginTop: 8, lineHeight: 20 },
  sectionTitle: { fontSize: 16, fontWeight: '700', color: '#3B2A20', marginTop: 24, marginBottom: 10 },
  row: { flexDirection: 'row', justifyContent: 'space-between' },
  wrapRow: { flexDirection: 'row', flexWrap: 'wrap' },
  sizeBtn: {
    flex: 1,
    marginHorizontal: 4,
    paddingVertical: 12,
    borderRadius: 16,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#EADBC8',
  },
  sizeBtnActive: { backgroundColor: '#3B2A20', borderColor: '#3B2A20' },
  sizeText: { fontSize: 18, fontWeight: '700', color: '#3B2A20' },
  sizeSub: { fontSize: 11, color: '#8C7B6E', marginTop: 2 },
  sizeTextActive: { color: '#FFFFFF' },
  extraChip: {
    paddingHorizontal: 14,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#EADBC8',
    marginRight: 8,
    marginBottom: 8,
  },
  extraChipActive: { backgroundColor: '#C68B59', borderColor: '#C68B59' },
  extraText: { fontSize: 13, color: '#3B2A20', fontWeight: '600' },
  extraTextActive: { color: '#FFFFFF' },
  stepper: { flexDirection: 'row', alignItems: 'center' },
  stepBtn: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: '#EADBC8',
  },
  qty: { fontSize: 20, fontWeight: '700', color: '#3B2A20', marginHorizontal: 20 },
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
  addBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#C68B59',
    paddingHorizontal: 24,
    paddingVertical: 14,
    borderRadius: 18,
  },
  addText: { color: '#FFFFFF', fontSize: 16, fontWeight: '700', marginLeft: 8 },
});