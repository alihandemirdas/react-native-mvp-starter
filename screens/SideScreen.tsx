// screens/SideScreen.tsx
import React, {useState, useRef} from 'react';
import {
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import analytics from '@react-native-firebase/analytics';
import Icon from 'react-native-vector-icons/Ionicons';

interface ChatMessage {
  id: string;
  text: string;
  sender: 'user' | 'other';
  timestamp: Date;
  avatar?: string;
  status?: 'sent' | 'delivered' | 'read';
}

interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isOnline: boolean;
  lastSeen?: Date;
}

const mockUser: ChatUser = {
  id: '2',
  name: 'Alihan Demirdaş',
  avatar: '🧑🏼‍💻',
  isOnline: true,
};

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    text: 'Hey! Nasılsın? Nasıl gidiyor?',
    sender: 'other',
    timestamp: new Date(Date.now() - 3600000),
    status: 'read',
  },
  {
    id: '2',
    text: "Teşekkürler, iyiyim. Yeni bir React Native projesiyle uğraşıyorum.",
    sender: 'user',
    timestamp: new Date(Date.now() - 3500000),
    status: 'delivered',
  },
  {
    id: '3',
    text: "Harika! Neler yapıyorsun?",
    sender: 'other',
    timestamp: new Date(Date.now() - 3400000),
    status: 'read',
  },
  {
    id: '4',
    text: 'Projelerime hızlıca başlayabilmek için bir starter projesi yaptım. Göz alıcı butonlar ekledim. 🚀',
    sender: 'user',
    timestamp: new Date(Date.now() - 3300000),
    status: 'delivered',
  },
  {
    id: '5',
    text: 'Wow, animasyonlar çok iyi görünüyor! 🤩',
    sender: 'other',
    timestamp: new Date(Date.now() - 3200000),
    status: 'read',
  },
  {
    id: '6',
    text: "Teşekkürler! Bu proje için gerçekten çok heyecanlıyım.",
    sender: 'user',
    timestamp: new Date(Date.now() - 3100000),
    status: 'sent',
  },
];

const SideScreen = () => {
  const [messages, setMessages] = useState<ChatMessage[]>(mockMessages);
  const [inputText, setInputText] = useState('');
  const scrollViewRef = useRef<ScrollView>(null);

  const handleSendMessage = async () => {
    if (inputText.trim()) {
      const newMessage: ChatMessage = {
        id: Date.now().toString(),
        text: inputText,
        sender: 'user',
        timestamp: new Date(),
        status: 'sent',
      };

      setMessages(prev => [...prev, newMessage]);
      setInputText('');

      try {
        await analytics().logEvent('chat_message_sent', {
          screen_name: 'ChatScreen',
          message_length: inputText.length,
          timestamp: new Date().toISOString(),
        });
      } catch (error) {
        console.error('Analytics error:', error);
      }

      setTimeout(() => {
        scrollViewRef.current?.scrollToEnd({animated: true});
      }, 100);

      setTimeout(() => {
        const responses = [
          "That's great! 👍",
          'Awesome work!',
          'Keep it up! 💪',
          'Looking forward to seeing more!',
          'Nice! 🔥',
        ];

        const randomResponse =
          responses[Math.floor(Math.random() * responses.length)];
        const responseMessage: ChatMessage = {
          id: (Date.now() + 1).toString(),
          text: randomResponse,
          sender: 'other',
          timestamp: new Date(),
          status: 'read',
        };

        setMessages(prev => [...prev, responseMessage]);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({animated: true});
        }, 100);
      }, 1500);
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false,
    });
  };

  const renderMessage = (message: ChatMessage) => {
    const isUser = message.sender === 'user';

    return (
      <View
        key={message.id}
        className={`mb-4 ${isUser ? 'items-end' : 'items-start'}`}>
        <View
          className={`flex-row ${
            isUser ? 'flex-row-reverse' : 'flex-row'
          } items-end max-w-xs`}>
          {!isUser && (
            <View className="w-8 h-8 rounded-full bg-purple-600 items-center justify-center mr-2">
              <Text className="text-white text-sm">{mockUser.avatar}</Text>
            </View>
          )}

          <View
            className={`px-4 py-3 rounded-2xl ${
              isUser ? 'bg-blue-600 rounded-br-md' : 'bg-gray-700 rounded-bl-md'
            }`}>
            <Text className="text-white text-base">{message.text}</Text>
            <View
              className={`flex-row items-center mt-1 ${
                isUser ? 'justify-end' : 'justify-start'
              }`}>
              <Text className="text-gray-300 text-xs">
                {formatTime(message.timestamp)}
              </Text>
              {isUser && message.status && (
                <Icon
                  name={
                    message.status === 'sent'
                      ? 'checkmark'
                      : message.status === 'delivered'
                      ? 'checkmark-done'
                      : 'checkmark-done'
                  }
                  size={12}
                  color={message.status === 'read' ? '#3B82F6' : '#9CA3AF'}
                  style={{marginLeft: 4}}
                />
              )}
            </View>
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="flex-1 bg-gray-800">
      <KeyboardAvoidingView
        className="flex-1"
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
        {/* Chat Header */}
        <View className="flex-row items-center justify-between px-4 py-3 bg-gray-900 border-b border-gray-700">
          <View className="flex-row items-center">
            <View className="w-10 h-10 rounded-full bg-purple-600 items-center justify-center mr-3">
              <Text className="text-white text-lg">{mockUser.avatar}</Text>
            </View>
            <View>
              <Text className="text-white text-lg font-semibold">
                {mockUser.name}
              </Text>
              <View className="flex-row items-center">
                <View
                  className={`w-2 h-2 rounded-full mr-2 ${
                    mockUser.isOnline ? 'bg-green-500' : 'bg-gray-500'
                  }`}
                />
                <Text className="text-gray-400 text-sm">
                  {mockUser.isOnline ? 'Online' : 'Last seen recently'}
                </Text>
              </View>
            </View>
          </View>

          <View className="flex-row">
            <TouchableOpacity className="p-2 mr-2">
              <Icon name="call-outline" size={24} color="#9CA3AF" />
            </TouchableOpacity>
            <TouchableOpacity className="p-2">
              <Icon name="videocam-outline" size={24} color="#9CA3AF" />
            </TouchableOpacity>
          </View>
        </View>

        {/* Messages Area */}
        <ScrollView
          ref={scrollViewRef}
          className="flex-1 px-4 py-4"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={() =>
            scrollViewRef.current?.scrollToEnd({animated: true})
          }>
          {messages.map(renderMessage)}
        </ScrollView>

        {/* Message Input */}
        <View className="flex-row justify-center items-center px-4 py-2 bg-gray-900 border-t border-gray-700">
          <TouchableOpacity className="p-2 mr-2">
            <Icon name="add-outline" size={24} color="#9CA3AF" />
          </TouchableOpacity>

          <View className="flex-1 flex-row justify-center items-center bg-gray-700 rounded-full px-4 py-2">
            <TextInput
              value={inputText}
              onChangeText={setInputText}
              placeholder="Bir mesaj yazın..."
              placeholderTextColor="#9CA3AF"
              maxLength={500}
              className="flex-1 text-white"
            />
            <TouchableOpacity className="ml-2">
              <Icon name="happy-outline" size={20} color="#9CA3AF" />
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            onPress={handleSendMessage}
            className={`p-2 ml-2 rounded-full ${
              inputText.trim() ? 'bg-blue-600' : 'bg-gray-600'
            }`}
            disabled={!inputText.trim()}>
            <Icon
              name="send"
              size={20}
              color={inputText.trim() ? '#FFFFFF' : '#9CA3AF'}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

export default SideScreen;
