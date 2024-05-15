import { ResponsiveCalendar } from "@nivo/calendar";
import { parseISO } from "date-fns";
import { useState } from "react";

interface ActivityData {
  value: number;
  day: string;
}

const activityData: ActivityData[] = [
  {
    value: 257,
    day: "2018-04-26",
  },
  {
    value: 183,
    day: "2016-02-13",
  },
  {
    value: 33,
    day: "2016-09-18",
  },
  {
    value: 202,
    day: "2018-03-24",
  },
  {
    value: 385,
    day: "2017-10-26",
  },
  {
    value: 30,
    day: "2018-08-07",
  },
  {
    value: 377,
    day: "2016-01-05",
  },
  {
    value: 16,
    day: "2018-05-09",
  },
  {
    value: 164,
    day: "2015-12-16",
  },
  {
    value: 249,
    day: "2018-04-18",
  },
  {
    value: 243,
    day: "2016-04-19",
  },
  {
    value: 114,
    day: "2015-11-29",
  },
  {
    value: 164,
    day: "2016-07-09",
  },
  {
    value: 259,
    day: "2018-04-21",
  },
  {
    value: 165,
    day: "2016-08-14",
  },
  {
    value: 69,
    day: "2015-07-23",
  },
  {
    value: 78,
    day: "2017-01-22",
  },
  {
    value: 346,
    day: "2017-06-27",
  },
  {
    value: 25,
    day: "2015-06-05",
  },
  {
    value: 108,
    day: "2015-05-02",
  },
  {
    value: 71,
    day: "2017-03-02",
  },
  {
    value: 150,
    day: "2015-11-01",
  },
  {
    value: 200,
    day: "2018-05-24",
  },
  {
    value: 204,
    day: "2016-07-16",
  },
  {
    value: 185,
    day: "2017-06-20",
  },
  {
    value: 100,
    day: "2015-07-09",
  },
  {
    value: 279,
    day: "2017-12-21",
  },
  {
    value: 167,
    day: "2016-06-25",
  },
  {
    value: 264,
    day: "2016-01-24",
  },
  {
    value: 34,
    day: "2016-03-31",
  },
  {
    value: 95,
    day: "2015-10-06",
  },
  {
    value: 7,
    day: "2016-02-28",
  },
  {
    value: 308,
    day: "2016-05-20",
  },
  {
    value: 360,
    day: "2018-07-11",
  },
  {
    value: 45,
    day: "2017-07-28",
  },
  {
    value: 368,
    day: "2018-05-17",
  },
  {
    value: 337,
    day: "2015-08-01",
  },
  {
    value: 319,
    day: "2017-10-05",
  },
  {
    value: 7,
    day: "2016-06-26",
  },
  {
    value: 53,
    day: "2015-12-29",
  },
  {
    value: 133,
    day: "2017-08-28",
  },
  {
    value: 84,
    day: "2017-08-08",
  },
  {
    value: 310,
    day: "2017-08-20",
  },
  {
    value: 377,
    day: "2018-05-30",
  },
  {
    value: 366,
    day: "2017-12-10",
  },
  {
    value: 87,
    day: "2018-06-28",
  },
  {
    value: 177,
    day: "2018-02-20",
  },
  {
    value: 318,
    day: "2018-03-25",
  },
  {
    value: 256,
    day: "2018-01-03",
  },
  {
    value: 3,
    day: "2015-10-29",
  },
  {
    value: 242,
    day: "2015-06-25",
  },
  {
    value: 309,
    day: "2017-09-23",
  },
  {
    value: 34,
    day: "2016-09-16",
  },
  {
    value: 19,
    day: "2017-12-01",
  },
  {
    value: 335,
    day: "2015-12-15",
  },
  {
    value: 289,
    day: "2017-07-15",
  },
  {
    value: 183,
    day: "2015-05-20",
  },
  {
    value: 174,
    day: "2016-09-21",
  },
  {
    value: 162,
    day: "2016-11-16",
  },
  {
    value: 317,
    day: "2016-12-01",
  },
  {
    value: 173,
    day: "2015-04-30",
  },
  {
    value: 332,
    day: "2017-11-26",
  },
  {
    value: 90,
    day: "2017-07-25",
  },
  {
    value: 70,
    day: "2015-07-15",
  },
  {
    value: 149,
    day: "2017-11-22",
  },
  {
    value: 319,
    day: "2016-09-02",
  },
  {
    value: 261,
    day: "2015-05-19",
  },
  {
    value: 346,
    day: "2018-02-08",
  },
  {
    value: 315,
    day: "2018-04-20",
  },
  {
    value: 342,
    day: "2018-08-09",
  },
  {
    value: 221,
    day: "2018-01-10",
  },
  {
    value: 47,
    day: "2017-01-15",
  },
  {
    value: 396,
    day: "2016-05-02",
  },
  {
    value: 34,
    day: "2017-09-03",
  },
  {
    value: 275,
    day: "2017-10-22",
  },
  {
    value: 143,
    day: "2018-05-04",
  },
  {
    value: 71,
    day: "2016-06-15",
  },
  {
    value: 266,
    day: "2015-06-29",
  },
  {
    value: 369,
    day: "2016-08-21",
  },
  {
    value: 295,
    day: "2015-08-29",
  },
  {
    value: 22,
    day: "2015-10-16",
  },
  {
    value: 150,
    day: "2017-05-31",
  },
  {
    value: 329,
    day: "2017-12-31",
  },
  {
    value: 52,
    day: "2016-10-06",
  },
  {
    value: 318,
    day: "2016-01-09",
  },
  {
    value: 113,
    day: "2016-02-16",
  },
  {
    value: 348,
    day: "2017-08-22",
  },
  {
    value: 380,
    day: "2017-12-07",
  },
  {
    value: 29,
    day: "2016-11-13",
  },
  {
    value: 114,
    day: "2018-01-11",
  },
  {
    value: 396,
    day: "2015-10-12",
  },
  {
    value: 134,
    day: "2016-01-28",
  },
  {
    value: 116,
    day: "2016-11-27",
  },
  {
    value: 281,
    day: "2018-05-05",
  },
  {
    value: 382,
    day: "2016-08-03",
  },
  {
    value: 238,
    day: "2018-04-07",
  },
  {
    value: 210,
    day: "2018-05-19",
  },
  {
    value: 285,
    day: "2017-11-14",
  },
  {
    value: 101,
    day: "2017-02-03",
  },
  {
    value: 247,
    day: "2017-07-07",
  },
  {
    value: 81,
    day: "2017-12-24",
  },
  {
    value: 338,
    day: "2017-04-28",
  },
  {
    value: 365,
    day: "2017-04-25",
  },
  {
    value: 25,
    day: "2016-05-08",
  },
  {
    value: 383,
    day: "2017-03-30",
  },
  {
    value: 150,
    day: "2017-12-26",
  },
  {
    value: 319,
    day: "2018-05-27",
  },
  {
    value: 351,
    day: "2018-07-27",
  },
  {
    value: 251,
    day: "2017-10-15",
  },
  {
    value: 209,
    day: "2016-07-05",
  },
  {
    value: 383,
    day: "2017-09-04",
  },
  {
    value: 195,
    day: "2018-07-26",
  },
  {
    value: 188,
    day: "2015-09-18",
  },
  {
    value: 6,
    day: "2016-10-11",
  },
  {
    value: 223,
    day: "2018-03-11",
  },
  {
    value: 142,
    day: "2016-10-05",
  },
  {
    value: 182,
    day: "2018-02-11",
  },
  {
    value: 51,
    day: "2017-04-08",
  },
  {
    value: 223,
    day: "2017-07-21",
  },
  {
    value: 351,
    day: "2015-08-21",
  },
  {
    value: 147,
    day: "2017-03-17",
  },
  {
    value: 284,
    day: "2016-11-17",
  },
  {
    value: 58,
    day: "2017-04-03",
  },
  {
    value: 64,
    day: "2016-06-30",
  },
  {
    value: 207,
    day: "2018-01-04",
  },
  {
    value: 317,
    day: "2015-09-01",
  },
  {
    value: 95,
    day: "2016-10-12",
  },
  {
    value: 307,
    day: "2016-02-06",
  },
  {
    value: 326,
    day: "2016-02-26",
  },
  {
    value: 269,
    day: "2016-08-31",
  },
  {
    value: 123,
    day: "2016-05-11",
  },
  {
    value: 377,
    day: "2018-04-28",
  },
  {
    value: 190,
    day: "2015-11-22",
  },
  {
    value: 208,
    day: "2017-09-10",
  },
  {
    value: 127,
    day: "2016-06-28",
  },
  {
    value: 340,
    day: "2015-11-02",
  },
  {
    value: 75,
    day: "2015-04-02",
  },
  {
    value: 354,
    day: "2018-01-13",
  },
  {
    value: 98,
    day: "2016-04-24",
  },
  {
    value: 111,
    day: "2015-06-04",
  },
  {
    value: 83,
    day: "2016-11-22",
  },
];

const getYears = (data: ActivityData[]): number[] => {
  const years = new Set<number>();
  data.forEach((d) => {
    years.add(parseISO(d.day).getFullYear());
  });
  return Array.from(years).sort((a, b) => b - a); // Sort in descending order
};

const getDataForYear = (data: ActivityData[], year: number): ActivityData[] => {
  return data.filter((d) => parseISO(d.day).getFullYear() === year);
};

const ActivityCalendar = () => {
  const years = getYears(activityData);
  const [selectedYear, setSelectedYear] = useState<number>(years[0]);

  const dataForYear = getDataForYear(activityData, selectedYear);
  const dateValues = dataForYear.map((d) => parseISO(d.day).getTime());
  const minDate = new Date(Math.min(...dateValues));
  const maxDate = new Date(Math.max(...dateValues));

  const formatDate = (date: Date): string => date.toISOString().split("T")[0];

  return (
    <div className="w-full my-4  flex  md:flex-row flex-col  items-center justify-items-center ">
      <div
        //   style={{ height: '230px',  flex: 1 }}
        className="flex  h-48  lg:h-64   md:w-4/6 w-full bg-white mx-auto  border rounded-md"
       >
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
      </div>

      <div className=' md:w-1/6 w-full  md:block flex md:flex-col justify-center my-3 px-2 ' >
        {years.map(year => (
          <button className=''
            key={year}
            onClick={() => setSelectedYear(year)}
            style={{
              display: 'block',
              marginBottom: '10px',
              padding: '10px',
              backgroundColor: selectedYear === year ? '#00B16D' : '',
              color: selectedYear === year ? '#fff' : '#000',
              border: 'none',
              borderRadius: '5px',
              cursor: 'pointer',
            }}
          >
            {year}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ActivityCalendar;
