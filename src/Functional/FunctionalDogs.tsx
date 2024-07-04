import { DogCard } from "../Shared/DogCard";
import { TDog } from "../types";

// Right now these dogs are constant, but in reality we should be getting these from our server
export const FunctionalDogs = ({
  allDogs,
  isLoading,
  deleteDog,
  updateDog,
}: {
  allDogs: TDog[];
  isLoading: boolean;
  deleteDog: (id: number) => void;
  updateDog: (dogId: number, isFavorite: boolean) => void;
}) => {
  return (
    //  the "<> </>"" are called react fragments, it's like adding all the html inside
    // without adding an actual html element
    <>
      {allDogs.map((dog) => {
        return (
          <DogCard
            dog={{
              id: dog.id,
              image: dog.image,
              description: dog.description,
              isFavorite: dog.isFavorite,
              name: dog.name,
            }}
            key={dog.id}
            onTrashIconClick={() => {
              deleteDog(dog.id);
            }}
            onHeartClick={() => {
              updateDog(dog.id, dog.isFavorite);
            }}
            onEmptyHeartClick={() => {
              updateDog(dog.id, dog.isFavorite);
            }}
            isLoading={isLoading}
          />
        );
      })}
    </>
  );
};
