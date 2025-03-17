import { title } from "@/components/primitives";
import DefaultLayout from "@/layouts/default";
import { useUser } from "@/contexts/user_context_provider";

export default function DocsPage() {
  const { userState } = useUser();

  return (
    <DefaultLayout>
      <section className="flex flex-col items-center justify-center gap-4 py-8 md:py-10">
        <div className="inline-block max-w-lg text-center justify-center">
          <h1 className={title()}>{userState.loggedInStatus}</h1>
          <h1 className={title()}>Blog</h1>
        </div>
      </section>
    </DefaultLayout>
  );
}
