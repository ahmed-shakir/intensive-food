import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import {loggerDsn} from "../config.json";

function init() {
  Sentry.init({
    dsn: loggerDsn,
    integrations: [new Integrations.BrowserTracing()],
    tracesSampleRate: 1.0,
  });
}

function log(msg) {
  return Sentry.captureMessage(msg);
}

function error(error) {
  return Sentry.captureException(error);
}

const logger = {
    init, log, error
};

export default logger;
