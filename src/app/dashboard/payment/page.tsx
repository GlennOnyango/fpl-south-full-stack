import { getEvents } from "@/app/lib/weekly";
import LandingNavbarMain from "../../components/navbars/main";
import Link from "next/link";
import { CircleStackIcon, XCircleIcon } from "@heroicons/react/20/solid";

export default async function Dashboard({
  searchParams,
}: {
  searchParams: { [key: string]: string };
}) {
  const events: Array<{
    id: number;
    name: string;
    finished: boolean;
    is_current: boolean;
    is_next: boolean;
    is_previous: boolean;
  }> = await getEvents();

  const weekStriing = (array: any[], vent: number) => {
    const set = new Set(array);

    if (set.has(String(vent))) {
      set.delete(String(vent));
      return Array.from(set).join(",");
    }

    set.add(String(vent));
    return Array.from(set).join(",");
  };

  return (
    <>
      <header>
        <LandingNavbarMain />
      </header>
      <main className="mx-auto max-w-7xl h-screen px-2 py-6 sm:px-6 lg:px-12">
        <div className="bg-[#37003C] rounded p-4">
          <div className="flex justify-between pb-5">
            <h2 className="text-4xl font-medium text-white">Make Payment</h2>
          </div>
        </div>

        <h3 className="text-2xl font-medium text-[#37003C] my-5">
          Select weeks for payment
        </h3>
        <div className="grid grid-cols-12 gap-2 pt-5">
          {events.map((event) => {
            return (
              <Link
                key={event.id}
                href={`${
                  event.finished
                    ? ""
                    : "/dashboard/payment?weeks=" +
                      weekStriing(
                        searchParams?.weeks
                          ? searchParams.weeks.split(",")
                          : [],
                        event.id
                      )
                }`}
                className={`flex justify-center rounded p-4 bg-gray
                ${
                  searchParams?.weeks?.split(",").includes(String(event.id))
                    ? "scale-110 "
                    : ""
                }
                 ${event.finished ? "text-white" : ""}  ${
                  event.finished ? "shadow-sm" : "shadow-xl"
                }`}
              >
                {event.id}
              </Link>
            );
          })}
        </div>
        <p className="mt-4 text-lg">
          Total :{" "}
          {isNaN(searchParams?.weeks?.split(",").length)
            ? 0
            : searchParams?.weeks?.split(",").length * 50}{" "}
          KES
        </p>
      </main>
    </>
  );
}
