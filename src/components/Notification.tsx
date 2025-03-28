import { Fragment } from 'react'
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/20/solid'
import { Transition } from '@headlessui/react'
import { useAppStore } from '../stores/useAppStore'

export default function Notification() {
  const notification = useAppStore((state) => state.notification)
  const hideNotification = useAppStore((state) => state.hideNotification)

  return (
    <div
      aria-live="assertive"
      className="pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-50"
    >
      <div className="flex w-full flex-col items-center space-y-4 sm:items-end">
        <Transition
          show={notification.show}
          as={Fragment}
          enter="transform ease-out duration-300 transition"
          enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
          enterTo="translate-y-0 opacity-100 sm:translate-x-0"
          leave="transition ease-in duration-100"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="pointer-events-auto w-full max-w-sm overflow-hidden rounded-xl bg-cream shadow-2xl ring-1 ring-darkTeal/10">
            <div className="p-4">
              <div className="flex items-start">
                <div className="flex-shrink-0">
                  {notification.error ? (
                    <div className="rounded-full bg-red-100 p-1">
                      <XCircleIcon className="h-6 w-6 text-red-500" aria-hidden="true" />
                    </div>
                  ) : (
                    <div className="rounded-full bg-green-100 p-1">
                      <CheckCircleIcon className="h-6 w-6 text-green-500" aria-hidden="true" />
                    </div>
                  )}
                </div>
                <div className="ml-3 w-0 flex-1 pt-0.5">
                  <p className="text-sm font-semibold text-darkTeal">
                    {notification.error ? 'Error' : 'Éxito'}
                  </p>
                  <p className="mt-1 text-sm text-teal/80">{notification.text}</p>
                </div>
                <div className="ml-4 flex flex-shrink-0">
                  <button
                    type="button"
                    className="inline-flex rounded-full p-1 text-darkTeal/70 hover:text-darkTeal focus:outline-none focus:ring-2 focus:ring-teal focus:ring-offset-2 transition-colors duration-200"
                    onClick={hideNotification}
                  >
                    <span className="sr-only">Cerrar</span>
                    <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Transition>
      </div>
    </div>
  )
}