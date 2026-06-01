import { useState, useEffect } from "react";
import { supabase } from "../client";
import Card from "../components/Card";
import type { Creator } from "../types";
import "./ShowCreators.css";

const ShowCreators = () => {
  const [creators, setCreators] = useState<Creator[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCreators = async () => {
      const { data, error } = await supabase
        .from("creators")
        .select("*")
        .order("id", { ascending: true });


      if (error) {
        console.error("Error fetching creators:", error);
      } else {
        setCreators(data || []);
      }
      setLoading(false);
    };

    fetchCreators();
  }, []);

  if (loading) return <p>Loading creators...</p>;

  return (
    <section>
      {creators.length > 0 ? (
        <div className="creators-grid">
          {creators.map((creator) => (
            <Card key={creator.id} {...creator} />
          ))}
        </div>
      ) : (
        <p className="no-creators">No creators found. Add some!</p>
      )}
    </section>
  );
};

export default ShowCreators;
