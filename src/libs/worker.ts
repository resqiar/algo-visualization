const worker = await import('../libs/background.worker?worker');
let thread: Worker;

interface Props {
  activeTitle: string;
  inputValue: number;
}

export async function initWorker({ activeTitle, inputValue }: Props): Promise<Worker> {
  thread = new worker.default();
  thread.postMessage({ activeTitle, inputValue });
  return thread;
}

export function terminateWorker(): void {
  if (thread) {
    thread.terminate();
  }
}
