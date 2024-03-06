import { Link } from "react-router-dom";
import { useAuthDispatch, useAuthState } from "@/shared/state/context";
import ProfileImage from "./ProfileImage";
export function Navbar() {
  const authState = useAuthState();
  const dispatch = useAuthDispatch();
  const onClickLogout = () => {
    dispatch({
      type: "logout-success",
    });
  };
  return (
    <>
      <nav className="navbar navbar-expand bg-body-tertiary shadow-sm">
        <div className="container-fluid ms-5 me-5">
          <Link className="navbar-brand mb-0 h1" to="/">
            MEMORIES
          </Link>
          <ul className="navbar-nav">
            {authState.id === 0 && (
              <>
                <li className="nav-item">
                  <h4>
                    <Link className="nav-link" to="/login">
                      Login
                    </Link>
                  </h4>
                </li>

                <li className="nav-item">
                  <h4>
                    <Link className="nav-link" to="/signup">
                      Sign Up
                    </Link>
                  </h4>
                </li>
              </>
            )}
            {authState.id > 0 && (
              <>
                <li className="nav-item">
                  <Link className="nav-link me-1" to={`/user/${authState.id}`}>
                    <ProfileImage width={40} image={authState.image} />
                  </Link>
                </li>
                <li className="nav-item">
                  <h4>
                    <Link className="nav-link" to={`/`} onClick={onClickLogout}>
                      Logout
                    </Link>
                  </h4>
                </li>
              </>
            )}
          </ul>
        </div>
      </nav>
    </>
  );
}
