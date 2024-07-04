import { Link } from "react-router-dom";
import { FunctionalDogs } from "./FunctionalDogs";
import { FunctionalCreateDogForm } from "./FunctionalCreateDogForm";
import { TDog, UsingComponent } from "../types";
import { useState } from "react";

export const FunctionalSection = ({
  createDog,
  allDogs,
  isLoading,
  deleteDog,
  updateDog,
}: {
  createDog: (dog: Omit<TDog, "id">) => void;
  isLoading: boolean;
  allDogs: TDog[];
  deleteDog: (dogId: number) => void;
  updateDog: (dogId: number, isFavorite: boolean) => void;
}) => {
  const favoriteDogs = allDogs.filter((dog) => dog.isFavorite);
  const unFavoriteDogs = allDogs.filter((dog) => !dog.isFavorite);

  const [showComponent, setShowComponent] =
    useState<UsingComponent>("all-dogs");

  const toggleShowComponent = (input: UsingComponent) => {
    if (input === "all-dogs") return setShowComponent("all-dogs");
    if (input === showComponent) return setShowComponent("all-dogs");
    return setShowComponent(input);
  };

  return (
    <section id="main-section">
      <div className="container-header">
        <div className="container-label">Dogs: </div>
        <Link to={"/"} className="btn">
          Home
        </Link>
        <Link to={"/class"} className="btn">
          Change to Class
        </Link>
        <Link to={"/playground"} className="btn">
          Playground
        </Link>

        <div className="selectors">
          <div
            className={`selector ${
              showComponent === "favorited-dogs" ? "active" : ""
            }`}
            onClick={() => {
              toggleShowComponent("favorited-dogs");
            }}
          >
            favorited ( {favoriteDogs.length} )
          </div>

          {/* This should display the unfavorited count */}
          <div
            className={`selector ${
              showComponent === "unfavorited-dogs" ? "active" : ""
            }`}
            onClick={() => {
              toggleShowComponent("unfavorited-dogs");
            }}
          >
            unfavorited ( {unFavoriteDogs.length} )
          </div>

          <div
            className={`selector ${
              showComponent === "create-dog-form" ? "active" : ""
            }`}
            onClick={() => {
              toggleShowComponent("create-dog-form");
            }}
          >
            create dog
          </div>
        </div>
      </div>
      <div className="content-container">
        {showComponent === "all-dogs" && (
          <FunctionalDogs
            allDogs={allDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
        {showComponent === "favorited-dogs" && (
          <FunctionalDogs
            allDogs={favoriteDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
        {showComponent === "unfavorited-dogs" && (
          <FunctionalDogs
            allDogs={unFavoriteDogs}
            isLoading={isLoading}
            deleteDog={deleteDog}
            updateDog={updateDog}
          />
        )}
        {showComponent === "create-dog-form" && (
          <FunctionalCreateDogForm
            createDog={createDog}
            isLoading={isLoading}
          />
        )}
      </div>
    </section>
  );
};
