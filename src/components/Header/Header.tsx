import type { ReactNode } from "react"
import Navbar from "../Navbar/Navbar"

export default function Header({ children }: { children?: ReactNode }) {
  return (
    <Navbar>
      {children}
    </Navbar>
  )
}