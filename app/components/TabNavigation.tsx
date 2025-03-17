import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { useRouter, usePathname } from "expo-router";
import { Search, Calculator, Settings } from "lucide-react-native";

interface TabNavigationProps {
  activeTab?: "search" | "calculator" | "settings";
}

const TabNavigation = ({ activeTab = "search" }: TabNavigationProps) => {
  const router = useRouter();
  const pathname = usePathname();

  const tabs = [
    {
      name: "search",
      label: "بحث",
      englishLabel: "Search",
      icon: Search,
      route: "/",
    },
    {
      name: "calculator",
      label: "حاسبة",
      englishLabel: "Calculator",
      icon: Calculator,
      route: "/calculator",
    },
    {
      name: "settings",
      label: "إعدادات",
      englishLabel: "Settings",
      icon: Settings,
      route: "/settings",
    },
  ];

  const handleTabPress = (route: string) => {
    router.push(route);
  };

  return (
    <View className="bg-white border-t border-gray-200 h-[70px] flex-row justify-around items-center w-full absolute bottom-0 left-0 right-0 shadow-lg">
      {tabs.map((tab) => {
        const isActive =
          activeTab === tab.name ||
          (tab.name === "search" && pathname === "/") ||
          pathname.includes(tab.name);

        return (
          <TouchableOpacity
            key={tab.name}
            className={`flex-1 items-center justify-center h-full`}
            onPress={() => handleTabPress(tab.route)}
            accessibilityLabel={`${tab.englishLabel} tab`}
            accessibilityRole="tab"
            accessibilityState={{ selected: isActive }}
          >
            <View className="items-center">
              {isActive && (
                <View className="absolute -top-1 w-12 h-1 bg-blue-500 rounded-full" />
              )}
              <tab.icon
                size={24}
                color={isActive ? "#3b82f6" : "#6b7280"}
                strokeWidth={isActive ? 2.5 : 2}
              />
              <Text
                className={`text-xs mt-1 ${isActive ? "text-blue-500 font-semibold" : "text-gray-500"}`}
              >
                {tab.label}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabNavigation;
