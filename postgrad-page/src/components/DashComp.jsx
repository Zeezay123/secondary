import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { 
  HiOutlineUserGroup, 
  HiDocumentText, 
  HiAnnotation, 
  HiArrowNarrowUp,
  HiCurrencyDollar,
  HiOutlineAcademicCap,
  HiOutlineClipboardList,
  HiOutlineNewspaper
} from 'react-icons/hi';
import { Button, Table, TableBody, TableCell, TableHead, TableHeadCell, TableRow } from 'flowbite-react';
import { Link } from 'react-router-dom';

const DashComp = () => {
  const [users, setUsers] = useState([]);
  const [posts, setPosts] = useState([]);
  const [payments, setPayments] = useState([]);
  const [applications, setApplications] = useState([]);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalPosts, setTotalPosts] = useState(0);
  const [totalPayments, setTotalPayments] = useState(0);
  const [totalApplications, setTotalApplications] = useState(0);
  const [lastMonthUsers, setLastMonthUsers] = useState(0);
  const [lastMonthPosts, setLastMonthPosts] = useState(0);
  const [lastMonthPayments, setLastMonthPayments] = useState(0);
  const [lastMonthApplications, setLastMonthApplications] = useState(0);
  const [loading, setLoading] = useState(true);

  const { currentUser } = useSelector((state) => state.user);

  useEffect(() => {
    const fetchData = async () => {
      if (currentUser && currentUser.isAdmin) {
        setLoading(true);
        try {
          // Fetch all data in parallel
          await Promise.all([
            fetchUsers(),
            fetchPosts(),
            fetchPayments(),
            fetchApplications()
          ]);
        } catch (error) {
          console.error('Error fetching dashboard data:', error);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [currentUser]);

  const fetchUsers = async () => {
    try {
      const res = await fetch('/api/users/getusers?limit=5');
      if (res.ok) {
        const data = await res.json();
        if (data.users) {
          setUsers(data.users);
          setTotalUsers(data.totalUsers || data.users.length);
          setLastMonthUsers(data.lastMonthUsers || 0);
        }
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/post/getposts?limit=5');
      if (res.ok) {
        const responseText = await res.text();
        if (responseText) {
          const data = JSON.parse(responseText);
          if (data.posts) {
            setPosts(data.posts);
            setTotalPosts(data.totalPosts || data.posts.length);
            setLastMonthPosts(data.lastMonthPosts || 0);
          }
        }
      }
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const fetchPayments = async () => {
    try {
      const res = await fetch('/api/payment/recent?limit=5');
      if (res.ok) {
        const data = await res.json();
        if (data.payments) {
          setPayments(data.payments);
          setTotalPayments(data.totalPayments || data.payments.length);
          setLastMonthPayments(data.lastMonthPayments || 0);
        }
      }
    } catch (error) {
      console.error('Error fetching payments:', error);
    }
  };

  const fetchApplications = async () => {
    try {
      const res = await fetch('/api/form/getall?limit=5');
      if (res.ok) {
        const data = await res.json();
        if (data.applications) {
          setApplications(data.applications);
          setTotalApplications(data.totalApplications || data.applications.length);
          setLastMonthApplications(data.lastMonthApplications || 0);
        }
      }
    } catch (error) {
      console.error('Error fetching applications:', error);
    }
  };

  if (loading) {
    return (
      <div className='flex justify-center items-center min-h-screen'>
        <div className='text-xl text-gray-500'>Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className='p-3 md:p-6'>
      {/* Welcome Section */}
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-800 dark:text-white mb-2'>
          Welcome back, {currentUser?.username || 'Admin'}!
        </h1>
        <p className='text-gray-600 dark:text-gray-400'>
          Here's what's happening with your school website today.
        </p>
      </div>

      {/* Stats Cards */}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8'>
        {/* Total Users Card */}
        <div className='flex flex-col p-5 bg-white dark:bg-slate-800 gap-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold'>
                Total Users
              </h3>
              <p className='text-3xl font-bold text-gray-800 dark:text-white mt-2'>
                {totalUsers}
              </p>
            </div>
            <HiOutlineUserGroup className='bg-teal-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          {lastMonthUsers > 0 && (
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthUsers}
              </span>
              <span className='text-gray-500 dark:text-gray-400'>Last month</span>
            </div>
          )}
          <Link 
            to='/dashboard?tab=users' 
            className='text-teal-600 hover:text-teal-700 text-sm font-medium hover:underline'
          >
            View all users
          </Link>
        </div>

        {/* Total Posts Card */}
        <div className='flex flex-col p-5 bg-white dark:bg-slate-800 gap-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold'>
                Total Posts
              </h3>
              <p className='text-3xl font-bold text-gray-800 dark:text-white mt-2'>
                {totalPosts}
              </p>
            </div>
            <HiDocumentText className='bg-lime-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          {lastMonthPosts > 0 && (
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthPosts}
              </span>
              <span className='text-gray-500 dark:text-gray-400'>Last month</span>
            </div>
          )}
          <Link 
            to='/dashboard?tab=posts' 
            className='text-lime-600 hover:text-lime-700 text-sm font-medium hover:underline'
          >
            View all posts
          </Link>
        </div>

        {/* Total Payments Card */}
        <div className='flex flex-col p-5 bg-white dark:bg-slate-800 gap-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold'>
                Total Payments
              </h3>
              <p className='text-3xl font-bold text-gray-800 dark:text-white mt-2'>
                {totalPayments}
              </p>
            </div>
            <HiCurrencyDollar className='bg-indigo-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          {lastMonthPayments > 0 && (
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthPayments}
              </span>
              <span className='text-gray-500 dark:text-gray-400'>Last month</span>
            </div>
          )}
          <Link 
            to='/dashboard?tab=payment' 
            className='text-indigo-600 hover:text-indigo-700 text-sm font-medium hover:underline'
          >
            View all payments
          </Link>
        </div>

        {/* Total Applications Card */}
        <div className='flex flex-col p-5 bg-white dark:bg-slate-800 gap-4 rounded-lg shadow-md border border-gray-200 dark:border-gray-700'>
          <div className='flex justify-between items-center'>
            <div>
              <h3 className='text-gray-500 dark:text-gray-400 text-sm uppercase font-semibold'>
                Applications
              </h3>
              <p className='text-3xl font-bold text-gray-800 dark:text-white mt-2'>
                {totalApplications}
              </p>
            </div>
            <HiOutlineClipboardList className='bg-pink-600 text-white rounded-full text-5xl p-3 shadow-lg' />
          </div>
          {lastMonthApplications > 0 && (
            <div className='flex items-center gap-2 text-sm'>
              <span className='text-green-500 flex items-center'>
                <HiArrowNarrowUp />
                {lastMonthApplications}
              </span>
              <span className='text-gray-500 dark:text-gray-400'>Last month</span>
            </div>
          )}
          <Link 
            to='/dashboard?tab=application' 
            className='text-pink-600 hover:text-pink-700 text-sm font-medium hover:underline'
          >
            View all applications
          </Link>
        </div>
      </div>

      {/* Recent Data Tables */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8'>
        {/* Recent Users */}
        <div className='flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden'>
          <div className='flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700'>
            <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Recent Users</h2>
            <Link to='/dashboard?tab=users'>
              <Button size='sm' outline gradientDuoTone='purpleToPink'>
                View All
              </Button>
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <Table hoverable>
              <TableHead className='flex'>
                <TableHeadCell>User Image</TableHeadCell>
                <TableHeadCell>Username</TableHeadCell>
                <TableHeadCell>Email</TableHeadCell>
              </TableHead>
              <TableBody className='divide-y'>
                {users && users.length > 0 ? (
                  users.map((user) => (
                    <TableRow key={user._id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <TableCell>
                        <img
                          src={user.profilePhoto}
                          alt={user.username}
                          className='w-10 h-10 rounded-full bg-gray-500 object-cover'
                        />
                      </TableCell>
                      <TableCell className='font-medium text-gray-900 dark:text-white'>
                        {user.username}
                      </TableCell>
                      <TableCell className='text-gray-500 dark:text-gray-400'>
                        {user.email}
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className='text-center text-gray-500'>
                      No users yet!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>

        {/* Recent Posts */}
        <div className='flex flex-col bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 overflow-hidden'>
          <div className='flex justify-between items-center p-4 border-b border-gray-200 dark:border-gray-700'>
            <h2 className='text-xl font-semibold text-gray-800 dark:text-white'>Recent Posts</h2>
            <Link to='/dashboard?tab=posts'>
              <Button size='sm' outline gradientDuoTone='purpleToPink'>
                View All
              </Button>
            </Link>
          </div>
          <div className='overflow-x-auto'>
            <Table hoverable>
              <TableHead className='flex'>
                <TableHeadCell>Post Image</TableHeadCell>
                <TableHeadCell>Post Title</TableHeadCell>
                <TableHeadCell>Category</TableHeadCell>
              </TableHead>
              <TableBody className='divide-y'>
                {posts && posts.length > 0 ? (
                  posts.map((post) => (
                    <TableRow key={post.id} className='bg-white dark:border-gray-700 dark:bg-gray-800'>
                      <TableCell>
                        <img
                          src={post.image}
                          alt={post.title}
                          className='w-14 h-10 rounded-md bg-gray-500 object-cover'
                        />
                      </TableCell>
                      <TableCell className='font-medium text-gray-900 dark:text-white line-clamp-2'>
                        {post.title}
                      </TableCell>
                      <TableCell>
                        <span className='px-2 py-1 text-xs font-semibold text-white bg-blue-600 rounded-full'>
                          {post.category}
                        </span>
                      </TableCell>
                    </TableRow>
                  ))
                ) : (
                  <TableRow>
                    <TableCell colSpan={3} className='text-center text-gray-500'>
                      No posts yet!
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className='bg-white dark:bg-slate-800 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 p-6'>
        <h2 className='text-xl font-semibold text-gray-800 dark:text-white mb-4'>Quick Actions</h2>
        <div className='grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4'>
          <Link to='/dashboard?tab=posts'>
            <Button className='w-full' gradientDuoTone='purpleToBlue'>
              <HiOutlineNewspaper className='mr-2 h-5 w-5' />
              Posts
            </Button>
          </Link>
          <Link to='/dashboard?tab=users'>
            <Button className='w-full' gradientDuoTone='cyanToBlue'>
              <HiOutlineUserGroup className='mr-2 h-5 w-5' />
              Users
            </Button>
          </Link>
          {/* <Link to='/dashboard?tab=course'>
            <Button className='w-full' gradientDuoTone='greenToBlue'>
              <HiOutlineAcademicCap className='mr-2 h-5 w-5' />
              Courses
            </Button>
          </Link> */}
          <Link to='/dashboard?tab=announce'>
            <Button className='w-full' gradientDuoTone='pinkToOrange'>
              <HiAnnotation className='mr-2 h-5 w-5' />
              Announcements
            </Button>
          </Link>
          <Link to='/dashboard?tab=staff'>
            <Button className='w-full' gradientDuoTone='purpleToPink'>
              <HiOutlineUserGroup className='mr-2 h-5 w-5' />
              Staff
            </Button>
          </Link>
          <Link to='/dashboard?tab=payment'>
            <Button className='w-full' gradientDuoTone='tealToLime'>
              <HiCurrencyDollar className='mr-2 h-5 w-5' />
              Payments
            </Button>
          </Link>
          <Link to='/dashboard?tab=application'>
            <Button className='w-full' gradientDuoTone='redToYellow'>
              <HiOutlineClipboardList className='mr-2 h-5 w-5' />
              Applications
            </Button>
          </Link>
          <Link to='/dashboard?tab=alumni'>
            <Button className='w-full' gradientDuoTone='purpleToBlue'>
              <HiOutlineUserGroup className='mr-2 h-5 w-5' />
              Alumni
            </Button>
          </Link>
          <Link to='/dashboard?tab=teach'>
            <Button className='w-full' gradientDuoTone='cyanToBlue'>
              <HiOutlineUserGroup className='mr-2 h-5 w-5' />
              Teachers
            </Button>
          </Link>
          <Link to='/dashboard?tab=prefects'>
            <Button className='w-full' gradientDuoTone='greenToBlue'>
              <HiOutlineUserGroup className='mr-2 h-5 w-5' />
              Prefects
            </Button>
          </Link>
          <Link to='/dashboard?tab=faq'>
            <Button className='w-full' gradientDuoTone='pinkToOrange'>
              <HiAnnotation className='mr-2 h-5 w-5' />
              FAQ
            </Button>
          </Link>
          <Link to='/dashboard?tab=contact'>
            <Button className='w-full' gradientDuoTone='purpleToPink'>
              <HiAnnotation className='mr-2 h-5 w-5' />
              Contact
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default DashComp;