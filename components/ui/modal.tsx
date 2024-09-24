"use client"

import { Dispatch, SetStateAction } from "react"
import { FocusScope } from "@radix-ui/react-focus-scope"
import {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"

type FocusScopeProps = React.ComponentPropsWithoutRef<typeof FocusScope>

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog"
import { useMediaQuery } from "@/hooks/use-media-query"
import { cn } from "@/lib/utils"

interface ModalProps {
  children: React.ReactNode
  className?: string
  showModal?: boolean
  setShowModal?: Dispatch<SetStateAction<boolean>>
  onClose?: () => void
  desktopOnly?: boolean
  onOpenAutoFocus?: FocusScopeProps["onMountAutoFocus"]
  preventDefaultClose?: boolean
}

export function Modal({
  children,
  className,
  showModal,
  setShowModal,
  onClose,
  desktopOnly,
  onOpenAutoFocus,
  preventDefaultClose,
}: ModalProps) {
  // const router = useRouter();

  const closeModal = ({ dragged }: { dragged?: boolean } = {}) => {
    if (preventDefaultClose && !dragged) {
      return
    }
    // fire onClose event if provided
    onClose && onClose()

    // if setShowModal is defined, use it to close modal
    if (setShowModal) {
      setShowModal(false)
    }
    // else, this is intercepting route @modal
    // else {
    // router.back();
    // }
  }
  const { isMobile } = useMediaQuery()

  if (isMobile && !desktopOnly) {
    return (
      <Drawer
        open={setShowModal ? showModal : true}
        onOpenChange={(open) => {
          if (!open) {
            closeModal({ dragged: true })
          }
        }}
      >
        <DrawerOverlay className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm" />
        <DrawerPortal>
          <DrawerContent
            className={cn(className && className)}
            onOpenAutoFocus={onOpenAutoFocus || ((e) => e.preventDefault())}
          >
            {children}
          </DrawerContent>
        </DrawerPortal>
      </Drawer>
    )
  }
  return (
    <Dialog
      open={setShowModal ? showModal : true}
      onOpenChange={(open) => {
        if (!open) {
          closeModal()
        }
      }}
    >
      <DialogContent
        onOpenAutoFocus={(e) => e.preventDefault()}
        onCloseAutoFocus={(e) => e.preventDefault()}
        className={cn(
          "overflow-hidden md:max-w-5xl md:rounded-lg md:border",
          className
        )}
      >
        {" "}
        <DialogTitle className="sr-only">Modal</DialogTitle>
        <DialogDescription className="sr-only"> Modal Dialog</DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  )
}
