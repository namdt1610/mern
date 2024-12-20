// utils/formatCurrency.js
import numeral from 'numeral'

export const formatCurrency = (value: any, format = '0,0') => {
    return numeral(value).format(`${format}`) + ' \u20AB'
}
