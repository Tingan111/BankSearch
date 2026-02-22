function ResultCard({ selectedBank, selectedBranch }) {
  // 如果還沒選好分行，就什麼都不顯示
  if (!selectedBank || !selectedBranch) return null;
  const handleCopy = async () => {
    try {
      // 呼叫 API 寫入剪貼簿
      await navigator.clipboard.writeText(selectedBranch.code);

      // 這裡可以加個簡單的提示
      alert("代碼已複製：" + selectedBranch.code);
    } catch (err) {
      console.error("複製失敗:", err);
    }
  };
  return (
    <div className="mt-8 p-6 bg-green-50 border-2 border-dashed border-green-400 rounded-xl">
      <h3 className="text-xl font-bold text-green-800 mb-4">
        {`(${selectedBank.code})` + selectedBank.title + selectedBranch.title}
      </h3>
      <div className="space-y-2 text-gray-700">
        <p>
          <span className="font-semibold">分行代碼：</span>
          {selectedBranch.code}
          <button
            onClick={handleCopy}
            className="bg-green-500 hover:bg-green-600 text-white text-xs px-2 py-1 rounded shadow-sm transition-colors"
          >
            複製代碼
          </button>
        </p>
        <p>
          <span className="font-semibold">地址：</span>
          {selectedBranch.address}
        </p>
        <p>
          <span className="font-semibold">電話：</span>
          {selectedBranch.tel}
        </p>
      </div>
    </div>
  );
}

export default ResultCard;
