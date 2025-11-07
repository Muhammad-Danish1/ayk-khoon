import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput } from 'react-native';
import { Ionicons, MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors, Spacing, Typography, Shadows } from '../../../../src/theme';
import { Card } from '../../../../src/components/Card';

// Mock data for blood stock
const bloodTypes = ['A+', 'A-', 'B+', 'B-', 'O+', 'O-', 'AB+', 'AB-'];

const initialStock = bloodTypes.map(type => ({
  type,
  units: Math.floor(Math.random() * 20),
  lastUpdated: `${Math.floor(Math.random() * 7) + 1} days ago`,
  status: ['Safe', 'Low', 'Critical'][Math.floor(Math.random() * 3)] as 'Safe' | 'Low' | 'Critical'
}));

const statusColors = {
  Safe: Colors.success,
  Low: Colors.warning,
  Critical: Colors.error,
};

export default function StockManagementScreen() {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const [stock, setStock] = useState(initialStock);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editValue, setEditValue] = useState('');

  const filteredStock = stock.filter(item => 
    item.type.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleUpdateStock = (id: string) => {
    if (editingId === id) {
      // Save the updated value
      const updatedStock = stock.map(item => 
        item.type === id ? { ...item, units: parseInt(editValue) || 0 } : item
      );
      setStock(updatedStock);
      setEditingId(null);
    } else {
      // Start editing
      const item = stock.find(item => item.type === id);
      setEditValue(item ? item.units.toString() : '0');
      setEditingId(id);
    }
  };

  const getStatus = (units: number) => {
    if (units <= 2) return 'Critical';
    if (units <= 5) return 'Low';
    return 'Safe';
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Blood Stock</Text>
        <View style={styles.headerIcons}>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="filter" size={20} color={Colors.primary} />
          </TouchableOpacity>
          <TouchableOpacity style={styles.headerButton}>
            <Ionicons name="refresh" size={20} color={Colors.primary} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Bar */}
      <View style={styles.searchContainer}>
        <Ionicons name="search" size={20} color={Colors.text.secondary} style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Search blood type..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          placeholderTextColor={Colors.text.tertiary}
        />
        {searchQuery.length > 0 && (
          <TouchableOpacity 
            onPress={() => setSearchQuery('')} 
            style={styles.clearButton}
          >
            <Ionicons name="close-circle" size={18} color={Colors.text.secondary} />
          </TouchableOpacity>
        )}
      </View>

      {/* Stock Summary */}
      <View style={styles.summaryContainer}>
        <View style={styles.summaryItem}>
          <Text style={styles.summaryValue}>
            {stock.filter(item => getStatus(item.units) === 'Critical').length}
          </Text>
          <Text style={styles.summaryLabel}>Critical</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: Colors.warning }]}>
            {stock.filter(item => getStatus(item.units) === 'Low').length}
          </Text>
          <Text style={styles.summaryLabel}>Low</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: Colors.success }]}>
            {stock.filter(item => getStatus(item.units) === 'Safe').length}
          </Text>
          <Text style={styles.summaryLabel}>Safe</Text>
        </View>
        <View style={styles.summaryItem}>
          <Text style={[styles.summaryValue, { color: Colors.primary }]}>
            {stock.reduce((sum, item) => sum + item.units, 0)}
          </Text>
          <Text style={styles.summaryLabel}>Total Units</Text>
        </View>
      </View>

      {/* Blood Stock List */}
      <ScrollView style={styles.stockList}>
        {filteredStock.map((item) => {
          const status = getStatus(item.units);
          const statusColor = statusColors[status];
          
          return (
            <Card key={item.type} style={styles.stockItem}>
              <View style={styles.bloodTypeContainer}>
                <Text style={styles.bloodType}>{item.type}</Text>
                <View style={[styles.statusBadge, { backgroundColor: `${statusColor}20` }]}>
                  <Text style={[styles.statusText, { color: statusColor }]}>{status}</Text>
                </View>
              </View>
              
              <View style={styles.stockInfo}>
                <View style={styles.unitsContainer}>
                  <Text style={styles.unitsLabel}>Units:</Text>
                  {editingId === item.type ? (
                    <TextInput
                      style={styles.unitsInput}
                      value={editValue}
                      onChangeText={setEditValue}
                      keyboardType="numeric"
                      autoFocus
                    />
                  ) : (
                    <Text style={[styles.unitsValue, { color: statusColor }]}>
                      {item.units} units
                    </Text>
                  )}
                </View>
                
                <View style={styles.lastUpdated}>
                  <Ionicons 
                    name="time-outline" 
                    size={14} 
                    color={Colors.text.secondary} 
                  />
                  <Text style={styles.lastUpdatedText}>{item.lastUpdated}</Text>
                </View>
              </View>
              
              <View style={styles.actions}>
                <TouchableOpacity 
                  style={[styles.actionButton, { marginRight: Spacing.sm }]}
                  onPress={() => handleUpdateStock(item.type)}
                >
                  <Ionicons 
                    name={editingId === item.type ? 'checkmark' : 'pencil'} 
                    size={16} 
                    color={Colors.white} 
                  />
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={[styles.actionButton, { backgroundColor: Colors.error }]}
                  onPress={() => {
                    // Handle delete action
                    setStock(stock.filter(i => i.type !== item.type));
                  }}
                >
                  <Ionicons name="trash-outline" size={16} color={Colors.white} />
                </TouchableOpacity>
              </View>
            </Card>
          );
        })}
      </ScrollView>

      {/* Add Blood Type Button */}
      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => {
          // Navigate to add blood type screen or show modal
          Alert.alert('Add Blood Type', 'This feature will be available soon!');
        }}
      >
        <Ionicons name="add" size={24} color={Colors.white} />
        <Text style={styles.addButtonText}>Add Blood Type</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: Spacing.lg,
    backgroundColor: Colors.white,
    ...Shadows.small,
  },
  backButton: {
    padding: Spacing.xs,
  },
  headerTitle: {
    fontSize: Typography.fontSize.xl,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  headerIcons: {
    flexDirection: 'row',
  },
  headerButton: {
    padding: Spacing.xs,
    marginLeft: Spacing.sm,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.white,
    borderRadius: 8,
    margin: Spacing.lg,
    paddingHorizontal: Spacing.md,
    ...Shadows.small,
  },
  searchIcon: {
    marginRight: Spacing.sm,
  },
  searchInput: {
    flex: 1,
    height: 48,
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  clearButton: {
    padding: Spacing.xs,
  },
  summaryContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: Spacing.lg,
    marginBottom: Spacing.lg,
  },
  summaryItem: {
    alignItems: 'center',
  },
  summaryValue: {
    fontSize: Typography.fontSize['xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.error,
    marginBottom: Spacing.xxs,
  },
  summaryLabel: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
  },
  stockList: {
    flex: 1,
    paddingHorizontal: Spacing.lg,
  },
  stockItem: {
    marginBottom: Spacing.md,
    padding: Spacing.md,
  },
  bloodTypeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.sm,
  },
  bloodType: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: Spacing.sm,
    paddingVertical: 2,
    borderRadius: 10,
  },
  statusText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.semibold,
  },
  stockInfo: {
    marginBottom: Spacing.sm,
  },
  unitsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: Spacing.xxs,
  },
  unitsLabel: {
    fontSize: Typography.fontSize.base,
    color: Colors.text.secondary,
    marginRight: Spacing.sm,
  },
  unitsValue: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
  },
  unitsInput: {
    borderWidth: 1,
    borderColor: Colors.border.light,
    borderRadius: 4,
    padding: 4,
    width: 60,
    textAlign: 'center',
  },
  lastUpdated: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  lastUpdatedText: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.secondary,
    marginLeft: Spacing.xxs,
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    marginTop: Spacing.sm,
  },
  actionButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  addButton: {
    flexDirection: 'row',
    backgroundColor: Colors.primary,
    borderRadius: 8,
    padding: Spacing.md,
    margin: Spacing.lg,
    justifyContent: 'center',
    alignItems: 'center',
    ...Shadows.medium,
  },
  addButtonText: {
    color: Colors.white,
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    marginLeft: Spacing.sm,
  },
});
