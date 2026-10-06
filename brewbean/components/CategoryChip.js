// components/CategoryChip.js
import React from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native';

// Props: label, active (true/false), onPress
export default function CategoryChip({ label, active, onPress }) {
  return (
    <TouchableOpacity
      style={[styles.chip, active && styles.chipActive]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <Text style={[styles.label, active && styles.labelActive]}>{label}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  chip: {
    paddingHorizontal: 18,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#EADBC8',
  },
  chipActive: {
    backgroundColor: '#3B2A20',
    borderColor: '#3B2A20',
  },
  label: { fontSize: 14, fontWeight: '600', color: '#8C7B6E' },
  labelActive: { color: '#FFFFFF' },
});