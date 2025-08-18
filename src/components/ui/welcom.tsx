import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import nhc from "@/assets/nhc.png"

export const Welcome = () => {
  const navigate = useNavigate()

  return (
    <nav
      className="sticky top-0 z-50 w-full h-16 bg-cover bg-center bg-no-repeat border-b border-border/40 flex items-center px-4"
      style={{ backgroundImage: `url(${nhc})` }}
    >
      <Button
        variant="outline"
 className="h-8 px-5 flex items-center justify-center text-md font-medium"        onClick={() => navigate(-1)}
      >المتابعة كضيف      </Button>
    </nav>
  )
}

export default Welcome
