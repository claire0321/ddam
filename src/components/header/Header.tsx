import React from "react";

import Logo from "./Logo";
import Searchbar from "./Searchbar";
import MyPageBtn from "../button/MyPageBtn";
import LoginBtn from "../button/LoginBtn";

// export default function Header({ value, onChange }: Props) {
export default function Header() {
    return (
        <header className="grid grid-cols-[4rem_1fr_auto_auto] items-center justify-stretch px-3 py-5 gap-5">
            <Logo />
            {/* <Searchbar value={value} onChange={onChange} /> */}
            <Searchbar />
            <MyPageBtn />
            <LoginBtn />
        </header>
    );
}
