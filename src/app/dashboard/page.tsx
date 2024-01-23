import { getEvents, weeklyStandings } from "../lib/weekly";
import LandingNavbarMain from "../components/navbars/main";
import Link from "next/link";
import EventSelect from "../components/eventSelect";
import { get } from "http";

type WeeklyData = {
  id: number;
  event_total: number;
  player_name: string;
  total: number;
  entry: number;
  entry_name: string;
  cost: number;
  weekNo: number;
  index: number;
};

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [page: string]: string };
}) {
  const events: Array<{
    id: number;
    name: string;
    finished: boolean;
    is_current: boolean;
    is_next: boolean;
    is_previous: boolean;
  }> = await getEvents();
  const { participants, leagueName, leagueId, weekNumber, gameWeek } =
    await weeklyStandings(Number(searchParams.page));

  const checkItemNumber = (item: WeeklyData) => {
    return item.index === 1 || item.index === 2;
  };

  return (
    <>
      <header>
        <LandingNavbarMain />
      </header>
      <main className="mx-auto max-w-7xl h-screen px-2 py-6 sm:px-6 lg:px-12">
        <div className="bg-[#37003C] rounded p-4">
          <div className="flex justify-between pb-5">
            <h2 className="text-4xl font-medium text-white">
              Game week {weekNumber}
            </h2>
{/* 
            <EventSelect events={events} currentEvent={weekNumber} /> */}
          </div>

          <div className="flex justify-between pt-5">
            <p className="text-white">
              Number of participants : {participants}
            </p>
            <p className="text-white">League Id : {leagueId}</p>
            <p className="text-white">League Name : {leagueName}</p>
            <p className="text-white">Price Money : {participants * 50}</p>
          </div>
        </div>
        <table
          className="table-auto w-full overflow:auto rounded"
          style={{ maxHeight: "30vh" }}
        >
          <thead>
            <tr>
              {/* <th className="border border-slate-300">Player Number</th> */}
              <th className="text-start py-4">Position</th>
              <th className="text-start py-4">Manager</th>
              <th className="text-start">Initial points</th>
              <th className="text-start">Minus</th>
              <th className="text-start">Points</th>
              <th className="text-start">Contribution status</th>
            </tr>
          </thead>
          <tbody>
            {gameWeek.map((item: WeeklyData) => {
              return (
                <tr
                  key={item.id}
                  className={`${
                    checkItemNumber(item) ? "bg-[#37003C]  " : ""
                  }  border-b-2  hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-10 `}
                >
                  {/* <td className="border border-slate-300">{item.id}</td> */}
                  <td
                    className={`${
                      checkItemNumber(item) ? "text-white" : "text-black"
                    } py-4 ps-4`}
                  >
                    {item.index}
                  </td>{" "}
                  <td
                    className={`${
                      checkItemNumber(item) ? "text-white" : "text-black"
                    } py-4 `}
                  >
                    {item.entry_name}
                  </td>{" "}
                  <td
                    className={`${
                      checkItemNumber(item) ? "text-white" : "text-black"
                    } py-4 `}
                  >
                    {item.event_total + item.cost}
                  </td>
                  <td
                    className={`${
                      checkItemNumber(item) ? "text-white" : "text-black"
                    } py-4 `}
                  >
                    {item.cost}
                  </td>
                  <td
                    className={`${
                      checkItemNumber(item) ? "text-white" : "text-black"
                    } py-4 `}
                  >
                    {item.event_total}
                  </td>
                  <td
                    className={`${
                      checkItemNumber(item) ? "text-white" : "text-black"
                    } py-4 `}
                  >
                    Paid
                  </td>
                </tr>
              );
            })}

            <tr className="border-b-1 border-slate-100 hover:bg-gray-100 hover:shadow-lg transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-10 ">
              <td></td>
              <td></td>
              <td className="py-4">
                <Link
                  href={`/dashboard?page=${
                    Number(searchParams.page) > 1
                      ? Number(searchParams.page) - 1
                      : 1
                  }`}
                  className="bg-[#37003C] rounded text-white px-6 py-2"
                >
                  Prev
                </Link>
              </td>
              <td className="py-4">
                <Link
                  href={`/dashboard?page=${Number(searchParams.page) + 1}`}
                  className="bg-[#37003C] rounded text-white px-6 py-2"
                >
                  Next
                </Link>
              </td>
            </tr>
          </tbody>
        </table>
      </main>
    </>
  );
}
