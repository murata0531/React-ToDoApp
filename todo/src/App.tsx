// React から useState フックをインポート
import { useState } from 'react';

type Todo = {
  value: string;
};

export const App = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  // todos ステートを更新する関数
  const handleOnSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;

    // 新しい Todo を作成
    const newTodo: Todo = {
      value: text,
    };
    /**
     * スプレッド構文を用いて todos ステートのコピーへ newTodo を追加する
     * 以下と同義
     *
     * const oldTodos = todos.slice();
     * oldTodos.unshift(newTodo);
     * setTodos(oldTodos);
     *
     **/
    setTodos([newTodo, ...todos]);
    // フォームへの入力をクリアする
    setText('');
  };

  return (
    <div>
      <form onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input
          type="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
    </div>
  );
};