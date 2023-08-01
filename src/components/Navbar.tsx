"use client";

import Link from "next/link";
import Image from "next/image";
import { Database } from "../app/database.types";
type Profiles = Database["public"]["Tables"]["profiles"]["Row"];
import { useAvatarStore } from "@/store/avatarStore";

const Navbar = ({ username }: { username: Profiles["username"] }) => {
  const { navAvatarUrl } = useAvatarStore();

  return (
    <div className="navbar bg-base-100 mx-auto w-full md:w-1/2 rounded-lg border-4 mb-10">
      <div className="flex-1">
        <a className="btn btn-ghost normal-case text-xl">{`${username}'s LinkVault`}</a>
      </div>

      <div className="dropdown dropdown-end">
        <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
          <div className=" rounded-full">
            {navAvatarUrl ? (
              <img
                className="rounded-full w-[58px] h-[58px] object-cover"
                src={navAvatarUrl}
                alt="Avatar"
              />
            ) : (
              <svg
                className="h-20 w-20 text-gray-300 "
                viewBox="0 0 24 24"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </div>
        </label>
        <ul
          tabIndex={0}
          className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
        >
          <li>
            <Link href="/account">Account</Link>
          </li>
        </ul>
      </div>

      {/* {navAvatarUrl ? (
        <img
          className="rounded-full w-[58px] h-[58px] object-cover"
          src={navAvatarUrl}
          alt="Avatar"
        />
      ) : (
        <svg
          className="h-20 w-20 text-gray-300 "
          viewBox="0 0 24 24"
          fill="currentColor"
          aria-hidden="true"
        >
          <path
            fillRule="evenodd"
            d="M18.685 19.097A9.723 9.723 0 0021.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 003.065 7.097A9.716 9.716 0 0012 21.75a9.716 9.716 0 006.685-2.653zm-12.54-1.285A7.486 7.486 0 0112 15a7.486 7.486 0 015.855 2.812A8.224 8.224 0 0112 20.25a8.224 8.224 0 01-5.855-2.438zM15.75 9a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z"
            clipRule="evenodd"
          />
        </svg>
      )} */}

      {/* <Image
        src={
          navAvatarUrl ||
          "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png"
        }
        width={10}
        height={10}
        alt="Profile Picture"
      /> */}
    </div>
  );
};

export default Navbar;
