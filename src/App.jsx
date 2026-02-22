import { useState } from "react";
import ResultCard from "./componts/ResultCard";
import BankSearch from "./componts/BankSearch";

function App() {
  // 把這兩個狀態放在這裡，才能同時傳給兩個子元件
  const [selectedBank, setSelectedBank] = useState(null);
  const [selectedBranch, setSelectedBranch] = useState(null);

  return (
    <div>
      <div className="max-w-2xl p-8 font-sans">
        <h1 className="text-4xl md:text-5xl font-extralight text-gray-800 mb-8">
          台灣銀行代碼查詢
        </h1>

        {/* 傳入 set function，讓 BankSearch 可以修改 App 的狀態 */}
        <BankSearch
          setSelectedBank={setSelectedBank}
          selectedBank={selectedBank}
          setSelectedBranch={setSelectedBranch}
          selectedBranch={selectedBranch}
        />

        {/* 傳入資料，讓 ResultCard 顯示 */}
        <ResultCard
          selectedBank={selectedBank}
          selectedBranch={selectedBranch}
        />
      </div>
    </div>
  );
}

export default App;
