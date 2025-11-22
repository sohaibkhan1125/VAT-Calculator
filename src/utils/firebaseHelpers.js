// Safe Firebase helper functions to prevent "user aborted request" errors

export const safeFirebaseOperation = async (operation, operationName = 'Firebase operation') => {
  try {
    return await operation();
  } catch (error) {
    // Ignore aborted requests - these are expected when components unmount
    if (error.name === 'AbortError' || error.code === 'aborted' || error.message?.includes('aborted')) {
      console.log(`${operationName} was aborted (component unmounted)`);
      return null;
    }
    
    // Log other errors but don't throw them
    console.error(`${operationName} failed:`, error);
    return null;
  }
};

export const createAbortController = () => {
  return new AbortController();
};

export const safeFirebaseListener = (listenerFunction, cleanupFunction, listenerName = 'Firebase listener') => {
  let isActive = true;
  let unsubscribe = null;

  const safeListener = (...args) => {
    if (!isActive) return;
    
    try {
      const result = listenerFunction(...args);
      if (result && typeof result === 'function') {
        unsubscribe = result;
      }
    } catch (error) {
      if (error.name !== 'AbortError' && error.code !== 'aborted') {
        console.error(`${listenerName} error:`, error);
      }
    }
  };

  const cleanup = () => {
    isActive = false;
    if (unsubscribe && typeof unsubscribe === 'function') {
      try {
        unsubscribe();
      } catch (error) {
        if (error.name !== 'AbortError' && error.code !== 'aborted') {
          console.error(`Error cleaning up ${listenerName}:`, error);
        }
      }
    }
    if (cleanupFunction && typeof cleanupFunction === 'function') {
      cleanupFunction();
    }
  };

  return { safeListener, cleanup };
};

export const withTimeout = (promise, timeoutMs = 5000, operationName = 'Firebase operation') => {
  return Promise.race([
    promise,
    new Promise((_, reject) => 
      setTimeout(() => reject(new Error(`${operationName} timeout`)), timeoutMs)
    )
  ]);
};
