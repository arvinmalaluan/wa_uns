import { Route, Routes } from "react-router-dom";
import "./App.css";
import SigninPage from "./pages/signin";
import SignupPage from "./pages/signup";
import PendingPage from "./pages/pending";
import { useUserAuth } from "./hooks/useUserAuth";
import Home from "./pages/home";
import About from "./pages/about";
import Building from "./pages/building";
import NotFound from "./pages/notFound";
import Loading from "./pages/loading";

function App() {
  const { loading, user, status } = useUserAuth();

  if (loading) return <Loading />;

  return user ? (
    <Routes>
      {status == "pending" ? (
        <>
          <Route path="/pending" element={<PendingPage />} />
        </>
      ) : (
        <>
          <Route path="/home" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/building" element={<Building />} />
          <Route path="*" element={<NotFound />} />
        </>
      )}
    </Routes>
  ) : (
    <Routes>
      <Route path="/" element={<SigninPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
