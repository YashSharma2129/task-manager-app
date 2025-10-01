import { Toaster as SonnerComp } from "sonner"

type SonnerProps = React.ComponentProps<typeof SonnerComp>

const SonnerGlobal = ({ ...props }: SonnerProps) => {
  return (
    <SonnerComp
      theme="light"
      className="toaster group"
      duration={3000}
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-background group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-muted-foreground",
          actionButton:
            "group-[.toast]:bg-primary group-[.toast]:text-primary-foreground",
          cancelButton:
            "group-[.toast]:bg-muted group-[.toast]:text-muted-foreground",
        },
      }}
      {...props}
    />
  )
}

export default SonnerGlobal
