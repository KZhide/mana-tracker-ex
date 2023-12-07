import { createSignal, Setter } from 'solid-js'
import { SetStoreFunction } from "solid-js/store"

const classes = [
  "bg-yellow-200",
  "bg-blue-200",
  "bg-gray-400",
  "bg-red-200",
  "bg-green-200",
  "bg-gray-200",
]

export const ManaRow = (props: {
  name: string,
  manas: number[],
  setManaTable: SetStoreFunction<number[][]>,
  row: number,
  addMode: boolean,
}) => {

  const [name, setName] = createSignal(props.name)

  return (
    <tr>
      <td class="font-yusei font-semibold text-2xl px-6">{name()}</td>
      { props.manas.map((n, i) => (
        <td class={classes[i]}>
          <button class="font-semibold text-4xl" onClick={() => props.setManaTable(props.row, i, n => props.addMode ? n+1 : Math.max(n-1, 0))}>{n}</button>
        </td>
      )) }
    </tr>
  )
}
