import config from "../config";

export const fetchUsersData = async () => {
  try {
    const res = await fetch(config.backendEndpoint);

    return await res.json();
  } catch (error) {
    console.log("There was problem with fetching data", error);
  }
};
