import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import { Calculator, AlertTriangle, Info } from "lucide-react-native";
import MedicationSelector from "./MedicationSelector";
import PatientInfoInput from "./PatientInfoInput";
import DoseResult from "./DoseResult";

interface MedicationOption {
  id: string;
  name: string;
  activeIngredient: string;
}

interface CalculatorTabProps {
  isActive?: boolean;
}

const CalculatorTab = ({ isActive = true }: CalculatorTabProps) => {
  const [selectedMedication, setSelectedMedication] =
    useState<MedicationOption | null>(null);
  const [patientWeight, setPatientWeight] = useState("");
  const [patientAge, setPatientAge] = useState("");
  const [weightUnit, setWeightUnit] = useState<"kg" | "lb">("kg");
  const [calculatedDose, setCalculatedDose] = useState<{
    dosage: number;
    unit: string;
    frequency: string;
    isSafe: boolean;
    warningMessage?: string;
  } | null>(null);
  const [isCalculating, setIsCalculating] = useState(false);
  const [showTips, setShowTips] = useState(true);

  // Auto-select a medication for demo purposes
  useEffect(() => {
    if (isActive && !selectedMedication) {
      setTimeout(() => {
        setSelectedMedication({
          id: "1",
          name: "Paracetamol 500mg",
          activeIngredient: "Acetaminophen",
        });
      }, 500);
    }
  }, [isActive, selectedMedication]);

  const handleCalculateDose = () => {
    if (!selectedMedication || !patientWeight) {
      return;
    }

    setIsCalculating(true);

    // Convert weight to number
    const weight = parseFloat(patientWeight);

    // Convert lb to kg if needed
    const weightInKg = weightUnit === "lb" ? weight * 0.453592 : weight;

    // Simulate API call for calculation
    setTimeout(() => {
      // Mock calculation logic based on medication and weight
      let dosage = 0;
      let unit = "mg";
      let frequency = "";
      let isSafe = true;
      let warningMessage = "";

      if (selectedMedication.name.includes("Paracetamol")) {
        dosage = Math.round(weightInKg * 15); // 15mg per kg
        frequency = "every 6 hours";
        isSafe = dosage <= 1000; // Max 1000mg per dose
        if (!isSafe) {
          warningMessage = "Dose exceeds recommended maximum of 1000mg";
        }
      } else if (selectedMedication.name.includes("Ibuprofen")) {
        dosage = Math.round(weightInKg * 10); // 10mg per kg
        frequency = "every 8 hours";
        isSafe = dosage <= 800; // Max 800mg per dose
        if (!isSafe) {
          warningMessage = "Dose exceeds recommended maximum of 800mg";
        }
      } else if (selectedMedication.name.includes("Amoxicillin")) {
        dosage = Math.round(weightInKg * 25); // 25mg per kg
        frequency = "every 12 hours";
        isSafe = dosage <= 1500; // Max 1500mg per dose
        if (!isSafe) {
          warningMessage = "Dose exceeds recommended maximum of 1500mg";
        }
      } else {
        // Default calculation for other medications
        dosage = Math.round(weightInKg * 5);
        frequency = "as directed";
      }

      setCalculatedDose({
        dosage,
        unit,
        frequency,
        isSafe,
        warningMessage,
      });
      setIsCalculating(false);
    }, 1500);
  };

  const resetCalculation = () => {
    setCalculatedDose(null);
  };

  return (
    <View className="flex-1 bg-gray-50">
      <ScrollView className="flex-1 p-4">
        <View className="flex-row items-center mb-4">
          <Calculator size={24} color="#3b82f6" />
          <Text className="text-2xl font-bold text-gray-800 ml-2">
            حاسبة الجرعات
          </Text>
        </View>

        <Text className="text-gray-600 mb-6">
          احسب الجرعة الموصى بها للدواء بناءً على وزن المريض وعمره.
        </Text>

        {showTips && (
          <View className="bg-blue-50 p-4 rounded-lg mb-4">
            <View className="flex-row justify-between items-start">
              <View className="flex-row items-start flex-1">
                <Info size={20} color="#3b82f6" className="mt-0.5 mr-2" />
                <Text className="text-blue-800 flex-1">
                  أدخل وزن المريض وعمره، ثم اختر الدواء لحساب الجرعة المناسبة.
                  تأكد من استشارة الطبيب قبل إعطاء أي دواء.
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => setShowTips(false)}
                className="ml-2"
              >
                <Text className="text-blue-800 font-bold">×</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}

        <MedicationSelector
          onSelect={setSelectedMedication}
          selectedMedication={selectedMedication}
        />

        <PatientInfoInput
          onWeightChange={setPatientWeight}
          onAgeChange={setPatientAge}
          onUnitChange={setWeightUnit}
        />

        {!calculatedDose ? (
          <TouchableOpacity
            className={`py-4 px-4 rounded-lg ${selectedMedication && patientWeight ? "bg-blue-600" : "bg-gray-400"} items-center mb-6`}
            onPress={handleCalculateDose}
            disabled={!selectedMedication || !patientWeight || isCalculating}
          >
            {isCalculating ? (
              <ActivityIndicator color="#ffffff" />
            ) : (
              <Text className="text-white font-semibold text-lg">
                حساب الجرعة
              </Text>
            )}
          </TouchableOpacity>
        ) : (
          <View className="mb-6">
            <DoseResult
              medicationName={selectedMedication?.name}
              dosage={calculatedDose.dosage}
              unit={calculatedDose.unit}
              frequency={calculatedDose.frequency}
              isSafe={calculatedDose.isSafe}
              warningMessage={calculatedDose.warningMessage}
              patientWeight={parseFloat(patientWeight)}
              weightUnit={weightUnit}
            />

            <TouchableOpacity
              className="py-3 px-4 rounded-lg bg-gray-200 items-center mt-4"
              onPress={resetCalculation}
            >
              <Text className="text-gray-800 font-semibold">إعادة الحساب</Text>
            </TouchableOpacity>
          </View>
        )}

        {!calculatedDose && (
          <View className="bg-amber-50 p-4 rounded-lg mb-6">
            <View className="flex-row items-start">
              <AlertTriangle
                size={20}
                color="#d97706"
                className="mr-2 mt-0.5"
              />
              <Text className="text-amber-800 flex-1">
                هذه الحاسبة توفر تقديرات للجرعات بناءً على وزن المريض. استشر
                دائمًا أخصائي رعاية صحية قبل إعطاء أي دواء.
              </Text>
            </View>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default CalculatorTab;
