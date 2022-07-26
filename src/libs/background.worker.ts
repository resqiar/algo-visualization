import { addUpToLoop, addUpToMath, BIGO_TITLE } from "../data/bigOData"

interface Props {
  activeTitle: BIGO_TITLE;
  inputValue: number;
}

onmessage = (props: MessageEvent<Props>) => {
  let startPoint = 0;
  let endPoint = 0;

  switch (props.data.activeTitle) {
    case BIGO_TITLE.ADD_UP_TO_LOOP:
      startPoint = performance.now();
      addUpToLoop(props.data.inputValue);
      endPoint = performance.now();
      break;

    case BIGO_TITLE.ADD_UP_TO_MATH:
      startPoint = performance.now();
      addUpToMath(props.data.inputValue);
      endPoint = performance.now();
      break;

    default:
      break;
  }

  const timeTaken = (endPoint - startPoint) / 1000;
  postMessage(timeTaken);

  // reset time to default
  startPoint = 0;
  endPoint = 0;
}

export { }
