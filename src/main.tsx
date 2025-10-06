import React from "react";
import ReactDOM from "react-dom";
import "./index.scss";
import "./i18n";

import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import rootReducer from "./modules";
import ReduxThunk from "redux-thunk";

import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import { lazy, Suspense } from "react";
import Modal from "./components/Modal";
import Sidebar from "./components/Sidebar";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

// Lazy load routes for code splitting
const Home = lazy(() => import("@/routes/Home"));
const Join = lazy(() => import("./routes/Join"));
const Notice = lazy(() => import("./routes/Notice"));
const Donate = lazy(() => import("./routes/Donate"));
const NotFound = lazy(() => import("./routes/NotFound"));
const SignInPage = lazy(() => import("@/components/pages/SignInPage"));

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

const queryClient = new QueryClient();

ReactDOM.render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <Router>
          <Suspense fallback={<div />}>
            <Switch>
              <Route exact path="/" component={Home} />
              <Route path="/login" component={SignInPage} />
              <Route path="/join" component={Join} />
              <Route path="/notice" component={Notice} />
              <Route path="/buymeacoffee" component={Donate} />
              <Route exact path="/notfound" component={NotFound} />
              <Route component={() => <Redirect to="/notfound" />} />
            </Switch>
          </Suspense>
          <Modal />
          <Sidebar />
        </Router>
      </Provider>
    </QueryClientProvider>
  </React.StrictMode>,
  document.getElementById("root"),
);
