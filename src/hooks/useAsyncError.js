import { useState, useCallback } from 'react';

export function useAsyncError() {
    const [_, setError] = useState();
    return useCallback(
        (e) => {
            setError(() => {
                throw e;
            });
        },
        [setError],
    );
}