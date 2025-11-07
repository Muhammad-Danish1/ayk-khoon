import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography, BorderRadius } from '../../../src/theme';
import { mockChatConversations } from '../../../src/data/mockData';

const formatChatTime = (timestamp: string) => {
  const date = new Date(timestamp);
  const now = new Date();
  const diffInHours = Math.floor((now.getTime() - date.getTime()) / (1000 * 60 * 60));
  
  if (diffInHours < 1) {
    return date.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit', hour12: true });
  } else if (diffInHours < 24) {
    return `${diffInHours}h ago`;
  } else {
    const diffInDays = Math.floor(diffInHours / 24);
    if (diffInDays === 1) return 'Yesterday';
    if (diffInDays < 7) return `${diffInDays}d ago`;
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  }
};

export default function ChatsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      
      <FlatList
        data={mockChatConversations}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => router.push(`/(user)/chats/${item.participantId}`)}
            activeOpacity={0.7}
          >
            <Image 
              source={{ uri: item.participantPhoto }}
              style={styles.avatar}
            />
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <View style={styles.nameContainer}>
                  <Text style={styles.chatName}>{item.participantName}</Text>
                  <View style={[styles.bloodGroupBadge, { backgroundColor: Colors.bloodGroups[item.bloodGroup] + '20' }]}>
                    <Text style={[styles.bloodGroupText, { color: Colors.bloodGroups[item.bloodGroup] }]}>
                      {item.bloodGroup}
                    </Text>
                  </View>
                </View>
                <Text style={styles.chatTime}>{formatChatTime(item.lastMessageTime)}</Text>
              </View>
              <View style={styles.messageRow}>
                <Text 
                  style={[
                    styles.lastMessage,
                    item.unreadCount > 0 && styles.unreadMessage
                  ]}
                  numberOfLines={1}
                >
                  {item.lastMessage}
                </Text>
                {item.unreadCount > 0 && (
                  <View style={styles.unreadBadge}>
                    <Text style={styles.unreadCount}>{item.unreadCount}</Text>
                  </View>
                )}
              </View>
            </View>
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.secondary,
    paddingTop: Spacing.lg,
    paddingHorizontal: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.md,
  },
  listContent: {
    paddingBottom: Spacing['4xl'],
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.md,
    backgroundColor: Colors.white,
    borderRadius: BorderRadius.lg,
    marginBottom: Spacing.sm,
  },
  avatar: {
    width: 56,
    height: 56,
    borderRadius: 28,
    marginRight: Spacing.md,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: Spacing.xs,
  },
  nameContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.xs,
    flex: 1,
  },
  chatName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  bloodGroupBadge: {
    paddingHorizontal: Spacing.xs,
    paddingVertical: 2,
    borderRadius: BorderRadius.xs,
  },
  bloodGroupText: {
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
  chatTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
  },
  messageRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  lastMessage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
    flex: 1,
  },
  unreadMessage: {
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: BorderRadius.full,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.xs,
  },
  unreadCount: {
    color: Colors.white,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
});
