import './global.css';
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import { doneTodo, getTodos, postTodo } from './my-api'
import { render } from 'react-dom'
import { useState } from 'react'

// styles 
import { Input } from './components/ui/input'
import { Button } from './components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Checkbox } from './components/ui/checkbox';
import { Label } from './components/ui/label';
import { Separator } from './components/ui/separator';


// Create a client
const queryClient = new QueryClient()

function App() {
  return (
    // Provide the client to your App
    <QueryClientProvider client={queryClient}>
      <Todos />
    </QueryClientProvider>
  )
}

function Todos() {
  // Access the client
  const queryClient = useQueryClient()

  // Queries
  const {data, refetch, isLoading} = useQuery('todos', getTodos)

  // Mutations
  const todoMutation = useMutation(postTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos')
    },
  })
  const todoDoneMutation = useMutation(doneTodo, {
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries('todos')
    },

  })
  console.log(data)
  const [newToDo, setNewToDo] = useState('')

  return (
    <div className='h-screen  flex justify-center items-center'>
      <Card className='w-96'>
        <CardHeader>
          <CardTitle>Tarefas para 2024</CardTitle>
          <CardDescription>tarefas para dominar o mundo.</CardDescription>
        </CardHeader>
        <Separator/>
        <CardContent className='pt-4'>
          <ul>
            { data?.map(todo => (
              <li key={todo.id}> <Checkbox onCheckedChange={()=>  todoDoneMutation.mutate({id: todo.id, done: !todo.done})} checked={todo.done} id={todo.id}/> <Label htmlFor={todo.id}>{todo.done}{todo.title}</Label></li>
            ))}
          </ul>
        </CardContent>
        <CardFooter className='gap-2'>
          <Input type='text' value={newToDo} onChange={e => setNewToDo(e.target.value)} 
            className='border-1 border-orange-800 bg-orange-100 outline-2 outline-black'
          />
          <Button onClick={() => {
              todoMutation.mutate({
                id: Date.now(),
                title: newToDo,
              })
              setNewToDo('')
            }}>Add Todo</Button>
        </CardFooter>
      </Card>


      
      

      
     
    </div>
  )
}

render(<App />, document.getElementById('root'))