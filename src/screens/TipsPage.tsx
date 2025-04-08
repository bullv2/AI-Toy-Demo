import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Animated,
  Platform,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

const TIPS = [
  {
    title: '🏃 保持活力',
    description: '让身体动起来，让思维更敏捷',
    bullets: [
      '到户外散步10分钟',
      '做一些轻度拉伸',
      '尝试新的运动方式',
      '随着喜欢的音乐跳舞',
    ],
    color: '#FF6B6B',
  },
  {
    title: '📚 学习新知识',
    description: '每天扩展你的知识面',
    bullets: [
      '阅读15分钟书籍',
      '观看教育视频',
      '尝试新的兴趣爱好',
      '学习一门新语言',
    ],
    color: '#4ECDC4',
  },
  {
    title: '👥 与他人交流',
    description: '建立有意义的人际关系',
    bullets: [
      '给朋友或家人打电话',
      '加入社区团体',
      '与他人分享你的想法',
      '帮助有需要的人',
    ],
    color: '#45B7D1',
  },
  {
    title: '🧘 练习正念',
    description: '关注你的心理健康',
    bullets: [
      '冥想5分钟',
      '练习深呼吸',
      '写日记',
      '花时间亲近大自然',
    ],
    color: '#96CEB4',
  },
  {
    title: '📝 保持条理',
    description: '让生活井然有序',
    bullets: [
      '制定待办事项清单',
      '整理工作空间',
      '提前规划一周',
      '设定可实现的目标',
    ],
    color: '#FFEEAD',
  },
  {
    title: '🎨 培养创造力',
    description: '激发你的艺术潜能',
    bullets: [
      '尝试绘画或涂鸦',
      '写一首诗或短篇故事',
      '学习一种乐器',
      '尝试摄影或视频制作',
    ],
    color: '#D4A5A5',
  },
  {
    title: '🥗 健康饮食',
    description: '关注你的营养摄入',
    bullets: [
      '尝试新的健康食谱',
      '多吃新鲜水果和蔬菜',
      '保持充足的水分摄入',
      '注意饮食的多样性',
    ],
    color: '#9B59B6',
  },
  {
    title: '📱 数字健康',
    description: '合理使用科技产品',
    bullets: [
      '设置屏幕使用时间限制',
      '定期整理手机照片',
      '清理不必要的应用',
      '尝试数字排毒',
    ],
    color: '#3498DB',
  },
  {
    title: '🌱 环保生活',
    description: '为地球做出贡献',
    bullets: [
      '减少一次性用品使用',
      '尝试垃圾分类',
      '节约用水用电',
      '选择环保出行方式',
    ],
    color: '#2ECC71',
  },
  {
    title: '🙏 感恩练习',
    description: '培养积极心态',
    bullets: [
      '记录三件感恩的事',
      '向他人表达感谢',
      '关注生活中的小确幸',
      '分享你的感恩故事',
    ],
    color: '#F1C40F',
  },
];

const TipsPage = () => {
  const [currentTips, setCurrentTips] = useState<number[]>([0, 1, 2]);
  const [expandedTip, setExpandedTip] = useState<number | null>(null);
  const fadeAnims = useState([
    new Animated.Value(1),
    new Animated.Value(1),
    new Animated.Value(1),
  ])[0];
  const currentTipsRef = useRef<number[]>(currentTips);
  const swapIndexRef = useRef(0);
  const usedTipsRef = useRef<Set<number>>(new Set([0, 1, 2]));

  useEffect(() => {
    currentTipsRef.current = currentTips;
  }, [currentTips]);

  const getNextUniqueTip = (currentTips: number[]): number => {
    const usedTips = new Set([...currentTips, ...Array.from(usedTipsRef.current)]);
    const availableTips = Array.from({ length: TIPS.length }, (_, i) => i)
      .filter(i => !usedTips.has(i));
    
    if (availableTips.length === 0) {
      // If all tips have been used, reset the used tips set
      usedTipsRef.current = new Set(currentTips);
      return (Math.max(...currentTips) + 1) % TIPS.length;
    }
    
    return availableTips[Math.floor(Math.random() * availableTips.length)];
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const currentIndex = swapIndexRef.current;
      
      // Fade out the current tip
      Animated.timing(fadeAnims[currentIndex], {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => {
        // Update the tip after fade out
        const newTips = [...currentTipsRef.current];
        const nextTip = getNextUniqueTip(newTips);
        newTips[currentIndex] = nextTip;
        usedTipsRef.current.add(nextTip);
        setCurrentTips(newTips);

        // Fade in the new tip
        Animated.timing(fadeAnims[currentIndex], {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }).start();
      });

      // Move to the next tip for the next swap
      swapIndexRef.current = (currentIndex + 1) % 3;
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const toggleExpand = (index: number) => {
    setExpandedTip(expandedTip === index ? null : index);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>✨ 你的AI朋友提醒你要...</Text>
      
      <View style={styles.tipsContainer}>
        {currentTips.map((tipIndex, index) => (
          <Animated.View
            key={index}
            style={[
              styles.tipCard,
              { 
                opacity: fadeAnims[index],
                backgroundColor: TIPS[tipIndex].color + '20',
                borderLeftColor: TIPS[tipIndex].color,
              }
            ]}
          >
            <TouchableOpacity onPress={() => toggleExpand(index)}>
              <View style={styles.tipHeader}>
                <Text style={[styles.tipTitle, { color: TIPS[tipIndex].color }]}>
                  {TIPS[tipIndex].title}
                </Text>
                <Ionicons
                  name={expandedTip === index ? 'chevron-up' : 'chevron-down'}
                  size={24}
                  color={TIPS[tipIndex].color}
                />
              </View>
              <Text style={styles.tipDescription}>{TIPS[tipIndex].description}</Text>
              
              {expandedTip === index && (
                <View style={styles.bulletsContainer}>
                  {TIPS[tipIndex].bullets.map((bullet, bulletIndex) => (
                    <View key={bulletIndex} style={styles.bulletItem}>
                      <Ionicons 
                        name="ellipse" 
                        size={8} 
                        color={TIPS[tipIndex].color} 
                        style={styles.bulletIcon} 
                      />
                      <Text style={styles.bulletText}>{bullet}</Text>
                    </View>
                  ))}
                </View>
              )}
            </TouchableOpacity>
          </Animated.View>
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
    padding: 20,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
    textShadowColor: 'rgba(0, 0, 0, 0.1)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  tipsContainer: {
    flex: 1,
  },
  tipCard: {
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    borderLeftWidth: 4,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  tipTitle: {
    fontSize: 20,
    fontWeight: '600',
  },
  tipDescription: {
    fontSize: 15,
    color: '#666',
    marginBottom: 8,
    lineHeight: 22,
  },
  bulletsContainer: {
    marginTop: 8,
    paddingLeft: 8,
  },
  bulletItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 6,
  },
  bulletIcon: {
    marginRight: 8,
  },
  bulletText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
});

export default TipsPage; 