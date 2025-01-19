import StatCard from "../components/common/StatCard";
import DailyChart from "../components/dashboard/DailyChart";
import SalesRate from "../components/dashboard/SalesRate";
import RecentTransaction from "../components/dashboard/RecentlyTransaction";
import { PeopleOutline, DirectionsCar, AttachMoney,Warehouse } from "@mui/icons-material";
import { useDashboardStats } from '../hooks/useDashboard';

function DashBoard() {
  const { data: stats} = useDashboardStats();

  return (
    <div>
      <div className="mb-4">
        <h1 className="text-2xl font-bold text-gray-900">대시보드</h1>
        <p className="mt-1 text-gray-500">판매 현황</p>
      </div>

      <div className="grid grid-cols-1 gap-6 mb-8 md:grid-cols-2 lg:grid-cols-4">
      <StatCard
          title="회원수"
          value={stats?.userCount ?? 0}
          percent={8.4}
          icon={<PeopleOutline sx={{ fontSize: 28 }} />}
          index={0}
        />
        <StatCard
          title="판매 차량"
          value={stats?.orderCount ?? 0}
          percent={-8.4}
          icon={<DirectionsCar sx={{ fontSize: 28 }} />}
          index={1}
        />
        <StatCard
          title="판매 금액"
          value={stats?.totalSales ?? 0}
          percent={8.4}
          icon={<AttachMoney sx={{ fontSize: 28 }} />}
          index={2}
        />
        <StatCard
          title="차량 재고"
          value={stats?.carStock ?? 0}
          percent={5.7}
          icon={<Warehouse sx={{ fontSize: 28 }} />}
          index={3}
        />
      </div>

      {/* 차트 */}
      <div className="grid grid-cols-1 gap-6 mb-8 lg:grid-cols-5">
        <div className="p-6 bg-white rounded-lg shadow-sm lg:col-span-3">
          <h2 className="mb-2 text-lg font-semibold">일별 판매 현황</h2>
          <DailyChart />
        </div>
        <div className="p-6 bg-white rounded-lg shadow-sm lg:col-span-2">
          <h2 className="mb-4 text-lg font-semibold">차종별 판매 수</h2>
          <SalesRate />
        </div>
      </div>

      {/* 테이블 영역 */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold">최근 거래 내역</h2>
          <RecentTransaction />
        </div>
      </div>
    </div>
  );
}

export default DashBoard;