import LandingPage from "./components/landingPage";
import LandingNavbar from "./components/navbars/landing";

export default function Home() {
  return (
    <main className="flex flex-col align-center landing">
      <LandingNavbar />
      <LandingPage />
    </main>
  );
}
