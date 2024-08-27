export default function Publication({ params }: { params: { slug: string } }) {
  return <div>My Post: {params.slug}</div>;
}
