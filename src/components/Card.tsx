import type { Creator } from "../types";
import { Link } from "react-router-dom";
import "./Card.css";

const Card = ({ id, name, url, description }: Creator) => {
  return (
    <div className="creator-item">
      <h3>
        <Link to={`/view/${id}`}>{name}</Link>
      </h3>
      <p>{description}</p>
      <div className="creator-links">
        <Link to={`/view/${id}`}>View Details</Link> |{" "}
        <Link to={`/edit/${id}`}>Edit</Link> |{" "}
        <a href={url} target="_blank" rel="noopener noreferrer">
          Visit Channel
        </a>
      </div>
    </div>
  );
};

export default Card;
