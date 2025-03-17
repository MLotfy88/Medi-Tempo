import React, { useState } from "react";
import { View, Text, TouchableOpacity, Switch } from "react-native";
import { Globe } from "lucide-react-native";

interface LanguageSettingsProps {
  currentLanguage?: "ar" | "en";
  onLanguageChange?: (language: "ar" | "en") => void;
}

const LanguageSettings = ({
  currentLanguage = "en",
  onLanguageChange = () => {},
}: LanguageSettingsProps) => {
  const [language, setLanguage] = useState<"ar" | "en">(currentLanguage);

  const toggleLanguage = () => {
    const newLanguage = language === "en" ? "ar" : "en";
    setLanguage(newLanguage);
    onLanguageChange(newLanguage);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <View className="flex-row items-center mb-3">
        <Globe size={24} className="text-blue-600 mr-2" />
        <Text className="text-lg font-semibold">Language Settings</Text>
      </View>

      <View className="border-t border-gray-200 pt-3">
        <View className="flex-row justify-between items-center">
          <View>
            <Text className="text-base font-medium">
              {language === "en" ? "Arabic" : "العربية"}
            </Text>
            <Text className="text-sm text-gray-500">
              {language === "en"
                ? "Switch to Arabic (RTL)"
                : "التبديل إلى العربية (RTL)"}
            </Text>
          </View>

          <Switch
            value={language === "ar"}
            onValueChange={toggleLanguage}
            trackColor={{ false: "#d1d5db", true: "#3b82f6" }}
            thumbColor="#ffffff"
          />
        </View>
      </View>

      <TouchableOpacity
        className="mt-4 bg-blue-50 p-3 rounded-md flex-row justify-center items-center"
        onPress={toggleLanguage}
      >
        <Globe size={18} className="text-blue-600 mr-2" />
        <Text className="text-blue-600 font-medium">
          {language === "en"
            ? "One-tap language switch"
            : "تبديل اللغة بنقرة واحدة"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default LanguageSettings;
