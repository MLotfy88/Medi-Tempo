import React, { useState } from "react";
import { View, Text, ScrollView, TouchableOpacity, Image } from "react-native";
import { useRouter } from "expo-router";
import {
  Settings,
  Info,
  Shield,
  HelpCircle,
  Star,
  Download,
  Bell,
  Pill,
  Database,
} from "lucide-react-native";
import LanguageSettings from "./LanguageSettings";
import DatabaseSettings from "./DatabaseSettings";

interface SettingsTabProps {
  onLanguageChange?: (language: "ar" | "en") => void;
  currentLanguage?: "ar" | "en";
  onUpdateDatabase?: () => void;
  onCheckDatabaseStatus?: () => void;
  lastDatabaseUpdate?: string;
  databaseSize?: string;
}

const SettingsTab = ({
  onLanguageChange = () => {},
  currentLanguage = "en",
  onUpdateDatabase = () => {},
  onCheckDatabaseStatus = () => {},
  lastDatabaseUpdate = "2023-10-15",
  databaseSize = "45.2 MB",
}: SettingsTabProps) => {
  const router = useRouter();
  const [isUpdatingDatabase, setIsUpdatingDatabase] = useState(false);
  const [autoUpdateEnabled, setAutoUpdateEnabled] = useState(true);
  const isRTL = currentLanguage === "ar";

  const handleUpdateDatabase = () => {
    setIsUpdatingDatabase(true);
    // Simulate database update
    setTimeout(() => {
      setIsUpdatingDatabase(false);
      onUpdateDatabase();
    }, 2000);
  };

  const handleToggleAutoUpdate = (value: boolean) => {
    setAutoUpdateEnabled(value);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <View className="px-4 py-3 bg-white border-b border-gray-200">
        <View
          className={`flex-row items-center ${isRTL ? "flex-row-reverse" : ""}`}
        >
          <Settings
            size={22}
            color="#3b82f6"
            className={isRTL ? "ml-2" : "mr-2"}
          />
          <Text className="text-xl font-bold text-gray-800">
            {currentLanguage === "en" ? "Settings" : "الإعدادات"}
          </Text>
        </View>
      </View>

      <ScrollView className="flex-1 p-4">
        <View className="bg-blue-600 p-4 rounded-lg shadow-sm mb-4">
          <View
            className={`flex-row items-center ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <View className="bg-white p-2 rounded-full">
              <Pill size={24} color="#3b82f6" />
            </View>
            <View className={`${isRTL ? "mr-3" : "ml-3"} flex-1`}>
              <Text className="text-white font-bold text-lg">
                {isRTL ? "ميديسويتش بريميوم" : "MediSwitch Premium"}
              </Text>
              <Text className="text-blue-100 mt-1">
                {isRTL
                  ? "احصل على وصول غير محدود لجميع الميزات"
                  : "Get unlimited access to all features"}
              </Text>
            </View>
            <TouchableOpacity className="bg-yellow-400 px-3 py-2 rounded-lg">
              <Text className="font-bold text-gray-800">
                {isRTL ? "ترقية" : "Upgrade"}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        <LanguageSettings
          currentLanguage={currentLanguage}
          onLanguageChange={onLanguageChange}
        />

        <DatabaseSettings
          lastUpdated={lastDatabaseUpdate}
          databaseSize={databaseSize}
          isUpdating={isUpdatingDatabase}
          onUpdateDatabase={handleUpdateDatabase}
          onCheckStatus={onCheckDatabaseStatus}
          autoUpdateEnabled={autoUpdateEnabled}
          onToggleAutoUpdate={handleToggleAutoUpdate}
        />

        <View className="bg-white p-4 rounded-lg shadow-sm mt-4">
          <View
            className={`flex-row items-center mb-3 ${isRTL ? "flex-row-reverse" : ""}`}
          >
            <Info
              size={20}
              color="#3b82f6"
              className={isRTL ? "ml-2" : "mr-2"}
            />
            <Text className="text-lg font-semibold text-gray-800">
              {currentLanguage === "en" ? "About" : "حول التطبيق"}
            </Text>
          </View>
          <View className="border-t border-gray-200 pt-3">
            <Text className={`text-gray-600 mb-2 ${isRTL ? "text-right" : ""}`}>
              {currentLanguage === "en"
                ? "MediSwitch v1.0.0"
                : "ميديسويتش الإصدار ١.٠.٠"}
            </Text>
            <Text className={`text-gray-600 ${isRTL ? "text-right" : ""}`}>
              {currentLanguage === "en"
                ? "Your comprehensive medication reference app with 23,000+ medications."
                : "تطبيق مرجعي شامل للأدوية يحتوي على أكثر من ٢٣,٠٠٠ دواء."}
            </Text>
          </View>
        </View>

        <View className="mt-4 space-y-2">
          <TouchableOpacity className="bg-white p-4 rounded-lg shadow-sm flex-row items-center">
            <Bell size={20} color="#3b82f6" className="mr-3" />
            <View className="flex-1">
              <Text className="text-gray-800">
                {isRTL ? "الإشعارات" : "Notifications"}
              </Text>
              <Text className="text-gray-500 text-sm">
                {isRTL
                  ? "إدارة تفضيلات الإشعارات"
                  : "Manage notification preferences"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity
            className="bg-white p-4 rounded-lg shadow-sm flex-row items-center"
            onPress={() => router.push("/database-upload")}
          >
            <Database size={20} color="#3b82f6" className="mr-3" />
            <View className="flex-1">
              <Text className="text-gray-800">
                {isRTL ? "إدارة قاعدة البيانات" : "Database Management"}
              </Text>
              <Text className="text-gray-500 text-sm">
                {isRTL
                  ? "رفع وتحديث قاعدة بيانات الأدوية"
                  : "Upload and update medication database"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg shadow-sm flex-row items-center">
            <Shield size={20} color="#3b82f6" className="mr-3" />
            <View className="flex-1">
              <Text className="text-gray-800">
                {isRTL ? "سياسة الخصوصية" : "Privacy Policy"}
              </Text>
              <Text className="text-gray-500 text-sm">
                {isRTL ? "كيف نحمي بياناتك" : "How we protect your data"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg shadow-sm flex-row items-center">
            <HelpCircle size={20} color="#3b82f6" className="mr-3" />
            <View className="flex-1">
              <Text className="text-gray-800">
                {isRTL ? "المساعدة والدعم" : "Help & Support"}
              </Text>
              <Text className="text-gray-500 text-sm">
                {isRTL ? "الحصول على المساعدة" : "Get assistance"}
              </Text>
            </View>
          </TouchableOpacity>

          <TouchableOpacity className="bg-white p-4 rounded-lg shadow-sm flex-row items-center">
            <Star size={20} color="#3b82f6" className="mr-3" />
            <View className="flex-1">
              <Text className="text-gray-800">
                {isRTL ? "تقييم التطبيق" : "Rate App"}
              </Text>
              <Text className="text-gray-500 text-sm">
                {isRTL ? "شارك رأيك معنا" : "Share your feedback"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        <View className="mt-6 mb-8 items-center">
          <Text className="text-gray-400 text-sm">
            {currentLanguage === "en"
              ? "© 2023 MediSwitch. All rights reserved."
              : "© ٢٠٢٣ ميديسويتش. جميع الحقوق محفوظة."}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default SettingsTab;
