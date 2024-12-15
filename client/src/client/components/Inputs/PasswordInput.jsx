import React, {useState} from 'react'

const PasswordInput = ({ value, onChange, placeholder }) => {
    const [isShowPassword, setIsShowPassword] = useState(false)
    const toggleShowPassword = () => {
        setIsShowPassword(!isShowPassword)
    }
    return (
        <div className="flex items-center bg-transparent border-[1.5px]">
            <input
                value={value}
                onChange={onChange}
                type={isShowPassword ? 'text' : 'password'}
                placeholder={placeholder || 'Password'}
                className="w-full py-2 px-3 bg-transparent focus:outline-none"
            />
        </div>
    )
}
export default PasswordInput
