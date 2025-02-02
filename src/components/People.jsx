import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Search from "./partials/Search";
import Card from "./partials/Card";
import DropDown from "./partials/DropDown";
import axios from "../utils/axios";
import Loading from "./partials/Loading";
import InfiniteScroll from "react-infinite-scroll-component";
import { IoMdArrowRoundBack } from "react-icons/io";

function People() {
    const navigation = useNavigate();

    const [data, setData] = useState([]);
    const [page, setPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const filterApi = async (reset = false) => {
        try {
            const { data } = await axios.get(`trending/person/week?page=${page}`);

            if (data.results.length > 0) {
                setData((prev) => (reset ? [...data.results] : [...prev, ...data.results]));
                setPage((prev) => (reset ? 2 : prev + 1));
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.log("Error: " + error);
        }
    };


    useEffect(() => {
        setData([]);
        setPage(1);
        filterApi(true);
    }, []);

    return (
        <div className="h-screen w-full bg-[#001E2F] text-white">
            <nav className="flex items-center px-3 justify-between">
                <button
                    onClick={() => navigation(-1)}
                    className="py-2 hidden sm:block px-6 rounded bg-[#003959] cursor-pointer"
                >
                    Back
                </button>
                <div className="h-7 w-7 bg-[#003959] rounded-full flex items-center justify-center md:hidden">
                    <IoMdArrowRoundBack onClick={() => navigation(-1)} size={17} />
                </div>
                <Search />
            </nav>

            <div className="px-3 flex items-center mt-10 gap-2"></div>
            <InfiniteScroll
                dataLength={data.length}
                next={filterApi}
                hasMore={hasMore}
                loader={<Loading />}
            >
                <div className="flex items-center justify-center gap-5 mt-2 flex-wrap overflow-y-auto bg-[#001E2F] px-2">
                    {data.length === 0 ? (
                        <Loading />
                    ) : (
                        data.map((item, idx) => <Card data={item} key={idx} title="people" />)
                    )}
                </div>
            </InfiniteScroll>
        </div>
    );
}

export default People;
