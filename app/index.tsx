import React, { useState, useEffect } from "react";
import { View, SafeAreaView, I18nManager, Platform } from "react-native";
import { StatusBar } from "expo-status-bar";

import Header from "./components/Header";
import TabNavigation from "./components/TabNavigation";
import SearchTab from "./components/search/SearchTab";
import CalculatorTab from "./components/calculator/CalculatorTab";
import SettingsTab from "./components/settings/SettingsTab";
import MedicationDetails from "./components/modals/MedicationDetails";
import { DatabaseProvider } from "./database";

function HomeScreen() {
  const [activeTab, setActiveTab] = useState<
    "search" | "calculator" | "settings"
  >("search");

  // Get the current route from the URL
  useEffect(() => {
    const path = window.location.pathname;
    if (path.includes("calculator")) {
      setActiveTab("calculator");
    } else if (path.includes("settings")) {
      setActiveTab("settings");
    } else {
      setActiveTab("search");
    }
  }, []);
  const [currentLanguage, setCurrentLanguage] = useState<"ar" | "en">("ar");
  const [showMedicationDetails, setShowMedicationDetails] = useState(false);
  const [selectedMedication, setSelectedMedication] = useState({
    id: "med-123",
    name: "Paracetamol 500mg",
    activeIngredient: "Acetaminophen",
    price: 12.99,
    category: "Pain Relief",
    isAvailable: true,
    description:
      "A common pain reliever and fever reducer used for treating mild to moderate pain.",
    dosageInfo:
      "Adults and children 12 years and over: Take 1-2 tablets every 4-6 hours as needed. Do not exceed 8 tablets in 24 hours.",
    sideEffects: ["Nausea", "Stomach pain", "Headache", "Dizziness"],
    storage: "Store at room temperature away from moisture and heat.",
    warnings: [
      "Do not use with other products containing paracetamol.",
      "Alcohol may increase the risk of liver damage.",
      "Consult a doctor if symptoms persist for more than 3 days.",
    ],
    alternatives: [
      { id: "med-124", name: "Ibuprofen 400mg", price: 14.99 },
      { id: "med-125", name: "Aspirin 325mg", price: 10.99 },
      { id: "med-126", name: "Naproxen 220mg", price: 16.99 },
    ],
  });

  // Ensure RTL is enabled for Arabic
  useEffect(() => {
    if (Platform.OS === "web") {
      I18nManager.allowRTL(true);
      I18nManager.forceRTL(currentLanguage === "ar");
      document.documentElement.dir = currentLanguage === "ar" ? "rtl" : "ltr";
    }
  }, [currentLanguage]);

  const handleTabChange = (tab: "search" | "calculator" | "settings") => {
    setActiveTab(tab);
  };

  const handleToggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "en" ? "ar" : "en");
    if (Platform.OS === "web") {
      if (currentLanguage === "en") {
        document.documentElement.dir = "rtl";
      } else {
        document.documentElement.dir = "ltr";
      }
    }
  };

  const handleMedicationSelect = (medication: any) => {
    setSelectedMedication(medication);
    setShowMedicationDetails(true);
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      <StatusBar style="auto" />

      <Header
        onToggleLanguage={handleToggleLanguage}
        currentLanguage={currentLanguage}
      />

      <View className="flex-1" style={{ marginBottom: 70 }}>
        {activeTab === "search" && (
          <SearchTab
            initialSearchType={
              currentLanguage === "ar" ? "ingredient" : "brand"
            }
            onMedicationSelect={handleMedicationSelect}
          />
        )}

        {activeTab === "calculator" && (
          <CalculatorTab isActive={activeTab === "calculator"} />
        )}

        {activeTab === "settings" && (
          <SettingsTab
            currentLanguage={currentLanguage}
            onLanguageChange={setCurrentLanguage}
          />
        )}
      </View>

      <TabNavigation
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab)}
      />

      <MedicationDetails
        visible={showMedicationDetails}
        onClose={() => setShowMedicationDetails(false)}
        medication={selectedMedication}
        language={currentLanguage}
      />
    </SafeAreaView>
  );
}

export default function App() {
  return (
    <DatabaseProvider>
      <HomeScreen />
    </DatabaseProvider>
  );
}
