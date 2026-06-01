import { useRoutes, Link } from "react-router-dom";
import ShowCreators from "./pages/ShowCreators";
import AddCreator from "./pages/AddCreator";
import EditCreator from "./pages/EditCreator";
import ViewCreator from "./pages/ViewCreator";
import "./App.css";

function App() {
  const element = useRoutes([
    {
      path: "/",
      element: <ShowCreators />,
    },
    {
      path: "/new",
      element: <AddCreator />,
    },
    {
      path: "/edit/:id",
      element: <EditCreator />,
    },
    {
      path: "/view/:id",
      element: <ViewCreator />,
    },

    // TODO - maybe page for a 404?
  ]);

  return (
    <div className="App">
      <header>
        <h1>CREATORVERSE</h1>
        <nav>
          <Link to="/">View All Creators</Link> |
          <Link to="/new"> Add a Creator</Link>
        </nav>
      </header>
      <hr />
      <main>{element}</main>
    </div>
  );
}

export default App;
