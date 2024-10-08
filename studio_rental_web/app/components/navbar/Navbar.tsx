'use client';

import Container from "../Container";
import Categories from "./Categories";
import Logo from "./logo"; // Ensure the file name matches the case
import { Search } from "./Search";
import UserMenu from "./UserMenu";
import React from 'react';

import { SafeUser } from '@/app/types';

interface NavbarProps {
    currentUser?: SafeUser | null;
}

const Navbar: React.FC<NavbarProps> = ({ currentUser }) => {
    return (
        <div className="fixed w-full bg-white z-10 shadow-sm">
            <div className="py-4 border-b-[1px]">
                <Container>
                    <div className="flex flex-row items-center justify-between gap-3 md:gap-0">
                        <Logo />
                        <Search />
                        <div className="flex items-center px-7">
                            <span className="font-bold  ">Welcome </span>
                            <span className="ml-1 text-gray-500">{currentUser?.name || 'Guest'}</span>
                        </div>
                        <UserMenu currentUser={currentUser} />
                    </div>
                </Container>
            </div>
            <Categories />
        </div>
    );
}

export default Navbar;
