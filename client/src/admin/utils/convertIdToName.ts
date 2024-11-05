// utils/convertIdToName.ts

type AnyObject = Record<string, any>

/**
 * Hàm chuyển đổi `_id` thành `name` dựa trên `idToNameMap`.
 * @param obj Đối tượng cần chuyển đổi.
 * @param idToNameMap Bản đồ ánh xạ từ `_id` sang `name`.
 * @returns Đối tượng đã chuyển đổi.
 */
export function convertIdToName<T extends AnyObject>(
    obj: T,
    idToNameMap: Record<string, string>
): T {
    const result: AnyObject = { ...obj }

    for (const key in result) {
        if (result[key] && typeof result[key] === 'object') {
            // Kiểm tra các trường con
            if ('_id' in result[key] && idToNameMap[result[key]._id]) {
                result[key].name = idToNameMap[result[key]._id]
                delete result[key]._id // Xóa `_id` sau khi chuyển đổi
            }
        }
    }

    return result as T
}
