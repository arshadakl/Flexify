import { ResponsiveCalendar } from "@nivo/calendar";
import { parseISO } from "date-fns";
import { useEffect, useState } from "react";
import { getActivity } from "../../common/utils/APIs/FreelancerApi";

interface Activity {
  value: number;
  day: string;
  _id: string;
}

interface ApiResponse {
  status: string;
  activity: {
    _id: string;
    freelancerId: string;
    activities: Activity[];
    __v: number;
  };
}

const getYears = (data: Activity[]): number[] => {
  const years = new Set<number>();
  data.forEach((d) => {
    years.add(parseISO(d.day).getFullYear());
  });
  return Array.from(years).sort((a, b) => b - a); // Sort in descending order
};

const getDataForYear = (data: Activity[], year: number): Activity[] => {
  return data.filter((d) => parseISO(d.day).getFullYear() === year);
};

const ActivityCalendar = ({ id }: { id: string }) => {
  const [activityData, setActivityData] = useState<Activity[]>([]);
  const [selectedYear, setSelectedYear] = useState<number | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      const response: ApiResponse = await getActivity(id as string);

      if (response.status === "success") {
        const data = response.activity?.activities;
        setActivityData(data);
        if (data.length > 0) {
          const years = getYears(data);
          setSelectedYear(years[0]);
        }
      }
    };
    fetchData();
  }, [id]);

  if (activityData.length === 0) {
    return <div>No activity data available.</div>;
  }

  const years = getYears(activityData);
  const dataForYear = selectedYear
    ? getDataForYear(activityData, selectedYear)
    : [];

  const dateValues = dataForYear.map((d) => parseISO(d.day).getTime());
  const minDate = new Date(Math.min(...dateValues));
  const maxDate = new Date(Math.max(...dateValues));

  const formatDate = (date: Date): string => date.toISOString().split("T")[0];

  return (
    <div className="w-full my-4 flex md:flex-row flex-col items-center justify-items-center">
      <>
        <div
          className="flex h-48 lg:h-64 md:w-4/6 w-full bg-white mx-auto border rounded-md"
        >
          {activityData.length > 0 && (
            <ResponsiveCalendar
              data={dataForYear}
              from={formatDate(minDate)}
              to={formatDate(maxDate)}
              emptyColor="#eeeeee"
              colors={["#09323B", "#117660", "#04B16F", "#98ea98"]}
              minValue="auto"
              margin={{ top: 0, right: 10, bottom: 0, left: 10 }}
              yearSpacing={35}
              monthBorderColor="#ffffff"
              dayBorderWidth={2}
              dayBorderColor="#ffffff"
              legends={[
                {
                  anchor: "bottom-right",
                  direction: "row",
                  translateY: 36,
                  itemCount: 4,
                  itemWidth: 42,
                  itemHeight: 36,
                  itemsSpacing: 14,
                  itemDirection: "right-to-left",
                },
              ]}
            />
          )}
        </div>

        {activityData.length > 0 && (
          <div className="md:w-1/6 w-full md:block flex md:flex-col justify-center my-3 px-2">
            {years?.map((year) => (
              <button
                key={year}
                onClick={() => setSelectedYear(year)}
                style={{
                  display: "block",
                  marginBottom: "10px",
                  padding: "10px",
                  backgroundColor: selectedYear === year ? "#00B16D" : "",
                  color: selectedYear === year ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                }}
              >
                {year}
              </button>
            ))}
          </div>
        )}
      </>
    </div>
  );
};

export default ActivityCalendar;
