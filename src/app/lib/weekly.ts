const api_url = "https://fantasy.premierleague.com/api/";

export const getCostObject = async (eventId: number, userArray: number[]) => {
  return await Promise.all(
    userArray.map(async (user) => {
      const transferDetails = await fetch(
        `https://fantasy.premierleague.com/api/entry/${user}/event/${eventId}/picks/`,
        {
          method: "GET",
          redirect: "follow",
        }
      );

      const result = await transferDetails.text();

      const dataEvent = await JSON.parse(result);

      const transferCost = await dataEvent["entry_history"][
        "event_transfers_cost"
      ];

      return {
        id: user,
        cost: transferCost,
      };
    })
  );
};

export const getBootStrap = async () => {
  let eventCurrent = 0;
  const bootStrap = await fetch(`${api_url}bootstrap-static/`, {
    method: "GET",
    redirect: "follow",
  });

  const bootStrapData = await bootStrap.text();
  const bootStrapObject = JSON.parse(bootStrapData);
  const events = bootStrapObject["events"];
  events.forEach((event: any) => {
    if (event["is_current"]) {
      eventCurrent = event["id"];
    }
  });

  return eventCurrent;
};

const rawWeeklyStandings = async () => {
  // Get standings
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
};

export const leagueData = async () => {
  // Get standings
  const leagueCall = await fetch(
    `${api_url}leagues-classic/264658/standings/`,
    {
      method: "GET",
      redirect: "follow",
    }
  );

  const league = await leagueCall.text();
  const dataObject = JSON.parse(league);
  const leagueData = dataObject["league"];
  return leagueData;
};

export async function weeklyStandings(page: number) {
  //Get standings
  const collectedStandings = await rawWeeklyStandings();
  //Get current event
  const eventCurrent = await getBootStrap();
  // Get weekly cost
  const userList = collectedStandings.map((e: any) => e.entry);
  //League data
  const league = await leagueData();

  if (eventCurrent !== 0 && userList.length > 0) {
    const dataCost = await getCostObject(eventCurrent, userList);
    const dataCombined = dataCost.map((e: any) => {
      const entry = e.id;
      const cost = e.cost;
      const index = collectedStandings.findIndex((e: any) => e.entry === entry);
      const entry_name = collectedStandings[index].entry_name;
      const event_total = collectedStandings[index].event_total;
      const player_name = collectedStandings[index].player_name;
      return {
        id: entry,
        event_total: event_total - cost,
        player_name: player_name,
        total: collectedStandings[index].total,
        entry: entry,
        entry_name: entry_name,
        cost: cost,
        weekNo: eventCurrent,
        index: 0,
      };
    });

    const leagueStandings = dataCombined.sort((a: any, b: any) => {
      return b["event_total"] - a["event_total"];
    });

    //Add index to array
    leagueStandings.forEach((e: any, index: number) => {
      e.index = index + 1;
    });

    const limit = 6;

    let upperLimit = page * limit;
    let lowerLimit = upperLimit - limit;

    return {
      participants: collectedStandings.length,
      leagueName: league.name,
      leagueId: league.id,
      weekNumber: eventCurrent,
      gameWeek: leagueStandings.slice(lowerLimit, upperLimit),
    };
  }
  return {
    participants: collectedStandings.length,
    leagueName: league.name,
    leagueId: league.id,
    weekNumber: eventCurrent,
    gameWeek: [],
  };
}

export async function fetchWeeklyData() {
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
