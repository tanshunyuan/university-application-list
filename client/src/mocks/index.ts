const IS_BROWSER = typeof window !== undefined;

export const setupMocks = async () => {
  if (IS_BROWSER) {
    const { mswWorker } = await import('./mswWorker');
    console.log('BROWSER')
    mswWorker.start();
  } else {
    const { mswServer } = await import('./mswServer');
    console.log('SERVER')
    mswServer.listen();
  }
};
