import { Component } from "react";
import { Link } from "react-router-dom";

type Props = {
  label: string;
  children: JSX.Element | JSX.Element[];
  onClickFavorited: () => void;
  onClickUnfavorited: () => void;
  onClickCreateDog: () => void;
  showComponent: string;
  favoriteDogCount: number;
  unfavoriteDogCount: number;
};

export class ClassSection extends Component<Props> {
  render() {
    const {
      children,
      favoriteDogCount,
      label,
      onClickCreateDog,
      onClickFavorited,
      onClickUnfavorited,
      showComponent,
      unfavoriteDogCount,
    } = this.props;
    return (
      <section id="main-section">
        <div className="container-header">
          <div className="container-label">{label}</div>
          <Link to={"/functional"} className="btn">
            Change to Functional
          </Link>
          <div className="selectors">
            {/* This should display the favorited count */}
            <div
              className={`selector ${
                showComponent === "favorite-dogs"
                  ? "active"
                  : ""
              }`}
              onClick={onClickFavorited}
            >
              favorited ( {favoriteDogCount} )
            </div>

            {/* This should display the unfavorited count */}
            <div
              className={`selector ${
                showComponent === "unfavorite-dogs"
                  ? "active"
                  : ""
              }`}
              onClick={onClickUnfavorited}
            >
              unfavorited ( {unfavoriteDogCount} )
            </div>
            <div
              className={`selector ${
                showComponent === "create-dog-form"
                  ? "active"
                  : ""
              }`}
              onClick={onClickCreateDog}
            >
              create dog
            </div>
          </div>
        </div>
        <div className="content-container">{children}</div>
      </section>
    );
  }
}
