import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import {
  getDTopFreelancers,
  getDashChart,
  getStatisticsAPI,
} from "../../common/utils/APIs/AdminApi";
import { ChartPulse, SmallProfilePulse } from "../../common/components/ExtraComponents/SkeletonComponent";

interface MyDataPoint {
  id: string;
  data: { x: string; y: number }[];
}

export function MainChart() {
  const [myData, setMyData] = useState<MyDataPoint[] | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getDashChart();
        if (response.status && response.chartData) {
          setMyData(response.chartData);
        } else {
          console.error("Failed to fetch chart data");
        }
      } catch (error) {
        console.error("Error fetching chart data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
       <ChartPulse/>
      ) : (
        <div
          className="border border-gray-200 bg-white rounded-lg shadow"
          style={{ height: "400px" }}
        >
          {myData && (
            <ResponsiveLine
              data={myData}
              margin={{ top: 50, right: 110, bottom: 50, left: 60 }}
              xScale={{ type: "point" }}
              yScale={{
                type: "linear",
                min: "auto",
                max: "auto",
                stacked: true,
                reverse: false,
              }}
              yFormat=" >-.2f"
              curve="cardinal"
              axisTop={null}
              axisRight={null}
              axisBottom={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Days",
                legendOffset: 36,
                legendPosition: "middle",
                truncateTickAt: 0,
              }}
              axisLeft={{
                tickSize: 5,
                tickPadding: 5,
                tickRotation: 0,
                legend: "Activity",
                legendOffset: -40,
                legendPosition: "middle",
                truncateTickAt: 0,
              }}
              enableGridX={false}
              colors={{ scheme: "pink_yellowGreen" }}
              lineWidth={0}
              pointSize={8}
              pointColor={{ theme: "background" }}
              pointBorderWidth={2}
              pointBorderColor={{ from: "serieColor", modifiers: [] }}
              pointLabel="data.y"
              pointLabelYOffset={-12}
              enableArea={true}
              areaOpacity={0.4}
              useMesh={true}
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "column",
                  justify: false,
                  translateX: 93,
                  translateY: 15,
                  itemsSpacing: 0,
                  itemDirection: "left-to-right",
                  itemWidth: 80,
                  itemHeight: 20,
                  itemOpacity: 0.75,
                  symbolSize: 12,
                  symbolShape: "circle",
                  symbolBorderColor: "rgba(0, 0, 0, .5)",
                  effects: [
                    {
                      on: "hover",
                      style: {
                        itemBackground: "rgba(0, 0, 0, .03)",
                        itemOpacity: 1,
                      },
                    },
                  ],
                },
              ]}
            />
          )}
        </div>
      )}
    </>
  );
}

// export default MainChart;

export function TopFreelancers() {
  const [freelancers, setFreelancers] = useState<any[]>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getDTopFreelancers();
      if (response.status) {
        setFreelancers(response.list);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="w-full max-w-md p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      <div className="flex items-center justify-between mb-4">
        <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
          Top Freelancers
        </h5>
        <i className="fa-regular text-xl text-logo-green fa-medal" />
      </div>
      <div className="flow-root">
        <ul
          role="list"
          className="divide-y divide-gray-200 dark:divide-gray-700"
        >
          {freelancers ? (
            freelancers?.map((freelancer: any, index: number) => {
              return (
                <li className="py-3 sm:py-4" key={index}>
                  <div className="flex items-center">
                    <div className="flex-shrink-0">
                      <img
                        className="w-8 h-8 rounded-full"
                        src={freelancer.profile}
                        alt="Neil image"
                      />
                    </div>
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-sm font-medium text-gray-900 truncate dark:text-white">
                        {freelancer.username}
                      </p>
                      <p className="text-sm text-gray-500 truncate dark:text-gray-400">
                        {freelancer.email}
                      </p>
                    </div>
                    <div className="inline-flex items-center text-base font-semibold text-gray-900 dark:text-white">
                      {freelancer.submissionsCount}
                    </div>
                  </div>
                </li>
              );
            })
          ) : (
            <SmallProfilePulse />
          )}
        </ul>
      </div>
    </div>
  );
}

// export {TopFreelancers,MainChart}

export function Statistics() {
  const [data, setData] = useState<any>();
  useEffect(() => {
    const fetchData = async () => {
      const response = await getStatisticsAPI();
      if (response.status) {
        setData(response.statistics);
      }
    };
    fetchData();
  }, []);

  useEffect(() => {
  console.log(data ,"statisticsdsdsd");
  
  }, [data])
  
  return (
    <div
      id="stats"
      className="grid gird-cols-1 md:grid-cols-2 lg:grid-cols-4  gap-6"
    >
      <div className="bg-white border-sm shadow p-6 rounded-lg ">
            <div className="flex flex-row space-x-4 items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium  leading-4">
                Total User
                </p>
                <p className="text-gray-900 font-bold text-2xl inline-flex items-center space-x-2">
                  <span>+{data?.users}</span>
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
              <div id="stats-1" className="bg-[#8280FF]/10 p-3 rounded-2xl ">
              <i className="fa-regular text-[#8280FF] text-2xl fa-user-group"/>
              </div>
            </div>
          </div>

          <div className="bg-white border-sm shadow p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium  leading-4">
                Total Order
                </p>
                <p className="text-gray-900 font-bold text-2xl inline-flex items-center space-x-2">
                  <span>{data?.order}</span>
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
              <div id="stats-1" className="bg-[#FEC53D]/20 p-3 rounded-2xl ">
                {/* <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="1.5"
                  stroke="currentColor"
                  className="w-10 h-10 text-logo-green "
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"
                  />
                </svg> */}
                    <i className="fa-sharp text-2xl text-[#FEC53D] fa-regular fa-box-open-full"/>

              </div>
            </div>
          </div>

          <div className="bg-white border-sm shadow p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium leading-4">
                Total Revenue
                </p>
                <p className="text-gray-900 font-bold text-2xl inline-flex items-center space-x-2">
                  <span><i className="fa-sharp fa-solid fa-indian-rupee-sign text-xl" />{""} {data?.profit}</span>
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
              <i className="fa-regular text-logo-green text-2xl fa-chart-line" />

              </div>
            </div>
          </div>

          <div className="bg-white border-sm shadow p-6 rounded-lg">
            <div className="flex flex-row space-x-4 items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm font-medium  leading-4">
                Total Pending
                </p>
                <p className="text-gray-900 font-bold text-2xl inline-flex items-center space-x-2">
                  <span>{data?.pending}</span>
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
              <div id="stats-1" className="bg-[#FF9066]/10 p-3 rounded-2xl ">
              <i className="fa-regular text-2xl text-[#FF9066] fa-timer" />

              </div>
            </div>
          </div>
      
    </div>
  );
}
