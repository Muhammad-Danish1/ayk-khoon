import { View, Text, StyleSheet, TextInput, FlatList, KeyboardAvoidingView, Platform } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { useState } from 'react';
import { Colors, Spacing, Typography } from '../../../src/theme';

// Mock data for chat messages
const messages = [
  { id: '1', text: 'Hello, I need A+ blood urgently for a patient.', sender: 'user', time: '10:00 AM' },
  { id: '2', text: 'We have A+ blood available. Can you provide more details?', sender: 'them', time: '10:02 AM' },
  { id: '3', text: 'Yes, the patient needs 2 units. Can we schedule for today?', sender: 'user', time: '10:03 AM' },
  { id: '4', text: 'Yes, please come to our center between 2-5 PM today.', sender: 'them', time: '10:05 AM' },
];

export default function ChatScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      // In a real app, you would send the message to your backend
      console.log('Sending message:', message);
      setMessage('');
    }
  };

  return (
    <KeyboardAvoidingView 
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={90}
    >
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color={Colors.text.primary} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Chat</Text>
        <View style={styles.headerIcons}>
          <Ionicons name="call-outline" size={24} color={Colors.primary} style={styles.headerIcon} />
          <Ionicons name="ellipsis-vertical" size={24} color={Colors.text.primary} />
        </View>
      </View>

      {/* Messages */}
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={[
            styles.messageBubble,
            item.sender === 'user' ? styles.userBubble : styles.otherBubble
          ]}>
            <Text style={[
              styles.messageText,
              item.sender === 'user' ? styles.userText : styles.otherText
            ]}>
              {item.text}
            </Text>
            <Text style={styles.messageTime}>
              {item.time}
            </Text>
          </View>
        )}
        contentContainerStyle={styles.messagesContainer}
        inverted={false}
      />

      {/* Message Input */}
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={message}
          onChangeText={setMessage}
          placeholder="Type a message..."
          placeholderTextColor={Colors.text.tertiary}
          multiline
        />
        <TouchableOpacity onPress={handleSend} style={styles.sendButton}>
          <Ionicons 
            name="send" 
            size={24} 
            color={message.trim() ? Colors.primary : Colors.text.tertiary} 
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
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
    padding: Spacing.md,
    borderBottomWidth: 1,
    borderBottomColor: Colors.border.light,
  },
  backButton: {
    marginRight: Spacing.md,
  },
  headerTitle: {
    fontSize: Typography.fontSize.lg,
    fontWeight: Typography.fontWeight.semibold,
    color: Colors.text.primary,
    flex: 1,
  },
  headerIcons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerIcon: {
    marginLeft: Spacing.lg,
  },
  messagesContainer: {
    padding: Spacing.md,
    paddingBottom: Spacing.xxl,
  },
  messageBubble: {
    maxWidth: '80%',
    padding: Spacing.md,
    borderRadius: 16,
    marginBottom: Spacing.sm,
  },
  userBubble: {
    alignSelf: 'flex-end',
    backgroundColor: Colors.primary,
    borderBottomRightRadius: 4,
  },
  otherBubble: {
    alignSelf: 'flex-start',
    backgroundColor: Colors.background.light,
    borderBottomLeftRadius: 4,
    borderWidth: 1,
    borderColor: Colors.border.light,
  },
  messageText: {
    fontSize: Typography.fontSize.base,
  },
  userText: {
    color: Colors.white,
  },
  otherText: {
    color: Colors.text.primary,
  },
  messageTime: {
    fontSize: Typography.fontSize.xs,
    color: Colors.text.tertiary,
    marginTop: Spacing.xs,
    alignSelf: 'flex-end',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: Spacing.md,
    borderTopWidth: 1,
    borderTopColor: Colors.border.light,
    backgroundColor: Colors.white,
  },
  input: {
    flex: 1,
    backgroundColor: Colors.background.light,
    borderRadius: 20,
    paddingHorizontal: Spacing.md,
    paddingVertical: 8,
    maxHeight: 120,
    fontSize: Typography.fontSize.base,
    color: Colors.text.primary,
  },
  sendButton: {
    marginLeft: Spacing.md,
    padding: Spacing.sm,
  },
});
