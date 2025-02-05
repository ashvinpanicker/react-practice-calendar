import { useState, useEffect } from "react";
import { Todo } from "../pages/LocalStorageHookPage";

// custom hook
export default function useLocalStorage(keyName: string, initialValue: Todo[]) {
  const initializeTodoList = () => {
    const todos = JSON.parse(localStorage.getItem(keyName)!);
    return todos || initialValue;
  };
  
  const [data, setData] = useState<Todo[]>(initializeTodoList);

  useEffect(() => {
    localStorage.setItem(keyName, JSON.stringify(data));
  }, [data, keyName]);

  return [data, setData] as const;
}
