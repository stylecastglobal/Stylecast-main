export default function ProductPage({ params }: { params: { id: string } }) {
  return (
    <main className="min-h-screen p-10">
      <h1 className="text-3xl font-bold">Product Page</h1>
      <p className="mt-4 text-gray-500">Product ID: {params.id}</p>
    </main>
  );
}
