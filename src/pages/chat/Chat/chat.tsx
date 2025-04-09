import React, { useState, useEffect } from "react";
import {
  Search,
  Plus,
  MoreVertical,
  Bell,
  Settings,
  MessageSquare,
  Phone,
  Video,
  User,
  Star,
  Check,
  CheckCheck,
} from "lucide-react";
import { motion } from "framer-motion";
import { sampleChats } from "@constants/chat.constant";
import ScreenWrapper from "@components/screen-wrapper";

interface ChatPreview {
  id: string;
  name: string;
  avatar: string;
  lastMessage: string;
  time: string;
  unread: number;
  isOnline: boolean;
  isPinned: boolean;
}

const ChatScreen: React.FC = () => {
  const [selectedChat, setSelectedChat] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [isMobileView, setIsMobileView] = useState(window.innerWidth < 768);
  const [showChatList, setShowChatList] = useState(true);

  // Using sample chats from constants
  const [chats, setChats] = useState<ChatPreview[]>(sampleChats);

  useEffect(() => {
    const handleResize = () => {
      const newIsMobileView = window.innerWidth < 768;
      setIsMobileView(newIsMobileView);
      if (!newIsMobileView) {
        setShowChatList(true);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleChatSelect = (chatId: string) => {
    setSelectedChat(chatId);
    if (isMobileView) {
      setShowChatList(false);
    }
  };

  const handleBackToList = () => {
    setShowChatList(true);
  };

  const filteredChats = chats.filter(
    (chat) =>
      chat.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      chat.lastMessage.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Sort chats: pinned first, then by time
  const sortedChats = [...filteredChats].sort((a, b) => {
    if (a.isPinned && !b.isPinned) return -1;
    if (!a.isPinned && b.isPinned) return 1;
    return 0;
  });

  return (
    <ScreenWrapper footer={false} maxWidth="full" padding="p-0">
      {/* Modified: changed h-screen to h-[calc(100vh-4rem)] to account for navbar height */}
      <div className="h-[calc(100vh-4.8rem)] flex flex-col bg-gray-50 dark:bg-gray-900 w-full">
        {/* Main Content */}
        <div className="flex-1 flex overflow-hidden">
          {/* Chat List - Only shown based on state in mobile view */}
          {(showChatList || !isMobileView) && (
            <div
              className={`${isMobileView ? "w-full" : "w-1/3 max-w-sm"} bg-white dark:bg-gray-800 border-r border-gray-200 dark:border-gray-700 flex flex-col`}
            >
              {/* Search and New Chat */}
              <div className="p-4 border-b border-gray-200 dark:border-gray-700">
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Search chats..."
                    className="w-full pl-10 pr-4 py-2 rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Search
                    className="absolute left-3 top-2.5 text-gray-500 dark:text-gray-400"
                    size={18}
                  />
                </div>
                <button className="mt-3 w-full flex items-center justify-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white py-2 px-4 rounded-full transition-colors">
                  <Plus size={18} />
                  <span>New Chat</span>
                </button>
              </div>

              {/* Chat List - Modified to guarantee it doesn't overflow */}
              <div className="flex-1 overflow-y-auto">
                {sortedChats.length > 0 ? (
                  sortedChats.map((chat) => (
                    <motion.div
                      key={chat.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                      className={`p-3 cursor-pointer border-b border-gray-100 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-750 flex items-start ${
                        selectedChat === chat.id ? "bg-gray-100 dark:bg-gray-750" : ""
                      }`}
                      onClick={() => handleChatSelect(chat.id)}
                    >
                      <div className="relative mr-3 flex-shrink-0">
                        <img
                          src={chat.avatar}
                          alt={chat.name}
                          className="w-12 h-12 rounded-full object-cover border border-gray-200 dark:border-gray-600"
                        />
                        {chat.isOnline && (
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                        )}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-baseline">
                          <h3 className="text-sm font-medium text-gray-900 dark:text-white truncate">
                            {chat.name}
                            {chat.isPinned && (
                              <Star size={12} className="inline ml-1 text-yellow-500" />
                            )}
                          </h3>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {chat.time}
                          </span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                          {chat.unread === 0 && chat.lastMessage.startsWith("You:") ? (
                            <CheckCheck size={12} className="inline mr-1 text-indigo-500" />
                          ) : chat.unread === 0 ? (
                            <Check size={12} className="inline mr-1 text-gray-500" />
                          ) : null}
                          {chat.lastMessage}
                        </p>
                        {chat.unread > 0 && (
                          <span className="mt-1 inline-flex items-center justify-center w-5 h-5 text-xs font-medium text-white bg-indigo-600 rounded-full">
                            {chat.unread}
                          </span>
                        )}
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <div className="p-6 text-center text-gray-500 dark:text-gray-400">
                    No chats match your search
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Chat Area - Only shown when a chat is selected in mobile view */}
          {(!showChatList || !isMobileView) && (
            <div className="flex-1 flex flex-col bg-gray-50 dark:bg-gray-900">
              {selectedChat ? (
                <>
                  {/* Chat Header */}
                  <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 p-3 flex justify-between items-center shadow-sm">
                    <div className="flex items-center">
                      {isMobileView && (
                        <button
                          onClick={handleBackToList}
                          className="mr-2 p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <path d="M15 18l-6-6 6-6" />
                          </svg>
                        </button>
                      )}
                      <div className="relative mr-3">
                        <img
                          src={chats.find((c) => c.id === selectedChat)?.avatar}
                          alt="User"
                          className="w-10 h-10 rounded-full object-cover"
                        />
                        {chats.find((c) => c.id === selectedChat)?.isOnline && (
                          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 rounded-full border-2 border-white dark:border-gray-800"></span>
                        )}
                      </div>
                      <div>
                        <h2 className="font-medium text-gray-900 dark:text-white">
                          {chats.find((c) => c.id === selectedChat)?.name}
                        </h2>
                        <p className="text-xs text-gray-500 dark:text-gray-400">
                          {chats.find((c) => c.id === selectedChat)?.isOnline
                            ? "Online"
                            : "Offline"}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Phone size={20} />
                      </button>
                      <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Video size={20} />
                      </button>
                      <button className="p-2 rounded-full text-gray-600 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <MoreVertical size={20} />
                      </button>
                    </div>
                  </div>

                  {/* Chat Messages - Placeholder */}
                  <div className="flex-1 p-4 overflow-y-auto flex items-center justify-center">
                    <div className="text-center">
                      <MessageSquare
                        size={64}
                        className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
                      />
                      <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                        Start chatting with {chats.find((c) => c.id === selectedChat)?.name}
                      </h3>
                      <p className="text-gray-500 dark:text-gray-400">
                        Select a message to view the conversation
                      </p>
                    </div>
                  </div>

                  {/* Message Input */}
                  <div className="p-3 bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700">
                    <div className="flex items-end gap-2">
                      <button className="p-2 rounded-full text-gray-500 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-700">
                        <Plus size={20} />
                      </button>
                      <div className="flex-1 bg-gray-100 dark:bg-gray-700 rounded-2xl px-4 py-2 focus-within:ring-2 focus-within:ring-indigo-500">
                        <input
                          type="text"
                          placeholder="Type a message..."
                          className="w-full bg-transparent text-gray-800 dark:text-white outline-none text-sm"
                        />
                      </div>
                      <button className="p-2 rounded-full bg-indigo-600 text-white hover:bg-indigo-700 transition-colors">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="20"
                          height="20"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <line x1="22" y1="2" x2="11" y2="13"></line>
                          <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
                        </svg>
                      </button>
                    </div>
                  </div>
                </>
              ) : (
                <div className="flex-1 flex items-center justify-center">
                  <div className="text-center p-6">
                    <MessageSquare
                      size={64}
                      className="mx-auto mb-4 text-gray-300 dark:text-gray-600"
                    />
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-1">
                      Select a conversation
                    </h3>
                    <p className="text-gray-500 dark:text-gray-400">
                      Choose a chat from the list to start messaging
                    </p>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </ScreenWrapper>
  );
};

export default ChatScreen;
