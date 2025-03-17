import React, { useState } from "react";
import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  TouchableOpacity,
} from "react-native";
import { Search } from "lucide-react-native";
import MedicationCard from "./MedicationCard";

interface Medication {
  id: string;
  name: string;
  activeIngredient: string;
  price: number;
  category: string;
  isAvailable: boolean;
}

interface MedicationListProps {
  medications?: Medication[];
  isLoading?: boolean;
  onMedicationPress?: (medication: Medication) => void;
  onEndReached?: () => void;
  hasMoreData?: boolean;
}

const MedicationList = ({
  medications = [
    {
      id: "1",
      name: "Paracetamol 500mg",
      activeIngredient: "Acetaminophen",
      price: 12.99,
      category: "Pain Relief",
      isAvailable: true,
    },
    {
      id: "2",
      name: "Ibuprofen 400mg",
      activeIngredient: "Ibuprofen",
      price: 15.5,
      category: "Anti-inflammatory",
      isAvailable: true,
    },
    {
      id: "3",
      name: "Amoxicillin 250mg",
      activeIngredient: "Amoxicillin",
      price: 24.75,
      category: "Antibiotic",
      isAvailable: false,
    },
    {
      id: "4",
      name: "Loratadine 10mg",
      activeIngredient: "Loratadine",
      price: 18.25,
      category: "Antihistamine",
      isAvailable: true,
    },
    {
      id: "5",
      name: "Omeprazole 20mg",
      activeIngredient: "Omeprazole",
      price: 22.99,
      category: "Antacid",
      isAvailable: true,
    },
  ],
  isLoading = false,
  onMedicationPress = () => {},
  onEndReached = () => {},
  hasMoreData = false,
}: MedicationListProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = () => {
    setRefreshing(true);
    // Simulate refresh
    setTimeout(() => setRefreshing(false), 1500);
  };

  const renderFooter = () => {
    if (!isLoading) return null;

    return (
      <View className="py-4 flex items-center justify-center">
        <ActivityIndicator size="small" color="#3b82f6" />
      </View>
    );
  };

  const renderEmptyList = () => {
    if (isLoading) return null;

    return (
      <View className="flex-1 items-center justify-center py-10">
        <View className="bg-gray-100 p-4 rounded-full mb-4">
          <Search size={32} color="#9ca3af" />
        </View>
        <Text className="text-lg font-medium text-gray-700 mb-2">
          No medications found
        </Text>
        <Text className="text-sm text-gray-500 text-center px-6">
          Try adjusting your search or filters to find what you're looking for
        </Text>
      </View>
    );
  };

  return (
    <View className="flex-1 bg-gray-50">
      <FlatList
        data={medications}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <MedicationCard
            name={item.name}
            activeIngredient={item.activeIngredient}
            price={item.price}
            category={item.category}
            isAvailable={item.isAvailable}
            onPress={() => onMedicationPress(item)}
          />
        )}
        contentContainerStyle={{
          padding: 16,
          paddingBottom: medications.length ? 16 : 0,
          flexGrow: 1,
        }}
        showsVerticalScrollIndicator={false}
        onEndReached={onEndReached}
        onEndReachedThreshold={0.5}
        ListFooterComponent={renderFooter}
        ListEmptyComponent={renderEmptyList}
        refreshing={refreshing}
        onRefresh={handleRefresh}
      />

      {hasMoreData && !isLoading && medications.length > 0 && (
        <TouchableOpacity
          className="bg-blue-50 py-3 mx-4 mb-4 rounded-lg items-center"
          onPress={onEndReached}
        >
          <Text className="text-blue-600 font-medium">Load More Results</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

export default MedicationList;
