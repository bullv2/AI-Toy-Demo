import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Mission {
  id: string;
  title: string;
  points: number;
  completed: boolean;
  category: '生活' | '学习' | '运动';
}

const MissionPage = () => {
  const [missions, setMissions] = useState<Mission[]>([
    {
      id: '1',
      title: '整理房间和玩具',
      points: 20,
      completed: false,
      category: '生活',
    },
    {
      id: '2',
      title: '完成今天的作业',
      points: 30,
      completed: false,
      category: '学习',
    },
    {
      id: '3',
      title: '和小伙伴一起运动',
      points: 25,
      completed: false,
      category: '运动',
    },
    {
      id: '4',
      title: '阅读一本有趣的书',
      points: 15,
      completed: false,
      category: '学习',
    },
    {
      id: '5',
      title: '帮忙做家务',
      points: 20,
      completed: false,
      category: '生活',
    },
  ]);

  const [fadeAnims] = useState(() =>
    missions.map(() => new Animated.Value(1))
  );

  const [scaleAnims] = useState(() =>
    missions.map(() => new Animated.Value(1))
  );

  const [progressAnim] = useState(new Animated.Value(0));

  const totalPoints = missions.reduce((sum, mission) => sum + mission.points, 0);
  const earnedPoints = missions
    .filter((mission) => mission.completed)
    .reduce((sum, mission) => sum + mission.points, 0);
  const progress = earnedPoints / totalPoints;

  useEffect(() => {
    Animated.timing(progressAnim, {
      toValue: progress,
      duration: 600,
      useNativeDriver: false,
    }).start();
  }, [progress]);

  const toggleMission = (id: string) => {
    const missionIndex = missions.findIndex((m) => m.id === id);
    
    // Animate the mission item
    Animated.sequence([
      Animated.parallel([
        Animated.timing(scaleAnims[missionIndex], {
          toValue: 0.95,
          duration: 100,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnims[missionIndex], {
          toValue: 0.5,
          duration: 100,
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(scaleAnims[missionIndex], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
        Animated.timing(fadeAnims[missionIndex], {
          toValue: 1,
          duration: 200,
          useNativeDriver: true,
        }),
      ]),
    ]).start();

    // Update mission status
    setMissions(missions.map((mission) =>
      mission.id === id
        ? { ...mission, completed: !mission.completed }
        : mission
    ));
  };

  const formatDate = () => {
    const today = new Date();
    return `${today.getMonth() + 1}月${today.getDate()}日`;
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>{formatDate()} 今日任务</Text>
        <View style={styles.pointsSummary}>
          <Text style={styles.pointsText}>
            已获得: {earnedPoints}/{totalPoints} 积分
          </Text>
        </View>
      </View>

      <ScrollView style={styles.missionList}>
        {missions.map((mission, index) => (
          <Animated.View
            key={mission.id}
            style={[
              styles.missionItem,
              {
                opacity: fadeAnims[index],
                transform: [{ scale: scaleAnims[index] }],
              },
            ]}
          >
            <TouchableOpacity
              style={styles.missionContent}
              onPress={() => toggleMission(mission.id)}
            >
              <View style={styles.missionLeft}>
                <View style={[
                  styles.categoryTag,
                  { backgroundColor: getCategoryColor(mission.category) }
                ]}>
                  <Text style={styles.categoryText}>{mission.category}</Text>
                </View>
                <Text style={[
                  styles.missionTitle,
                  mission.completed && styles.completedText
                ]}>
                  {mission.title}
                </Text>
              </View>
              
              <View style={styles.missionRight}>
                <Text style={styles.pointsLabel}>+{mission.points}</Text>
                <View style={styles.checkboxContainer}>
                  <Ionicons
                    name={mission.completed ? "checkmark-circle" : "checkmark-circle-outline"}
                    size={24}
                    color={mission.completed ? "#4CAF50" : "#BDBDBD"}
                  />
                </View>
              </View>
            </TouchableOpacity>
          </Animated.View>
        ))}
      </ScrollView>

      <View style={styles.progressContainer}>
        <View style={styles.progressBackground}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progressAnim.interpolate({
                  inputRange: [0, 1],
                  outputRange: ['0%', '100%'],
                }),
              },
            ]}
          />
        </View>
        <Text style={styles.progressText}>
          完成进度: {Math.round(progress * 100)}%
        </Text>
      </View>
    </View>
  );
};

const getCategoryColor = (category: string) => {
  switch (category) {
    case '生活':
      return '#FF9800';
    case '学习':
      return '#2196F3';
    case '运动':
      return '#4CAF50';
    default:
      return '#9E9E9E';
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  header: {
    marginBottom: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  pointsSummary: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  pointsText: {
    fontSize: 16,
    color: '#666',
  },
  missionList: {
    flex: 1,
    marginBottom: 20,
  },
  missionItem: {
    backgroundColor: 'white',
    borderRadius: 12,
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  missionContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  missionLeft: {
    flex: 1,
    flexDirection: 'column',
    gap: 8,
  },
  categoryTag: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 4,
    alignSelf: 'flex-start',
  },
  categoryText: {
    color: 'white',
    fontSize: 12,
    fontWeight: '500',
  },
  missionTitle: {
    fontSize: 16,
    color: '#333',
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: '#999',
  },
  missionRight: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  pointsLabel: {
    fontSize: 16,
    color: '#FF9800',
    fontWeight: 'bold',
  },
  checkboxContainer: {
    width: 28,
    height: 28,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    marginTop: 'auto',
    paddingTop: 20,
  },
  progressBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBar: {
    height: '100%',
    backgroundColor: '#4CAF50',
    borderRadius: 4,
  },
  progressText: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
  },
});

export default MissionPage; 