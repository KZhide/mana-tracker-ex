import { createSignal, For } from 'solid-js'
import { createStore } from 'solid-js/store'
import './App.css'
import { ManaRow } from './ManaRow.tsx';

function App() {
  const [addMode, setAddMode] = createSignal(true)

  const [manaTable, setManaTable] = createStore<{name: string, manas: number[]}[]>([])

  const [manaom, setManaom] = createSignal(false)
  const [omniom, setOmniom] = createSignal(false)

  const reset = () => {
    for(let i = 0; i < manaTable.length; i++) {
      for(let j = 0; j < 6; j++) {
        setManaTable(i, "manas", j, 0)
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
            let v = manaTable[i].manas[j]
            setManaTable(i, "manas", j, 0)
            setManaTable(i, "manas", 2, n => n + v)
          }
        } else if (omniom()) {
          if (j !== 2) {
            let v = manaTable[i].manas[j]
            setManaTable(i, "manas", j, 0)
            setManaTable(i, "manas", 2, n => n + v)
          }
        } else if (manaom()) {
          if (j !== 4) {
            setManaTable(i, "manas", j, 0)
          }
        } else {
          setManaTable(i, "manas", j, 0)
        }
      }
    }
  }

  setManaTable(0, {name: "通常", manas: [0,0,0,0,0,0]})

  return (
    <>
      <h1>マナカウント</h1>
      <div>
        <button onClick={() => setManaTable(manaTable.length, {name: "", manas: [0,0,0,0,0,0]})}>行追加</button>
        <div>
            <For each={manaTable}>
              {(manaRow, i) => (
                <ManaRow addMode={addMode()} name={manaRow.name} manas={manaRow.manas} row={i()} setManaTable={setManaTable} />
              )}
            </For>
        </div>

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
