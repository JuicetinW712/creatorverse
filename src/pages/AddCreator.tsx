import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "../client";
import "./AddCreator.css";

const AddCreator = () => {
  const navigate = useNavigate();
  const [creator, setCreator] = useState({
    name: "",
    url: "",
    description: "",
    imageURL: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setCreator((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await supabase.from("creators").insert([creator]);

    if (error) {
      console.error("Error adding creator:", error);
      alert("Error adding creator.");
    } else {
      navigate("/");
    }
  };

  return (
    <div className="creator-form-container">
      <h2>Add a New Content Creator</h2>
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
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default AddCreator;
