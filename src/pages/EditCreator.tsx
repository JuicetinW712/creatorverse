import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "./EditCreator.css";

const EditCreator = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });
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
        setCreator({
          name: data.name,
          url: data.url,
          description: data.description,
          imageURL: data.imageURL || "",
        });
      }
      setLoading(false);
    };

    fetchCreator();
  }, [id]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setCreator((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase
      .from("creators")
      .update(creator)
      .eq("id", id);

    if (error) {
      console.error("Error updating creator:", error);
      alert("Error updating creator.");
    } else {
      navigate("/");
    }
  };

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

  return (
    <div className="edit-creator-container">
      <h2>Edit Creator</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            name="name"
            value={creator.name}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>URL: </label>
          <input
            type="url"
            name="url"
            value={creator.url}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Description: </label>
          <textarea
            name="description"
            value={creator.description}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label>Image URL (Optional): </label>
          <input
            type="url"
            name="imageURL"
            value={creator.imageURL}
            onChange={handleChange}
          />
        </div>
        <div className="edit-actions">
          <button type="submit">Update</button>
          <button type="button" className="contrast" onClick={handleDelete}>
            Delete
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditCreator;
