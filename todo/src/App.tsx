// React から useState フックをインポート
import { useState } from 'react';

type Todo = {
  value: string;
  readonly id: number;
};

export const App = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };

  // todos ステートを更新する関数
  const handleOnSubmit = () => {
    // 何も入力されていなかったらリターン
    if (!text) return;

    // 新しい Todo を作成
    const newTodo: Todo = {
      value: text,
      id: new Date().getTime(),
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

  const handleOnEdit = (id: number, value: string) => {
    /**
     * 引数として渡された todo の id が一致する
     * todos ステート（のコピー）内の todo の
     * value プロパティを引数 value (= e.target.value) に書き換える
     */
    const newTodos = todos.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    // todos ステートを更新
    setTodos(newTodos);
  };

  return (
    <div>
      <form onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input type="text" value={text} onChange={(e) => handleOnChange(e)} />
        <input type="submit" value="追加" onSubmit={handleOnSubmit} />
      </form>
      <ul>
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="text"
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
               />
            </li>
          );
        })}
      </ul>
    </div>
  );
};