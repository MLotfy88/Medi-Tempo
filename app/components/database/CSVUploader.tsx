import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Platform,
  Alert,
} from "react-native";
import {
  Upload,
  CheckCircle,
  AlertCircle,
  FileText,
} from "lucide-react-native";
import * as DocumentPicker from "expo-document-picker";

interface CSVUploaderProps {
  onUploadComplete?: (data: any[]) => void;
  onError?: (error: string) => void;
}

const CSVUploader = ({
  onUploadComplete = () => {},
  onError = () => {},
}: CSVUploaderProps) => {
  const [isUploading, setIsUploading] = useState(false);
  const [uploadStatus, setUploadStatus] = useState<
    "idle" | "uploading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [fileName, setFileName] = useState("");
  const [fileSize, setFileSize] = useState("");

  const handleFilePick = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: "text/csv",
        copyToCacheDirectory: true,
      });

      if (result.canceled) {
        return;
      }

      const file = result.assets[0];
      setFileName(file.name);
      setFileSize(formatFileSize(file.size));
      processCSVFile(file);
    } catch (error) {
      setUploadStatus("error");
      setErrorMessage("Failed to pick document");
      onError("Failed to pick document");
    }
  };

  const processCSVFile = async (file: DocumentPicker.DocumentPickerAsset) => {
    setIsUploading(true);
    setUploadStatus("uploading");

    try {
      // In a real app, you would parse the CSV file here
      // For this demo, we'll simulate processing with a timeout
      setTimeout(() => {
        // Mock data that would come from parsing the CSV
        const mockData = [
          {
            id: "csv-1",
            name: "Amoxicillin 500mg",
            activeIngredient: "Amoxicillin",
            price: 18.99,
            category: "Antibiotic",
            isAvailable: true,
            description:
              "A penicillin antibiotic that fights bacteria in the body.",
            dosageInfo:
              "Adults: 250-500mg every 8 hours depending on infection severity.",
            sideEffects: ["Diarrhea", "Stomach upset", "Vomiting", "Rash"],
            storage:
              "Store at room temperature away from moisture, heat, and light.",
            warnings: [
              "May cause allergic reactions in patients with penicillin allergy.",
            ],
          },
          {
            id: "csv-2",
            name: "Lisinopril 10mg",
            activeIngredient: "Lisinopril",
            price: 12.5,
            category: "Blood Pressure",
            isAvailable: true,
            description:
              "An ACE inhibitor used to treat high blood pressure and heart failure.",
            dosageInfo: "Adults: 10-40mg once daily.",
            sideEffects: ["Dizziness", "Headache", "Dry cough", "Fatigue"],
            storage: "Store at room temperature away from moisture and heat.",
            warnings: ["May cause harm to an unborn baby."],
          },
          {
            id: "csv-3",
            name: "Metformin 850mg",
            activeIngredient: "Metformin",
            price: 9.99,
            category: "Diabetes",
            isAvailable: true,
            description:
              "An oral diabetes medicine that helps control blood sugar levels.",
            dosageInfo: "Adults: 500-850mg twice daily with meals.",
            sideEffects: ["Nausea", "Vomiting", "Stomach upset", "Diarrhea"],
            storage: "Store at room temperature away from moisture and heat.",
            warnings: [
              "May cause a rare but serious condition called lactic acidosis.",
            ],
          },
          {
            id: "csv-4",
            name: "Atorvastatin 20mg",
            activeIngredient: "Atorvastatin Calcium",
            price: 15.75,
            category: "Cholesterol",
            isAvailable: true,
            description:
              "A statin medication used to lower blood cholesterol levels.",
            dosageInfo: "Adults: 10-80mg once daily.",
            sideEffects: [
              "Muscle pain",
              "Headache",
              "Digestive problems",
              "Mild rash",
            ],
            storage: "Store at room temperature away from moisture and heat.",
            warnings: ["May cause liver problems."],
          },
          {
            id: "csv-5",
            name: "Sertraline 50mg",
            activeIngredient: "Sertraline HCl",
            price: 22.5,
            category: "Antidepressant",
            isAvailable: true,
            description:
              "An SSRI antidepressant used to treat depression, anxiety, and other conditions.",
            dosageInfo: "Adults: 50-200mg once daily.",
            sideEffects: ["Nausea", "Insomnia", "Dizziness", "Dry mouth"],
            storage: "Store at room temperature away from moisture and heat.",
            warnings: [
              "May increase risk of suicidal thoughts in young adults.",
            ],
          },
        ];

        setIsUploading(false);
        setUploadStatus("success");
        onUploadComplete(mockData);

        // Show confirmation alert
        if (Platform.OS === "web") {
          alert("تم إضافة 5 أدوية جديدة إلى قاعدة البيانات");
        } else {
          Alert.alert(
            "تم الرفع بنجاح",
            "تم إضافة 5 أدوية جديدة إلى قاعدة البيانات",
            [{ text: "حسناً", onPress: () => console.log("OK Pressed") }],
          );
        }
      }, 2000);
    } catch (error) {
      setIsUploading(false);
      setUploadStatus("error");
      setErrorMessage("Failed to process CSV file");
      onError("Failed to process CSV file");
    }
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return "0 Bytes";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const resetUploader = () => {
    setUploadStatus("idle");
    setErrorMessage("");
    setFileName("");
    setFileSize("");
  };

  return (
    <View className="bg-white p-4 rounded-lg shadow-sm">
      <View className="flex-row items-center justify-between mb-4">
        <Text className="text-lg font-bold text-gray-800">
          رفع قاعدة بيانات الأدوية
        </Text>
        <FileText size={20} color="#4b5563" />
      </View>

      {uploadStatus === "idle" && (
        <TouchableOpacity
          className="border-2 border-dashed border-blue-300 bg-blue-50 rounded-lg p-6 items-center justify-center"
          onPress={handleFilePick}
        >
          <Upload size={32} color="#3b82f6" />
          <Text className="text-blue-700 font-medium mt-3 text-center">
            انقر لاختيار ملف CSV
          </Text>
          <Text className="text-gray-500 text-sm mt-1 text-center">
            يجب أن يحتوي الملف على أعمدة: الاسم، المادة الفعالة، السعر، الفئة،
            التوفر
          </Text>
        </TouchableOpacity>
      )}

      {uploadStatus === "uploading" && (
        <View className="border-2 border-blue-300 bg-blue-50 rounded-lg p-6 items-center justify-center">
          <ActivityIndicator size="large" color="#3b82f6" />
          <Text className="text-blue-700 font-medium mt-3">
            جاري معالجة الملف...
          </Text>
          <Text className="text-gray-500 text-sm mt-1">{fileName}</Text>
        </View>
      )}

      {uploadStatus === "success" && (
        <View className="border-2 border-green-300 bg-green-50 rounded-lg p-6 items-center justify-center">
          <CheckCircle size={32} color="#16a34a" />
          <Text className="text-green-700 font-medium mt-3">
            تم رفع الملف بنجاح!
          </Text>
          <Text className="text-gray-500 text-sm mt-1">
            تمت إضافة الأدوية إلى قاعدة البيانات
          </Text>
          <TouchableOpacity
            className="mt-4 bg-green-600 py-2 px-4 rounded-md"
            onPress={resetUploader}
          >
            <Text className="text-white font-medium">رفع ملف آخر</Text>
          </TouchableOpacity>
        </View>
      )}

      {uploadStatus === "error" && (
        <View className="border-2 border-red-300 bg-red-50 rounded-lg p-6 items-center justify-center">
          <AlertCircle size={32} color="#dc2626" />
          <Text className="text-red-700 font-medium mt-3">
            حدث خطأ أثناء رفع الملف
          </Text>
          <Text className="text-gray-500 text-sm mt-1">{errorMessage}</Text>
          <TouchableOpacity
            className="mt-4 bg-red-600 py-2 px-4 rounded-md"
            onPress={resetUploader}
          >
            <Text className="text-white font-medium">حاول مرة أخرى</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

export default CSVUploader;
