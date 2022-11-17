import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

export const Fetch = (props) => {
  const [user, setUsers] = useState([]);
  const id = useLocation().pathname.split('/')[2];

  useEffect(() => {
    const cancelToken = axios.CancelToken.source();

    (async () => {
      try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users/${id}`, {
          cancelToken: cancelToken.token,
        });
        const data = await response.data;
        console.log('data', 'fetch user number', id);
      } catch (err) {
        if (axios.isCancel(err)) {
          console.log('cancelled', 'fetch user number', id);
        } else {
          console.log('other mistake');
        }
      }
    })();

    return () => {
      cancelToken.cancel();
    };
  }, [id]);
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;

  //   (async () => {
  //     try {
  //       const response = await fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
  //         signal,
  //       });
  //       const data = await response.json();
  //       console.log('data', 'fetch user number', id);
  //     } catch (err) {
  //       if (err.name === 'AbortError') {
  //         console.log('cancelled', 'fetch user number', id);
  //       } else {
  //         console.log('other mistake');
  //       }
  //     }
  //   })();

  //   return () => {
  //     // console.log('cleanup');
  //     controller.abort();
  //   };
  // }, [id]);
  // useEffect(() => {
  //   const controller = new AbortController();
  //   const signal = controller.signal;
  //   fetch(`https://jsonplaceholder.typicode.com/users/${id}`, { signal })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       console.log('data', 'fetch user number', id);
  //       // alert('You need clean up function');
  //       setUsers(data);
  //     })
  //     .catch((err) => {
  //       if (err.name === 'AbortError') {
  //         console.log('cancelled', 'fetch user number', id);
  //       } else {
  //         console.log('other mistake');
  //       }
  //     });

  //   return () => {
  //     // console.log('cleanup');
  //     controller.abort();
  //   };
  // }, [id]);

  return (
    <div>
      <p>Name: {user?.name}</p>
      <p>Username: {user?.username}</p>
      <p>Email: {user?.email}</p>
      <Link to='/users/1'>Fetch user 1</Link>
      <Link to='/users/2'>Fetch user 2</Link>
      <Link to='/users/3'>Fetch user 3</Link>
    </div>
  );
};

// useEffect(() => {
//   fetch('https://jsonplaceholder.typicode.com/users/')
//     .then((res) => res.json())
//     .then((data) => {
//       console.log('data');
//       // alert('You need clean up function');
//       setPosts(data);
//     });

//   return () => {
//     console.log('cleanup');
//   };
// }, []);
