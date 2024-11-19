import Link from "next/link"
import { LoginButton } from "./loginButton"
import { LoginProvider } from "./loginContext"

export default function Navigation() {
    const style = "text-center px-4 transition hover:bg-sky-500"
    return (
            <nav>
                <div className="border-b-2 border-black bg-sky-200">
                    <div className="mx-auto flex flex-row">
                        <div className={style}>
                            <Link href="/home/">Home</Link>
                        </div>
                        <div className={style}>
                            <Link href="/dashboard/">Dashboard</Link>
                        </div>
                        <div className={style}>
                            <LoginButton />
                        </div>
                    </div>
                </div>
            </nav>
    )
}