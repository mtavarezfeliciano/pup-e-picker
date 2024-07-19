import { Dog } from "../types";
import { DogCard } from "../Shared/DogCard";
import { Component } from "react";

type Handler = (dogId: number) => void;

type Props = {
  dogs: Dog[];
  deleteDog: Handler;
  unfavoriteDog: Handler;
  favoriteDog: Handler;
  isLoading: boolean;
};

export class ClassDogs extends Component<Props> {
  render() {
    const {
      deleteDog,
      dogs,
      favoriteDog,
      unfavoriteDog,
      isLoading,
    } = this.props;
    return (
      <>
        {dogs.map((dog) => (
          <DogCard
            dog={dog}
            key={dog.id}
            onTrashIconClick={() => deleteDog(dog.id)}
            onHeartClick={() => unfavoriteDog(dog.id)}
            onEmptyHeartClick={() => favoriteDog(dog.id)}
            isLoading={isLoading}
          />
        ))}
      </>
    );
  }
}
