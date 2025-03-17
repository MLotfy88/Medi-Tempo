import React, { useState, useEffect } from "react";
import { View, Text, TextInput, TouchableOpacity } from "react-native";
import { ChevronDown, Info, User, Scale } from "lucide-react-native";

interface PatientInfoInputProps {
  onWeightChange?: (weight: string) => void;
  onAgeChange?: (age: string) => void;
  onUnitChange?: (unit: "kg" | "lb") => void;
}

const PatientInfoInput = ({
  onWeightChange = () => {},
  onAgeChange = () => {},
  onUnitChange = () => {},
}: PatientInfoInputProps) => {
  const [weight, setWeight] = useState("25"); // Default weight for demo
  const [age, setAge] = useState("6"); // Default age for demo
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [isUnitDropdownOpen, setIsUnitDropdownOpen] = useState(false);

  // Initialize with default values
  useEffect(() => {
    onWeightChange(weight);
    onAgeChange(age);
  }, []);

  const handleWeightChange = (value: string) => {
    // Only allow numbers and decimal point
    if (/^\d*\.?\d*$/.test(value) || value === "") {
      setWeight(value);
      onWeightChange(value);
    }
  };

  const handleAgeChange = (value: string) => {
    // Only allow numbers
    if (/^\d*$/.test(value) || value === "") {
      setAge(value);
      onAgeChange(value);
    }
  };

  const toggleWeightUnit = (unit: "kg" | "lb") => {
    setWeightUnit(unit);
    setIsUnitDropdownOpen(false);
    onUnitChange(unit);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <Text className="text-lg font-semibold mb-3 text-gray-800 text-right">
        معلومات المريض
      </Text>

      <View className="mb-4">
        <View className="flex-row items-center mb-1 justify-end">
          <TouchableOpacity className="mr-2">
            <Info size={16} color="#3b82f6" />
          </TouchableOpacity>
          <Text className="text-gray-600 font-medium">وزن المريض</Text>
          <Scale size={18} color="#3b82f6" className="ml-2" />
        </View>

        <View className="flex-row items-center">
          <View className="relative">
            <TouchableOpacity
              className="h-12 px-3 border border-gray-300 rounded-l-md bg-gray-100 flex-row items-center justify-between"
              style={{ borderRightWidth: 0 }}
              onPress={() => setIsUnitDropdownOpen(!isUnitDropdownOpen)}
            >
              <ChevronDown size={16} color="#3b82f6" />
              <Text className="text-gray-700 ml-2">{weightUnit}</Text>
            </TouchableOpacity>

            {isUnitDropdownOpen && (
              <View className="absolute top-12 left-0 bg-white border border-gray-300 rounded-md shadow-md z-10 w-20">
                <TouchableOpacity
                  className="px-3 py-2 border-b border-gray-200"
                  onPress={() => toggleWeightUnit("kg")}
                >
                  <Text
                    className={`${weightUnit === "kg" ? "font-bold text-blue-600" : "text-gray-700"}`}
                  >
                    kg
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  className="px-3 py-2"
                  onPress={() => toggleWeightUnit("lb")}
                >
                  <Text
                    className={`${weightUnit === "lb" ? "font-bold text-blue-600" : "text-gray-700"}`}
                  >
                    lb
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          </View>

          <TextInput
            className="flex-1 h-12 px-3 border border-gray-300 rounded-r-md bg-gray-50 text-right"
            placeholder="أدخل الوزن"
            keyboardType="numeric"
            value={weight}
            onChangeText={handleWeightChange}
          />
        </View>
      </View>

      <View>
        <View className="flex-row items-center mb-1 justify-end">
          <TouchableOpacity className="mr-2">
            <Info size={16} color="#3b82f6" />
          </TouchableOpacity>
          <Text className="text-gray-600 font-medium">عمر المريض</Text>
          <User size={18} color="#3b82f6" className="ml-2" />
        </View>

        <View className="flex-row items-center">
          <View
            className="h-12 px-3 border border-gray-300 rounded-l-md bg-gray-100 flex-row items-center justify-between"
            style={{ borderRightWidth: 0 }}
          >
            <Text className="text-gray-700">سنة</Text>
          </View>

          <TextInput
            className="flex-1 h-12 px-3 border border-gray-300 rounded-r-md bg-gray-50 text-right"
            placeholder="أدخل العمر"
            keyboardType="numeric"
            value={age}
            onChangeText={handleAgeChange}
          />
        </View>
      </View>
    </View>
  );
};

export default PatientInfoInput;
