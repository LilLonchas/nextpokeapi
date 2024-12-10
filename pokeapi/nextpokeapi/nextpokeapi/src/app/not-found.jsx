"use client"
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Error() {
    const router = useRouter();

    return (
        <>
        <div>
            <img src="/008-404page_4x.png" alt="" />
            <a href="/"><button> Botón vuelta a inicio    </button></a>
        </div>
        
        </>
    );
}