import { Toaster as Sonner, toast } from "sonner"

type ToasterProps = React.ComponentProps<typeof Sonner>

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-pastel-pink-700 group-[.toaster]:border-pastel-pink-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-pastel-pink-600",
          actionButton:
            "group-[.toast]:bg-pastel-pink-500 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-pastel-pink-50 group-[.toast]:text-pastel-pink-700",
          success: "group-[.toaster]:!text-pastel-pink-700",
          error: "group-[.toaster]:!text-pastel-pink-700",
        },
      }}
      style={
        {
          "--normal-bg": "#ffffff",
          "--normal-text": "#831843",
          "--normal-border": "#fbcfe8",
          "--success-bg": "#fdf2f8",
          "--success-text": "#be185d",
          "--success-border": "#fbcfe8",
          "--error-bg": "#ffffff",
          "--error-text": "#be185d",
          "--error-border": "#fbcfe8",
ождо
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster, toast }
