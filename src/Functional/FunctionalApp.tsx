import { useEffect, useState } from "react";
import { FunctionalSection } from "./FunctionalSection";
import { TDog } from "../types";
import { Requests } from "../api";
import { toast } from "react-hot-toast";

export function FunctionalApp() {
  const [allDogs, setAllDogs] = useState<TDog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const fetchData = () => {
    setIsLoading(true);
    return Requests.getAllDogs()
      .then(setAllDogs)
      .finally(() => {
        setIsLoading(false);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  const createDog = (dog: Omit<TDog, "id">) => {
    setIsLoading(true);
    const newDog: Partial<TDog> = {
      ...dog,
      isFavorite: false,
    };
    
    Requests.postDog(newDog)
      .then(() => {
        fetchData();
      })
      .then(() => {
        toast.success("You have posted a new doggo");
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteDog = (dogId: number) => {
    setIsLoading(true);
    Requests.deleteDog(dogId)
      .then(() => {
        fetchData();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const updateDog = (dogId: number, isFavorite: boolean) => {
    setIsLoading(true);
    const updatedDog: Partial<TDog> = {
      isFavorite: isFavorite,
    };
    
    Requests.updateDog(dogId, updatedDog)
      .then(() => {
        fetchData();
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  return (
    <div className="App" style={{ backgroundColor: "skyblue" }}>
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        allDogs={allDogs}
        isLoading={isLoading}
        deleteDog={deleteDog}
        updateDog={updateDog}
        createDog={createDog}
      />
    </div>
  );
}
