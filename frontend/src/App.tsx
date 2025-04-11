import { Suspense } from "react";
import { AppRoutes } from "./routes";
import LoadingSpinner from "./components/LoadingSpinner";
import Header from "./components/general/header/Header";
import Footer from "./components/general/footer/Footer";

function App() {
  return (
    <>
      <Header />
      <Suspense fallback={<LoadingSpinner />}>
        <AppRoutes />
      </Suspense>
      <Footer />
    </>
  );
}

export default App;
