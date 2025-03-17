import React, { useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  Modal,
  Platform,
} from "react-native";
import {
  X,
  Pill,
  DollarSign,
  ShoppingBag,
  AlertCircle,
  ArrowRight,
  Clock,
  Thermometer,
  ShieldCheck,
  Stethoscope,
  Package2,
} from "lucide-react-native";

interface MedicationDetailsProps {
  visible?: boolean;
  onClose?: () => void;
  medication?: {
    id: string;
    name: string;
    activeIngredient: string;
    price: number;
    category: string;
    isAvailable: boolean;
    description?: string;
    dosageInfo?: string;
    sideEffects?: string[];
    storage?: string;
    warnings?: string[];
    alternatives?: { id: string; name: string; price: number }[];
  };
  language?: "en" | "ar";
}

const MedicationDetails = ({
  visible = false,
  onClose = () => {},
  medication,

  language = "en",
}: MedicationDetailsProps) => {
  const isRTL = language === "ar";

  // Don't force RTL in component to avoid conflicts with app-level RTL settings
  useEffect(() => {
    // Component-level RTL handling removed to prevent conflicts
  }, [isRTL]);

  const getAvailabilityColor = (isAvailable: boolean) => {
    return isAvailable ? "text-green-600" : "text-red-500";
  };

  const renderSection = (title: string, content: React.ReactNode) => (
    <View className="mb-4 pb-4 border-b border-gray-200">
      <Text className="text-lg font-bold text-gray-800 mb-2">{title}</Text>
      {content}
    </View>
  );

  return (
    <Modal
      visible={visible}
      animationType="slide"
      transparent={true}
      onRequestClose={onClose}
    >
      <View className="flex-1 bg-black/50 justify-end">
        <View className="bg-white rounded-t-3xl h-[90%] pb-6">
          {/* Header with close button */}
          <View className="flex-row-reverse justify-between items-center p-4 border-b border-gray-200">
            <Text className="text-xl font-bold text-blue-600">
              {medication?.name || ""}
            </Text>
            <TouchableOpacity
              onPress={onClose}
              className="p-2 rounded-full bg-gray-100"
            >
              <X size={20} color="#4b5563" />
            </TouchableOpacity>
          </View>

          <ScrollView className="flex-1 px-4 pt-2">
            {/* Basic Info */}
            <View className="flex-row items-center mb-4">
              <View
                className={`px-3 py-1 rounded-full ${medication.isAvailable ? "bg-green-100" : "bg-red-100"} ml-2`}
              >
                <Text
                  className={`text-sm font-medium ${medication.isAvailable ? "text-green-700" : "text-red-700"}`}
                >
                  {medication.isAvailable ? "متوفر" : "غير متوفر"}
                </Text>
              </View>
              <View className="bg-blue-50 px-3 py-1 rounded-full">
                <Text className="text-blue-700 font-medium">
                  {medication.category}
                </Text>
              </View>
            </View>

            {/* Active Ingredient */}
            {renderSection(
              "المادة الفعالة",
              <View className="flex-row items-center">
                <Pill size={18} color="#6b7280" className="ml-2" />
                <Text className="text-gray-700">
                  {medication.activeIngredient}
                </Text>
              </View>,
            )}

            {/* Price */}
            {renderSection(
              "السعر",
              <View className="flex-row items-center">
                <DollarSign size={18} color="#6b7280" className="ml-2" />
                <Text className="text-2xl font-bold text-blue-600">
                  ${medication.price.toFixed(2)}
                </Text>
              </View>,
            )}

            {/* Description */}
            {medication.description &&
              renderSection(
                "الوصف",
                <Text className="text-gray-700 leading-relaxed">
                  {medication.description}
                </Text>,
              )}

            {/* Dosage */}
            {medication.dosageInfo &&
              renderSection(
                "الجرعة الموصى بها",
                <View className="bg-blue-50 p-3 rounded-lg">
                  <View className="flex-row items-start">
                    <Clock size={18} color="#3b82f6" className="ml-2 mt-1" />
                    <Text className="text-gray-700 flex-1">
                      {medication.dosageInfo}
                    </Text>
                  </View>
                </View>,
              )}

            {/* Side Effects */}
            {medication.sideEffects &&
              renderSection(
                "الآثار الجانبية",
                <View>
                  {medication.sideEffects.map((effect, index) => (
                    <View
                      key={index}
                      className="flex-row items-center mb-1 last:mb-0"
                    >
                      <View className="w-2 h-2 rounded-full bg-amber-500 ml-2" />
                      <Text className="text-gray-700">{effect}</Text>
                    </View>
                  ))}
                </View>,
              )}

            {/* Warnings */}
            {medication.warnings &&
              renderSection(
                "تحذيرات",
                <View className="bg-red-50 p-3 rounded-lg">
                  {medication.warnings.map((warning, index) => (
                    <View
                      key={index}
                      className="flex-row items-start mb-2 last:mb-0"
                    >
                      <AlertCircle
                        size={18}
                        color="#ef4444"
                        className="ml-2 mt-0.5"
                      />
                      <Text className="text-gray-700 flex-1">{warning}</Text>
                    </View>
                  ))}
                </View>,
              )}

            {/* Storage */}
            {medication.storage &&
              renderSection(
                "التخزين",
                <View className="flex-row items-start">
                  <Thermometer
                    size={18}
                    color="#6b7280"
                    className="ml-2 mt-0.5"
                  />
                  <Text className="text-gray-700 flex-1">
                    {medication.storage}
                  </Text>
                </View>,
              )}

            {/* Alternatives */}
            {medication.alternatives &&
              renderSection(
                "بدائل الدواء",
                <View>
                  {medication.alternatives.map((alt, index) => (
                    <TouchableOpacity
                      key={index}
                      className="flex-row justify-between items-center p-3 bg-gray-50 rounded-lg mb-2 last:mb-0"
                    >
                      <View className="flex-row items-center">
                        <Package2 size={18} color="#6b7280" className="ml-2" />
                        <Text className="text-gray-800 font-medium">
                          {alt.name}
                        </Text>
                      </View>
                      <Text className="text-blue-600 font-bold">
                        ${alt.price.toFixed(2)}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>,
              )}

            {/* Disclaimer */}
            <View className="mt-2 p-3 bg-gray-100 rounded-lg">
              <View className="flex-row items-start">
                <ShieldCheck
                  size={18}
                  color="#6b7280"
                  className="ml-2 mt-0.5"
                />
                <Text className="text-xs text-gray-500 flex-1">
                  المعلومات المقدمة هي لأغراض تعليمية فقط. استشر دائمًا أخصائي
                  الرعاية الصحية قبل تناول أي دواء.
                </Text>
              </View>
            </View>

            {/* Professional Consultation */}
            <TouchableOpacity className="mt-4 bg-blue-600 p-4 rounded-lg flex-row justify-center items-center">
              <Stethoscope size={20} color="#ffffff" className="ml-2" />
              <Text className="text-white font-bold">استشارة صيدلي</Text>
            </TouchableOpacity>

            <View className="h-10" />
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default MedicationDetails;
