import "tailwindcss/tailwind.css";
import "../styles/globals.css";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { AuthProvider } from "context/AuthContext";

function MyApp({ Component, pageProps }) {
  const client = new QueryClient();
  return (
    <QueryClientProvider client={client}>
      <AuthProvider>
        <Component {...pageProps} />
        <ToastContainer position="top-right" autoClose={5000} closeOnClick />
      </AuthProvider>
    </QueryClientProvider>
  );
}

export default MyApp;
