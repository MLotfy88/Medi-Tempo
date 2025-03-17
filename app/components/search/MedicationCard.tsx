import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import {
  ChevronRight,
  Pill,
  AlertCircle,
  CheckCircle,
} from "lucide-react-native";

interface MedicationCardProps {
  name: string;
  activeIngredient: string;
  price: number;
  category: string;
  isAvailable: boolean;
  onPress?: () => void;
}

const MedicationCard = ({
  name = "Paracetamol 500mg",
  activeIngredient = "Acetaminophen",
  price = 12.99,
  category = "Pain Relief",
  isAvailable = true,
  onPress = () => {},
}: MedicationCardProps) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      className="bg-white p-4 rounded-lg mb-3 shadow-sm border border-gray-100 flex-row items-center justify-between"
      activeOpacity={0.7}
    >
      <View className="flex-row items-center flex-1">
        <View className="bg-blue-100 p-2 rounded-full mr-3">
          <Pill size={20} color="#3b82f6" />
        </View>

        <View className="flex-1">
          <Text className="font-bold text-base text-gray-900">{name}</Text>
          <Text className="text-sm text-gray-600 mt-1">{activeIngredient}</Text>

          <View className="flex-row items-center mt-2">
            <Text className="text-sm font-medium text-blue-600">
              {price.toFixed(2)} EGP
            </Text>
            <View className="bg-gray-200 rounded-full px-2 py-0.5 ml-2">
              <Text className="text-xs text-gray-700">{category}</Text>
            </View>

            {isAvailable ? (
              <View className="flex-row items-center ml-2">
                <CheckCircle size={14} color="#16a34a" className="ml-1" />
                <Text className="text-xs text-green-600">متوفر</Text>
              </View>
            ) : (
              <View className="flex-row items-center ml-2">
                <AlertCircle size={14} color="#ef4444" className="ml-1" />
                <Text className="text-xs text-red-600">غير متوفر</Text>
              </View>
            )}
          </View>
        </View>
      </View>

      <ChevronRight size={20} color="#9ca3af" />
    </TouchableOpacity>
  );
};

export default MedicationCard;
