import Link from "next/link"
import { LoginButton } from "./loginButton"

export default function Navigation() {
    const style = "text-center text-2xl p-2 px-4 transition hover:bg-sky-500"
    return (
            <nav>
                <div className="border-b-2 border-black bg-sky-200">
                    <div className="mx-auto flex flex-row">
                        <div>
                            <Link href="/home/" className={style}>Home</Link>
                        </div>
                        <div>
                            <Link href="/dashboard/" className={style}>Dashboard</Link>
                        </div>
                        <div>
                            <LoginButton />
                        </div>
                    </div>
                </div>
            </nav>
    )
}