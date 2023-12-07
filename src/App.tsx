import { createSignal, For } from 'solid-js'
import { createStore } from 'solid-js/store'
import './App.css'
import { ManaRow } from './ManaRow.tsx';

function App() {
  const [addMode, setAddMode] = createSignal(true)

  const [manaTable, setManaTable] = createStore<number[][]>([])

  const [manaom, setManaom] = createSignal(false)
  const [omniom, setOmniom] = createSignal(false)

  const reset = () => {
    for(let i = 0; i < manaTable.length; i++) {
      for(let j = 0; j < 6; j++) {
        setManaTable(i, j, 0)
      }
    }
    setManaom(false)
    setOmniom(false)
  }

  const manaDisappear = () => {
    for(let i = 0; i < manaTable.length; i++) {
      for(let j = 0; j < 6; j++) {
        if (omniom() && manaom()) {
          if (j !== 2 && j !== 4) {
            let v = manaTable[i][j]
            setManaTable(i, j, 0)
            setManaTable(i, 2, n => n + v)
          }
        } else if (omniom()) {
          if (j !== 2) {
            let v = manaTable[i][j]
            setManaTable(i, j, 0)
            setManaTable(i, 2, n => n + v)
          }
        } else if (manaom()) {
          if (j !== 4) {
            setManaTable(i, j, 0)
          }
        } else {
          setManaTable(i, j, 0)
        }
      }
    }
  }

  setManaTable(0, [0,0,0,0,0,0])

  return (
    <>
      <h1>マナカウント</h1>
      <div>
        <table>
          <thead>
            <tr>
              <th>desc.</th>
              <th class="bg-yellow-500">W</th>
              <th class="bg-blue-500">U</th>
              <th class="bg-gray-800">B</th>
              <th class="bg-red-500">R</th>
              <th class="bg-green-500">G</th>
              <th class="bg-gray-500">C</th>
            </tr>
          </thead>
          <tbody>
            <For each={manaTable}>
              {(manas, i) => (
                <ManaRow addMode={addMode()} name="通常" manas={manas} row={i()} setManaTable={setManaTable} />
              )}
            </For>
          </tbody>
        </table>

        <button onClick={() => setManaom((manaom) => !manaom)}>マナの座、オムナス{manaom()?"✓":"✗"}</button>
        <button onClick={() => setOmniom((omniom) => !omniom)}>万物の座、オムナス{omniom()?"✓":"✗"}</button>
        <button onClick={() => reset()}>リセット</button>
        <button onClick={() => manaDisappear()}>フェイズ跨ぎ</button>

        <label class="relative inline-flex items-center cursor-pointer">
          <input type="checkbox" checked={addMode()} onChange={(e) => setAddMode(e.target.checked)} />
          <span class="ms-3 text-sm font-medium text-gray-900 dark:text-gray-300">加算モード</span>
        </label>
      </div>
    </>
  )
}

export default App
