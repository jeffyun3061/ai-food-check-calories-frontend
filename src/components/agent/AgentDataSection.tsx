"use client";

import { File } from "lucide-react";
import { useRef, useState, useEffect } from "react";
import axios from "axios";

export default function AgentDataSection() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 업로드된 파일 목록 관리
  const [uploadedFiles, setUploadedFiles] = useState<string[]>([]);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true); // 로딩 상태 추가

  // 업로드된 파일 가져오는 함수 (컴포넌트 로드 시 데이터 초기화)
  useEffect(() => {
    const fetchUploadedFiles = async () => {
      try {
        // 서버에서 업로드된 파일 목록을 가져오는 API 요청 (예시)
        const response = await axios.get('http://localhost:8000/api/scout/uploaded-files');
        setUploadedFiles(response.data.files); // 파일 목록 업데이트
      } catch (error) {
        console.error("파일 목록 불러오기 실패", error);
      } finally {
        setIsLoading(false); // 로딩 완료
      }
    };

    fetchUploadedFiles();
  }, []); // 컴포넌트 처음 렌더링 시 한 번만 실행

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const formData = new FormData();
    formData.append('file', file);

    setIsUploading(true); // 업로드 중 상태로 변경

    try {
      const response = await axios.post('http://localhost:8000/api/scout/upload/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('파일 업로드 성공', response.data);

      // 업로드된 파일 목록 갱신
      setUploadedFiles((prevFiles) => [...prevFiles, file.name]);
    } catch (error) {
      console.error('파일 업로드 실패', error);
    } finally {
      setIsUploading(false); // 업로드 완료 후 상태 변경
    }
  };

  return (
    <div className="flex flex-col items-center rounded-lg bg-foreground p-4">
      <h2 className="mb-4 w-full text-left md:text-lg">Data </h2>

      {/* 숨겨진 파일 선택 input */}
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: 'none' }}
        accept="application/pdf"
        onChange={handleFileChange}
      />

      {/* 소스 추가하기 버튼 */}
      <div
        className="flex w-fit cursor-pointer items-center justify-center gap-2 rounded-full bg-primary px-3 py-2 text-sm text-white"
        onClick={handleButtonClick}
      >
        소스 추가하기
        <File width={18} height={18} />
      </div>

      {/* 업로드 중일 때 로딩 표시 */}
      {isUploading && <div className="text-center text-gray-400 mt-2">업로드 중...</div>}

      {/* 초기 로딩 상태 */}
      {isLoading ? (
        <div className="text-center text-gray-400 mt-2">로딩 중...</div>
      ) : (
        <ul className="mt-10 text-sm text-white">
          {uploadedFiles.length === 0 ? (
            <li className="text-center text-gray-400">업로드된 PDF 없음</li>
          ) : (
            uploadedFiles.map((file, index) => (
              <li key={index} className="text-center text-gray-400">{file}</li>
            ))
          )}
        </ul>
      )}
    </div>
  );
}
