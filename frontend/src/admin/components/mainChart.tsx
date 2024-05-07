import { useEffect, useState } from "react";
import { ResponsiveLine } from "@nivo/line";
import { getDashChart } from "../../common/utils/APIs/AdminApi";

interface MyDataPoint {
  id: string;
  data: { x: string; y: number }[];
}

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

export default MainChart;
