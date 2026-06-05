import Image from "next/image";
import Link from "next/link";

import LogoImg from "@/public/Logo.png";

export default function Logo() {
    return (
        <Link href="/" className="flex items-center">
            <Image
                src={LogoImg}
                alt="Logo"
                className="w-15 object-contain"
                priority
            />
        </Link>
    );
}
