import MyProfileComponent from "./component";

export default async function MyProfile() {
  return (
    <section className="bg-white h-full min-h-screen py-8 antialiased dark:bg-gray-900 md:py-16">
      <div className="mx-auto max-w-screen-xl px-4 2xl:px-0">
        <div className="mx-auto max-w-5xl">
          <MyProfileComponent />
        </div>
      </div>
    </section>
  );
}
