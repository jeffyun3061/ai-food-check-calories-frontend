"use client";

import { useState } from "react";
import axios from "axios";

export default function AgentPage() {
  const [file, setFile] = useState<File | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      setFile(e.target.files[0]);
      console.log("파일 선택됨:", e.target.files[0]);
    }
  };

  const handleAnalyze = async () => {
    if (!file) {
      alert("파일을 먼저 선택해주세요!");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    setLoading(true);
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/food/analyze/`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setResult(response.data.result);
    } catch (error: any) {
      console.error("분석 오류:", error);
      setResult("오류가 발생했습니다. 다시 시도해주세요.");
    }
    setLoading(false);
  };

  return (
    <div className="p-8 space-y-6">
      <h1 className="text-2xl font-bold">🍽️ 음식 칼로리 분석</h1>

      <input
        type="file"
        accept="image/*"
        onChange={handleFileChange}
        className="block"
      />

      <button
        onClick={handleAnalyze}
        disabled={!file || loading}
        className={`px-6 py-2 rounded text-white ${
          file && !loading ? "bg-blue-500 hover:bg-blue-600" : "bg-gray-400"
        }`}
      >
        {loading ? "분석 중..." : "AI에게 분석 요청"}
      </button>

      {result && (
        <div className="mt-6 p-4 bg-gray-100 rounded text-gray-800">
          <h2 className="text-lg font-semibold">분석 결과 📋</h2>
          <p className="mt-2 whitespace-pre-line">{result}</p>
          <p className="mt-4 text-sm text-gray-600">
            👉 하루 권장 칼로리는 성인 기준 약 2000~2500kcal 입니다!
          </p>
        </div>
      )}
    </div>
  );
}
