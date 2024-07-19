import { TDog } from "./types";
import { v4 as uuidV4 } from "uuid";

const getUniqueId = () => {
  const userIdFromLocalStorage = localStorage.getItem(
    "pup-e-picker-user-id"
  );
  if (!userIdFromLocalStorage) {
    const newId = (uuidV4 as () => string)();
    localStorage.setItem("pup-e-picker-user-id", newId);
    return newId;
  }
  return userIdFromLocalStorage;
};

const getAuthHeader = () => ({
  "pup-e-picker-user-id": getUniqueId(),
});

export const baseUrl = "http://localhost:3000";

export const Requests = {
  getAllDogs: () =>
    fetch(`${baseUrl}/dogs`, {
      headers: {
        ...getAuthHeader(),
      },
    })
      .then((response) => response.json()),

  postDog: (dog: Omit<TDog, "id" | "isFavorite">) =>
    fetch(`${baseUrl}/dogs`, {
      method: "post",
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      body: JSON.stringify({ ...dog, isFavorite: false }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create dog");
      }
      return response;
    }),

  deleteDog: (dogId: number) =>
    fetch(`${baseUrl}/dogs/${dogId}`, {
      method: "delete",
      headers: {
        ...getAuthHeader(),
      },
    }).then((response) => {
      if (!response.ok) {
        throw new Error("Failed to create dog");
      }
      return response;
    }),

  updateDog: ({
    dogId,
    isFavorite,
  }: {
    dogId: number;
    isFavorite: boolean;
  }) =>
    fetch(`${baseUrl}/dogs/${dogId}`, {
      headers: {
        "Content-Type": "application/json",
        ...getAuthHeader(),
      },
      method: "PATCH",
      body: JSON.stringify({
        isFavorite,
      }),
    }).then((response) => {
      if (!response.ok) {
        throw new Error("could not update dog");
      }
      return response;
    }),

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};
