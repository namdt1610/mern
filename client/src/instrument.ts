import { useEffect } from 'react'
import * as Sentry from '@sentry/react'
import {
    createRoutesFromChildren,
    matchRoutes,
    useLocation,
    useNavigationType,
} from 'react-router-dom'

Sentry.init({
    dsn: 'https://2ab21b8df8a071fe256fd49f81e402cc@o4508844613828608.ingest.us.sentry.io/4508844619792384',
    integrations: [
        // See docs for support of different versions of variation of react router
        // https://docs.sentry.io/platforms/javascript/guides/react/configuration/integrations/react-router/
        Sentry.reactRouterV6BrowserTracingIntegration({
            useEffect,
            useLocation,
            useNavigationType,
            createRoutesFromChildren,
            matchRoutes,
        }),
        Sentry.replayIntegration(),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for tracing.
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
    tracesSampleRate: 1.0,

    // Set `tracePropagationTargets` to control for which URLs trace propagation should be enabled
    tracePropagationTargets: [/^\//, /^https:\/\/yourserver\.io\/api/],

    // Capture Replay for 10% of all sessions,
    // plus for 100% of sessions with an error
    // Learn more at
    // https://docs.sentry.io/platforms/javascript/session-replay/configuration/#general-integration-configuration
    replaysSessionSampleRate: 0.1,
    replaysOnErrorSampleRate: 1.0,
})
