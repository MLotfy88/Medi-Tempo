import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Medication {
  id: string;
  name: string;
  activeIngredient: string;
  price: number;
  category: string;
  isAvailable: boolean;
  description?: string;
  dosageInfo?: string;
  sideEffects?: string[];
  storage?: string;
  warnings?: string[];
  alternatives?: { id: string; name: string; price: number }[];
}

interface DatabaseContextType {
  medications: Medication[];
  addMedications: (newMeds: Medication[]) => Promise<void>;
  getMedicationById: (id: string) => Medication | undefined;
  searchMedications: (
    query: string,
    searchType: "brand" | "ingredient",
  ) => Medication[];
  filterMedications: (filters: any) => Medication[];
  lastUpdated: string | null;
  databaseSize: string;
  isLoading: boolean;
}

const defaultMedications: Medication[] = [
  {
    id: "1",
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
      { id: "2", name: "Ibuprofen 400mg", price: 14.99 },
      { id: "5", name: "Aspirin 325mg", price: 10.99 },
      { id: "6", name: "Naproxen 220mg", price: 16.99 },
    ],
  },
  {
    id: "2",
    name: "Ibuprofen 400mg",
    activeIngredient: "Ibuprofen",
    price: 15.5,
    category: "Anti-inflammatory",
    isAvailable: true,
    description:
      "A nonsteroidal anti-inflammatory drug used for treating pain, fever, and inflammation.",
    dosageInfo:
      "Adults: Take 1 tablet every 4-6 hours while symptoms persist. Do not exceed 3 tablets in 24 hours.",
    sideEffects: ["Stomach upset", "Heartburn", "Dizziness", "Mild headache"],
    storage: "Store at room temperature away from moisture and heat.",
    warnings: [
      "Not recommended for use during the last trimester of pregnancy.",
      "May increase the risk of heart attack or stroke.",
      "Do not use if you have had an allergic reaction to aspirin.",
    ],
    alternatives: [
      { id: "1", name: "Paracetamol 500mg", price: 12.99 },
      { id: "5", name: "Aspirin 325mg", price: 10.99 },
      { id: "6", name: "Naproxen 220mg", price: 16.99 },
    ],
  },
  {
    id: "3",
    name: "Amoxicillin 250mg",
    activeIngredient: "Amoxicillin",
    price: 24.75,
    category: "Antibiotic",
    isAvailable: false,
    description: "A penicillin antibiotic that fights bacteria in the body.",
    dosageInfo:
      "Adults: 250-500mg every 8 hours or 500-875mg every 12 hours, depending on the type and severity of infection.",
    sideEffects: ["Diarrhea", "Stomach upset", "Vomiting", "Rash"],
    storage: "Store at room temperature away from moisture, heat, and light.",
    warnings: [
      "May cause allergic reactions in patients with penicillin allergy.",
      "Complete the full course of treatment even if you feel better.",
      "May reduce the effectiveness of birth control pills.",
    ],
    alternatives: [
      { id: "7", name: "Azithromycin 250mg", price: 28.99 },
      { id: "8", name: "Cephalexin 500mg", price: 22.5 },
    ],
  },
  {
    id: "4",
    name: "Loratadine 10mg",
    activeIngredient: "Loratadine",
    price: 18.25,
    category: "Antihistamine",
    isAvailable: true,
    description:
      "An antihistamine that reduces the effects of natural chemical histamine in the body.",
    dosageInfo: "Adults and children 6 years and older: Take 1 tablet daily.",
    sideEffects: ["Headache", "Drowsiness", "Dry mouth", "Fatigue"],
    storage: "Store at room temperature away from moisture and heat.",
    warnings: [
      "May cause drowsiness in some patients.",
      "Avoid alcohol consumption while taking this medication.",
      "Consult a doctor if you have liver or kidney disease.",
    ],
    alternatives: [
      { id: "9", name: "Cetirizine 10mg", price: 16.75 },
      { id: "10", name: "Fexofenadine 180mg", price: 21.99 },
    ],
  },
  {
    id: "5",
    name: "Omeprazole 20mg",
    activeIngredient: "Omeprazole",
    price: 22.99,
    category: "Antacid",
    isAvailable: true,
    description:
      "A proton pump inhibitor that decreases the amount of acid produced in the stomach.",
    dosageInfo:
      "Adults: Take 1 capsule daily before eating, preferably in the morning.",
    sideEffects: ["Headache", "Abdominal pain", "Nausea", "Diarrhea"],
    storage: "Store at room temperature away from moisture, heat, and light.",
    warnings: [
      "Long-term use may increase the risk of bone fractures.",
      "May interact with certain medications like clopidogrel.",
      "Consult a doctor if symptoms persist for more than 14 days.",
    ],
    alternatives: [
      { id: "11", name: "Esomeprazole 40mg", price: 26.5 },
      { id: "12", name: "Pantoprazole 40mg", price: 20.75 },
    ],
  },
];

const DatabaseContext = createContext<DatabaseContextType | undefined>(
  undefined,
);

export const DatabaseProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [medications, setMedications] = useState<Medication[]>([]);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  const [databaseSize, setDatabaseSize] = useState<string>("0 KB");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setIsLoading(true);
        // Try to load from AsyncStorage
        const storedMeds = await AsyncStorage.getItem("medications");
        const storedLastUpdated = await AsyncStorage.getItem("lastUpdated");

        if (storedMeds) {
          setMedications(JSON.parse(storedMeds));
          setLastUpdated(storedLastUpdated);
          // Calculate approximate size
          const sizeInBytes = new Blob([storedMeds]).size;
          setDatabaseSize(formatFileSize(sizeInBytes));
        } else {
          // Use default data if nothing is stored
          setMedications(defaultMedications);
          const now = new Date().toISOString();
          setLastUpdated(now);
          await AsyncStorage.setItem(
            "medications",
            JSON.stringify(defaultMedications),
          );
          await AsyncStorage.setItem("lastUpdated", now);
          const sizeInBytes = new Blob([JSON.stringify(defaultMedications)])
            .size;
          setDatabaseSize(formatFileSize(sizeInBytes));
        }
      } catch (error) {
        console.error("Error loading database:", error);
        // Fallback to default data
        setMedications(defaultMedications);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, []);

  const addMedications = async (newMeds: Medication[]) => {
    try {
      setIsLoading(true);
      // Merge new medications with existing ones, avoiding duplicates by ID
      const existingIds = new Set(medications.map((med) => med.id));
      const uniqueNewMeds = newMeds.filter((med) => !existingIds.has(med.id));

      const updatedMeds = [...medications, ...uniqueNewMeds];
      setMedications(updatedMeds);

      // Update storage
      const now = new Date().toISOString();
      setLastUpdated(now);
      await AsyncStorage.setItem("medications", JSON.stringify(updatedMeds));
      await AsyncStorage.setItem("lastUpdated", now);

      // Update size
      const sizeInBytes = new Blob([JSON.stringify(updatedMeds)]).size;
      setDatabaseSize(formatFileSize(sizeInBytes));
    } catch (error) {
      console.error("Error adding medications:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const getMedicationById = (id: string): Medication | undefined => {
    return medications.find((med) => med.id === id);
  };

  const searchMedications = (
    query: string,
    searchType: "brand" | "ingredient",
  ): Medication[] => {
    if (!query) return medications;

    return medications.filter((med) => {
      if (searchType === "brand") {
        return med.name.toLowerCase().includes(query.toLowerCase());
      } else {
        return med.activeIngredient.toLowerCase().includes(query.toLowerCase());
      }
    });
  };

  const filterMedications = (filters: any): Medication[] => {
    let filtered = [...medications];

    // Filter by price range
    if (filters.price && filters.price.length > 0) {
      filtered = filtered.filter((med) => {
        if (filters.price.includes("Low") && med.price < 15) return true;
        if (
          filters.price.includes("Medium") &&
          med.price >= 15 &&
          med.price < 25
        )
          return true;
        if (filters.price.includes("High") && med.price >= 25) return true;
        return false;
      });
    }

    // Filter by category
    if (filters.category && filters.category.length > 0) {
      filtered = filtered.filter((med) => {
        return filters.category.some((cat: string) =>
          med.category.toLowerCase().includes(cat.toLowerCase()),
        );
      });
    }

    // Filter by availability
    if (filters.availability && filters.availability.length > 0) {
      filtered = filtered.filter((med) => {
        if (filters.availability.includes("In Stock") && med.isAvailable)
          return true;
        if (
          filters.availability.includes("Prescription Only") &&
          med.category.toLowerCase().includes("antibiotic")
        )
          return true;
        if (
          filters.availability.includes("Over the Counter") &&
          !med.category.toLowerCase().includes("antibiotic")
        )
          return true;
        return false;
      });
    }

    return filtered;
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  return (
    <DatabaseContext.Provider
      value={{
        medications,
        addMedications,
        getMedicationById,
        searchMedications,
        filterMedications,
        lastUpdated,
        databaseSize,
        isLoading,
      }}
    >
      {children}
    </DatabaseContext.Provider>
  );
};

export const useDatabase = () => {
  const context = useContext(DatabaseContext);
  if (context === undefined) {
    throw new Error("useDatabase must be used within a DatabaseProvider");
  }
  return context;
};
