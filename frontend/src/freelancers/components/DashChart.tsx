import { Line } from "react-chartjs-2";
import { ChartConfiguration } from "chart.js";
import { useEffect, useState } from "react";
import { getchartdataAPI } from "../../common/utils/APIs/FreelancerApi";
function DashChart() {
  const [chartData, setChartData] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getchartdataAPI();
      if (response.status) {
        setChartData(response.chartData);
      }
    };
    fetchData();
  }, []);

  const data1 = {
    labels: chartData?.orders?.labels,
    datasets: [
      {
        label: "Line 1",
        data: chartData?.orders?.datasets[0].data,
        fill: false,
        borderColor: "#FEC84D",
        tension: 0.1, // Correctly placed tension property
      },
    ],
  };

  const data2 = {
    labels: chartData?.orders?.labels,
    datasets: [
      {
        label: "Line 2",
        data: chartData?.Amount?.datasets[0].data,
        fill: false,
        borderColor: "#00B16D",
        tension: 0.1, // Correctly placed tension property
      },
    ],
  };

  // Chart configuration
  const config1: ChartConfiguration<"line"> = {
    type: "line",
    data: data1,
    options: {
      scales: {
        y: {
          min: 0,
          max:
            chartData?.orders?.datasets[0].data.reduce(
              (a: number, b: number) => Math.max(a, b),
              0
            ) + 1,
        },
      },
    },
  };

  const config2: ChartConfiguration<"line"> = {
    type: "line",
    data: data2,
    options: {
      scales: {
        y: {
          min: 0,
          max:
            chartData?.Amount?.datasets[0].data.reduce(
              (a: number, b: number) => Math.max(a, b),
              0
            ) + 4000,
        },
      },
    },
  };
  return (
    <>
      <div
        id="stats"
        className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6 my-5"
      >
        <div className="bg-white border-sm shadow p-6 rounded-lg ">
          <div className="flex flex-row space-x-4 items-center justify-between">
            <div>
              <p className="text-gray-500 text-xl font-medium my-2 leading-4">
                Total Earnings
              </p>
              <p className="text-gray-900 font-bold text-3xl inline-flex items-center space-x-2">
                <span>{chartData && chartData.statistics.earnings}</span>
                <span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth="1.5"
                    stroke="currentColor"
                    className="w-6 h-6"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 18L9 11.25l4.306 4.307a11.95 11.95 0 015.814-5.519l2.74-1.22m0 0l-5.94-2.28m5.94 2.28l-2.28 5.941"
                    />
                  </svg>
                </span>
              </p>
            </div>
            <div id="stats-1" className="bg-logo-green/10 p-3 rounded-2xl ">
              <i className="fa-solid fa-money-bill-trend-up text-logo-green text-2xl " />
            </div>
          </div>
        </div>
        <div className="bg-white border-sm shadow p-6 rounded-lg ">
          <div className="flex flex-row space-x-4 items-center justify-between">
            <div>
              <p className="text-gray-500 text-xl font-medium my-2  leading-4">
                Service Charges
              </p>
              <p className="text-gray-900 font-bold text-3xl inline-flex items-center space-x-2">
                <span>{chartData && chartData.statistics.charges}</span>
                
                
              </p>
            </div>
            <div id="stats-1" className="bg-[#8280FF]/10 p-3 rounded-2xl ">
              <i className="fa-regular text-[#8280FF] text-2xl fa-file-invoice-dollar" />
            </div>
          </div>
        </div>
      </div>
      <hr className="my-5" />
      <div className="flex md:flex-row flex-col ">
        <div className="md:w-1/2 w-1/1 ">
          <h1 className="text-2xl p-2 font-medium font-Outfit">
            <i className="fa-sharp text-[#fc9c03] fa-regular fa-square-poll-vertical" />{" "}
            Work Statistic
          </h1>
          <Line data={data1} options={config1.options} />
        </div>
        <div className="md:w-1/2 w-1/1">
          <h1 className="text-2xl p-2 font-medium font-Outfit">
            <i className="fa-solid fa-chart-area text-logo-green" /> My Earnings
          </h1>
          <Line data={data2} options={config2.options} />
        </div>
      </div>
    </>
  );
}

export default DashChart;
