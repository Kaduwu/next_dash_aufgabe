"use client";
import { useLoginUpdate } from "../components/loginContext";


export default function MainLayout({
    children,
  }: Readonly<{
    children: React.ReactNode;
  }>) {
    const toggleLogin = useLoginUpdate();
    return (
        <>  
            {children}
        </>
    )
}