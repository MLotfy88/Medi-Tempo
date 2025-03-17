import React, { useState } from "react";
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
import { Database, ArrowLeft } from "lucide-react-native";
import CSVUploader from "./components/database/CSVUploader";
import { useDatabase } from "./database";
import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";

const DatabaseUploadScreen = () => {
  const router = useRouter();
  const { addMedications, medications, lastUpdated, databaseSize } =
    useDatabase();
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleUploadComplete = (data: any[]) => {
    addMedications(data);
    setUploadSuccess(true);
    setUploadError("");
  };

  const handleUploadError = (error: string) => {
    setUploadError(error);
    setUploadSuccess(false);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <Header currentLanguage="ar" />

      <ScrollView className="flex-1 p-4">
        <View className="flex-row items-center mb-4">
          <TouchableOpacity
            onPress={() => router.back()}
            className="mr-2 p-2 bg-gray-100 rounded-full"
          >
            <ArrowLeft size={20} color="#4b5563" />
          </TouchableOpacity>
          <Database size={24} color="#3b82f6" />
          <Text className="text-2xl font-bold text-gray-800 mr-2">
            إدارة قاعدة بيانات الأدوية
          </Text>
        </View>

        <View className="bg-blue-50 p-4 rounded-lg mb-6">
          <Text className="text-blue-800">
            يمكنك رفع ملف CSV يحتوي على بيانات الأدوية لتحديث قاعدة البيانات.
            يجب أن يحتوي الملف على الأعمدة التالية: الاسم، المادة الفعالة،
            السعر، الفئة، التوفر.
          </Text>
        </View>

        <View className="bg-white p-4 rounded-lg shadow-sm mb-6">
          <Text className="text-lg font-bold text-gray-800 mb-2">
            إحصائيات قاعدة البيانات
          </Text>
          <View className="border-t border-gray-200 pt-3">
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-600">عدد الأدوية</Text>
              <Text className="text-gray-800 font-medium">
                {medications.length}
              </Text>
            </View>
            <View className="flex-row justify-between items-center mb-2">
              <Text className="text-gray-600">آخر تحديث</Text>
              <Text className="text-gray-800 font-medium">
                {lastUpdated
                  ? new Date(lastUpdated).toLocaleDateString()
                  : "غير متوفر"}
              </Text>
            </View>
            <View className="flex-row justify-between items-center">
              <Text className="text-gray-600">حجم قاعدة البيانات</Text>
              <Text className="text-gray-800 font-medium">{databaseSize}</Text>
            </View>
          </View>
        </View>

        <CSVUploader
          onUploadComplete={handleUploadComplete}
          onError={handleUploadError}
        />

        <View className="h-20" />
      </ScrollView>

      <TabNavigation activeTab="settings" />
    </SafeAreaView>
  );
};

export default DatabaseUploadScreen;
