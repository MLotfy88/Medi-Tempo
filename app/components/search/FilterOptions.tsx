import React, { useState } from "react";
import { View, Text, ScrollView, Pressable } from "react-native";
import { Filter, DollarSign, Package2, CheckCircle } from "lucide-react-native";

interface FilterOptionsProps {
  onFilterChange?: (filters: {
    price: string[];
    category: string[];
    availability: string[];
  }) => void;
}

const FilterOptions = ({ onFilterChange }: FilterOptionsProps) => {
  const [activeFilters, setActiveFilters] = useState({
    price: [] as string[],
    category: [] as string[],
    availability: [] as string[],
  });

  const [isExpanded, setIsExpanded] = useState(false);

  const priceOptions = ["Low", "Medium", "High"];
  const categoryOptions = [
    "Antibiotics",
    "Painkillers",
    "Antidepressants",
    "Vitamins",
    "Cardiovascular",
  ];
  const availabilityOptions = [
    "In Stock",
    "Prescription Only",
    "Over the Counter",
  ];

  const toggleFilter = (
    type: "price" | "category" | "availability",
    value: string,
  ) => {
    setActiveFilters((prev) => {
      const newFilters = { ...prev };
      if (newFilters[type].includes(value)) {
        newFilters[type] = newFilters[type].filter((item) => item !== value);
      } else {
        newFilters[type] = [...newFilters[type], value];
      }

      if (onFilterChange) {
        onFilterChange(newFilters);
      }

      return newFilters;
    });
  };

  const renderFilterChips = (
    type: "price" | "category" | "availability",
    options: string[],
  ) => {
    return (
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 4 }}
      >
        {options.map((option) => {
          const isActive = activeFilters[type].includes(option);
          return (
            <Pressable
              key={option}
              onPress={() => toggleFilter(type, option)}
              style={({ pressed }) => [
                {
                  backgroundColor: isActive
                    ? "#3b82f6"
                    : pressed
                      ? "#e5e7eb"
                      : "#f3f4f6",
                  paddingHorizontal: 12,
                  paddingVertical: 6,
                  borderRadius: 16,
                  marginRight: 8,
                  flexDirection: "row",
                  alignItems: "center",
                },
              ]}
            >
              <Text
                style={{
                  color: isActive ? "white" : "#374151",
                  fontWeight: isActive ? "600" : "400",
                  fontSize: 14,
                }}
              >
                {option}
              </Text>
            </Pressable>
          );
        })}
      </ScrollView>
    );
  };

  return (
    <View className="bg-white p-3 rounded-lg shadow-sm mb-2">
      <Pressable
        onPress={() => setIsExpanded(!isExpanded)}
        className="flex-row items-center justify-between py-1"
      >
        <View className="flex-row items-center">
          <Filter size={18} color="#4b5563" />
          <Text className="text-gray-700 font-medium ml-2">Filters</Text>
          {Object.values(activeFilters).some((arr) => arr.length > 0) && (
            <View className="bg-blue-500 rounded-full w-5 h-5 ml-2 items-center justify-center">
              <Text className="text-white text-xs font-bold">
                {Object.values(activeFilters).reduce(
                  (acc, curr) => acc + curr.length,
                  0,
                )}
              </Text>
            </View>
          )}
        </View>
        <Text className="text-blue-500">{isExpanded ? "Hide" : "Show"}</Text>
      </Pressable>

      {isExpanded && (
        <View className="mt-3">
          <View className="mb-3">
            <View className="flex-row items-center mb-2">
              <DollarSign size={16} color="#4b5563" />
              <Text className="text-gray-600 font-medium ml-1">Price</Text>
            </View>
            {renderFilterChips("price", priceOptions)}
          </View>

          <View className="mb-3">
            <View className="flex-row items-center mb-2">
              <Package2 size={16} color="#4b5563" />
              <Text className="text-gray-600 font-medium ml-1">Category</Text>
            </View>
            {renderFilterChips("category", categoryOptions)}
          </View>

          <View>
            <View className="flex-row items-center mb-2">
              <CheckCircle size={16} color="#4b5563" />
              <Text className="text-gray-600 font-medium ml-1">
                Availability
              </Text>
            </View>
            {renderFilterChips("availability", availabilityOptions)}
          </View>
        </View>
      )}
    </View>
  );
};

export default FilterOptions;
