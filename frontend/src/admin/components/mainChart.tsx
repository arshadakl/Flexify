import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getDTopFreelancers, getDashChart } from "../../common/utils/APIs/AdminApi";
import { SmallProfilePulse } from "../../common/components/ExtraComponents/SkeletonComponent";

interface MyDataPoint {
  id: string;
  data: { x: string; y: number }[];
}

export 
function MainChart() {
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
        <p>Loading chart...</p>
      ) : (
        <div className="border border-gray-200 rounded-lg shadow" style={{ height: "400px" }}>
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
              colors={{ scheme: "purpleRed_green" }}
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
  const [freelancers,setFreelancers] = useState<any[]>()
  useEffect(() => {
    const fetchData = async ()=>{
      const response = await getDTopFreelancers()
      if(response.status){
        setFreelancers(response.list)
      }
    }
    fetchData()
  }, [])
  
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
                {freelancers ? freelancers?.map((freelancer:any,index:number)=>{
                  return(
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
                  )
                }) : <SmallProfilePulse/>}
                
              </ul>
            </div>
          </div>
  )
}

// export {TopFreelancers,MainChart}
