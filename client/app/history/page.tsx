import Navbar from "../_components/navbar/Navbar";
import HistoryTable from "../_components/HistoryTable";

export default function HistoryPage() {
  return (
    <div className="main-container">
      <Navbar />
      <div className="page">
        <HistoryTable />
      </div>
    </div>
  );
}
