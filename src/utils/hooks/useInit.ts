import { useCallback, useEffect, useState } from "react";
import { useAppDispatch } from "../../store";
import { getData } from "../../store/actions";

const SecondToMiliseconds = 1000;

export default function useInit() {
  const dispatch = useAppDispatch();
  const [nextRequestAfter, setNextRequestAfter] = useState(15);

  const GetDataByInterval = useCallback(() => {
    dispatch(getData())
      .then(() => setNextRequestAfter(15));
  }, []);

  useEffect(() => {
    const dispObj = dispatch(getData());

    const countDownInterval = setInterval(() => setNextRequestAfter(prev => prev && prev-1), 1000);
    const interVal = setInterval(GetDataByInterval, 15 * SecondToMiliseconds);

    return () => {
      dispObj.abort();
      clearInterval(countDownInterval);
      clearInterval(interVal);
    }
  }, []);

  return {
    nextRequestAfter,
  }
}