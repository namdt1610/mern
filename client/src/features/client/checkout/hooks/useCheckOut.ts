import { useCreateOrderMutation } from '@/services/OrderApi'
import { useGetPaymentMethodsQuery } from '@/services/PaymentMethodApi'
import { useGetBanksQuery } from '@/services/VietQrApi'
import { useGetProvincesQuery } from '@/services/OpenApi'

export const useCheckOut = () => {
    const [createOrder, { isLoading, error }] = useCreateOrderMutation()

    const {
        data: banks,
        error: errorBanks,
        isLoading: isBanksLoading,
    } = useGetBanksQuery()

    const {
        data: provinces,
        error: errorProvinces,
        isLoading: isProvinceLoading,
    } = useGetProvincesQuery()

    const {
        data: paymentMethods,
        error: errorPM,
        isLoading: isPMLoading,
    } = useGetPaymentMethodsQuery()

    return {
        createOrder,
        isLoading,
        error,
        banks,
        errorBanks,
        isBanksLoading,
        provinces,
        errorProvinces,
        isProvinceLoading,
    }
}
