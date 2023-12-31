import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { addToList, changeCompletedTask, deleteFromList, fromLocalToPublicList, getPublicList } from './API/ToDoListAPI'
import { ListItem } from './Components/Main/ListItem'
import { List } from './Components/Main/List'
import { AddTaskForm } from './Components/Main/AddTaskForm'
import { ListIdDisplay } from './Components/Main/ListIdDisplay'
import { ChangePublicLocalView } from './Components/Menu/ChangePublicLocalView'
import { ConnectToList } from './Components/Menu/ConnectToList'
import { MenuButton } from './Components/Menu/MenuButton'
import { Background } from './Components/General/Background'
import toast from 'react-hot-toast'
import { CustomToast } from './Components/General/CustomToast'

export interface Item {
  title: string
  completed: boolean
  id: `${string}-${string}-${string}-${string}-${string}`
}

function App() {
  const [menuOpened, setMenuOpened] = useState<boolean>(false)
  const [localList, setLocalList] = useState<boolean>(true)
  const [publicListCode, setPublicListCode] = useState<string>("")
  const [list, setList] = useState<Item[]>([])
  const { paramListCode } = useParams()
  const navigate = useNavigate()

  /**
 * Fetches data for the public list when the component mounts.
 */
  useEffect(() => {
    if (paramListCode) {
      const getListData = async () => {
        const response = await getPublicList(paramListCode)
        if (!response.ok) {
          setList([])
          toast.custom((t) => (
            <CustomToast t={t} error={true}>
              There is no list with that code. ({paramListCode})
            </CustomToast>
          ), {
            duration: 1000
          })
          navigate(`/`)
          return
        } else {
          setLocalList(false)
          setPublicListCode(paramListCode)
          setList(response.list.items)
        }
      }
      getListData()
    }
  }, [paramListCode])

  /**
 * Loads the local list from localStorage when the component mounts.
 */
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
  }, [localList])

  /**
  * Refreshes the public list data.
  */
  const refreshList = async () => {
    const response = await getPublicList(publicListCode)
    setList(response.list.items)
  }

  /**
 * Toggles the menu's open/closed state.
 */
  const handleClickMenu = () => {
    setMenuOpened(!menuOpened)
  }

  /**
   * Changes the view to the selected public list.
   */
  const handleChangePublic = async () => {
    if (publicListCode) {
      navigate(`/${publicListCode}`)
      setLocalList(false)
      setMenuOpened(false)
      const response = await getPublicList(publicListCode)
      setList(response.list.items)
      toast.custom((t) => (
        <CustomToast t={t} error={false}>
          Changed to {publicListCode} list
        </CustomToast>
      ), {
        duration: 1000
      })
    } else {
      return
    }
  }

  /**
 * Changes the view to the local list.
 */
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
    toast.custom((t) => (
      <CustomToast t={t} error={false}>
        Changed to Local list
      </CustomToast>
    ), {
      duration: 1000
    })
  }

  /**
 * Deletes an item from the list.
 * @param {Item["id"]} id - The unique identifier of the item to be deleted.
 */
  const handleDeleteListItem = (id: Item["id"]) => {
    const filteredList = list.filter((item) => item.id !== id)
    setList(filteredList)
    if (localList) {
      localStorage.setItem("LOCALToDoList", JSON.stringify(filteredList))
      toast.custom((t) => (
        <CustomToast t={t} error={false}>
          Changes have been applied.
        </CustomToast>
      ), {
        duration: 1000
      })
    } else {
      const deleteItemFromList = async () => {
        const response = await deleteFromList(publicListCode, id)
        if (response.ok) {
          toast.custom((t) => (
            <CustomToast t={t} error={false}>
              Changes have been applied.
            </CustomToast>
          ), {
            duration: 1000
          })
        } else {
          toast.custom((t) => (
            <CustomToast t={t} error={true}>
              Error occurred, please try again.
            </CustomToast>
          ), {
            duration: 1000
          })
        }
        await refreshList()
      }
      deleteItemFromList()
    }
  }

  /**
   * Changes the completion status of a task in the list.
   * @param {Item["id"]} id - The unique identifier of the task.
   */
  const handleChangeCompletedTask = (id: Item["id"]) => {
    const updatedList = list.map((item) =>
      item.id === id ? { ...item, completed: !item.completed } : item
    )

    const modifiedList = updatedList.sort((a, b) => {
      if (a.completed && !b.completed) return 1
      if (!a.completed && b.completed) return -1
      return 0
    })
    setList(modifiedList)
    if (localList) {
      localStorage.setItem("LOCALToDoList", JSON.stringify(modifiedList))
      toast.custom((t) => (
        <CustomToast t={t} error={false}>
          Changes have been applied.
        </CustomToast>
      ), {
        duration: 1000
      })
    } else {
      const updateItemCompletion = async () => {
        const taskToChange = list.find(task => task.id == id)
        const response = await changeCompletedTask(publicListCode, id, !taskToChange!.completed)
        if (response.ok) {
          toast.custom((t) => (
            <CustomToast t={t} error={false}>
              Changes have been applied.
            </CustomToast>
          ), {
            duration: 1000
          })
        } else {
          toast.custom((t) => (
            <CustomToast t={t} error={true}>
              Error occurred, please try again.
            </CustomToast>
          ), {
            duration: 1000
          })
        }
        await refreshList()
      }
      updateItemCompletion()
    }
  }

  /**
   * Handles the submission of the list code form.
   * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
   */
  const handleSubmitListCode = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const { elements } = event.currentTarget
    const input = elements.namedItem("listCode")
    const isInput = input instanceof HTMLInputElement
    if (!isInput || input == null) return
    const inputListCode = input.value
    const response = await getPublicList(inputListCode)
    if (!response.ok) {
      toast.custom((t) => (
        <CustomToast t={t} error={true}>
          There is no list with that code.
        </CustomToast>
      ), {
        duration: 1000
      })
      return
    }
    navigate(`/${inputListCode}`)
    setMenuOpened(false)
    toast.custom((t) => (
      <CustomToast t={t} error={false}>
        Connected to {inputListCode}
      </CustomToast>
    ), {
      duration: 1000
    })
    input.value = ""
  }

  /**
 * Converts the local list to a public list.
 */
  const handleConvertToPublic = async () => {
    if (localList) {
      if (list.length == 0) {
        toast.custom((t) => (
          <CustomToast t={t} error={true}>
            Add at least one task to the list.
          </CustomToast>
        ), {
          duration: 1000
        })
        return
      }
      const response = await fromLocalToPublicList(list)
      if (response.ok) {
        localStorage.setItem("PUBLICToDoListCode", response.newListId)
        localStorage.removeItem("LOCALToDoList")
        navigate(`/${response.newListId}`)
        setLocalList(false)
        setMenuOpened(false)
        toast.custom((t) => (
          <CustomToast t={t} error={false}>
            List public code: {response.newListId}
          </CustomToast>
        ), {
          duration: 1000
        })
      } else {
        toast.custom((t) => (
          <CustomToast t={t} error={true}>
            Error occurred while trying to make this list public, please try again.
          </CustomToast>
        ), {
          duration: 1000
        })
      }
    }
  }

  /**
 * Handles the submission of the item form.
 * @param {React.FormEvent<HTMLFormElement>} event - The form submission event.
 */
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
      localStorage.setItem("LOCALToDoList", JSON.stringify([...list, newItem]))
      setList((prevList) => {
        return [...prevList, newItem]
      })
    } else {
      setList((prevList) => {
        return [...prevList, newItem]
      })
      const addItemToList = async () => {
        const response = await addToList(publicListCode, newItem)
        if (response.ok) {
          toast.custom((t) => (
            <CustomToast t={t} error={false}>
              Task added.
            </CustomToast>
          ), {
            duration: 1000
          })
        } else {
          toast.custom((t) => (
            <CustomToast t={t} error={true}>
               Error occurred, please try again.
            </CustomToast>
          ), {
            duration: 1000
          })
        }
        await refreshList()
      }
      addItemToList()
    }
    input.value = ""
  }
  return (
    <>
      <div className={`md:flex md:items-center md:justify-center md:gap-3 bg-center bg-cover transition-all `}>
        <div className={` absolute top-3 left-3 transition-all duration-500 ease-in-out overflow-auto bg-white md:bg-opacity-60 flex items-center justify-center ${menuOpened ? "h-1/3 p-3 rounded-xl w-3/4 " : "rounded-3xl h-[6.5vh] w-[6.5vh] bg-opacity-0"} md:static md:w-fit md:h-fit md:p-7 z-30`} >
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
        <Background localList={localList} />
      </div>
    </>
  )
}

export default App





