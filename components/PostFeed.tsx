import Link from 'next/link';
import { Post } from '../lib/types';

export default function PostFeed(props: { posts: Post[], admin: boolean }) {
  return props.posts ? props.posts.map((post) => <PostItem post={post} key={post.slug} admin={props.admin} />) : null;
}

function PostItem(props: { post: Post, admin: boolean}) {
  // Naive method to calc word count and read time
  const wordCount = props.post?.content.trim().split(/\s+/g).length;
  const minutesToRead = (wordCount / 100 + 1).toFixed(0);

  return (
    <div className="card">
      <Link href={`/${props.post.username}`}>
        <a>
          <strong>By @{props.post.username}</strong>
        </a>
      </Link>

      <Link href={`/${props.post.username}/${props.post.slug}`}>
        <h2>
          <a>{props.post.title}</a>
        </h2>
      </Link>

      <footer>
        <span>
          {wordCount} words. {minutesToRead} min read
        </span>
        <span className="push-left">💗 {props.post.heartCount || 0} Hearts</span>
      </footer>

      {/* If admin view, show extra controls for user */}
      {props.admin && (
        <>
          <Link href={`/admin/${props.post.slug}`}>
            <h3>
              <button className="btn-blue">Edit</button>
            </h3>
          </Link>

          {props.post.published ? <p className="text-success">Live</p> : <p className="text-danger">Unpublished</p>}
        </>
      )}
    </div>
  );
}
