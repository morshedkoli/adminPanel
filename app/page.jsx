import Link from "next/link"
import { redirect } from "next/navigation"

// TODO
const Homepage = () => {

  
    redirect('/dashboard')
  


  return (
    <div >
      
    <Link href="/login">Login</Link>

    </div>
  )
}

export default Homepage