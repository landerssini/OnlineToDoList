import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import { addToList, changeCompletedTask, deleteFromList, fromLocalToPublicList, getPublicList } from './API/ToDoListAPI';
import { ListItem } from './ListItem';
import { List } from './List';
import { AddTaskForm } from './AddTaskForm';
import { ListIdDisplay } from './ListIdDisplay';
import { ChangePublicLocalView } from './ChangePublicLocalView';
import { MakeListPublicButton } from './MakeListPublicButton';
import { ConnectToList } from './ConnectToList';
import { MenuButton } from './MenuButton';
import bgLocal from "./assets/bg-local.svg"
import bgPublic from "./assets/bg-public.svg"
export interface Item {
  title: string;
  completed: boolean
  id: `${string}-${string}-${string}-${string}-${string}`
}
export interface Errors {
  ConvertToPublicBtn: string,
  NoListFoundError: string
}
function App() {
  const [menuOpened, setMenuOpened] = useState<boolean>(false)
  const [localList, setLocalList] = useState<boolean>(true)
  const [publicListCode, setPublicListCode] = useState<string>("")
  const [errors, setErrors] = useState<Errors>({
    ConvertToPublicBtn: "",
    NoListFoundError: "",
    // ConvertToPublicBtn: "",
    // ConvertToPublicBtn: ""
  })
  const [list, setList] = useState<Item[]>([])
  const { paramListCode } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    if (paramListCode) {
      setLocalList(false)
      setPublicListCode(paramListCode)
      const getListData = async () => {
        const response = await getPublicList(paramListCode)
        if (!response.ok) {
          setList([])
          // NoListFoundError
          return
        }
        setList(response.list.items)
      }
      getListData()
    }
  }, [paramListCode])

  useEffect(() => {
    if (localList) {
      const localListData = localStorage.getItem("LOCALToDoList")
      if (localListData) {
        const localListParsed = JSON.parse(localListData)
        setList(localListParsed)
      } else {
        setList([])
      }
    }
  }, [])

  const refreshList = async () => {
    const response = await getPublicList(publicListCode)
    console.log(response);

    setList(response.list.items);

  }


  const handleClickMenu = () => {
    setMenuOpened(!menuOpened)

  }
  const handleChangePublic = async () => {
    if (publicListCode) {
      navigate(`/${publicListCode}`)
      setLocalList(false)
      setMenuOpened(false)
      const response = await getPublicList(publicListCode)
      setList(response.list.items);
    } else {
      return
    }
  }
  const handleChangeLocal = () => {
    navigate("/")
    setLocalList(true)
    const localListData = localStorage.getItem("LOCALToDoList")
    if (localListData) {
      const localListParsed = JSON.parse(localListData)
      setList(localListParsed)
    } else {
      setList([])
    }
    setMenuOpened(false)
  }

  const handleDeleteListItem = (id: Item["id"]) => {
    if (localList) {
      const filteredList = list.filter((item) => item.id !== id)
      setList(filteredList)
      localStorage.setItem("LOCALToDoList", JSON.stringify(filteredList))
    } else {
      const filteredList = list.filter((item) => item.id !== id)
      setList(filteredList)
      const deleteItemFromList = async () => {
        const response = await deleteFromList(publicListCode, id)
        console.log(response);
        await refreshList()
      }
      deleteItemFromList()
    }
  }

  const handleChangeCompletedTask = (id: Item["id"]) => {
    if (localList) {
      const updatedList = list.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      );

      const modifiedItemIndex = updatedList.findIndex((item) => item.id === id);
      if (modifiedItemIndex !== -1) {
        const [modifiedItem] = updatedList.splice(modifiedItemIndex, 1);
        if (!modifiedItem.completed) {
          const firstCompletedIndex = updatedList.findIndex((item) => item.completed);

          const adjustedIndex = firstCompletedIndex !== -1 ? firstCompletedIndex : updatedList.length;

          updatedList.splice(adjustedIndex, 0, modifiedItem);
        } else {
          updatedList.push(modifiedItem);
        }
        setList([...updatedList]);
        localStorage.setItem("LOCALToDoList", JSON.stringify([...updatedList]));
      } else {
        setList(updatedList);
        localStorage.setItem("LOCALToDoList", JSON.stringify([...updatedList]));
      }
    } else {
      const updateItemCompletion = async () => {
        const taskToChange = list.find(task => task.id == id)
        const response = await changeCompletedTask(publicListCode, id, !taskToChange!.completed);
        console.log(response);
        await refreshList();
      };
      updateItemCompletion();
    }
  };

  const handleSubmitListCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const input = elements.namedItem("listCode")
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return
    const response = await getPublicList(input.value)
    if (!response.ok) {
      // NO LIST WITH THAT CODE ERROR
      return
    }
    navigate(`/${input.value}`)
    setMenuOpened(false)
    input.value = ""
  }

  const handleConvertToPublic = async () => {
    if (localList) {
      if (list.length == 0) {
        return
      }
      const response = await fromLocalToPublicList(list)
      if (response.ok) {
        localStorage.setItem("PUBLICToDoListCode", response.newListId)
        localStorage.removeItem("LOCALToDoList")
        navigate(`/${response.newListId}`)
        setLocalList(false)
        setMenuOpened(false)
      } else {
        console.log("Error");
        console.log(response);

      }
    }
  }
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const input = elements.namedItem("addItem")
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return


    const newItem: Item = {
      title: input.value,
      completed: false,
      id: crypto.randomUUID()
    }
    if (localList) {
      localStorage.setItem("LOCALToDoList", JSON.stringify([...list, newItem]));
      setList((prevList) => {
        return [...prevList, newItem]
      })
    } else {
      setList((prevList) => {
        return [...prevList, newItem]
      })
      const addItemToList = async () => {
        const response = await addToList(publicListCode, newItem)
        console.log(response);
        await refreshList()
      }
      addItemToList()
    }

    input.value = ""
  }
  return (
    <>
      <div className={`md:flex md:items-center md:justify-center md:gap-3 bg-center bg-cover transition-all `}>
        <div className={` absolute top-3 left-3 transition-all duration-500 ease-in-out overflow-auto bg-white md:bg-opacity-60 flex items-center justify-center ${menuOpened ? "h-1/4 p-3 rounded-xl w-3/4 " : "rounded-3xl h-[6.5vh] w-[6.5vh]"} md:static md:w-fit md:h-fit md:p-7 z-30`} >
          <div className={`overflow-auto flex flex-col items-center relative transition-all md:flex md:gap-3 gap-3 ${menuOpened ? "" : "hidden "}`}>
            <ConnectToList handleSubmitListCode={handleSubmitListCode} />
            <ChangePublicLocalView handleConvertToPublic={handleConvertToPublic} handleChangeLocal={handleChangeLocal} handleChangePublic={handleChangePublic} localList={localList} publicListCode={publicListCode} />
          </div>
          <div className='flex items-center justify-center bg'>
            <MenuButton handleClickMenu={handleClickMenu} menuOpened={menuOpened} />

          </div>
        </div>
        <div className=' h-screen flex gap-3 flex-col items-center justify-center relative md:w-1/3 z-20'>
          <ListIdDisplay>{localList ? "Local list" : publicListCode}</ListIdDisplay>
          <AddTaskForm handleSubmit={handleSubmit} />
          <List>
            {list ?
              list.map((item, index) => {
                return <ListItem item={item} handleDeleteListItem={handleDeleteListItem} handleChangeCompletedTask={handleChangeCompletedTask} key={item.id} index={index} />
              })
              : <p>Loading...</p>}
          </List>
        </div>
        <div className='absolute top-0 left-0 z-0 h-full w-full'>
          <div className={`absolute top-0 left-0 bg-[url("./assets/bg-local.svg")] w-full h-full bg-cover bg-center z-10 transition-opacity duration-300 ${localList ? "opacity-100" : "opacity-0"}`}></div>
          <div className='absolute top-0 left-0 bg-[url("./assets/bg-public.svg")] w-full h-full bg-cover bg-center z-0'></div>
        </div>
      </div>
    </>
  )
}

export default App





