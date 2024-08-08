import { Outlet } from "react-router-dom"
import Header from "../components/Header"
import Modal from "../components/Modal"
import { useEffect } from "react"
import { useAppStore } from "../stores/useAppStore"
import Notification from "../components/Notification"

export default function Layout() {
  const loadFromStorage=useAppStore((state) => state.loadFromStorage)
  //const notification=useAppStore((state) => state.notification)

  useEffect(() => {
    loadFromStorage()
  }, [])
  return (
    <div>
        <Header />
        <main className="container mx-auto py-16">
            <Outlet />
        </main>
       <Modal />
       <Notification />
    </div>
  )
}
