import React from 'react'
import { Card } from 'antd/lib'
import LoginForm from './LoginForm'
import { useLocation } from 'react-router-dom'
import LoginLayout from './LoginLayout'
import { motion, AnimatePresence } from 'framer-motion'
import styles from '@/styles/GlassCard.module.scss'

const Login: React.FC = () => {
    const location = useLocation()
    const from = location.state?.from?.pathname || '/'

    return (
        <LoginLayout>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
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
        </LoginLayout>
    )
}

export default Login
