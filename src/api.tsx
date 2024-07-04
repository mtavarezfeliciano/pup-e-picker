import { TDog } from "./types";

export const baseUrl = "http://localhost:3000";

export const Requests = {
  // should return a promise with all dogs in the database
  getAllDogs: async () => {
    return await fetch(`${baseUrl}/dogs`).then((res) => res.json());
  },
  // should create a dog in the database from a partial dog object
  // and return a promise with the result
  postDog: (dog: Partial<TDog>): Promise<TDog> => { // Update the parameter type to Partial<TDog>
    return fetch(`${baseUrl}/dogs`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(dog),
    })
      .then((res) => res.json())
      .catch((err) => {
        console.error(err);
        throw err;
      });
  },

  // should delete a dog from the database
  deleteDog: async (dogId: number): Promise<void> => {
    try {
      const response = await fetch(`${baseUrl}/dogs/${dogId}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error(`Failed to delete dog with id ${dogId}`);
      }
    } catch (error) {
      console.error(`Error deleting dog with id ${dogId}:`, error);
      throw error;
    }
  },

  updateDog: async (dogId: number, updatedData: Partial<TDog>): Promise<TDog> => {
    try {
      const res = await fetch(`${baseUrl}/dogs/${dogId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(updatedData),
      });
      return await res.json();
    } catch (err) {
      console.error(`Error updating dog with id ${dogId}`, err);
      throw err;
    }
  },

  // Just a dummy function for use in the playground
  dummyFunction: () => {
    console.log("dummy stuff");
  },
};