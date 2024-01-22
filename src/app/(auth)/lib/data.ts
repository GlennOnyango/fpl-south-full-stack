export async function fetchWeeklyData() {
  const api_url = "https://fantasy.premierleague.com/api/";
  console.log(api_url);
  const standingsCall = await fetch(
    `${api_url}leagues-classic/264658/standings/`,
    {
      method: "GET",
      redirect: "follow",
    }
  );
  const standings = await standingsCall.text();
  const dataObject = JSON.parse(standings);
  const collectedStandings = dataObject["standings"]["results"];
  return collectedStandings;
}
