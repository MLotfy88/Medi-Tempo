import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { AlertTriangle, CheckCircle } from "lucide-react-native";

interface DoseResultProps {
  medicationName?: string;
  dosage?: number;
  unit?: string;
  frequency?: string;
  isSafe?: boolean;
  warningMessage?: string;
  patientWeight?: number;
  weightUnit?: string;
}

const DoseResult = ({
  medicationName = "Paracetamol",
  dosage = 250,
  unit = "mg",
  frequency = "every 6 hours",
  isSafe = true,
  warningMessage = "Dose exceeds recommended maximum for patient weight",
  patientWeight = 25,
  weightUnit = "kg",
}: DoseResultProps) => {
  return (
    <View className="w-full p-4 rounded-lg bg-white border border-gray-200 shadow-sm">
      <Text className="text-xl font-bold text-gray-800 mb-2">
        Calculated Dose Result
      </Text>

      <View className="mb-4">
        <Text className="text-gray-600 mb-1">Medication</Text>
        <Text className="text-lg font-semibold">{medicationName}</Text>
      </View>

      <View className="mb-4">
        <Text className="text-gray-600 mb-1">Patient Weight</Text>
        <Text className="text-lg font-semibold">
          {patientWeight} {weightUnit}
        </Text>
      </View>

      <View className="mb-4 bg-gray-100 p-3 rounded-md">
        <Text className="text-gray-600 mb-1">Recommended Dose</Text>
        <Text className="text-2xl font-bold text-blue-600">
          {dosage} {unit}
        </Text>
        <Text className="text-gray-700">{frequency}</Text>
      </View>

      {isSafe ? (
        <View className="flex-row items-center p-3 bg-green-100 rounded-md">
          <CheckCircle size={24} color="#16a34a" />
          <Text className="ml-2 text-green-700 font-medium">
            Safe dosage for patient weight
          </Text>
        </View>
      ) : (
        <View className="flex-row items-center p-3 bg-red-100 rounded-md">
          <AlertTriangle size={24} color="#dc2626" />
          <Text className="ml-2 text-red-700 font-medium">
            {warningMessage}
          </Text>
        </View>
      )}

      <View className="mt-4 pt-3 border-t border-gray-200">
        <Text className="text-xs text-gray-500">
          This calculation is based on standard dosing guidelines. Always
          consult a healthcare professional before administering medication.
        </Text>
      </View>
    </View>
  );
};

export default DoseResult;
