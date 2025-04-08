import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type GachaStoreNavigationProp = StackNavigationProp<RootStackParamList, 'GachaStore'>;

const GachaStore = () => {
  const navigation = useNavigation<GachaStoreNavigationProp>();

  const gachaOptions = [
    {
      id: 'disney',
      title: '迪士尼系列',
      icon: '🎠',
      items: [
        { id: 'd1', name: '米奇系列', points: 1000, image: '🎭' },
        { id: 'd2', name: '公主系列', points: 1200, image: '👑' },
        { id: 'd3', name: '玩具总动员', points: 800, image: '🤠' },
      ],
    },
    {
      id: 'bandai',
      title: '万代系列',
      icon: '🎮',
      items: [
        { id: 'b1', name: '高达系列', points: 1500, image: '🤖' },
        { id: 'b2', name: '龙珠系列', points: 1200, image: '🐉' },
        { id: 'b3', name: '假面骑士', points: 1000, image: '🦸' },
      ],
    },
    {
      id: 'sanrio',
      title: '三丽鸥系列',
      icon: '🎀',
      items: [
        { id: 's1', name: 'Hello Kitty', points: 800, image: '🐱' },
        { id: 's2', name: '美乐蒂', points: 900, image: '🐰' },
        { id: 's3', name: '库洛米', points: 1000, image: '🦇' },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>扭蛋商店</Text>
      </View>

      <ScrollView style={styles.content}>
        {gachaOptions.map((option) => (
          <View key={option.id} style={styles.optionContainer}>
            <View style={styles.optionHeader}>
              <Text style={styles.optionIcon}>{option.icon}</Text>
              <Text style={styles.optionTitle}>{option.title}</Text>
            </View>
            
            <View style={styles.itemsContainer}>
              {option.items.map((item) => (
                <TouchableOpacity key={item.id} style={styles.itemCard}>
                  <View style={styles.itemImageContainer}>
                    <Text style={styles.itemImage}>{item.image}</Text>
                  </View>
                  <View style={styles.itemInfo}>
                    <Text style={styles.itemName}>{item.name}</Text>
                    <View style={styles.pointsContainer}>
                      <Ionicons name="star" size={16} color="#FFD700" />
                      <Text style={styles.pointsText}>{item.points}</Text>
                    </View>
                  </View>
                  <TouchableOpacity style={styles.redeemButton}>
                    <Text style={styles.redeemButtonText}>抽取</Text>
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
  optionContainer: {
    marginBottom: 30,
  },
  optionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  optionIcon: {
    fontSize: 24,
    marginRight: 10,
  },
  optionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
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
  itemImageContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  itemImage: {
    fontSize: 24,
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
    backgroundColor: '#FF3B30',
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

export default GachaStore; 