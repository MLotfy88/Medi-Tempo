import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Globe, Pill } from "lucide-react-native";

interface HeaderProps {
  onToggleLanguage?: () => void;
  currentLanguage?: "ar" | "en";
}

const Header = ({
  onToggleLanguage = () => {},
  currentLanguage = "en",
}: HeaderProps) => {
  const isRTL = currentLanguage === "ar";

  return (
    <View className="w-full h-[60px] bg-white flex-row items-center justify-between px-4 border-b border-gray-200">
      <View
        className={`flex-row items-center ${isRTL ? "flex-row-reverse" : ""}`}
      >
        <Pill size={20} color="#3b82f6" className={isRTL ? "ml-2" : "mr-2"} />
        <Text className="text-xl font-bold text-blue-600">
          {isRTL ? "ميديسويتش" : "MediSwitch"}
        </Text>
        <Text className={`text-sm text-gray-500 ${isRTL ? "mr-2" : "ml-2"}`}>
          {isRTL ? "صيدليتك المحمولة" : "Your Pocket Pharmacy"}
        </Text>
      </View>

      <TouchableOpacity
        onPress={onToggleLanguage}
        className="flex-row items-center bg-blue-100 px-3 py-2 rounded-full"
      >
        <Globe size={18} color="#3b82f6" />
        <Text className="ml-2 text-blue-700 font-medium">
          {currentLanguage === "ar" ? "العربية" : "English"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Header;
