// screens/MenuScreen.js
import React, { useState } from 'react';
import {
  View,
  Text,
  FlatList,
  ScrollView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import DrinkCard from '../components/DrinkCard';
import CategoryChip from '../components/CategoryChip';
import { DRINKS, CATEGORIES } from '../data/drinks';
import { useCart } from '../context/CartContext';

export default function MenuScreen({ navigation }) {
  const { cartCount } = useCart();

  // State: values that change while the app runs
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [search, setSearch] = useState('');

  // Filter the menu by category AND search text
  const filteredDrinks = DRINKS.filter((drink) => {
    const matchesCategory =
      selectedCategory === 'All' || drink.category === selectedCategory;
    const matchesSearch = drink.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Good morning ☕</Text>
          <Text style={styles.title}>Brew & Bean</Text>
        </View>
        <TouchableOpacity
          style={styles.cartBtn}
          onPress={() => navigation.navigate('Cart')}
        >
          <Ionicons name="cart-outline" size={24} color="#3B2A20" />
          {cartCount > 0 && (
            <View style={styles.badge}>
              <Text style={styles.badgeText}>{cartCount}</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>

      {/* Search bar */}
      <View style={styles.searchBox}>
        <Ionicons name="search" size={20} color="#8C7B6E" />
        <TextInput
          style={styles.searchInput}
          placeholder="Search your drink..."
          placeholderTextColor="#B5A597"
          value={search}
          onChangeText={setSearch}
        />
        {search.length > 0 && (
          <TouchableOpacity onPress={() => setSearch('')}>
            <Ionicons name="close-circle" size={20} color="#B5A597" />
          </TouchableOpacity>
        )}
      </View>

      {/* Category chips */}
      <View style={styles.chipWrap}>
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.chipRowContent}
        >
          {CATEGORIES.map((cat) => (
            <CategoryChip
              key={cat}
              label={cat}
              active={selectedCategory === cat}
              onPress={() => setSelectedCategory(cat)}
            />
          ))}
        </ScrollView>
      </View>

      {/* Drink list */}
      <FlatList
        data={filteredDrinks}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <DrinkCard
            drink={item}
            onPress={() => navigation.navigate('Detail', { drink: item })}
          />
        )}
        contentContainerStyle={styles.list}
        showsVerticalScrollIndicator={false}
        keyboardShouldPersistTaps="handled"
        ListEmptyComponent={
          <View style={styles.empty}>
            <Text style={styles.emptyEmoji}>🫗</Text>
            <Text style={styles.emptyText}>No drinks found</Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F6EFE6' },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 8,
  },
  cartBtn: {
    width: 46,
    height: 46,
    borderRadius: 23,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  badge: {
    position: 'absolute',
    top: -2,
    right: -2,
    minWidth: 20,
    height: 20,
    borderRadius: 10,
    backgroundColor: '#C68B59',
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 4,
  },
  badgeText: { color: '#FFFFFF', fontSize: 11, fontWeight: '700' },
  greeting: { fontSize: 14, color: '#8C7B6E' },
  title: { fontSize: 30, fontWeight: '800', color: '#3B2A20', marginTop: 2 },

  searchBox: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    marginHorizontal: 20,
    marginTop: 8,
    paddingHorizontal: 14,
    height: 48,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#EADBC8',
  },
  searchInput: { flex: 1, marginLeft: 10, fontSize: 15, color: '#3B2A20' },

  chipWrap: { height: 44, marginTop: 16, flexGrow: 0, flexShrink: 0 },
  chipRowContent: { paddingHorizontal: 20, alignItems: 'center' },

  list: { padding: 20 },
  empty: { alignItems: 'center', marginTop: 60 },
  emptyEmoji: { fontSize: 48 },
  emptyText: { marginTop: 8, fontSize: 16, color: '#8C7B6E' },
});