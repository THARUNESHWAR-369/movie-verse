"use client";

import Link from "next/link";
import { useState, useEffect } from "react";


export default function Navbar() {
    const [scrolling, setScrolling] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 0) {
                setScrolling(true);
            } else {
                setScrolling(false);
            }
        };

        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <nav className={`w-full fixed top-0 z-10 ${scrolling ? "bg-black" : ""}`}>
            <div className="nav-container w-full py-4 flex justify-between sized-container items-center">
                <div>
                    <h1><Link className="bg-gradient-to-r from-[#ed213a] to-[#93291e] text-transparent bg-clip-text font-extrabold tracking-wider uppercase text-[1.8rem] cursor-pointer" href="/">Movie Verse</Link></h1>
                </div>
                <div className="nav-input-container">
                    <div className="rounded-full flex gap-1 backdrop-blur-md p-1 text-white bg-white/30">
                        <input className="outline-none border-none p-[0.2rem] w-[18rem] text-sm bg-transparent text-white pl-3" placeholder="search..."/>
                        <span className="material-icons-outlined p-2 cursor-pointer bg-gradient-to-r from-[#ed213a] to-[#93291e] rounded-full text-[1.1rem]">
                            search
                        </span>
                    </div>
                </div>
            </div>
        </nav>
    );
}