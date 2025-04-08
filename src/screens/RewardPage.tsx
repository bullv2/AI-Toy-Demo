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

const RewardPage = () => {
  const currentPoints = 1500; // This would come from your state management

  return (
    <View style={styles.container}>
      <View style={styles.pointsContainer}>
        <Text style={styles.pointsLabel}>当前积分</Text>
        <Text style={styles.pointsValue}>🎉 {currentPoints}</Text>
        <Text style={styles.pointsSubtitle}>继续完成任务获取更多积分！</Text>
      </View>

      <View style={styles.storesContainer}>
        <TouchableOpacity 
          style={[styles.storeButton, styles.virtualStore]}
          onPress={() => {/* Navigate to virtual store */}}
        >
          <View style={styles.storeIconContainer}>
            <Ionicons name="shirt-outline" size={32} color="#FF6B6B" />
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeTitle}>🎮 虚拟装扮商店</Text>
            <Text style={styles.storeDescription}>
              兑换虚拟服装、装饰和徽章
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>

        <TouchableOpacity 
          style={[styles.storeButton, styles.gachaStore]}
          onPress={() => {/* Navigate to gacha store */}}
        >
          <View style={styles.storeIconContainer}>
            <Ionicons name="gift-outline" size={32} color="#4ECDC4" />
          </View>
          <View style={styles.storeInfo}>
            <Text style={styles.storeTitle}>🎁 扭蛋兑换商店</Text>
            <Text style={styles.storeDescription}>
              兑换迪士尼、万代等品牌扭蛋
            </Text>
          </View>
          <Ionicons name="chevron-forward" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.termsContainer}>
        <Text style={styles.termsTitle}>积分使用说明</Text>
        <View style={styles.termItem}>
          <Text style={styles.termBullet}>•</Text>
          <Text style={styles.termText}>
            积分可通过完成任务、每日签到等方式获取
          </Text>
        </View>
        <View style={styles.termItem}>
          <Text style={styles.termBullet}>•</Text>
          <Text style={styles.termText}>
            虚拟装扮和扭蛋兑换后不可退款
          </Text>
        </View>
        <View style={styles.termItem}>
          <Text style={styles.termBullet}>•</Text>
          <Text style={styles.termText}>
            积分有效期至2024年12月31日
          </Text>
        </View>
        <View style={styles.termItem}>
          <Text style={styles.termBullet}>•</Text>
          <Text style={styles.termText}>
            如有疑问，请联系客服
          </Text>
        </View>
      </ScrollView>
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
  pointsLabel: {
    fontSize: 16,
    color: '#666',
    marginBottom: 8,
  },
  pointsValue: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FF6B6B',
    marginBottom: 8,
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
  termItem: {
    flexDirection: 'row',
    marginBottom: 12,
  },
  termBullet: {
    color: '#FF6B6B',
    marginRight: 8,
    fontSize: 16,
  },
  termText: {
    flex: 1,
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default RewardPage; 