import { Outlet } from "react-router-dom";
import { Navbar } from "./shared/components/Navbar";
import { AuthenticationContext } from "./shared/state/context";
function App() {
  return (
    <AuthenticationContext>
      <Navbar />

      <div className="container mt-3">
        {/* <Login onLoginSuccess={onLoginSuccess}/> */}
        <Outlet />
      </div>
    </AuthenticationContext>
  );
}

export default App;
