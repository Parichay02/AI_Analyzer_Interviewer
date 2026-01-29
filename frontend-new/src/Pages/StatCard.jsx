const StatCard = ({ label, value }) => (
  <div className="bg-gray-50 border rounded-xl p-4 text-center shadow-sm">
    <div className="text-2xl font-bold text-gray-800">{value}</div>
    <div className="text-xs text-gray-500 mt-1">{label}</div>
  </div>
);
export default StatCard;