import Link from "next/link";

export const PrimaryLink = ({content, href}) =>{
    return(
        <Link
            href={href}
            className="rounded-xl px-6 py-3 bg-primary text-secondary font-bold w-full"
        >
           {content}
        </Link>
    )
}