import LandingPage from "./components/landingPage";
import LandingNavbar from "./components/navbars/landing";

export default function Home() {
  return (
    <main className="container mx-auto landing">
      <LandingNavbar />
      <LandingPage />
    </main>
  );
}
