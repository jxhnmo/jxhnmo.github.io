import ReactGA from "react-ga4";

// Initialize GA4 with your tracking ID
export const initGA = (measurementId) => {
  ReactGA.initialize(measurementId);
};

// Track page views
export const logPageView = () => {
  ReactGA.send({
    hitType: "pageview",
    page: window.location.pathname + window.location.hash,
  });
};

// Track custom events (optional, for later use)
export const logEvent = (category, action, label) => {
  ReactGA.event({
    category: category,
    action: action,
    label: label,
  });
};
