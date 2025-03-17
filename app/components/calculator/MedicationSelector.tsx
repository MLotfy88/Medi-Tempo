import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
} from "react-native";
import { Search, X, ChevronDown } from "lucide-react-native";

interface MedicationOption {
  id: string;
  name: string;
  activeIngredient: string;
}

interface MedicationSelectorProps {
  onSelect?: (medication: MedicationOption) => void;
  selectedMedication?: MedicationOption | null;
}

const MedicationSelector = ({
  onSelect = () => {},
  selectedMedication = null,
}: MedicationSelectorProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Mock data for medications
  const mockMedications: MedicationOption[] = [
    { id: "1", name: "Paracetamol 500mg", activeIngredient: "Paracetamol" },
    { id: "2", name: "Ibuprofen 400mg", activeIngredient: "Ibuprofen" },
    { id: "3", name: "Amoxicillin 250mg", activeIngredient: "Amoxicillin" },
    { id: "4", name: "Omeprazole 20mg", activeIngredient: "Omeprazole" },
    { id: "5", name: "Atorvastatin 10mg", activeIngredient: "Atorvastatin" },
  ];

  const filteredMedications = mockMedications.filter(
    (med) =>
      med.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      med.activeIngredient.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (medication: MedicationOption) => {
    onSelect(medication);
    setIsOpen(false);
  };

  const clearSelection = () => {
    onSelect(null as any);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm mb-4">
      <Text className="text-gray-700 font-semibold mb-2">
        Select Medication
      </Text>

      {/* Selected medication display or dropdown trigger */}
      <TouchableOpacity
        onPress={toggleDropdown}
        className="flex-row items-center justify-between border border-gray-300 rounded-md p-3"
      >
        <View className="flex-1 flex-row items-center">
          {selectedMedication ? (
            <>
              <Text className="flex-1 text-gray-800">
                {selectedMedication.name}
              </Text>
              <TouchableOpacity onPress={clearSelection} className="p-1">
                <X size={18} color="#6b7280" />
              </TouchableOpacity>
            </>
          ) : (
            <Text className="text-gray-500">Choose a medication</Text>
          )}
        </View>
        <ChevronDown size={20} color="#6b7280" />
      </TouchableOpacity>

      {/* Dropdown content */}
      {isOpen && (
        <View className="border border-gray-300 rounded-md mt-1 bg-white shadow-sm">
          {/* Search input */}
          <View className="p-2 border-b border-gray-200 flex-row items-center">
            <Search size={18} color="#6b7280" className="mr-2" />
            <TextInput
              className="flex-1 p-2 text-gray-800"
              placeholder="Search medications..."
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          {/* Medication list */}
          <FlatList
            data={filteredMedications}
            keyExtractor={(item) => item.id}
            style={{ maxHeight: 200 }}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => handleSelect(item)}
                className="p-3 border-b border-gray-100"
              >
                <Text className="text-gray-800 font-medium">{item.name}</Text>
                <Text className="text-gray-500 text-sm">
                  {item.activeIngredient}
                </Text>
              </TouchableOpacity>
            )}
            ListEmptyComponent={
              <View className="p-4 items-center">
                <Text className="text-gray-500">No medications found</Text>
              </View>
            }
          />
        </View>
      )}
    </View>
  );
};

export default MedicationSelector;
