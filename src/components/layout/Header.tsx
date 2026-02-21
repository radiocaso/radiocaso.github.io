import { useSiteSettings } from "@/domains/site/hooks/useSiteSettings";
import { urlFor } from "@/lib/sanity/sanityImageUrl";
import { ThemeToggle } from "@/components/layout/ThemeToggle";
import NavMenu from "@/components/layout/NavMenu";
import { NavLink } from "react-router";

export default function Header() {
  const { data, isLoading } = useSiteSettings();

  // TODO: Loading + Error compponents
  if (isLoading) return null;

  return (
    <header className="flex justify-between">
      <NavLink to="/">
        <div className="flex items-end gap-2">
          {data?.title && (
            <h1 className="text-4xl font-bold sm:text-7xl">{data?.title}</h1>
          )}
          {data?.logo && (
            <img
              className="w-15 sm:w-25 dark:invert"
              src={
                urlFor(data.logo).format("webp").width(100).url() + "&fit=max"
              }
            />
          )}
        </div>
      </NavLink>
      <NavMenu />
      <ThemeToggle />
    </header>
  );
}
