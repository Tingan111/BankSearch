import { useEffect, useState } from "react";
function BankSearch({
  selectedBranch,
  setSelectedBranch,
  selectedBank,
  setSelectedBank,
}) {
  const [banks, setBanks] = useState([]); // 存放 130 筆銀行
  const [allBranches, setAllBranches] = useState([]); // 存放所有分行資料
  const [bankSearch, setBankSearch] = useState("");
  const [isBankOpen, setIsBankOpen] = useState(false);
  const [isBranchOpen, setIsBranchOpen] = useState(false);
  // 1. 同時抓取兩份資料 (模擬)
  useEffect(() => {
    // 抓銀行
    fetch("/banks.json")
      .then((res) => res.json())
      .then((data) => {
        // 關鍵：過濾掉重複的 code
        const uniqueBanks = Array.from(
          new Map(data.bank.map((item) => [item.code, item])).values(),
        );
        setBanks(uniqueBanks);
      });
    // 抓全部分行
    fetch("/branches.json")
      .then((res) => res.json())
      .then((data) => {
        setAllBranches(data.branches);
      });
  }, []);
  // 2. 【關鍵邏輯】：即時過濾出「對標」的分行
  // 只要 selectedBank 改變，這組資料就會自動更新
  const currentBranches = allBranches.filter(
    (branch) => selectedBank && branch.code.slice(0, 3) === selectedBank.code,
  );
  console.log(currentBranches);

  console.log(selectedBank);

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-8">
      <div className="flex flex-col md:flex-row gap-6">
        {/* --- 銀行選擇 (可輸入) --- */}
        <div className="flex-1 relative">
          <label className="block font-bold text-gray-700 mb-2">銀行名稱</label>
          <input
            type="text"
            className="w-full border-2 p-3 rounded-lg focus:border-blue-500 outline-none"
            placeholder="請輸入銀行代碼或名稱"
            value={bankSearch}
            onChange={(e) => {
              setBankSearch(e.target.value);
              setIsBankOpen(true);
            }}
            onFocus={() => setIsBankOpen(true)}
          />
          {isBankOpen && (
            <div className="absolute z-30 w-full bg-white border mt-1 max-h-60 overflow-y-auto shadow-xl rounded-md">
              {banks
                .filter(
                  (b) =>
                    b.title.includes(bankSearch) || b.code.includes(bankSearch),
                )
                .map((bank) => (
                  <div
                    key={bank.code}
                    className="p-3 hover:bg-blue-50 cursor-pointer border-b"
                    onClick={() => {
                      setSelectedBank(bank);
                      setBankSearch(bank.title);
                      setIsBankOpen(false);
                      setSelectedBranch(null); // 切換銀行時，重置已選分行
                    }}
                  >
                    <span className="text-blue-600 font-mono mr-2">
                      {bank.code}
                    </span>
                    {bank.title}
                  </div>
                ))}
            </div>
          )}
        </div>

        {/* --- 分行選擇 (純點擊，前三碼對標) --- */}
        <div className="flex-1 relative">
          <label className="block font-bold text-gray-700 mb-2">分行名稱</label>
          <div
            className={`w-full border-2 p-3 rounded-lg flex justify-between items-center cursor-pointer ${
              !selectedBank ? "bg-gray-50 text-gray-400" : "bg-white"
            }`}
            onClick={() => selectedBank && setIsBranchOpen(!isBranchOpen)}
          >
            <span>
              {selectedBranch
                ? selectedBranch.title
                : selectedBank
                  ? "請選擇分行"
                  : "請先選擇銀行"}
            </span>
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M19 9l-7 7-7-7" />
            </svg>
          </div>

          {isBranchOpen && selectedBank && (
            <div className="absolute z-20 w-full bg-white border mt-1 max-h-60 overflow-y-auto shadow-xl rounded-md">
              {currentBranches.map((branch) => (
                <div
                  key={branch.code}
                  className="p-3 hover:bg-green-50 cursor-pointer border-b"
                  onClick={() => {
                    setSelectedBranch(branch);
                    setIsBranchOpen(false);
                  }}
                >
                  {branch.title}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
export default BankSearch;
