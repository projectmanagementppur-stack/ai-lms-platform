"use client"
import {  SelectedChapterIndexContext } from '@/context/SelectedChapterIndexContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { useUser } from '@clerk/nextjs'
import axios from 'axios';
import React, { useEffect, useState } from 'react'

const Provider = ({ children }) => {

    const { user } = useUser();
    const [userDetail, setUserDetail] = useState();
    const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

    useEffect(() => {
        user && createNewUser();
    }, [user])
    const createNewUser = async () => {
        const result = await axios.post('/api/user', {
            name: user?.fullName,
            email: user?.primaryEmailAddress?.emailAddress
        });
        setUserDetail(result.data);
    }

    return (
        <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
            <SelectedChapterIndexContext.Provider value={{selectedChapterIndex,setSelectedChapterIndex}}>
                <div>
                    {children}
                </div>
            </SelectedChapterIndexContext.Provider>
        </UserDetailContext.Provider>
    )
}

export default Provider
