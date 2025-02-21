import React, { Suspense } from 'react'
import { Card, Skeleton } from 'antd'
import { LoginForm } from '.'
import { useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import styles from '@/styles/GlassCard.module.scss'
import ErrorBoundary from '@/components/shared/ErrorBoudaries'

export default function Login() {
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    return (
        <ErrorBoundary>
            <Suspense fallback={<Skeleton active />}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 }}
                    className="flex items-center justify-center w-full h-screen"
                >
                    <Card className={styles.glassCard}>
                        <div className="flex justify-center">
                            <img
                                className="h-20 m-6"
                                src="/img/logo_dtn.png"
                                alt="logo"
                            />
                        </div>
                        <motion.div
                            initial={{ opacity: 0, y: 40 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.6 }}
                        >
                            <LoginForm from={from} />
                        </motion.div>
                    </Card>
                </motion.div>
            </Suspense>
        </ErrorBoundary>
    )
}
