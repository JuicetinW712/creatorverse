import { useState, useEffect } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import type { Creator } from "../types";
import "./ViewCreator.css";

const ViewCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState<Creator | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreator = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .eq("id", id)
        .single();

      if (error) {
        console.error("Error fetching creator:", error);
      } else {
        setCreator(data);
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleDelete = async () => {
    if (window.confirm("Are you sure you want to delete this creator?")) {
      const { error } = await supabase.from("creators").delete().eq("id", id);
      if (error) {
        console.error("Error deleting creator:", error);
        alert("Error deleting creator.");
      } else {
        navigate("/");
      }
    }
  };

  if (loading) return <p>Loading creator details...</p>;
  if (!creator) return <p>Creator not found.</p>;

  return (
    <div className="view-creator-container">
      <div className="view-creator-header">
        <h2>{creator.name}</h2>
        <p>{creator.description}</p>
        <p>
          <a href={creator.url} target="_blank" rel="noopener noreferrer">
            Visit Channel/Page
          </a>
        </p>
      </div>

      {creator.imageURL && (
        <img
          src={creator.imageURL}
          alt={creator.name}
          className="view-creator-image"
        />
      )}

      <div className="view-creator-footer">
        <Link to={`/edit/${id}`}>
          <button>Edit</button>
        </Link>
        <button onClick={handleDelete} className="contrast">
          Delete
        </button>
      </div>
    </div>
  );
};

export default ViewCreator;
