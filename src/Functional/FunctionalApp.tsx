import { useEffect, useState } from "react";
import { TDog } from "../types";
import { Requests } from "../api.tsx";
import { FunctionalSection } from "./FunctionalSection";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import toast from "react-hot-toast";

export function FunctionalApp() {
  const [showComponent, setShowComponent] =
    useState("all-dogs");
  const [dogs, setDogs] = useState<TDog[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const refetchDogs = () => {
    setIsLoading(true);
    Requests.getAllDogs()
      .then(setDogs)
      .catch((e) => {
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const addDog = (dog: Omit<TDog, "id" | "isFavorite">) => {
    setIsLoading(true);
    Requests.postDog(dog)
      .then(() => refetchDogs())

      .then(() => {
        toast.success(`created ${dog.name}`);
      })
      .catch((e) => {
        toast.error(`could not create ${dog.name}`);
        console.error(e);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const deleteDog = (dogId: number) => {
    setIsLoading(true);
    Requests.deleteDog(dogId)
      .then(() => refetchDogs())
      .catch(console.error)
      .finally(() => {
        setIsLoading(false);
      });
  };

  const unfavoriteDog = (dogId: number) => {
    setIsLoading(true);
    Requests.updateDog({ dogId, isFavorite: false })
      .then(() => refetchDogs())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const favoriteDog = (dogId: number) => {
    setIsLoading(true);
    Requests.updateDog({ dogId, isFavorite: true })
      .then(() => refetchDogs())
      .catch(console.error)
      .finally(() => setIsLoading(false));
  };

  const unfavorited = dogs.filter(
    (dog) => dog.isFavorite === false
  );
  const favorited = dogs.filter(
    (dog) => dog.isFavorite === true
  );

  const filteredDogs = (() => {
    if (showComponent === "favorite-dogs") {
      return favorited;
    }

    if (showComponent === "unfavorite-dogs") {
      return unfavorited;
    }
    return dogs;
  })();

  const onClickFavorited = () => {
    if (showComponent === "favorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("favorite-dogs");
  };

  const onClickUnfavorited = () => {
    if (showComponent === "unfavorite-dogs") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("unfavorite-dogs");
  };

  const onClickCreateDog = () => {
    if (showComponent === "create-dog-form") {
      setShowComponent("all-dogs");
      return;
    }
    setShowComponent("create-dog-form");
  };

  useEffect(() => {
    refetchDogs();
  }, []);

  return (
    <div
      className="App"
      style={{ backgroundColor: "skyblue" }}
    >
      <header>
        <h1>pup-e-picker (Functional)</h1>
      </header>
      <FunctionalSection
        label={"Dogs: "}
        onClickFavorited={onClickFavorited}
        onClickUnfavorited={onClickUnfavorited}
        onClickCreateDog={onClickCreateDog}
        showComponent={showComponent}
        favoriteDogCount={favorited.length}
        unfavoriteDogCount={unfavorited.length}
      >
        <>
          {[
            "all-dogs",
            "favorite-dogs",
            "unfavorite-dogs",
          ].includes(showComponent) && (
            <FunctionalDogs
              dogs={filteredDogs}
              unfavoriteDog={unfavoriteDog}
              deleteDog={deleteDog}
              favoriteDog={favoriteDog}
              isLoading={isLoading}
            />
          )}
          {showComponent === "create-dog-form" && (
            <FunctionalCreateDogForm
              addDog={addDog}
              isLoading={isLoading}
            />
          )}
        </>
      </FunctionalSection>
    </div>
  );
}
