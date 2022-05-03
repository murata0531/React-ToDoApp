// React から useState フックをインポート
import { useState } from 'react';

// タスクがもつプロパティ
type Todo = {
  value: string;
  readonly id: number;
  checked: boolean;
  removed: boolean;
};

// タスクをフィルタリングする項目
type Filter = 'all' | 'checked' | 'unchecked' | 'removed';

export const App = () => {

  const [text, setText] = useState('');
  const [todos, setTodos] = useState<Todo[]>([]);
  const [filter, setFilter] = useState<Filter>('all');

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
      checked: false,
      removed: false,
    };
    /**
     * シャローコピー:
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

  // 登録済み todo が編集された時のコールバック関数
  const handleOnEdit = (id: number, value: string) => {
    /**
     * ディープコピー:
     * 同じく Array.map() を利用するが、それぞれの要素をスプレッド構文で
     * いったんコピーし、それらのコピー (= Todo 型オブジェクト) を要素とする
     * 新しい配列を再生成する。
     *
     * 以下と同義:
     * const deepCopy = todos.map((todo) => ({
     *   value: todo.value,
     *   id: todo.id,
     * }));
     */
    const deepCopy = todos.map((todo) => ({ ...todo }));

    // ディープコピーされた配列に Array.map() を適用
    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.value = value;
      }
      return todo;
    });

    // todos ステート配列をチェック（あとでコメントアウト）
    console.log('=== Original todos ===');
    todos.map((todo) => console.log(`id: ${todo.id}, value: ${todo.value}`));

    setTodos(newTodos);
  };

  // チェックボックスがチェックされたときのコールバック関数
  const handleOnCheck = (id: number, checked: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.checked = !checked;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // 削除ボタンがクリックされたときのコールバック関数
  const handleOnRemove = (id: number, removed: boolean) => {
    const deepCopy = todos.map((todo) => ({ ...todo }));

    const newTodos = deepCopy.map((todo) => {
      if (todo.id === id) {
        todo.removed = !removed;
      }
      return todo;
    });

    setTodos(newTodos);
  };

  // タスクをフィルタリングするコールバック関数
  const filteredTodos = todos.filter((todo) => {
    switch (filter) {
      case 'all':
        return !todo.removed;
      case 'checked':
        return todo.checked && !todo.removed;
      case 'unchecked':
        return !todo.checked && !todo.removed;
      case 'removed':
        return todo.removed;
      default:
        return todo;
    }
  });

  return (
    <div>
      <select
        defaultValue="all"
        onChange={(e) => setFilter(e.target.value as Filter)}
      >
        <option value="all">すべてのタスク</option>
        <option value="checked">完了したタスク</option>
        <option value="unchecked">現在のタスク</option>
        <option value="removed">ごみ箱</option>
      </select>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleOnSubmit();
        }}
      >
        <input
          type="text"
          value={text}
          disabled={filter === 'checked' || filter === 'removed'}
          onChange={(e) => handleOnChange(e)}
        />
        <input
          type="submit"
          value="追加"
          disabled={filter === 'checked' || filter === 'removed'}
          onSubmit={handleOnSubmit}
        />
      </form>
      <ul>
        {filteredTodos.map((todo) => {
          return (
            <li key={todo.id}>
              <input
                type="checkbox"
                disabled={todo.removed}
                checked={todo.checked}
                onChange={() => handleOnCheck(todo.id, todo.checked)}
              />
              <input
                type="text"
                disabled={todo.checked || todo.removed}
                value={todo.value}
                onChange={(e) => handleOnEdit(todo.id, e.target.value)}
              />
              <button onClick={() => handleOnRemove(todo.id, todo.removed)}>
                {todo.removed ? '復元' : '削除'}
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
};