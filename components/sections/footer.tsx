import Image from "next/image";
import React from "react";

function Footer() {
    return (
        <section className="absolute bottom-0 w-full">
            <div className="p-5 bg-white/30 sized sized-container backdrop-blur-md">
                <div className="text-white font-bold text-center tracking-wider p-3 ">
                    <h3>Copyrights &#169; 2023 | Tharuneshwar S </h3>
                </div>
                <div className="flex justify-center gap-2">
                    <div className="bg-white rounded-md w-[3rem] hover:bg-white/80">
                        <a className="cursor-pointer" target="_blank" href="https://www.linkedin.com/in/tharuneshwar-s">
                            <Image
                                alt="linkedin"
                                src={
                                    "https://static.vecteezy.com/system/resources/previews/018/930/587/large_2x/linkedin-logo-linkedin-icon-transparent-free-png.png"
                                }
                                width={100}
                                height={100}
                            />

                        </a>
                    </div>
                    <div className="bg-white rounded-md w-[3rem] hover:bg-white/80">
                        <a className="cursor-pointer" target="_blank" href="https://github.com/THARUNESHWAR-369">
                            <Image
                                alt="github"
                                src={
                                    "https://static.vecteezy.com/system/resources/previews/024/555/266/non_2x/github-logo-black-transparent-free-png.png"
                                }
                                width={100}
                                height={100}
                            />

                        </a>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default Footer;
