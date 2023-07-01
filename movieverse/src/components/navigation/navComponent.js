

export const NavComponent = () => {
    return (
        <div className="nav w-full p-1 flex align-middle justify-between items-center pt-8">
            <div className="appName pl-10">
                <a href="/" className="myAppName text-4xl">MOVIE VERSE</a>
            </div>
            <div className="search-bar pr-10">
                <input placeholder="Search" className="search-bar-input border-none outline-none rounded-[50px] pl-[13px] p-[0.35rem] w-[20rem] backdrop-blur-md tracking-wider font-semibold text-white"></input>
                <span className="relative right-[30px] cursor-pointer text-white hover:text-white"><i className="fa fa-search"></i></span>
                <div className="searchResult">
                    
                </div>
            </div>
        </div>
    );
}; 