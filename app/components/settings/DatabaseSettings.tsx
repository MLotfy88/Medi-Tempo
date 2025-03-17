import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Switch,
} from "react-native";
import {
  AlertCircle,
  Database,
  Download,
  RefreshCw,
} from "lucide-react-native";

interface DatabaseSettingsProps {
  lastUpdated?: string;
  databaseSize?: string;
  isUpdating?: boolean;
  onUpdateDatabase?: () => void;
  onCheckStatus?: () => void;
  autoUpdateEnabled?: boolean;
  onToggleAutoUpdate?: (value: boolean) => void;
}

const DatabaseSettings = ({
  lastUpdated = "2023-10-15",
  databaseSize = "45.2 MB",
  isUpdating = false,
  onUpdateDatabase = () => {},
  onCheckStatus = () => {},
  autoUpdateEnabled = true,
  onToggleAutoUpdate = () => {},
}: DatabaseSettingsProps) => {
  const [showUpdateAvailable, setShowUpdateAvailable] = useState(true);

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold text-gray-800">
          Database Settings
        </Text>
        <Database size={20} color="#4b5563" />
      </View>

      {showUpdateAvailable && (
        <View className="bg-amber-50 p-3 rounded-md mb-4 flex-row items-center">
          <AlertCircle size={18} color="#d97706" className="mr-2" />
          <Text className="text-amber-700 flex-1">
            Database update available. Update to get the latest medications.
          </Text>
          <TouchableOpacity
            onPress={() => setShowUpdateAvailable(false)}
            className="ml-2"
          >
            <Text className="text-amber-800 font-medium">×</Text>
          </TouchableOpacity>
        </View>
      )}

      <View className="border-b border-gray-200 pb-3 mb-3">
        <View className="flex-row justify-between items-center mb-2">
          <Text className="text-gray-600">Last Updated</Text>
          <Text className="text-gray-800 font-medium">{lastUpdated}</Text>
        </View>
        <View className="flex-row justify-between items-center">
          <Text className="text-gray-600">Database Size</Text>
          <Text className="text-gray-800 font-medium">{databaseSize}</Text>
        </View>
      </View>

      <View className="flex-row justify-between items-center mb-4">
        <Text className="text-gray-700">Auto-update when available</Text>
        <Switch
          value={autoUpdateEnabled}
          onValueChange={onToggleAutoUpdate}
          trackColor={{ false: "#d1d5db", true: "#4f46e5" }}
        />
      </View>

      <View className="flex-row space-x-2">
        <TouchableOpacity
          className={`flex-1 flex-row items-center justify-center py-3 rounded-md ${isUpdating ? "bg-indigo-100" : "bg-indigo-600"}`}
          onPress={onUpdateDatabase}
          disabled={isUpdating}
        >
          {isUpdating ? (
            <ActivityIndicator size="small" color="#4f46e5" />
          ) : (
            <>
              <Download size={18} color="#ffffff" />
              <Text className="text-white font-medium ml-2">
                Update Database
              </Text>
            </>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          className="flex-row items-center justify-center py-3 px-4 rounded-md bg-gray-100"
          onPress={onCheckStatus}
        >
          <RefreshCw size={18} color="#4b5563" />
          <Text className="text-gray-700 font-medium ml-2">Check Status</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default DatabaseSettings;
