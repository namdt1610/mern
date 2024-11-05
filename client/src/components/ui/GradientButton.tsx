// GradientButton.tsx
import React from 'react'
import Button, { ButtonProps } from 'antd/lib/button'
import { createStyles } from 'antd-style'

const useStyle = createStyles(({ css }) => ({
    linearGradientButton: css`
        border-width: 0;
        position: relative;
        overflow: hidden;

        > span {
            position: relative;
            z-index: 1;
        }

        &::before {
            content: '';
            background: linear-gradient(135deg, #6253e1, #04befe);
            position: absolute;
            inset: 0;
            opacity: 1;
            transition: opacity 0.3s;
            border-radius: inherit;
        }

        &:hover::before {
            opacity: 0;
        }
    `,
}))

interface GradientButtonProps extends ButtonProps {
    icon?: React.ReactNode
    children?: React.ReactNode
}

const GradientButton: React.FC<GradientButtonProps> = ({
    icon,
    children,
    ...props
}) => {
    const { styles } = useStyle()

    return (
        <Button
            type="primary"
            icon={icon}
            className={styles.linearGradientButton}
            {...props}
        >
            {children}
        </Button>
    )
}

export default GradientButton
