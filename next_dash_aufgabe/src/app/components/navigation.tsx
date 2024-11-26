import Link from "next/link"
import { LoginButton } from "./loginButton"
import { styleNav } from "../styles/styles"

export default function Navigation() {
    const style = styleNav;
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