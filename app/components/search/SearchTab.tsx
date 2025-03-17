import React, { useState, useEffect } from "react";
import { View, Text, SafeAreaView, I18nManager, Platform } from "react-native";
import { Pill, Search } from "lucide-react-native";
import { useDatabase } from "../../database";

import SearchInput from "./SearchInput";
import FilterOptions from "./FilterOptions";
import MedicationList from "./MedicationList";

interface Medication {
  id: string;
  name: string;
  activeIngredient: string;
  price: number;
  category: string;
  isAvailable: boolean;
}

interface SearchTabProps {
  initialSearchTerm?: string;
  initialSearchType?: "brand" | "ingredient";
  onMedicationSelect?: (medication: Medication) => void;
}

// RTL is now handled at the app level in _layout.tsx and index.tsx

const SearchTab = ({
  initialSearchTerm = "",
  initialSearchType = "brand",
  onMedicationSelect = () => {},
}: SearchTabProps) => {
  const [searchTerm, setSearchTerm] = useState(initialSearchTerm);
  const [searchType, setSearchType] = useState<"brand" | "ingredient">(
    initialSearchType,
  );
  const [isLoading, setIsLoading] = useState(false);
  const { medications, searchMedications, filterMedications } = useDatabase();
  const [localMedications, setLocalMedications] = useState<Medication[]>([
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
    {
      id: "6",
      name: "Metformin 500mg",
      activeIngredient: "Metformin HCl",
      price: 14.5,
      category: "Antidiabetic",
      isAvailable: true,
    },
    {
      id: "7",
      name: "Atorvastatin 10mg",
      activeIngredient: "Atorvastatin Calcium",
      price: 28.75,
      category: "Cholesterol",
      isAvailable: true,
    },
  ]);
  const [filters, setFilters] = useState({
    price: [] as string[],
    category: [] as string[],
    availability: [] as string[],
  });

  const [filteredMedications, setFilteredMedications] =
    useState<Medication[]>(localMedications);

  // Initialize with database medications
  useEffect(() => {
    setLocalMedications(medications);
    setFilteredMedications(medications);
  }, [medications]);

  // Filter medications based on search term and type
  useEffect(() => {
    if (searchTerm) {
      const results = searchMedications(searchTerm, searchType);
      setFilteredMedications(results);
    } else {
      setFilteredMedications(localMedications);
    }
  }, [searchTerm, searchType, localMedications]);

  const handleSearch = (text: string, type: "brand" | "ingredient") => {
    setSearchTerm(text);
    setSearchType(type);
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      // In a real app, this would be an API call with the search term and filters
      setIsLoading(false);
    }, 1000);
  };

  const handleFilterChange = (newFilters: {
    price: string[];
    category: string[];
    availability: string[];
  }) => {
    setFilters(newFilters);
    setIsLoading(true);

    // Apply filters using the database context
    const filtered = filterMedications(newFilters);
    setFilteredMedications(filtered);

    setTimeout(() => {
      setIsLoading(false);
    }, 300);
  };

  const handleMedicationPress = (medication: Medication) => {
    // Call the parent component's handler to show the medication details modal
    onMedicationSelect(medication);
  };

  const loadMoreMedications = () => {
    setIsLoading(true);

    // Simulate loading more data
    setTimeout(() => {
      setIsLoading(false);
      // In a real app, this would append more medications to the list
    }, 1000);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-50">
        <View className="px-4 pt-4">
          <View className="flex-row items-center mb-2">
            <Search size={20} color="#3b82f6" />
            <Text className="text-xl font-bold text-gray-800 ml-2">
              بحث الأدوية
            </Text>
          </View>

          <SearchInput
            onSearch={handleSearch}
            placeholder="Search by medication name..."
          />

          <FilterOptions onFilterChange={handleFilterChange} />
        </View>

        {searchTerm ? (
          <View className="px-4 py-2 bg-gray-100">
            <Text className="text-sm text-gray-600">
              {filteredMedications.length} results for "{searchTerm}"
              {Object.values(filters).some((arr) => arr.length > 0) &&
                " (filtered)"}
            </Text>
          </View>
        ) : null}

        <MedicationList
          medications={filteredMedications}
          isLoading={isLoading}
          onMedicationPress={handleMedicationPress}
          onEndReached={loadMoreMedications}
          hasMoreData={filteredMedications.length >= 3} // In a real app, this would be determined by the API
        />
      </View>
    </SafeAreaView>
  );
};

export default SearchTab;
