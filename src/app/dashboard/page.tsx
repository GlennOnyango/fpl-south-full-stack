import { fetchWeeklyData } from "../(auth)/lib/data";
import LandingNavbarMain from "../components/navbars/main";

export default async function Dashboard() {
  const week = await fetchWeeklyData();

  console.log(week)
  return (
    <>
      <header>
        <LandingNavbarMain />
      </header>
      <main className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-12">
        <h3>Weekly Stat</h3>
      </main>
    </>
  );
}
