import { MainChart, Statistics, TopFreelancers } from "./mainChart";

function Dashboard() {
  return (
    <div className="relative overflow-x-auto ">
      <h1 className="text-2xl font-sans font-semibold py-5">Dashboard</h1>
      <div className="mb-5">
        <Statistics/>
      </div>
      <div className="flex gap-4 md:flex-row flex-col">
        <div className="md:w-2/3  w-1/1 ">
          <MainChart />
        </div>
        <div className="md:w-1/3 w-1/1">
          <TopFreelancers />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
