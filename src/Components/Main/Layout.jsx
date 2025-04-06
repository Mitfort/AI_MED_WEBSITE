// Layout.jsx
import { useLocation } from "react-router-dom";
import DNA from "./DNA";

export default function Layout() {
  const location = useLocation();

  return (
    <div className="layout">
      <header></header>
      <main>
        {location.pathname === "/" && <DNA listSize={4} />}
      </main>
      <footer></footer>
    </div>
  );
}
