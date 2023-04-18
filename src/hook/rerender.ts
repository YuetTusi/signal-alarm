import { useCallback, useState } from "react";

/**
 * 重新渲染
 */
const useRerender = () => {
    const [_, setState] = useState({})
    return useCallback(() => setState({}), []);
}
export { useRerender };
