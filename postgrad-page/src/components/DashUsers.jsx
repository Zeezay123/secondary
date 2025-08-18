import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeadCell,
  TableRow,
  Modal,
  ModalBody,
  ModalHeader,
} from "flowbite-react";
import React from "react";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { HiCheck, HiOutlineExclamationCircle } from "react-icons/hi";
import { FaTimes, FaCheck } from "react-icons/fa";

const DashUsers = () => {
  const [users, setUsers] = useState([]);
  const { currentUser } = useSelector((state) => state.user);
  const [showMore, setShowMore] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [userIdToDelete, setUserIdToDelete] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        console.log('Fetching users...');
        const res = await fetch("/api/users/getusers");
        
        console.log('Response status:', res.status);
        
        if (!res.ok) {
          console.error('API response not ok:', res.status, res.statusText);
          setUsers([]);
          setShowMore(false);
          return;
        }

        const responseText = await res.text();
        console.log('Raw response:', responseText);
        
        if (responseText) {
          const data = JSON.parse(responseText);
          console.log('Parsed data:', data);
          
          if (data.users && Array.isArray(data.users)) {
            setUsers(data.users);
            if (data.users.length < 5) {
              setShowMore(false);
            }
          } else {
            console.log('No users array in response');
            setUsers([]);
            setShowMore(false);
          }
        } else {
          console.log('Empty response');
          setUsers([]);
          setShowMore(false);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
        setUsers([]);
        setShowMore(false);
      }
    };

    if (currentUser && currentUser.isAdmin) {
      fetchUsers();
    }
  }, [currentUser]);

  const handleShowMore = async () => {
    const startIndex = users.length;
    try {
      const res = await fetch(`/api/users/getusers?startIndex=${startIndex}`);
      const data = await res.json();

      if (res.ok) {
        setUsers((prev) => [...prev, ...data.users]);
        console.log(data);

        if (data.users.length < 5) {
          setShowMore(false);
        }
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  // const handleDelete= async ()=>{
  //   setShowModal(false)
  //  try {
  //   const res = await fetch(`/api/user/deleteuser/${userIdToDelete}/${currentUser._id}`, {
  //     method:"DELETE",
  //      headers:{
  //       'Content-Type':'application/json'
  //     },
  //   })

  //   const data = res.json()
  // if(!res.ok){
  //   console.log(data.message)
  // }else {
  //    setUsers((prev) => prev.filter((user)=>post.id !== postIdToDelete))
  // }
  //  } catch (error) {
  //   console.log(error)
  //  }

  // }

  const handleDelete = async () => {
    setShowModal(false);
    try {
      const res = await fetch(`/api/users/delete/${userIdToDelete}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json'
        },
      });

      const data = await res.json();
      if (res.ok) {
        // Fix: Return the filtered array
        setUsers((prev) => prev.filter((user) => user._id !== userIdToDelete));
        console.log('User deleted successfully');
      } else {
        console.log('Delete failed:', data.message);
      }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };





  return (
    <div
      className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar 
    scrollbar-track-slate-100 scrollbar-thumb-amber-400 dark:scrollbar-track-slate-700
    dark:scrollbar-thumb-slate-500"
    >
      {currentUser && currentUser.isAdmin && users && users.length > 0 ? (
        <>
          <Table className="shadow-md" hoverable>
            <TableHead>
              <TableHeadCell>Date Created </TableHeadCell>
              <TableHeadCell>User image</TableHeadCell>
              <TableHeadCell>Username</TableHeadCell>
              <TableHeadCell>Email</TableHeadCell>
              <TableHeadCell>Admin</TableHeadCell>
              <TableHeadCell>

                <span> Delete</span>
              </TableHeadCell>
            </TableHead>

            {users.map((user, index) => (
              <TableBody className="divide-y" key={index}>
                <TableRow
                  key={user._id}
                  className="bg-white dark:border-gray-700 dark:bg-gray-800"
                >
                  <TableCell>
                    {new Date(user.createdAt).toLocaleDateString()}
                  </TableCell>
                  <TableCell>
                    <img
                      src={user.profilePhoto}
                      alt={user.username}
                      className="w-10 h-10 object-cover rounded-full bg-gray-500"
                    />
                  </TableCell>
                  <TableCell>{user.username}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    {user.isAdmin ? (
                      <FaCheck color="green" />
                    ) : (
                      <FaTimes color="red" />
                    )}
                  </TableCell>

                  <TableCell>
                    <span
                      onClick={() => {
                        setShowModal(true);
                        setUserIdToDelete(user._id);
                      }}
                      className="font-medium text-red-500 hover:underline cursor-pointer"
                    >
                      Delete
                    </span>
                  </TableCell>
                </TableRow>{" "}
              </TableBody>
            ))}
          </Table>
          {showMore && (
            <button
              onClick={handleShowMore}
              className="w-full text-blue-600 self-center text-sm py-7"
            >
              Show more
            </button>
          )}
        </>
      ) : (
        <div> no user yet </div>
      )}

      <Modal
        show={showModal}
        onClose={() => setShowModal(false)}
        popup
        size="md"
      >
        <ModalHeader />
        <ModalBody>
          <div className="tect-center flex flex-col items-center justify-center">
            <HiOutlineExclamationCircle
              className="h-14 w-14 text-gray-400
   dark:text-gray200 mb-4 mx auto"
            />

            <h3 className="mb-5 text-lg text-gray-500 dark:text-gray-400">
              Are you sure?
            </h3>

            <div className="flex gap-5 items-center">
              <Button color="red" onClick={handleDelete}>
                {" "}
                Yes am sure!
              </Button>

              <Button color="gray" onClick={() => setShowModal(false)}>
                No,Cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </div>
  );
};

export default DashUsers;
