import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { QueryClient, QueryClientProvider } from "react-query";
import { Toaster } from "react-hot-toast";
import { BrowserRouter } from "react-router-dom";
import { token } from "./service/token.ts";
import axios from "axios";
const queryClient = new QueryClient();

axios.interceptors.request.use(
  (config) => {
    if (!token) return config;
    if (config.headers) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log(error);
    return Promise.reject(error);
  }
);

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <QueryClientProvider client={queryClient}>
    <BrowserRouter>
      <App />
      <Toaster position="bottom-right" reverseOrder={false} />
    </BrowserRouter>
  </QueryClientProvider>
  // </React.StrictMode>
);
