import { MainChart, TopFreelancers } from "./mainChart";



function Dashboard() {
  return (
    <div className="relative overflow-x-auto ">
      <h1 className="text-2xl font-sans font-semibold py-5">Dashboard</h1>
      <div className="flex gap-1">
        <div className="w-2/3 ">
          <MainChart />
        </div>
        <div className="w-1/3">
          <TopFreelancers/>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
