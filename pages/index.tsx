import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import toast from 'react-hot-toast'

import Loader from "../components/Loader"
import { firestore, fromMillis, postToJSON } from '../lib/firebase'
import { useState } from 'react'
import PostFeed from '../components/PostFeed'
import { Post } from '../lib/types'
import Metatags from '../components/Metatags'

// Max post to query per page
const LIMIT = 10;

export async function getServerSideProps(context) {
  const postsQuery = firestore
    .collectionGroup('posts')
    .where('published', '==', true)
    .orderBy('createdAt', 'desc')
    .limit(LIMIT);

  const posts: Post[] = (await postsQuery.get()).docs.map(postToJSON);

  return {
    props: { posts }, // will be passed to the page component as props
  };
}

export default function Home(props: {posts: Post[]}) {
  const [posts, setPosts] = useState(props.posts);
  const [loading, setLoading] = useState(false);

  const [postsEnd, setPostsEnd] = useState(props.posts.length < LIMIT);

  const getMorePosts = async () => {
    setLoading(true);
    const last: Post = posts[posts.length - 1];

    const cursor = typeof last.createdAt === 'number' ? fromMillis(last.createdAt) : last.createdAt;

    const query = firestore
      .collectionGroup('posts')
      .where('published', '==', true)
      .orderBy('createdAt', 'desc')
      .startAfter(cursor)
      .limit(LIMIT);

    const newPosts = (await query.get()).docs.map((doc) => doc.data());

    setPosts(posts.concat(newPosts));
    setLoading(false);

    if (newPosts.length < LIMIT) {
      setPostsEnd(true);
    }
  };

  return (
    <main>
      <Metatags title="Post feed page" />
      <PostFeed posts={posts} admin={false} />

      {!loading && !postsEnd && <button onClick={getMorePosts}>Load more</button>}

      <Loader show={loading} />

      {postsEnd && 'You have reached the end!'}
    </main>
  );
}
