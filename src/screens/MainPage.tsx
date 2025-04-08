import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Image,
  Animated,
  Easing,
  Dimensions,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const MainPage = () => {
  const [aiName, setAiName] = useState('小兔小鸭');
  const [isEditingName, setIsEditingName] = useState(false);
  const [subtitle, setSubtitle] = useState('你好啊！今天天气真不错！');
  const [isRecording, setIsRecording] = useState(false);
  const [gameLevel, setGameLevel] = useState(5);
  const [personality, setPersonality] = useState({
    友善度: 75,
    活跃度: 85,
    好奇心: 90,
  });

  // Animation values
  const bounceAnim = useRef(new Animated.Value(0)).current;
  const rotateAnim = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  const weatherInfo = '晴朗 24°C';
  const aiAge = '23小时';
  const batteryLevel = '85%';
  const currentEmotion = '开心';
  const awakeWord = '小兔小鸭';

  // Animation effects
  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(bounceAnim, {
          toValue: 1,
          duration: 1500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
        Animated.timing(bounceAnim, {
          toValue: 0,
          duration: 1500,
          easing: Easing.bounce,
          useNativeDriver: true,
        }),
      ])
    ).start();

    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const spin = rotateAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const renderPersonalityBar = (trait: string, value: number, key: string) => (
    <View key={key} style={styles.personalityItem}>
      <Text style={styles.personalityLabel}>{trait}</Text>
      <View style={styles.progressBarContainer}>
        <View style={[styles.progressBar, { width: `${value}%` }]} />
      </View>
      <Text style={styles.personalityValue}>{value}%</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.weatherContainer}>
          <Ionicons name="sunny" size={24} color="#FFB100" />
          <Text style={styles.weatherText}>{weatherInfo}</Text>
        </View>
        <View style={styles.batteryContainer}>
          <Ionicons name="battery-full" size={24} color="#4CAF50" />
          <Text style={styles.batteryText}>{batteryLevel}</Text>
        </View>
      </View>

      <Animated.View 
        style={[
          styles.avatarSection,
          {
            transform: [
              { translateY: bounceAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, -10],
              })},
            ],
          },
        ]}
      >
        <Animated.Image
          source={require('../../assets/avatars/rabbit-avatar.png')}
          style={[styles.avatar, { transform: [{ scale: pulseAnim }] }]}
        />
        <View style={styles.levelBadge}>
          <Text style={styles.levelText}>Lv.{gameLevel}</Text>
        </View>
        <View style={styles.nameSection}>
          {isEditingName ? (
            <TextInput
              style={styles.nameInput}
              value={aiName}
              onChangeText={setAiName}
              onBlur={() => setIsEditingName(false)}
              autoFocus
            />
          ) : (
            <TouchableOpacity onPress={() => setIsEditingName(true)}>
              <Text style={styles.nameText}>{aiName}</Text>
            </TouchableOpacity>
          )}
          <TouchableOpacity onPress={() => setIsEditingName(true)}>
            <Ionicons name="pencil" size={20} color="#666" />
          </TouchableOpacity>
        </View>
      </Animated.View>

      <View style={styles.infoContainer}>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>AI年龄</Text>
          <Text style={styles.infoValue}>{aiAge}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>当前情绪</Text>
          <Text style={styles.infoValue}>{currentEmotion}</Text>
        </View>
        <View style={styles.infoItem}>
          <Text style={styles.infoLabel}>唤醒词</Text>
          <Text style={styles.infoValue}>{awakeWord}</Text>
        </View>
      </View>

      <View style={styles.personalityContainer}>
        <Text style={styles.sectionTitle}>性格成长</Text>
        {Object.entries(personality).map(([trait, value]) => 
          renderPersonalityBar(trait, value, trait)
        )}
      </View>

      <View style={styles.subtitleContainer}>
        <Text style={styles.subtitleText}>{subtitle}</Text>
      </View>

      <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
        <TouchableOpacity
          style={[styles.recordButton, isRecording && styles.recording]}
          onPress={() => setIsRecording(!isRecording)}
        >
          <Ionicons
            name={isRecording ? "mic" : "mic-outline"}
            size={32}
            color="white"
          />
        </TouchableOpacity>
        {isRecording && (
          <Text style={styles.recordingText}>录音中，我在听...</Text>
        )}
      </Animated.View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  weatherContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  weatherText: {
    marginLeft: 8,
    fontSize: 16,
  },
  batteryContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  batteryText: {
    marginLeft: 8,
    fontSize: 16,
  },
  avatarSection: {
    alignItems: 'center',
    marginBottom: 30,
    position: 'relative',
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    marginBottom: 10,
    borderWidth: 3,
    borderColor: '#FFD700',
  },
  levelBadge: {
    position: 'absolute',
    top: 0,
    right: '30%',
    backgroundColor: '#FFD700',
    borderRadius: 15,
    paddingHorizontal: 10,
    paddingVertical: 5,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3,
  },
  levelText: {
    color: '#FFF',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nameSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
  },
  nameText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  nameInput: {
    fontSize: 24,
    fontWeight: 'bold',
    borderBottomWidth: 1,
    borderBottomColor: '#666',
    minWidth: 100,
    textAlign: 'center',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  personalityContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  personalityItem: {
    marginBottom: 12,
  },
  personalityLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  personalityValue: {
    fontSize: 12,
    color: '#666',
    position: 'absolute',
    right: 0,
    top: 0,
  },
  progressBarContainer: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  infoContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  infoItem: {
    alignItems: 'center',
  },
  infoLabel: {
    fontSize: 14,
    color: '#666',
    marginBottom: 5,
  },
  infoValue: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  subtitleContainer: {
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 15,
    marginBottom: 30,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  subtitleText: {
    fontSize: 16,
    textAlign: 'center',
    color: '#333',
  },
  recordButton: {
    backgroundColor: '#FF4081',
    width: 70,
    height: 70,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
  recording: {
    backgroundColor: '#E91E63',
  },
  recordingText: {
    color: '#E91E63',
    fontSize: 14,
    textAlign: 'center',
    marginTop: 8,
    fontWeight: '500',
  },
});

export default MainPage; 