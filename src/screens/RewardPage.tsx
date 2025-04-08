import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Platform,
  ScrollView,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { StackNavigationProp } from '@react-navigation/stack';
import { RootStackParamList } from '../types/navigation';

type RewardPageNavigationProp = StackNavigationProp<RootStackParamList, 'MainTabs'>;

const RewardPage = () => {
  const navigation = useNavigation<RewardPageNavigationProp>();

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsTitle}>当前积分</Text>
        <View style={styles.pointsDisplay}>
          <Text style={styles.pointsValue}>1500</Text>
          <Text style={styles.pointsEmoji}>🎉</Text>
        </View>
        <Text style={styles.pointsSubtitle}>继续完成任务获取更多积分！</Text>
      </View>

      <View style={styles.storesContainer}>
        <TouchableOpacity 
          style={[styles.storeButton, styles.virtualStore]} 
          onPress={() => navigation.navigate('VirtualAssetStore')}
        >
          <View style={styles.storeIconContainer}>
            <Ionicons name="shirt" size={32} color="#fff" />
            <Text style={styles.storeIconEmoji}>🎮</Text>
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeTitle}>虚拟资产商店</Text>
            <Text style={styles.storeDescription}>兑换虚拟服装、装饰和徽章</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.storeButton, styles.gachaStore]} 
          onPress={() => navigation.navigate('GachaStore')}
        >
          <View style={styles.storeIconContainer}>
            <Ionicons name="gift" size={32} color="#fff" />
            <Text style={styles.storeIconEmoji}>🎁</Text>
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeTitle}>扭蛋商店</Text>
            <Text style={styles.storeDescription}>兑换迪士尼、万代等品牌扭蛋</Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.termsContainer}>
        <Text style={styles.termsTitle}>使用条款</Text>
        <ScrollView style={styles.termsContent}>
          <Text style={styles.termsText}>
            • 积分可以通过完成任务获得{'\n'}
            • 虚拟物品一经兑换，概不退换{'\n'}
            • 积分有效期为1年{'\n'}
            • 如有问题请联系客服
          </Text>
        </ScrollView>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  pointsContainer: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'white',
    marginBottom: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  pointsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  pointsDisplay: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginRight: 8,
  },
  pointsEmoji: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  pointsSubtitle: {
    fontSize: 14,
    color: '#666',
  },
  storesContainer: {
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  storeButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  virtualStore: {
    borderLeftWidth: 4,
    borderLeftColor: '#FF6B6B',
  },
  gachaStore: {
    borderLeftWidth: 4,
    borderLeftColor: '#4ECDC4',
  },
  storeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#FFF5F5',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  storeInfo: {
    flex: 1,
  },
  storeTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  storeDescription: {
    fontSize: 14,
    color: '#666',
  },
  storeIconEmoji: {
    fontSize: 24,
    color: '#FF6B6B',
  },
  termsContainer: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 12,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  termsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 16,
  },
  termsContent: {
    flex: 1,
  },
  termsText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default RewardPage; 