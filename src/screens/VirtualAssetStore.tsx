import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type VirtualAssetStoreNavigationProp = StackNavigationProp<RootStackParamList, 'VirtualAssetStore'>;

const VirtualAssetStore = () => {
  const navigation = useNavigation<VirtualAssetStoreNavigationProp>();

  const categories = [
    {
      id: 'clothing',
      title: '虚拟服装',
      icon: 'shirt',
      items: [
        { id: 'c1', name: '可爱猫咪套装', points: 500, icon: '🐱' },
        { id: 'c2', name: '太空探险服', points: 800, icon: '🚀' },
        { id: 'c3', name: '魔法师斗篷', points: 600, icon: '✨' },
      ],
    },
    {
      id: 'decorations',
      title: '虚拟装饰',
      icon: 'home',
      items: [
        { id: 'd1', name: '星空主题房间', points: 1000, icon: '🌌' },
        { id: 'd2', name: '森林小屋', points: 1200, icon: '🌲' },
        { id: 'd3', name: '海底世界', points: 1500, icon: '🐠' },
      ],
    },
    {
      id: 'badges',
      title: '成就徽章',
      icon: 'ribbon',
      items: [
        { id: 'b1', name: '超级玩家', points: 300, icon: '🏆' },
        { id: 'b2', name: '创意大师', points: 400, icon: '🎨' },
        { id: 'b3', name: '探索者', points: 250, icon: '🔍' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>虚拟资产商店</Text>
      </View>

      <ScrollView style={styles.content}>
        {categories.map((category) => (
          <View key={category.id} style={styles.categoryContainer}>
            <View style={styles.categoryHeader}>
              <Ionicons name={category.icon} size={24} color="#007AFF" />
              <Text style={styles.categoryTitle}>{category.title}</Text>
            </View>
            
            <View style={styles.itemsContainer}>
              {category.items.map((item) => (
                <TouchableOpacity key={item.id} style={styles.itemCard}>
                  <View style={styles.itemIconContainer}>
                    <Text style={styles.itemIcon}>{item.icon}</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.pointsContainer}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.pointsText}>{item.points}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.redeemButton}>
                    <Text style={styles.redeemButtonText}>兑换</Text>
                  </TouchableOpacity>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5E5',
  },
  backButton: {
    marginRight: 10,
  },
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  categoryContainer: {
    marginBottom: 30,
  },
  categoryHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginLeft: 10,
    color: '#333',
  },
  itemsContainer: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  itemIconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemIcon: {
    fontSize: 20,
  },
  itemInfo: {
    flex: 1,
  },
  itemName: {
    fontSize: 16,
    color: '#333',
    marginBottom: 4,
  },
  pointsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 14,
    color: '#FF9500',
    marginLeft: 4,
  },
  redeemButton: {
    backgroundColor: '#007AFF',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 20,
  },
  redeemButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});

export default VirtualAssetStore; 