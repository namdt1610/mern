import React from 'react'
import { Routes, Route } from 'react-router-dom'
import ClientRoutes from './routes/client/ClientRoutes'
import AdminRoutes from './routes/admin/AdminRoutes'
import * as Sentry from '@sentry/react'

Sentry.init({
    dsn: 'https://2ab21b8df8a071fe256fd49f81e402cc@o4508844613828608.ingest.us.sentry.io/4508844619792384',
    integrations: [
        Sentry.browserTracingIntegration(),
        Sentry.replayIntegration(),
    ],
    // Tracing
    tracesSampleRate: 1.0, //  Capture 100% of the transactions
    // Set 'tracePropagationTargets' to control for which URLs distributed tracing should be enabled
    tracePropagationTargets: ['localhost', /^https:\/\/yourserver\.io\/api/],
    // Session Replay
    replaysSessionSampleRate: 0.1, // This sets the sample rate at 10%. You may want to change it to 100% while in development and then sample at a lower rate in production.
    replaysOnErrorSampleRate: 1.0, // If you're not already sampling the entire session, change the sample rate to 100% when sampling sessions where errors occur.
})

export default function App() {
    return (
        <Routes>
            <Route path="/*" element={<ClientRoutes />} />
            <Route path="admin/*" element={<AdminRoutes />} />
        </Routes>
    )
}
