import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { Colors, Spacing, Typography } from '../../../../src/theme';

const chats = [
  {
    id: '1',
    name: 'City Hospital',
    lastMessage: 'Your blood request has been processed',
    time: '10:30 AM',
    unread: 2,
  },
  {
    id: '2',
    name: 'Blood Donation Center',
    lastMessage: 'Reminder: Your next donation is due',
    time: 'Yesterday',
    unread: 0,
  },
  // Add more chats as needed
];

export default function ChatsScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Messages</Text>
      
      <FlatList
        data={chats}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity 
            style={styles.chatItem}
            onPress={() => router.push(`/(user)/chats/${item.id}`)}
          >
            <View style={styles.avatar}>
              <Ionicons name="person" size={24} color={Colors.white} />
            </View>
            <View style={styles.chatContent}>
              <View style={styles.chatHeader}>
                <Text style={styles.chatName}>{item.name}</Text>
                <Text style={styles.chatTime}>{item.time}</Text>
              </View>
              <Text 
                style={[
                  styles.lastMessage,
                  item.unread > 0 && styles.unreadMessage
                ]}
                numberOfLines={1}
              >
                {item.lastMessage}
              </Text>
            </View>
            {item.unread > 0 && (
              <View style={styles.unreadBadge}>
                <Text style={styles.unreadCount}>{item.unread}</Text>
              </View>
            )}
          </TouchableOpacity>
        )}
        contentContainerStyle={styles.listContent}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background.light,
    padding: Spacing.lg,
  },
  title: {
    fontSize: Typography.fontSize['2xl'],
    fontWeight: Typography.fontWeight.bold,
    color: Colors.text.primary,
    marginBottom: Spacing.lg,
  },
  listContent: {
    paddingBottom: Spacing.xxl,
  },
  chatItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: Colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: Spacing.md,
  },
  chatContent: {
    flex: 1,
  },
  chatHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: Spacing.xs,
  },
  chatName: {
    fontSize: Typography.fontSize.base,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  chatTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
  },
  lastMessage: {
    fontSize: Typography.fontSize.sm,
    color: Colors.text.secondary,
  },
  unreadMessage: {
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
  },
  unreadBadge: {
    backgroundColor: Colors.primary,
    borderRadius: 10,
    width: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: Spacing.sm,
  },
  unreadCount: {
    color: Colors.white,
    fontSize: Typography.fontSize.xs,
    fontWeight: Typography.fontWeight.bold,
  },
});
