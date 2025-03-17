import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  TouchableOpacity,
  Text,
  FlatList,
} from "react-native";
import { Search, Pill, X } from "lucide-react-native";
import { useDatabase } from "../../database";

interface SearchInputProps {
  onSearch?: (text: string, searchType: "brand" | "ingredient") => void;
  placeholder?: string;
}

const SearchInput = ({
  onSearch = () => {},
  placeholder = "ابحث عن الأدوية...",
}: SearchInputProps) => {
  const [searchText, setSearchText] = useState("");
  const [searchType, setSearchType] = useState<"brand" | "ingredient">("brand");
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const { medications } = useDatabase();

  useEffect(() => {
    if (searchText.length > 1) {
      // Generate suggestions based on current input
      const newSuggestions = medications
        .filter((med) => {
          if (searchType === "brand") {
            return med.name.toLowerCase().includes(searchText.toLowerCase());
          } else {
            return med.activeIngredient
              .toLowerCase()
              .includes(searchText.toLowerCase());
          }
        })
        .map((med) =>
          searchType === "brand" ? med.name : med.activeIngredient,
        )
        .slice(0, 5); // Limit to 5 suggestions

      setSuggestions(newSuggestions);
      setShowSuggestions(newSuggestions.length > 0);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
    }
  }, [searchText, searchType, medications]);

  const handleSearch = () => {
    setShowSuggestions(false);
    onSearch(searchText, searchType);
  };

  const handleSuggestionSelect = (suggestion: string) => {
    setSearchText(suggestion);
    setShowSuggestions(false);
    onSearch(suggestion, searchType);
  };

  const clearSearch = () => {
    setSearchText("");
    onSearch("", searchType);
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      <View className="flex-row items-center mb-3">
        <TouchableOpacity
          className={`py-2 px-4 rounded-full mr-2 ${searchType === "brand" ? "bg-blue-500" : "bg-gray-200"}`}
          onPress={() => setSearchType("brand")}
        >
          <Text
            className={`text-sm font-medium ${searchType === "brand" ? "text-white" : "text-gray-700"}`}
          >
            اسم الدواء
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          className={`py-2 px-4 rounded-full ${searchType === "ingredient" ? "bg-blue-500" : "bg-gray-200"}`}
          onPress={() => setSearchType("ingredient")}
        >
          <Text
            className={`text-sm font-medium ${searchType === "ingredient" ? "text-white" : "text-gray-700"}`}
          >
            المادة الفعالة
          </Text>
        </TouchableOpacity>
      </View>

      <View className="relative">
        <View className="flex-row items-center bg-gray-100 rounded-lg px-3 py-3">
          <Search size={20} color="#3b82f6" />
          <TextInput
            className="flex-1 mx-2 text-base text-gray-800"
            placeholder={placeholder}
            placeholderTextColor="#9ca3af"
            value={searchText}
            onChangeText={setSearchText}
            onSubmitEditing={handleSearch}
            returnKeyType="search"
            textAlign="right"
          />
          {searchText.length > 0 ? (
            <TouchableOpacity className="p-1" onPress={clearSearch}>
              <X size={18} color="#6b7280" />
            </TouchableOpacity>
          ) : null}
        </View>

        {showSuggestions && (
          <View className="absolute top-full left-0 right-0 bg-white border border-gray-200 rounded-md shadow-md z-10 mt-1">
            <FlatList
              data={suggestions}
              keyExtractor={(item, index) => `suggestion-${index}`}
              renderItem={({ item }) => (
                <TouchableOpacity
                  className="p-3 border-b border-gray-100"
                  onPress={() => handleSuggestionSelect(item)}
                >
                  <Text className="text-gray-800">{item}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        )}
      </View>

      {searchText.length > 0 && (
        <TouchableOpacity
          className="mt-2 bg-blue-500 rounded-lg py-2 items-center"
          onPress={handleSearch}
        >
          <Text className="text-white font-medium">بحث</Text>
        </TouchableOpacity>
      )}

      {searchType === "ingredient" && (
        <View className="mt-2 flex-row items-center">
          <Pill size={16} color="#3b82f6" />
          <Text className="ml-1 text-xs text-gray-600">
            البحث بالمادة الفعالة سيظهر جميع الأدوية التي تحتوي عليها
          </Text>
        </View>
      )}
    </View>
  );
};

export default SearchInput;
