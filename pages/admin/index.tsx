import AuthCheck from "../../components/AuthCheck";

export default function AdminPostsPage({ }) {
  return (
    <main>
      <AuthCheck>
        Admin Page
      </AuthCheck>
    </main>
  )
}