import { SetStoreFunction } from "solid-js/store"

const classes = [
  "bg-yellow-300",
  "bg-blue-300",
  "bg-gray-600",
  "bg-red-300",
  "bg-green-300",
  "bg-gray-400",
]

const buttonBgs = [
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
  setManaTable: SetStoreFunction<{name: string, manas: number[]}[]>,
  row: number,
  addMode: boolean,
}) => {

  return (
    <div class="md:flex">
      <div class="font-yusei font-semibold md:flex-1 md:w-1/6"><button class="w-1/4 text-center">✕</button><input value={props.name} class="w-3/4"/></div>
      <div class="grid grid-cols-3 md:grid-cols-6 md:w-5/6">
      { props.manas.map((n, i) => (
        <div class={classes[i] + " " + "p-1 md:flex-1 w-full"}>
          <button class={`block w-full font-semibold text-2xl ${buttonBgs[i]} text-black`} onClick={() => props.setManaTable(props.row, "manas", i, n => props.addMode ? n+1 : Math.max(n-1, 0))}>{n}</button>
        </div>
      )) }
      </div>
    </div>
  )
}
